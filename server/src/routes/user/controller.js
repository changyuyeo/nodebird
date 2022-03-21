import express from 'express'

import {
	signUpService,
	logInService,
	logOutService,
	userLoadService,
	changeNicknameService,
	followService,
	unFollowService,
	loadFollowersService,
	loadFollowingsService,
	removeFollowerService
} from './service.js'
import { isLoggedIn, isNotLoggedIn } from '../../middleware/auth.js'

const router = express.Router()

router.get('/', userLoadService) //* GET /user
router.post('/signup', isNotLoggedIn, signUpService) //* POST /user/signup
router.post('/login', isNotLoggedIn, logInService) //* POST /user/login
router.post('/logout', isLoggedIn, logOutService) //* POST /user/logout
router.patch('/nickname', isLoggedIn, changeNicknameService) //* PATCH /user/nickname
router.patch('/:userId/follow', isLoggedIn, followService) //* PATCH /user/1/follow
router.delete('/:userId/follow', isLoggedIn, unFollowService) //* DELETE /user/1/follow
router.get('/followers', isLoggedIn, loadFollowersService) //* GET /user/followers
router.get('/followings', isLoggedIn, loadFollowingsService) //* GET /user/followings
router.delete('/follower/:userId', isLoggedIn, removeFollowerService) //* GET /user/followings

export default router
