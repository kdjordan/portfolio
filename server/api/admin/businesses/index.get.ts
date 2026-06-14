import { defineEventHandler } from 'h3'
import { leadsRepository } from '../../../utils/receptionist/leads'

// Businesses sourced but not yet promoted to a Lead, with their site score.
// Reuses listPromotable (the leads LEFT JOIN) so this view and the Pipeline
// board agree on what counts as "still a candidate".
export default defineEventHandler(() => {
  return { businesses: leadsRepository.listPromotable() }
})
