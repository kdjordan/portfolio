import * as argon2 from 'argon2'
import type { H3Event } from 'h3'
import { assertReceptionistAuthConfig, getReceptionistConfig } from './config'
import { getAdminSession } from './session'

export async function verifyAdminPassword(username: string, password: string): Promise<boolean> {
  const config = getReceptionistConfig()
  assertReceptionistAuthConfig(config)

  if (username !== config.adminUsername) return false
  if (!password) return false

  return argon2.verify(config.adminPasswordHash, password)
}

export function requireAdminSession(event: H3Event): { username: string } | null {
  const session = getAdminSession(event)
  if (!session) return null

  return { username: session.username }
}
