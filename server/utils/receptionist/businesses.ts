import { getReceptionistDb } from './db'

export interface BusinessRecord {
  id: number
  placeId: string | null
  name: string
  phone: string | null
  website: string | null
  address: string | null
  rating: number | null
  reviewsCount: number | null
  hasSite: number
  lat: number | null
  lng: number | null
  category: string | null
  siteScore: number | null
  scoredAt: string | null
  createdAt: string
  updatedAt: string
}

const BUSINESS_COLUMNS = `
  id,
  place_id as placeId,
  name,
  phone,
  website,
  address,
  rating,
  reviews_count as reviewsCount,
  has_site as hasSite,
  lat,
  lng,
  category,
  site_score as siteScore,
  scored_at as scoredAt,
  created_at as createdAt,
  updated_at as updatedAt
`

export const businessesRepository = {
  createBusiness(input: {
    placeId?: string | null
    name: string
    phone?: string | null
    website?: string | null
    address?: string | null
  }): BusinessRecord {
    const result = getReceptionistDb()
      .prepare(`
        INSERT INTO businesses (place_id, name, phone, website, address, has_site)
        VALUES (@placeId, @name, @phone, @website, @address, @hasSite)
      `)
      .run({
        placeId: input.placeId ?? null,
        name: input.name,
        phone: input.phone ?? null,
        website: input.website ?? null,
        address: input.address ?? null,
        hasSite: input.website ? 1 : 0
      })

    return this.getBusinessById(Number(result.lastInsertRowid))!
  },

  getBusinessById(id: number): BusinessRecord | null {
    const row = getReceptionistDb()
      .prepare(`SELECT ${BUSINESS_COLUMNS} FROM businesses WHERE id = ?`)
      .get(id) as BusinessRecord | undefined

    return row ?? null
  }
}
