import { createError } from 'h3'
import { getReceptionistConfig } from './config'

const SEARCH_TEXT_ENDPOINT = 'https://places.googleapis.com/v1/places:searchText'

// Field mask for Text Search (New). SKU note (verified against Google docs, June 2026):
// billing is at the HIGHEST SKU any requested field falls into. `places.id` is
// Essentials, displayName/formattedAddress/location/primaryType are Pro, but
// rating, userRatingCount, nationalPhoneNumber and websiteUri are ENTERPRISE.
// Because we need website + phone to qualify leads, every request is billed at the
// Text Search Enterprise rate -- this is NOT the free/Essentials tier. Trimming the
// mask would lower the SKU but drop the fields the pipeline depends on.
// https://developers.google.com/maps/documentation/places/web-service/text-search
const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.nationalPhoneNumber',
  'places.websiteUri',
  'places.rating',
  'places.userRatingCount',
  'places.location',
  'places.primaryType'
].join(',')

export interface NormalizedPlace {
  placeId: string
  name: string
  address: string | null
  phone: string | null
  website: string | null
  rating: number | null
  reviewsCount: number | null
  lat: number | null
  lng: number | null
  category: string | null
}

interface PlacesApiPlace {
  id?: string
  displayName?: { text?: string }
  formattedAddress?: string
  nationalPhoneNumber?: string
  websiteUri?: string
  rating?: number
  userRatingCount?: number
  location?: { latitude?: number, longitude?: number }
  primaryType?: string
}

interface PlacesApiResponse {
  places?: PlacesApiPlace[]
}

export async function searchPlaces(query: string): Promise<NormalizedPlace[]> {
  const apiKey = getReceptionistConfig().googlePlacesApiKey
  if (!apiKey) {
    throw createError({
      statusCode: 503,
      statusMessage: 'GOOGLE_PLACES_API_KEY not configured'
    })
  }

  const response = await fetch(SEARCH_TEXT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': FIELD_MASK
    },
    body: JSON.stringify({ textQuery: query })
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw createError({
      statusCode: 502,
      statusMessage: `Google Places searchText failed (${response.status})${detail ? `: ${detail}` : ''}`
    })
  }

  const data = (await response.json()) as PlacesApiResponse
  const places = data.places ?? []

  return places
    .filter((place): place is PlacesApiPlace & { id: string } => Boolean(place.id))
    .map((place) => ({
      placeId: place.id,
      name: place.displayName?.text ?? '',
      address: place.formattedAddress ?? null,
      phone: place.nationalPhoneNumber ?? null,
      // Only keep http(s) URLs — never store a javascript:/data: URI that would
      // become an XSS sink when rendered as a link in the Console.
      website: /^https?:\/\//i.test(place.websiteUri ?? '') ? place.websiteUri! : null,
      rating: place.rating ?? null,
      reviewsCount: place.userRatingCount ?? null,
      lat: place.location?.latitude ?? null,
      lng: place.location?.longitude ?? null,
      category: place.primaryType ?? null
    }))
}
