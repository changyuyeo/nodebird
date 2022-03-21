import express from 'express'

import {
	createPostService,
	createCommentService,
	likePostService,
	unLikePostService,
	deletePostService
} from './service.js'
import { isLoggedIn } from '../../middleware/auth.js'

const router = express.Router()

router.post('/', isLoggedIn, createPostService) //* POST /post
router.post('/:postId/comment', isLoggedIn, createCommentService) //* POST /post/1/comment
router.patch('/:postId/like', isLoggedIn, likePostService) //* PATCH /post/1/like
router.delete('/:postId/like', isLoggedIn, unLikePostService) //* DELETE /post/1/like
router.delete('/:postId', isLoggedIn, deletePostService) //* DELETE /post/1

export default router
