import { Op } from 'sequelize'

import { loadAllHashtagPost, loadAllPost } from '../post/repository.js'

export const loadPostsService = async (req, res, next) => {
	try {
		const where = {}
		const lastId = parseInt(req.query.lastId, 10)
		if (lastId) where.id = { [Op.lt]: lastId }
		const posts = await loadAllPost(where)
		return res.status(200).json(posts)
	} catch (error) {
		console.error(error.message)
		next(error)
	}
}

export const loadUserPostsService = async (req, res, next) => {
	try {
		const where = { UserId: req.params.userId }
		const lastId = parseInt(req.query.lastId, 10)
		if (lastId) where.id = { [Op.lt]: lastId }
		const posts = await loadAllPost(where)
		return res.status(200).json(posts)
	} catch (error) {
		console.error(error.message)
		next(error)
	}
}

export const loadHashtagPostsService = async (req, res, next) => {
	try {
		const where = {}
		const lastId = parseInt(req.query.lastId, 10)
		if (lastId) where.id = { [Op.lt]: lastId }
		const posts = await loadAllHashtagPost(where, req.params.hashtag)
		return res.status(200).json(posts)
	} catch (error) {
		console.error(error.message)
		next(error)
	}
}
