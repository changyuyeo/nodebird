import db from '../../models/index.js'

//* db에 해당 게시글 있는지 검사
export const existsPost = async id => await db.Post.findOne({ where: { id } })

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

//* 댓글 생성
export const createComment = async data => await db.Post.create({ ...data })
