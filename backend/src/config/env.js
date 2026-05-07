import 'dotenv/config'

function toNumber(value, fallback) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: toNumber(process.env.PORT, 3333),
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
  BCRYPT_SALT_ROUNDS: toNumber(process.env.BCRYPT_SALT_ROUNDS, 10),
}

if (!env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL environment variable')
}

if (!env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable')
}
