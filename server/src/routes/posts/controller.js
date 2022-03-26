import express from 'express'

import {
	loadHashtagPostsService,
	loadPostsService,
	loadUserPostsService
} from './service.js'

const router = express.Router()

router.get('/', loadPostsService) //* GET /posts
router.get('/user/:userId', loadUserPostsService) //* GET /posts/user/1
router.get('/hashtag/:hashtag', loadHashtagPostsService) //* GET /posts/user/제봉이

export default router
