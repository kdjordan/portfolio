import Database from 'better-sqlite3'
import { assertReceptionistDbDirectory, getReceptionistConfig } from './config'

export interface BusinessRecord {
  id: number
  placeId: string | null
  name: string
  phone: string | null
  website: string | null
  address: string | null
  createdAt: string
  updatedAt: string
}

export interface LeadRecord {
  id: number
  businessId: number
  stage: string
  ownerNotes: string | null
  createdAt: string
  updatedAt: string
}

let connection: Database.Database | undefined

export function getReceptionistDb(): Database.Database {
  if (connection) return connection

  const config = getReceptionistConfig()
  assertReceptionistDbDirectory(config.dbPath)

  connection = new Database(config.dbPath)
  connection.pragma('journal_mode = WAL')
  connection.pragma('foreign_keys = ON')
  runMigrations(connection)

  return connection
}

export function closeReceptionistDb(): void {
  connection?.close()
  connection = undefined
}

export function runMigrations(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `)

  const migration = db.transaction((id: number, name: string, sql: string) => {
    const existing = db
      .prepare('SELECT id FROM schema_migrations WHERE id = ?')
      .get(id) as { id: number } | undefined

    if (existing) return

    db.exec(sql)
    db
      .prepare('INSERT INTO schema_migrations (id, name) VALUES (?, ?)')
      .run(id, name)
  })

  migration(1, 'stage_1_spine', `
    CREATE TABLE IF NOT EXISTS businesses (
      id INTEGER PRIMARY KEY,
      place_id TEXT UNIQUE,
      name TEXT NOT NULL,
      phone TEXT,
      website TEXT,
      address TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY,
      business_id INTEGER NOT NULL UNIQUE,
      stage TEXT NOT NULL DEFAULT 'sourced',
      owner_notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_businesses_place_id ON businesses(place_id);
    CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage);
  `)
}

export const receptionistRepository = {
  health() {
    const db = getReceptionistDb()
    const migration = db
      .prepare('SELECT id, name, applied_at as appliedAt FROM schema_migrations ORDER BY id DESC LIMIT 1')
      .get()

    return {
      ok: true,
      dbPath: getReceptionistConfig().dbPath,
      migration
    }
  },

  createBusiness(input: {
    placeId?: string | null
    name: string
    phone?: string | null
    website?: string | null
    address?: string | null
  }): BusinessRecord {
    const db = getReceptionistDb()
    const result = db
      .prepare(`
        INSERT INTO businesses (place_id, name, phone, website, address)
        VALUES (@placeId, @name, @phone, @website, @address)
      `)
      .run({
        placeId: input.placeId ?? null,
        name: input.name,
        phone: input.phone ?? null,
        website: input.website ?? null,
        address: input.address ?? null
      })

    return this.getBusinessById(Number(result.lastInsertRowid))!
  },

  getBusinessById(id: number): BusinessRecord | null {
    const row = getReceptionistDb()
      .prepare(`
        SELECT
          id,
          place_id as placeId,
          name,
          phone,
          website,
          address,
          created_at as createdAt,
          updated_at as updatedAt
        FROM businesses
        WHERE id = ?
      `)
      .get(id) as BusinessRecord | undefined

    return row ?? null
  },

  createLead(input: {
    businessId: number
    stage?: string
    ownerNotes?: string | null
  }): LeadRecord {
    const result = getReceptionistDb()
      .prepare(`
        INSERT INTO leads (business_id, stage, owner_notes)
        VALUES (@businessId, @stage, @ownerNotes)
      `)
      .run({
        businessId: input.businessId,
        stage: input.stage ?? 'sourced',
        ownerNotes: input.ownerNotes ?? null
      })

    return this.getLeadById(Number(result.lastInsertRowid))!
  },

  getLeadById(id: number): LeadRecord | null {
    const row = getReceptionistDb()
      .prepare(`
        SELECT
          id,
          business_id as businessId,
          stage,
          owner_notes as ownerNotes,
          created_at as createdAt,
          updated_at as updatedAt
        FROM leads
        WHERE id = ?
      `)
      .get(id) as LeadRecord | undefined

    return row ?? null
  }
}
