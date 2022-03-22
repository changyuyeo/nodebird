import db from '../../models/index.js'

//* 게시글 가져오기
export const existsPost = async data => await db.Post.findOne({ where: data })

//* 게시글 모두 가져오기
export const loadAllPost = async where =>
	await db.Post.findAll({
		where,
		limit: 10,
		order: [
			['createdAt', 'DESC'],
			[db.Comment, 'createdAt', 'DESC']
		],
		include: [
			{ model: db.User, attributes: ['id', 'nickname'] },
			{ model: db.Image },
			{
				model: db.Comment,
				include: [{ model: db.User, attributes: ['id', 'nickname'] }]
			},
			{ model: db.User, as: 'Likers', attributes: ['id'] },
			{
				model: db.Post,
				as: 'Retweet',
				include: [
					{ model: db.User, attributes: ['id', 'nickname'] },
					{ model: db.Image }
				]
			}
		]
	})

//* 게시글 생성
export const createPost = async data => await db.Post.create({ ...data })

//* 게시글 데이터 가공
export const fullPost = async id =>
	await db.Post.findOne({
		where: { id },
		include: [
			{ model: db.Image },
			{
				model: db.Comment,
				include: [{ model: db.User, attributes: ['id', 'nickname'] }]
			},
			{ model: db.User, attributes: ['id', 'nickname'] },
			{ model: db.User, as: 'Likers', attributes: ['id'] }
		]
	})

//* 게시글 삭제
export const deletePost = async (id, userId) =>
	await db.Post.destroy({ where: { id, userId } })

//* 댓글 생성
export const createComment = async data => await db.Comment.create({ ...data })

//* 댓글 데이터 가공
export const fullComment = async id =>
	await db.Comment.findOne({
		where: { id },
		include: [{ model: db.User, attributes: ['id', 'nickname'] }]
	})

//* 이미지 저장
export const createImage = async src => await db.Image.create({ src })

//* 해쉬태그 생성
export const createHashtag = async name =>
	await db.Hashtag.findOrCreate({ where: { name } })

//* 게시글 가져오면서 데이터 가공 (리트윗)
export const retweetPost = async id =>
	await db.Post.findOne({
		where: { id },
		include: [{ model: db.Post, as: 'Retweet' }]
	})

//* 게시글 데이터 가공 (리트윗)
export const retweetFullPost = async id =>
	await db.Post.findOne({
		where: { id },
		include: [
			{
				model: db.Post,
				as: 'Retweet',
				include: [
					{ model: db.User, attributes: ['id', 'nickname'] },
					{ model: db.Image }
				]
			},
			{ model: db.User, attributes: ['id', 'nickname'] },
			{ model: db.Image },
			{
				model: db.Comment,
				include: [{ model: db.User, attributes: ['id', 'nickname'] }]
			}
		]
	})
