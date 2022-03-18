import express from 'express'

import { createPostService, createCommentService } from './service.js'
import { isLoggedIn } from '../../middleware/auth.js'

const router = express.Router()

router.post('/', isLoggedIn, createPostService) //* POST post
router.post('/:postId/comment', isLoggedIn, createCommentService) //* POST post/1/comment

export default router
