import express from 'express'

import {
	signUpService,
	logInService,
	logOutService,
	userLoadService
} from './service.js'
import { isLoggedIn, isNotLoggedIn } from '../../middleware/auth.js'

const router = express.Router()

router.get('/', userLoadService) //* GET /user
router.post('/signup', isNotLoggedIn, signUpService) //* POST /user/signup
router.post('/login', isNotLoggedIn, logInService) //* POST /user/login
router.post('/logout', isLoggedIn, logOutService) //* POST /user/logout

export default router
