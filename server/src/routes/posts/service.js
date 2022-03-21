import { loadAllPost } from '../post/repository.js'

export const loadPostsService = async (req, res, next) => {
	try {
		const posts = await loadAllPost()
		return res.status(200).json(posts)
	} catch (error) {
		console.error(error.message)
		next(error)
	}
}
