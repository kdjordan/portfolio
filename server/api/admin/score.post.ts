import { createError, defineEventHandler } from 'h3'
import { getReceptionistConfig } from '../../utils/receptionist/config'
import { scoringRepository } from '../../utils/receptionist/scoring'
import { runPageSpeed } from '../../utils/receptionist/pagespeed'

// Scores businesses that have a site but no score yet. Note: `bad_site`
// (score < 50) is a READ-TIME threshold, not a stored column — we only persist
// the raw 0-100 site_score here. `no_site` is likewise never stored.
//
// PageSpeed runs a full Lighthouse audit (~10-30s per URL), so scoring the whole
// batch in one request blows Cloudflare's ~100s proxy limit (524). Instead each
// request works until a wall-clock budget is hit, then returns `remaining` so the
// Console can loop until it reaches 0.

const MAX_RETRIES = 2
const BASE_DELAY_MS = 750
// Stop starting new businesses past this; well under Cloudflare's ~100s limit,
// leaving headroom for one final in-flight PageSpeed call + retries.
const BUDGET_MS = 60_000

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isTransient(error: unknown): boolean {
  const status = (error as { statusCode?: number })?.statusCode
  return status === 429 || (typeof status === 'number' && status >= 500)
}

export default defineEventHandler(async () => {
  if (!getReceptionistConfig().googlePageSpeedApiKey) {
    throw createError({
      statusCode: 503,
      statusMessage: 'GOOGLE_PAGESPEED_API_KEY not configured'
    })
  }

  const scorable = scoringRepository.listScorable()
  const startedAt = Date.now()

  let scored = 0
  let failed = 0

  for (const business of scorable) {
    // Stop starting new work once the budget is spent; the rest is reported as
    // `remaining` and picked up by the next request.
    if (Date.now() - startedAt > BUDGET_MS) break

    let lastError: unknown

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const { score, raw } = await runPageSpeed(business.website)
        scoringRepository.recordSiteScore(business.id, {
          siteScore: score,
          pagespeedJson: JSON.stringify(raw)
        })
        scored++
        lastError = undefined
        break
      } catch (error) {
        lastError = error
        if (attempt < MAX_RETRIES && isTransient(error)) {
          await delay(BASE_DELAY_MS * (attempt + 1))
          continue
        }
        break
      }
    }

    if (lastError) {
      // Mark attempted so it drops out of the scorable set and the loop can
      // terminate (otherwise a permanently-failing URL recurs every request).
      scoringRepository.recordScoreFailure(business.id)
      failed++
    }

    // Gentle pacing between businesses to stay under PageSpeed rate limits.
    await delay(BASE_DELAY_MS)
  }

  const remaining = scoringRepository.countScorable()

  return { ok: true, scored, failed, remaining }
})
