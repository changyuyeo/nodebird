import express from 'express'

import { isLoggedIn, isNotLoggedIn } from '../../middleware/auth.js'
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
	removeFollowerService,
	myInfoLoadService
} from './service.js'

const router = express.Router()

router.get('/', myInfoLoadService) //* GET /user
router.post('/signup', isNotLoggedIn, signUpService) //* POST /user/signup
router.post('/login', isNotLoggedIn, logInService) //* POST /user/login
router.post('/logout', isLoggedIn, logOutService) //* POST /user/logout
router.patch('/nickname', isLoggedIn, changeNicknameService) //* PATCH /user/nickname
router.get('/followers', isLoggedIn, loadFollowersService) //* GET /user/followers
router.get('/followings', isLoggedIn, loadFollowingsService) //* GET /user/333followings
router.patch('/:userId/follow', isLoggedIn, followService) //* PATCH /user/1/follow
router.delete('/:userId/follow', isLoggedIn, unFollowService) //* DELETE /user/1/follow
router.get('/:userId', userLoadService) //* GET /user/1
router.delete('/follower/:userId', isLoggedIn, removeFollowerService) //* GET /user/followings

export default router
