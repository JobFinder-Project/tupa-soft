import { Router } from 'express'
import { validateDto } from '../middlewares/validateDto.js'
import { productQueryDto } from '../dtos/productQuery.dto.js'
import { reviewQueryDto } from '../dtos/reviewQuery.dto.js'
import { getProduct, getProductReviews, getProducts } from '../controllers/productController.js'

const router = Router()

router.get('/', validateDto(productQueryDto, 'query'), getProducts)
router.get('/:id/reviews', validateDto(reviewQueryDto, 'query'), getProductReviews)
router.get('/:id', getProduct)

export default router
