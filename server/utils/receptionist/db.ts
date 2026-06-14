import Database from 'better-sqlite3'
import { assertReceptionistDbDirectory, getReceptionistConfig } from './config'

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

  migration(2, 'stage_1b_1c_territories', `
    ALTER TABLE businesses ADD COLUMN rating REAL;
    ALTER TABLE businesses ADD COLUMN reviews_count INTEGER;
    ALTER TABLE businesses ADD COLUMN has_site INTEGER NOT NULL DEFAULT 0;
    ALTER TABLE businesses ADD COLUMN lat REAL;
    ALTER TABLE businesses ADD COLUMN lng REAL;
    ALTER TABLE businesses ADD COLUMN category TEXT;
    ALTER TABLE businesses ADD COLUMN site_score INTEGER;
    ALTER TABLE businesses ADD COLUMN scored_at TEXT;
    ALTER TABLE businesses ADD COLUMN pagespeed_json TEXT;

    CREATE TABLE IF NOT EXISTS territories (
      id INTEGER PRIMARY KEY,
      vertical TEXT NOT NULL,
      metro TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      last_run_at TEXT,
      UNIQUE (vertical, metro)
    );

    CREATE INDEX IF NOT EXISTS idx_businesses_has_site ON businesses(has_site);
  `)
}

export function getSchemaStatus() {
  const db = getReceptionistDb()
  const migration = db
    .prepare('SELECT id, name, applied_at as appliedAt FROM schema_migrations ORDER BY id DESC LIMIT 1')
    .get()

  return {
    ok: true,
    dbPath: getReceptionistConfig().dbPath,
    migration
  }
}
