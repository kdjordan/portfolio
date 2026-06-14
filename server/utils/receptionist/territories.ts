import { getReceptionistDb } from './db'

export interface TerritoryRecord {
  id: number
  vertical: string
  metro: string
  createdAt: string
  lastRunAt: string | null
}

const TERRITORY_COLUMNS = `
  id,
  vertical,
  metro,
  created_at as createdAt,
  last_run_at as lastRunAt
`

export const territoriesRepository = {
  listTerritories(): TerritoryRecord[] {
    return getReceptionistDb()
      .prepare(`SELECT ${TERRITORY_COLUMNS} FROM territories ORDER BY metro, vertical`)
      .all() as TerritoryRecord[]
  },

  getTerritoryById(id: number): TerritoryRecord | null {
    const row = getReceptionistDb()
      .prepare(`SELECT ${TERRITORY_COLUMNS} FROM territories WHERE id = ?`)
      .get(id) as TerritoryRecord | undefined

    return row ?? null
  },

  createTerritory(input: { vertical: string, metro: string }): TerritoryRecord {
    const result = getReceptionistDb()
      .prepare('INSERT INTO territories (vertical, metro) VALUES (@vertical, @metro)')
      .run({ vertical: input.vertical, metro: input.metro })

    return this.getTerritoryById(Number(result.lastInsertRowid))!
  },

  deleteTerritory(id: number): void {
    getReceptionistDb().prepare('DELETE FROM territories WHERE id = ?').run(id)
  },

  touchLastRun(id: number): void {
    getReceptionistDb()
      .prepare(`UPDATE territories SET last_run_at = datetime('now') WHERE id = ?`)
      .run(id)
  }
}
