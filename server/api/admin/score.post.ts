import { createError, defineEventHandler } from 'h3'
import { getReceptionistConfig } from '../../utils/receptionist/config'
import { scoringRepository } from '../../utils/receptionist/scoring'
import { runPageSpeed } from '../../utils/receptionist/pagespeed'

// Scores every business that has a site but no score yet. Note: `bad_site`
// (score < 50) is a READ-TIME threshold, not a stored column — we only persist
// the raw 0-100 site_score here. `no_site` is likewise never stored.

const MAX_RETRIES = 2
const BASE_DELAY_MS = 750

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

  let scored = 0
  let failed = 0

  for (const business of scorable) {
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

    if (lastError) failed++

    // Gentle pacing between businesses to stay under PageSpeed rate limits.
    await delay(BASE_DELAY_MS)
  }

  return { ok: true, scored, skipped: 0, failed }
})
