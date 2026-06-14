import { createError, defineEventHandler, readBody } from 'h3'
import { territoriesRepository } from '../../../utils/receptionist/territories'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ vertical?: string, metro?: string }>(event)
  const vertical = body.vertical?.trim() ?? ''
  const metro = body.metro?.trim() ?? ''

  if (!vertical || !metro) {
    throw createError({
      statusCode: 400,
      statusMessage: 'vertical and metro are required'
    })
  }

  try {
    return territoriesRepository.createTerritory({ vertical, metro })
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Territory already exists for this vertical and metro'
      })
    }
    throw error
  }
})
