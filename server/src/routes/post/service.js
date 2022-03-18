import {
	createComment,
	createPost,
	existsPost,
	fullPost
} from './repository.js'

//* post 글 생성
export const createPostService = async (req, res, next) => {
	try {
		const { content } = req.body
		const { id: UserId } = req.user
		const { id } = await createPost({ content, UserId })
		const post = await fullPost(id)
		return res.status(201).json(post)
	} catch (error) {
		console.error(error.message)
		next(error)
	}
}

//* post 댓글 생성
export const createCommentService = async (req, res, next) => {
	try {
		const { content } = req.body
		const { postId: PostId } = req.params
		const { id } = req.user
		const post = await existsPost(id)
		if (!post)
			return res.status(403).json({ message: '존재하지 않는 게시글입니다.' })
		const comment = await createComment({ content, PostId, UserId: id })
		return res.status(201).json(comment)
	} catch (error) {
		console.error(error.message)
		next(error)
	}
}
