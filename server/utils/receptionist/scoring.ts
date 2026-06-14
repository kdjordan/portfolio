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
  // Businesses with a site that have not been attempted yet. Keyed on
  // `scored_at` (not `site_score`) so a hard failure — which sets scored_at but
  // leaves site_score NULL — leaves this set and never re-loops. `no_site`
  // (has_site = 0) is not an API call and not stored, so those rows are excluded.
  listScorable(limit?: number): ScorableBusiness[] {
    const statement = getReceptionistDb().prepare(`
      SELECT id, website
      FROM businesses
      WHERE has_site = 1 AND website IS NOT NULL AND scored_at IS NULL
      ORDER BY id
      ${limit ? 'LIMIT @limit' : ''}
    `)
    return (limit ? statement.all({ limit }) : statement.all()) as ScorableBusiness[]
  },

  countScorable(): number {
    const row = getReceptionistDb()
      .prepare(`
        SELECT COUNT(*) AS n
        FROM businesses
        WHERE has_site = 1 AND website IS NOT NULL AND scored_at IS NULL
      `)
      .get() as { n: number }
    return row.n
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
  },

  // Marks a business as attempted without a score (PageSpeed failed after
  // retries). Sets scored_at so it drops out of listScorable; site_score stays
  // NULL, which reads as "unknown" — not bad_site.
  recordScoreFailure(businessId: number): void {
    getReceptionistDb()
      .prepare(`
        UPDATE businesses
        SET scored_at = datetime('now'),
            updated_at = datetime('now')
        WHERE id = @businessId
      `)
      .run({ businessId })
  }
}
