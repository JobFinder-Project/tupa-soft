import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const [type, token] = authHeader.split(' ')

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({
      message: 'Token de autenticacao ausente',
    })
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET)
    req.user = {
      id: Number(payload.sub),
      email: payload.email,
      name: payload.name,
    }
    return next()
  } catch (error) {
    return res.status(401).json({
      message: 'Token de autenticacao invalido',
      error: error.message,
    })
  }
}
