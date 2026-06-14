import { defineEventHandler } from 'h3'
import { leadsRepository } from '../../../utils/receptionist/leads'

export default defineEventHandler(() => {
  return {
    board: leadsRepository.listBoard(),
    candidates: leadsRepository.listPromotable()
  }
})
