import bcrypt from 'bcrypt'
import passport from 'passport'

import {
	changeNicknameUser,
	createUser,
	existsUser,
	fullUserWithoutPassword
} from './repository.js'

//* 내정보 불러오기
export const myInfoLoadService = async (req, res, next) => {
	try {
		let user
		req.user
			? (user = await fullUserWithoutPassword(req.user.id))
			: (user = null)
		return res.status(200).json(user)
	} catch (error) {
		console.error(error.message)
		next(error)
	}
}

//* 유저정보 불러오기
export const userLoadService = async (req, res, next) => {
	try {
		const user = await fullUserWithoutPassword(req.params.userId)
		if (user) {
			user.Posts = user.Posts.length
			user.Followings = user.Followings.length
			user.Followers = user.Followers.length
			res.status(200).json(user)
		} else {
			res.status(404).json({ message: '존재하지 않는 사용자입니다.' })
		}
	} catch (error) {
		console.error(error.message)
		next(error)
	}
}

//* user 회원가입
export const signUpService = async (req, res, next) => {
	try {
		const { email, nickname, password } = req.body
		const exUser = await existsUser({ email })
		if (exUser)
			return res.status(403).json({ message: '이미 사용중인 아이디입니다.' })
		const hashedPassword = await bcrypt.hash(password, 10)
		await createUser({ email, nickname, password: hashedPassword })
		return res.status(201).json({ success: true })
	} catch (error) {
		console.error(error.message)
		next(error)
	}
}

//* user 로그인
export const logInService = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err)
		if (info) return res.status(401).json({ message: info })
		return req.login(user, async loginErr => {
			const userData = await fullUserWithoutPassword(user.id)
			return loginErr ? next(loginErr) : res.status(200).json(userData)
		})
	})(req, res, next)
}

//* user 로그아웃
export const logOutService = (req, res) => {
	req.logout()
	req.session.destroy()
	return res.status(200).json({ message: 'success' })
}

//* user 닉네임변경
export const changeNicknameService = async (req, res, next) => {
	try {
		const { nickname } = req.body
		await changeNicknameUser(nickname, req.user.id)
		return res.status(200).json({ nickname })
	} catch (error) {
		console.error(error.message)
		next(error)
	}
}

//* user 팔로우
export const followService = async (req, res, next) => {
	try {
		const user = await existsUser({ id: req.params.userId })
		if (!user)
			return res.status(403).json({ message: '유저가 존재하지 않습니다.' })
		await user.addFollowers(req.user.id)
		return res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
	} catch (error) {
		console.error(error)
		next(error)
	}
}

//* user 언팔로우
export const unFollowService = async (req, res, next) => {
	try {
		const user = await existsUser({ id: req.params.userId })
		if (!user)
			return res.status(403).json({ message: '유저가 존재하지 않습니다.' })
		await user.removeFollowers(req.user.id)
		return res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
	} catch (error) {
		console.error(error)
		next(error)
	}
}

//* followers 불러오기
export const loadFollowersService = async (req, res, next) => {
	try {
		const limit = parseInt(req.query.limit, 10)
		const user = await existsUser({ id: req.user.id })
		if (!user)
			return res.status(403).json({ message: '유저가 존재하지 않습니다.' })
		const followers = await user.getFollowers({ limit })
		return res.status(200).json(followers)
	} catch (error) {
		console.error(error)
		next(error)
	}
}

//* followings 불러오기
export const loadFollowingsService = async (req, res, next) => {
	try {
		const limit = parseInt(req.query.limit, 10)
		const user = await existsUser({ id: req.user.id })
		if (!user)
			return res.status(403).json({ message: '유저가 존재하지 않습니다.' })
		const followings = await user.getFollowings({ limit })
		return res.status(200).json(followings)
	} catch (error) {
		console.error(error)
		next(error)
	}
}

//* follower 차단
export const removeFollowerService = async (req, res, next) => {
	try {
		const user = await existsUser({ id: req.params.userId })
		if (!user)
			return res.status(403).json({ message: '유저가 존재하지 않습니다.' })
		await user.removeFollowings(req.user.id)
		return res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
	} catch (error) {
		console.error(error)
		next(error)
	}
}
