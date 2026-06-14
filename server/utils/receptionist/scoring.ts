import { getReceptionistDb } from './db'

// Owned by Stage 1C. Writes only the scoring columns on `businesses`
// (site_score, scored_at, pagespeed_json) so it never conflicts with the
// Stage 1B businesses repository. `no_site` is not stored here — it is read
// straight off `has_site`.
export interface ScorableBusiness {
  id: number
  website: string
}

export const scoringRepository = {
  // Businesses that have a site but no score yet. `no_site` (has_site = 0) is
  // not an API call and not stored — those rows are simply excluded here.
  listScorable(): ScorableBusiness[] {
    return getReceptionistDb()
      .prepare(`
        SELECT id, website
        FROM businesses
        WHERE has_site = 1 AND website IS NOT NULL AND site_score IS NULL
      `)
      .all() as ScorableBusiness[]
  },

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
