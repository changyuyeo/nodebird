import express from 'express'

import { isLoggedIn } from '../../middleware/auth.js'
import upload from '../../middleware/multer.js'
import {
	createPostService,
	createCommentService,
	likePostService,
	unLikePostService,
	deletePostService,
	imageUploadService,
	retweetService
} from './service.js'

const router = express.Router()

router.post('/', isLoggedIn, upload.none(), createPostService) //* POST /post
router.post('/:postId/comment', isLoggedIn, createCommentService) //* POST /post/1/comment
router.patch('/:postId/like', isLoggedIn, likePostService) //* PATCH /post/1/like
router.delete('/:postId/like', isLoggedIn, unLikePostService) //* DELETE /post/1/like
router.delete('/:postId', isLoggedIn, deletePostService) //* DELETE /post/1
router.post('/images', isLoggedIn, upload.array('image'), imageUploadService) //* POST /post/images
router.post('/:postId/retweet', isLoggedIn, retweetService) //* POST /post/1/retweet

export default router
