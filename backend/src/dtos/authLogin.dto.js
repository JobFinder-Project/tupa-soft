import { z } from 'zod'

export const authLoginDto = z.object({
  email: z.string().trim().email().max(180),
  password: z.string().min(1).max(200),
})
