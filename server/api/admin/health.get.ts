import { defineEventHandler } from 'h3'
import { receptionistRepository } from '../../utils/receptionist/db'

export default defineEventHandler(() => {
  return receptionistRepository.health()
})
