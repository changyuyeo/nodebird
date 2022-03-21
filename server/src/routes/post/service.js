import {
	createComment,
	createPost,
	deletePost,
	existsPost,
	fullComment,
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
		const PostId = parseInt(req.params.postId, 10)
		const { id } = req.user
		const post = await existsPost(id)
		if (!post)
			return res.status(403).json({ message: '존재하지 않는 게시글입니다.' })
		const comment = await createComment({ content, PostId, UserId: id })
		const fullCommentData = await fullComment(comment.id)
		return res.status(201).json(fullCommentData)
	} catch (error) {
		console.error(error.message)
		next(error)
	}
}

//* post 좋아요
export const likePostService = async (req, res, next) => {
	try {
		const { postId } = req.params
		const post = await existsPost(postId)
		if (!post)
			return res.status(403).json({ message: '게시글이 존재하지 않습니다.' })
		await post.addLikers(req.user.id)
		return res.status(200).json({ PostId: post.id, UserId: req.user.id })
	} catch (error) {
		console.error(error)
		next(error)
	}
}

//* post 좋아요 취소
export const unLikePostService = async (req, res, next) => {
	try {
		const { postId } = req.params
		const post = await existsPost(postId)
		if (!post)
			return res.status(403).json({ message: '게시글이 존재하지 않습니다.' })
		await post.removeLikers(req.user.id)
		return res.status(200).json({ PostId: post.id, UserId: req.user.id })
	} catch (error) {
		console.error(error)
		next(error)
	}
}

export const deletePostService = async (req, res, next) => {
	try {
		const { postId } = req.params
		await deletePost(postId, req.user.id)
		return res.status(200).json({ PostId: parseInt(postId, 10) })
	} catch (error) {
		console.error(error)
		next(error)
	}
}
