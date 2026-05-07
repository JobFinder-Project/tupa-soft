import { z } from 'zod'

const optionalText = (maxLength) =>
  z.preprocess((value) => {
    if (value === undefined || value === null || value === '') {
      return undefined
    }

    return String(value).trim()
  }, z.string().max(maxLength).optional())

export const authProfileDto = z.object({
  name: optionalText(120),
  phone: optionalText(30),
})
