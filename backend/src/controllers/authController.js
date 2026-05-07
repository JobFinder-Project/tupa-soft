import { asyncHandler } from '../utils/asyncHandler.js'
import {
  authenticateLocalUser,
  buildAuthPayload,
  createLocalUser,
  createOrGetGoogleUser,
  findUserByEmail,
  findUserById,
  updateUserProfile,
} from '../services/authService.js'

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body

  const existing = await findUserByEmail(email)
  if (existing) {
    return res.status(409).json({
      message: 'Email ja cadastrado. Use o login para entrar.',
    })
  }

  const user = await createLocalUser({ name, email, password, phone })
  const payload = buildAuthPayload(user)

  return res.status(201).json({
    message: 'Conta criada com sucesso',
    data: payload,
  })
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const result = await authenticateLocalUser({ email, password })
  if (!result) {
    return res.status(401).json({
      message: 'Email ou senha invalidos',
    })
  }

  if (result.requiresGoogle) {
    return res.status(409).json({
      message: 'Conta criada com Google. Use o login com Google.',
    })
  }

  if (!result.passwordMatch) {
    return res.status(401).json({
      message: 'Email ou senha invalidos',
    })
  }

  const payload = buildAuthPayload(result.user)

  return res.status(200).json({
    message: 'Login realizado com sucesso',
    data: payload,
  })
})

export const loginWithGoogle = asyncHandler(async (req, res) => {
  const { name, email } = req.body

  const existing = email ? await findUserByEmail(email) : null
  if (existing && existing.provider === 'local') {
    return res.status(409).json({
      message: 'Conta cadastrada com email e senha. Use o login tradicional.',
    })
  }

  const user = await createOrGetGoogleUser({ name, email })
  const payload = buildAuthPayload(user)

  return res.status(200).json({
    message: 'Login com Google realizado com sucesso',
    data: payload,
  })
})

export const getProfile = asyncHandler(async (req, res) => {
  const user = await findUserById(req.user.id)

  if (!user) {
    return res.status(404).json({
      message: 'Usuario nao encontrado',
    })
  }

  return res.status(200).json({
    message: 'Perfil carregado com sucesso',
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        provider: user.provider,
      },
    },
  })
})

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await findUserById(req.user.id)

  if (!user) {
    return res.status(404).json({
      message: 'Usuario nao encontrado',
    })
  }

  const updated = await updateUserProfile(user, req.body)

  return res.status(200).json({
    message: 'Perfil atualizado com sucesso',
    data: {
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        provider: updated.provider,
      },
    },
  })
})
