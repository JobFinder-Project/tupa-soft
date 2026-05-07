import { asyncHandler } from '../utils/asyncHandler.js'
import { getProductById, listProducts } from '../services/productService.js'
import { listProductReviews } from '../services/reviewService.js'

export const getProducts = asyncHandler(async (req, res) => {
  const result = await listProducts(req.query)

  res.status(200).json({
    message: 'Products fetched successfully',
    data: result.items,
    meta: {
      total: result.total,
      limit: result.limit,
      offset: result.offset,
    },
  })
})

export const getProduct = asyncHandler(async (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: 'Invalid product id',
    })
  }

  const product = await getProductById(id)

  if (!product) {
    return res.status(404).json({
      message: 'Product not found',
    })
  }

  return res.status(200).json({
    message: 'Product fetched successfully',
    data: product,
  })
})

export const getProductReviews = asyncHandler(async (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: 'Invalid product id',
    })
  }

  const result = await listProductReviews(id, req.query)

  if (!result) {
    return res.status(404).json({
      message: 'Product not found',
    })
  }

  return res.status(200).json({
    message: 'Product reviews fetched successfully',
    data: result.items,
    meta: {
      total: result.total,
      limit: result.limit,
      offset: result.offset,
    },
  })
})
