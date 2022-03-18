import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'

import { existsUser } from '../routes/user/repository.js'

export default () => {
	passport.use(
		new LocalStrategy(
			{ usernameField: 'email', passwordField: 'password' },
			async (email, password, done) => {
				try {
					const user = await existsUser({ email })
					const isPassword = user
						? await bcrypt.compare(password, user.password)
						: false
					return !isPassword
						? done(null, false, '사용자 정보가 일치하지 않습니다!')
						: done(null, user)
				} catch (error) {
					console.error(error)
					return done(error)
				}
			}
		)
	)
}
