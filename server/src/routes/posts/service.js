import { Op } from 'sequelize'

import { loadAllPost } from '../post/repository.js'

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
