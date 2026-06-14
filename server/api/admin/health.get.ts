import { defineEventHandler } from 'h3'
import { getSchemaStatus } from '../../utils/receptionist/db'

export default defineEventHandler(() => {
  return getSchemaStatus()
})
