import { accessSync, constants, mkdirSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

export interface ReceptionistConfig {
  dbPath: string
  adminUsername: string
  adminPasswordHash: string
  sessionSecret: string
  googlePlacesApiKey: string
  googlePageSpeedApiKey: string
  isProduction: boolean
}

const DEFAULT_PRODUCTION_DB_PATH = '/app/data/receptionist.sqlite'
const DEFAULT_DEVELOPMENT_DB_PATH = '.data/receptionist.sqlite'

function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim()
  return value ? value : undefined
}

function resolveDbPath(): string {
  const configured = readEnv('RECEPTIONIST_DB_PATH')
  const fallback = process.env.NODE_ENV === 'production'
    ? DEFAULT_PRODUCTION_DB_PATH
    : DEFAULT_DEVELOPMENT_DB_PATH

  return resolve(configured ?? fallback)
}

export function getReceptionistConfig(): ReceptionistConfig {
  const dbPath = resolveDbPath()

  return {
    dbPath,
    adminUsername: readEnv('RECEPTIONIST_ADMIN_USERNAME') ?? '',
    adminPasswordHash: readEnv('RECEPTIONIST_ADMIN_PASSWORD_HASH') ?? '',
    sessionSecret: readEnv('RECEPTIONIST_SESSION_SECRET') ?? '',
    googlePlacesApiKey: readEnv('GOOGLE_PLACES_API_KEY') ?? '',
    googlePageSpeedApiKey: readEnv('GOOGLE_PAGESPEED_API_KEY') ?? '',
    isProduction: process.env.NODE_ENV === 'production'
  }
}

export function assertReceptionistDbDirectory(dbPath: string): void {
  const dbDirectory = dirname(dbPath)

  if (process.env.NODE_ENV !== 'production' && dbDirectory.endsWith('/.data')) {
    mkdirSync(dbDirectory, { recursive: true })
  }

  let stats
  try {
    stats = statSync(dbDirectory)
  } catch (error) {
    throw new Error(
      `Receptionist DB directory does not exist: ${dbDirectory}. ` +
      `Set RECEPTIONIST_DB_PATH to a writable sqlite file path. ` +
      `Production expects a Coolify volume mounted at /app/data.`
    )
  }

  if (!stats.isDirectory()) {
    throw new Error(`Receptionist DB parent path is not a directory: ${dbDirectory}`)
  }

  try {
    accessSync(dbDirectory, constants.R_OK | constants.W_OK)
  } catch (error) {
    throw new Error(`Receptionist DB directory is not writable: ${dbDirectory}`)
  }
}

export function assertReceptionistAuthConfig(config = getReceptionistConfig()): void {
  const missing = []

  if (!config.adminUsername) missing.push('RECEPTIONIST_ADMIN_USERNAME')
  if (!config.adminPasswordHash) missing.push('RECEPTIONIST_ADMIN_PASSWORD_HASH')
  if (!config.sessionSecret) missing.push('RECEPTIONIST_SESSION_SECRET')
  if (config.sessionSecret && config.sessionSecret.length < 32) {
    missing.push('RECEPTIONIST_SESSION_SECRET (minimum 32 characters)')
  }

  if (missing.length > 0) {
    throw new Error(`Receptionist admin auth is not configured: ${missing.join(', ')}`)
  }
}

export const RECEPTIONIST_PRODUCTION_DB_PATH = DEFAULT_PRODUCTION_DB_PATH
