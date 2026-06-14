import { defineEventHandler } from 'h3'
import { territoriesRepository } from '../../../utils/receptionist/territories'

export default defineEventHandler(() => {
  return territoriesRepository.listTerritories()
})
