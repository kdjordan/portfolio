import { createError, defineEventHandler, readBody } from 'h3'
import { businessesRepository } from '../../../utils/receptionist/businesses'
import { territoriesRepository } from '../../../utils/receptionist/territories'
import { searchPlaces } from '../../../utils/receptionist/places'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ territoryId?: number }>(event)
  const territoryId = Number(body.territoryId)

  if (!Number.isInteger(territoryId) || territoryId <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'territoryId is required' })
  }

  const territory = territoriesRepository.getTerritoryById(territoryId)
  if (!territory) {
    throw createError({ statusCode: 404, statusMessage: 'Territory not found' })
  }

  const query = `${territory.vertical} in ${territory.metro}`
  const places = await searchPlaces(query)

  for (const place of places) {
    businessesRepository.upsertByPlaceId(place)
  }

  territoriesRepository.touchLastRun(territoryId)

  return { ok: true, ingested: places.length }
})
