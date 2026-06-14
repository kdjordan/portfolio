import { defineEventHandler } from 'h3'
import { clearAdminSession } from '../../utils/receptionist/session'

export default defineEventHandler((event) => {
  clearAdminSession(event)

  return { ok: true }
})
