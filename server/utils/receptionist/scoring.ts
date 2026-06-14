import { getReceptionistDb } from './db'

// Owned by Stage 1C. Writes only the scoring columns on `businesses`
// (site_score, scored_at, pagespeed_json) so it never conflicts with the
// Stage 1B businesses repository. `no_site` is not stored here — it is read
// straight off `has_site`.
export const scoringRepository = {
  recordSiteScore(businessId: number, input: {
    siteScore: number
    pagespeedJson?: string | null
  }): void {
    getReceptionistDb()
      .prepare(`
        UPDATE businesses
        SET site_score = @siteScore,
            pagespeed_json = @pagespeedJson,
            scored_at = datetime('now'),
            updated_at = datetime('now')
        WHERE id = @businessId
      `)
      .run({
        businessId,
        siteScore: input.siteScore,
        pagespeedJson: input.pagespeedJson ?? null
      })
  }
}
