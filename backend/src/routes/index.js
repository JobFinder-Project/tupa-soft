import { Router } from 'express'
import healthRoutes from './healthRoutes.js'
import categoryRoutes from './categoryRoutes.js'
import productRoutes from './productRoutes.js'
import inquiryRoutes from './inquiryRoutes.js'
import authRoutes from './authRoutes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/health', healthRoutes)
router.use('/categories', categoryRoutes)
router.use('/products', productRoutes)
router.use('/inquiries', inquiryRoutes)

export default router
