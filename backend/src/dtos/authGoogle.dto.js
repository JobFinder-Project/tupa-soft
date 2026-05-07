import { z } from 'zod'

export const authGoogleDto = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  email: z.string().trim().email().max(180).optional(),
})
