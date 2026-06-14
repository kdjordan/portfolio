import { defineEventHandler } from 'h3'
import { getAdminSession } from '../../utils/receptionist/session'

export default defineEventHandler((event) => {
  const session = getAdminSession(event)

  return {
    ok: true,
    admin: session ? { username: session.username } : null
  }
})
