import bcrypt from 'bcrypt'
import passport from 'passport'

import {
	createUser,
	existsUser,
	fullUserWithoutPassword
} from './repository.js'

//* user 불러오기
export const userLoadService = async (req, res, next) => {
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
