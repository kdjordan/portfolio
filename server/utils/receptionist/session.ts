import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import {
  deleteCookie,
  getCookie,
  getRequestURL,
  setCookie,
  type H3Event
} from 'h3'
import { assertReceptionistAuthConfig, getReceptionistConfig } from './config'

const COOKIE_NAME = 'receptionist_session'
const SESSION_TTL_SECONDS = 60 * 60 * 8

interface SessionPayload {
  username: string
  exp: number
  nonce: string
}

function base64url(input: string | Buffer): string {
  return Buffer.from(input).toString('base64url')
}

function sign(value: string, secret: string): string {
  return createHmac('sha256', secret).update(value).digest('base64url')
}

function verifySignature(value: string, signature: string, secret: string): boolean {
  const expected = sign(value, secret)
  const expectedBuffer = Buffer.from(expected)
  const signatureBuffer = Buffer.from(signature)

  if (expectedBuffer.length !== signatureBuffer.length) return false

  return timingSafeEqual(expectedBuffer, signatureBuffer)
}

export function createAdminSession(event: H3Event, username: string): void {
  const config = getReceptionistConfig()
  assertReceptionistAuthConfig(config)

  const payload: SessionPayload = {
    username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    nonce: randomBytes(16).toString('hex')
  }

  const encodedPayload = base64url(JSON.stringify(payload))
  const signature = sign(encodedPayload, config.sessionSecret)
  const requestUrl = getRequestURL(event)

  setCookie(event, COOKIE_NAME, `${encodedPayload}.${signature}`, {
    httpOnly: true,
    secure: requestUrl.protocol === 'https:' || config.isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS
  })
}

export function clearAdminSession(event: H3Event): void {
  deleteCookie(event, COOKIE_NAME, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/'
  })
}

export function getAdminSession(event: H3Event): SessionPayload | null {
  const config = getReceptionistConfig()
  if (!config.sessionSecret) return null

  const cookie = getCookie(event, COOKIE_NAME)
  if (!cookie) return null

  const [encodedPayload, signature] = cookie.split('.')
  if (!encodedPayload || !signature) return null
  if (!verifySignature(encodedPayload, signature, config.sessionSecret)) return null

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as SessionPayload
    if (!payload.username || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return payload
  } catch (error) {
    return null
  }
}
