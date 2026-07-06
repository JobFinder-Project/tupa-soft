import { Router } from 'express'
import { getContracts } from '../controllers/contractController.js'

const router = Router()

router.get('/', getContracts)

export default router