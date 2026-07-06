import { asyncHandler } from '../utils/asyncHandler.js'
import { listContractsByEmail } from '../services/contractService.js'

export const getContracts = asyncHandler(async (req, res) => {
  const email = String(req.query.email ?? '').trim()

  if (!email) {
    return res.status(400).json({
      message: 'Email is required',
    })
  }

  const data = await listContractsByEmail(email)

  return res.status(200).json({
    message: 'Contracts fetched successfully',
    data,
    meta: {
      total: data.length,
    },
  })
})