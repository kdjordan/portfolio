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
  },

  upsertByPlaceId(input: {
    placeId: string
    name: string
    phone?: string | null
    website?: string | null
    address?: string | null
    rating?: number | null
    reviewsCount?: number | null
    lat?: number | null
    lng?: number | null
    category?: string | null
  }): BusinessRecord {
    const row = getReceptionistDb()
      .prepare(`
        INSERT INTO businesses (
          place_id, name, phone, website, address,
          rating, reviews_count, has_site, lat, lng, category
        )
        VALUES (
          @placeId, @name, @phone, @website, @address,
          @rating, @reviewsCount, @hasSite, @lat, @lng, @category
        )
        ON CONFLICT(place_id) DO UPDATE SET
          name = excluded.name,
          phone = excluded.phone,
          website = excluded.website,
          address = excluded.address,
          rating = excluded.rating,
          reviews_count = excluded.reviews_count,
          has_site = excluded.has_site,
          lat = excluded.lat,
          lng = excluded.lng,
          category = excluded.category,
          updated_at = datetime('now')
        RETURNING ${BUSINESS_COLUMNS}
      `)
      .get({
        placeId: input.placeId,
        name: input.name,
        phone: input.phone ?? null,
        website: input.website ?? null,
        address: input.address ?? null,
        rating: input.rating ?? null,
        reviewsCount: input.reviewsCount ?? null,
        hasSite: input.website ? 1 : 0,
        lat: input.lat ?? null,
        lng: input.lng ?? null,
        category: input.category ?? null
      }) as BusinessRecord

    return row
  },

  listBusinesses(): BusinessRecord[] {
    return getReceptionistDb()
      .prepare(`SELECT ${BUSINESS_COLUMNS} FROM businesses ORDER BY name`)
      .all() as BusinessRecord[]
  }
}
