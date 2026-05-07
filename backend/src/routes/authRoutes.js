import { Router } from 'express'
import { validateDto } from '../middlewares/validateDto.js'
import { authenticate } from '../middlewares/authenticate.js'
import { authLoginDto } from '../dtos/authLogin.dto.js'
import { authRegisterDto } from '../dtos/authRegister.dto.js'
import { authGoogleDto } from '../dtos/authGoogle.dto.js'
import { authProfileDto } from '../dtos/authProfile.dto.js'
import {
  getProfile,
  login,
  loginWithGoogle,
  register,
  updateProfile,
} from '../controllers/authController.js'

const router = Router()

router.post('/register', validateDto(authRegisterDto), register)
router.post('/login', validateDto(authLoginDto), login)
router.post('/google', validateDto(authGoogleDto), loginWithGoogle)
router.get('/me', authenticate, getProfile)
router.put('/me', authenticate, validateDto(authProfileDto), updateProfile)

export default router
