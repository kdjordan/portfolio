import { createError } from 'h3'
import { getReceptionistConfig } from './config'

const PAGESPEED_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'

interface PageSpeedResult {
  score: number
  raw: unknown
}

// Pure PageSpeed Insights v5 client. Fetches the mobile performance score for a
// single URL. Throws (never crashes boot/build) so the caller can skip+continue.
export async function runPageSpeed(url: string): Promise<PageSpeedResult> {
  const apiKey = getReceptionistConfig().googlePageSpeedApiKey
  if (!apiKey) {
    throw createError({
      statusCode: 503,
      statusMessage: 'GOOGLE_PAGESPEED_API_KEY not configured'
    })
  }

  const query = new URLSearchParams({
    url,
    strategy: 'mobile',
    category: 'performance',
    key: apiKey
  })

  const response = await fetch(`${PAGESPEED_ENDPOINT}?${query.toString()}`)
  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: `PageSpeed request failed for ${url} (${response.status})`
    })
  }

  const raw = await response.json() as {
    lighthouseResult?: { categories?: { performance?: { score?: number } } }
  }

  const rawScore = raw?.lighthouseResult?.categories?.performance?.score
  if (typeof rawScore !== 'number') {
    throw createError({
      statusCode: 502,
      statusMessage: `PageSpeed response missing performance score for ${url}`
    })
  }

  return { score: Math.round(rawScore * 100), raw }
}
