import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'node:crypto'
import { env } from '../config/env.js'
import User from '../models/User.js'

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    provider: user.provider,
  }
}

function signToken(user) {
  return jwt.sign(
    {
      sub: String(user.id),
      email: user.email,
      name: user.name,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN },
  )
}

export async function findUserByEmail(email) {
  return User.findOne({ where: { email } })
}

export async function findUserById(id) {
  return User.findByPk(id)
}

export async function createLocalUser({ name, email, password, phone }) {
  const passwordHash = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS)
  const user = await User.create({
    name,
    email,
    phone: phone || null,
    passwordHash,
    provider: 'local',
  })

  return user
}

export async function authenticateLocalUser({ email, password }) {
  const user = await findUserByEmail(email)
  if (!user) {
    return null
  }

  if (!user.passwordHash) {
    return { user, passwordMatch: false, requiresGoogle: true }
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash)
  return { user, passwordMatch, requiresGoogle: false }
}

export async function createOrGetGoogleUser({ name, email }) {
  if (email) {
    const existing = await findUserByEmail(email)
    if (existing) {
      return existing
    }
  }

  const fallbackName = name?.trim() || 'Usuario Google'
  const fallbackEmail = email?.trim() || `google_${randomUUID().slice(0, 12)}@tupasoft.local`

  return User.create({
    name: fallbackName,
    email: fallbackEmail,
    provider: 'google',
  })
}

export async function updateUserProfile(user, { name, phone }) {
  user.name = name ?? user.name
  user.phone = phone ?? user.phone
  await user.save()
  return user
}

export function buildAuthPayload(user) {
  return {
    user: sanitizeUser(user),
    token: signToken(user),
  }
}
