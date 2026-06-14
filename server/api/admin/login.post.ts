import { createError, defineEventHandler, readBody } from 'h3'
import { verifyAdminPassword } from '../../utils/receptionist/auth'
import { createAdminSession } from '../../utils/receptionist/session'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ username?: string, password?: string }>(event)
  const username = body.username?.trim() ?? ''
  const password = body.password ?? ''

  const valid = await verifyAdminPassword(username, password)
  if (!valid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid admin credentials'
    })
  }

  createAdminSession(event, username)

  return { ok: true }
})
