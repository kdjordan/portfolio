import { createError, defineEventHandler, getRouterParam } from 'h3'
import { territoriesRepository } from '../../../utils/receptionist/territories'

export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id) || id <= 0) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid territory id' })
  }

  territoriesRepository.deleteTerritory(id)

  return { ok: true }
})
