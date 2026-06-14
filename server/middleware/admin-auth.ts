import {
  createError,
  defineEventHandler,
  getRequestURL,
  sendRedirect
} from 'h3'
import { getAdminSession } from '../utils/receptionist/session'

const PUBLIC_ADMIN_PATHS = new Set([
  '/admin/login',
  '/api/admin/login'
])

export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const pathname = url.pathname
  const isAdminPage = pathname === '/admin' || pathname.startsWith('/admin/')
  const isAdminApi = pathname === '/api/admin' || pathname.startsWith('/api/admin/')

  if (!isAdminPage && !isAdminApi) return
  if (PUBLIC_ADMIN_PATHS.has(pathname)) return

  const session = getAdminSession(event)
  if (session) {
    event.context.admin = { username: session.username }
    return
  }

  if (isAdminApi) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Admin session required'
    })
  }

  const next = encodeURIComponent(`${pathname}${url.search}`)
  return sendRedirect(event, `/admin/login?next=${next}`, 302)
})
