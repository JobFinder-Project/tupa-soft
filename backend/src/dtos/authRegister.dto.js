import { z } from 'zod'

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

const optionalText = (maxLength) =>
  z.preprocess((value) => {
    if (value === undefined || value === null || value === '') {
      return undefined
    }

    return String(value).trim()
  }, z.string().max(maxLength).optional())

export const authRegisterDto = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: optionalText(30),
  password: z
    .string()
    .min(8)
    .max(200)
    .regex(passwordRegex, 'Senha nao atende aos requisitos de seguranca'),
})
