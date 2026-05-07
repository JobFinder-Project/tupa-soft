import { ZodError } from 'zod'

export function errorHandler(error, _req, res, _next) {
  if (error?.status && Number.isInteger(error.status)) {
    return res.status(error.status).json({
      message: error.message || 'Request error',
    })
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      issues: error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    })
  }

  if (error?.name === 'SequelizeForeignKeyConstraintError' || error?.code === '23503') {
    return res.status(400).json({
      message: 'Invalid relation reference in request data',
    })
  }

  if (error?.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      issues: error.errors.map((item) => ({
        path: item.path,
        message: item.message,
      })),
    })
  }

  if (error?.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      message: 'Duplicate value for unique field',
    })
  }

  if (error?.name === 'SequelizeDatabaseError' || error?.code === '22P02') {
    return res.status(400).json({
      message: 'Invalid data format in request',
    })
  }

  console.error('[error]', error)

  return res.status(500).json({
    message: 'Internal server error',
  })
}
