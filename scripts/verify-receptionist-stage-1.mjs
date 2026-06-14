import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawn } from 'node:child_process'

const root = process.cwd()
const tempDir = mkdtempSync(join(tmpdir(), 'receptionist-stage-1-'))
const dbPath = join(tempDir, 'receptionist.sqlite')
const port = String(4700 + Math.floor(Math.random() * 1000))

const env = {
  ...process.env,
  NODE_ENV: 'production',
  NITRO_PORT: port,
  NITRO_HOST: '127.0.0.1',
  RECEPTIONIST_DB_PATH: dbPath,
  RECEPTIONIST_ADMIN_USERNAME: 'admin',
  RECEPTIONIST_ADMIN_PASSWORD_HASH: '$argon2id$v=19$m=65536,t=3,p=4$P9WLMNL3eWd3eUi8wyxI5Q$WXs1bwnHGJuonui59iu1OCCVJni35M0nfed+sFnmZ1U',
  RECEPTIONIST_SESSION_SECRET: 'stage-1-verification-secret-32-chars'
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function request(path, options = {}) {
  const response = await fetch(`http://127.0.0.1:${port}${path}`, {
    redirect: 'manual',
    ...options,
    headers: {
      ...(options.headers ?? {})
    }
  })

  const text = await response.text()
  return { response, text }
}

async function waitForServer(child) {
  const started = Date.now()
  while (Date.now() - started < 30000) {
    if (child.exitCode !== null) {
      throw new Error(`Server exited before it became ready with code ${child.exitCode}`)
    }

    try {
      const { response } = await request('/admin/login')
      if (response.status === 200) return
    } catch (error) {
      await wait(250)
    }
  }

  throw new Error('Timed out waiting for Nuxt server')
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

let child

try {
  child = spawn('node', ['.output/server/index.mjs'], {
    cwd: root,
    env,
    stdio: ['ignore', 'pipe', 'pipe']
  })

  child.stdout.on('data', (chunk) => process.stdout.write(chunk))
  child.stderr.on('data', (chunk) => process.stderr.write(chunk))

  await waitForServer(child)

  const unauthenticatedAdmin = await request('/admin')
  assert(unauthenticatedAdmin.response.status === 302, 'Expected unauthenticated /admin to redirect')
  assert(
    unauthenticatedAdmin.response.headers.get('location')?.startsWith('/admin/login'),
    'Expected /admin redirect to target /admin/login'
  )

  const unauthenticatedApi = await request('/api/admin/health')
  assert(unauthenticatedApi.response.status === 401, 'Expected unauthenticated /api/admin/* to return 401')

  const login = await request('/api/admin/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'password' })
  })
  assert(login.response.status === 200, 'Expected valid login to return 200')

  const cookie = login.response.headers.get('set-cookie')
  assert(cookie?.includes('receptionist_session='), 'Expected login to set receptionist_session cookie')

  const authenticatedAdmin = await request('/admin', {
    headers: { cookie }
  })
  assert(authenticatedAdmin.response.status === 200, 'Expected authenticated /admin to load')
  assert(authenticatedAdmin.text.includes('Authenticated Console shell'), 'Expected admin shell content')

  const healthOne = await request('/api/admin/health', {
    headers: { cookie }
  })
  assert(healthOne.response.status === 200, 'Expected authenticated /api/admin/health to return 200')
  assert(existsSync(dbPath), 'Expected DB file to be created at configured path')

  const healthTwo = await request('/api/admin/health', {
    headers: { cookie }
  })
  assert(healthTwo.response.status === 200, 'Expected migration bootstrap to be idempotent')

  console.log('\nStage 1 verification passed')
} finally {
  if (child) child.kill()
  rmSync(tempDir, { recursive: true, force: true })
}
