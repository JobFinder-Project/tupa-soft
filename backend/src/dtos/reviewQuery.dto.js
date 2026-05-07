import { z } from 'zod'

function optionalNumber(min, max) {
  return z.preprocess((value) => {
    if (value === undefined || value === null || value === '') {
      return undefined
    }

    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : value
  }, z.number().min(min).max(max).optional())
}

export const reviewQueryDto = z.object({
  limit: optionalNumber(1, 100),
  offset: optionalNumber(0, 100_000),
})
