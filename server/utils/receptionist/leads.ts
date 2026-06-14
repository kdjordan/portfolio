import { getReceptionistDb } from './db'

export interface LeadRecord {
  id: number
  businessId: number
  stage: string
  ownerNotes: string | null
  createdAt: string
  updatedAt: string
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
  }
}
