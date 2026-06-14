import { getReceptionistDb } from './db'

export interface LeadRecord {
  id: number
  businessId: number
  stage: string
  ownerNotes: string | null
  createdAt: string
  updatedAt: string
}

export interface BoardCard {
  leadId: number
  stage: string
  businessId: number
  name: string
  phone: string | null
  rating: number | null
  hasSite: number
  siteScore: number | null
}

export interface PromotableBusiness {
  id: number
  name: string
  phone: string | null
  rating: number | null
  hasSite: number
  siteScore: number | null
}

const LEAD_COLUMNS = `
  id,
  business_id as businessId,
  stage,
  owner_notes as ownerNotes,
  created_at as createdAt,
  updated_at as updatedAt
`

export const leadsRepository = {
  createLead(input: {
    businessId: number
    stage?: string
    ownerNotes?: string | null
  }): LeadRecord {
    const result = getReceptionistDb()
      .prepare(`
        INSERT INTO leads (business_id, stage, owner_notes)
        VALUES (@businessId, @stage, @ownerNotes)
      `)
      .run({
        businessId: input.businessId,
        stage: input.stage ?? 'sourced',
        ownerNotes: input.ownerNotes ?? null
      })

    return this.getLeadById(Number(result.lastInsertRowid))!
  },

  getLeadById(id: number): LeadRecord | null {
    const row = getReceptionistDb()
      .prepare(`SELECT ${LEAD_COLUMNS} FROM leads WHERE id = ?`)
      .get(id) as LeadRecord | undefined

    return row ?? null
  },

  getByBusinessId(businessId: number): LeadRecord | null {
    const row = getReceptionistDb()
      .prepare(`SELECT ${LEAD_COLUMNS} FROM leads WHERE business_id = ?`)
      .get(businessId) as LeadRecord | undefined

    return row ?? null
  },

  listBoard(): BoardCard[] {
    return getReceptionistDb()
      .prepare(`
        SELECT
          l.id as leadId,
          l.stage as stage,
          b.id as businessId,
          b.name as name,
          b.phone as phone,
          b.rating as rating,
          b.has_site as hasSite,
          b.site_score as siteScore
        FROM leads l
        JOIN businesses b ON b.id = l.business_id
        ORDER BY b.name
      `)
      .all() as BoardCard[]
  },

  listPromotable(): PromotableBusiness[] {
    return getReceptionistDb()
      .prepare(`
        SELECT
          b.id,
          b.name,
          b.phone,
          b.rating,
          b.has_site as hasSite,
          b.site_score as siteScore
        FROM businesses b
        LEFT JOIN leads l ON l.business_id = b.id
        WHERE l.id IS NULL
        ORDER BY b.name
      `)
      .all() as PromotableBusiness[]
  }
}
