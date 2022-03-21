import db from '../../models/index.js'

//* db에 해당 유저 있는지 검사
export const existsUser = async data => await db.User.findOne({ where: data })

//* 유저 생성
export const createUser = async data => await db.User.create(data)

//* 유저 데이터 가공
export const fullUserWithoutPassword = async id =>
	await db.User.findOne({
		where: { id },
		attributes: ['id', 'nickname'],
		include: [
			{ model: db.Post, attributes: ['id'] },
			{ model: db.User, as: 'Followings', attributes: ['id'] },
			{ model: db.User, as: 'Followers', attributes: ['id'] }
		]
	})

//* 유저 닉네임 변경
export const changeNicknameUser = async (nickname, id) => {
	await db.User.update({ nickname }, { where: { id } })
}
