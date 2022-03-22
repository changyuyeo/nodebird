import {
	createComment,
	createHashtag,
	createImage,
	createPost,
	deletePost,
	existsPost,
	fullComment,
	fullPost,
	retweetFullPost,
	retweetPost
} from './repository.js'

//* post 글 생성
export const createPostService = async (req, res, next) => {
	try {
		const { content, image } = req.body
		const hashtags = content.match(/#[^\s#]+/g)
		const post = await createPost({ content, UserId: req.user.id })
		if (hashtags) {
			const res = await Promise.all(
				hashtags.map(tag => createHashtag(tag.slice(1).toLowerCase()))
			)
			await post.addHashtags(res.map(v => v[0]))
		}
		if (image) {
			if (Array.isArray(image)) {
				const images = await Promise.all(image.map(image => createImage(image)))
				await post.addImages(images)
			} else {
				const imageData = await createImage(image)
				await post.addImages(imageData)
			}
		}
		const fullPostData = await fullPost(post.id)
		return res.status(201).json(fullPostData)
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
		const post = await existsPost({ id: PostId })
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
		const post = await existsPost({ id: postId })
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
		const post = await existsPost({ id: postId })
		if (!post)
			return res.status(403).json({ message: '게시글이 존재하지 않습니다.' })
		await post.removeLikers(req.user.id)
		return res.status(200).json({ PostId: post.id, UserId: req.user.id })
	} catch (error) {
		console.error(error)
		next(error)
	}
}

//* post 삭제
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

//* image 업로드
export const imageUploadService = (req, res) =>
	res.status(200).json(req.files.map(v => v.filename))

//* 리트윗
export const retweetService = async (req, res, next) => {
	try {
		const { id } = req.user
		const post = await retweetPost(req.params.postId)
		if (!post)
			return res.status(403).json({ message: '존재하지 않는 게시글입니다.' })
		if (id === post.UserId || (post.Retweet && post.Retweet.UserId === id))
			return res
				.status(403)
				.json({ message: '자신의 글을 리트윗할 수 없습니다.' })
		const retweetTargetId = post.RetweetId || post.id
		const exPost = await existsPost({ UserId: id, RetweetId: retweetTargetId })
		if (exPost) return res.status(403).json({ message: '이미 리트윗했습니다.' })
		const retweet = await createPost({
			UserId: id,
			RetweetId: retweetTargetId,
			content: 'retweet'
		})
		const retweetWithPrevPost = await retweetFullPost(retweet.id)
		return res.status(201).json(retweetWithPrevPost)
	} catch (error) {
		console.error(error.message)
		next(error)
	}
}
