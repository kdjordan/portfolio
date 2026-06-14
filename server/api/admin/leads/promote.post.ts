import { createError, defineEventHandler, readBody } from 'h3'
import { leadsRepository } from '../../../utils/receptionist/leads'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ businessId?: unknown }>(event)
  const businessId = Number(body?.businessId)

  if (!Number.isInteger(businessId) || businessId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A numeric businessId is required'
    })
  }

  if (leadsRepository.getByBusinessId(businessId)) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Business is already promoted to a lead'
    })
  }

  return leadsRepository.createLead({ businessId })
})
