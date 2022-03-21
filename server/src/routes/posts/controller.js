import express from 'express'

import { loadPostsService } from './service.js'

const router = express.Router()

router.get('/', loadPostsService) //* GET /posts

export default router
