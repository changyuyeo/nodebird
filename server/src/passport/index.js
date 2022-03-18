import passport from 'passport'

import local from './local.js'
import { existsUser } from '../routes/user/repository.js'

export default () => {
	passport.serializeUser((user, done) => done(null, user.id))

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await existsUser({ id })
			done(null, user)
		} catch (error) {
			console.error(error)
			done(error)
		}
	})

	local()
}
