import express from 'express'
import session from 'express-session'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import morgan from 'morgan'

import db from './models/index.js'
import passportConfig from './passport/index.js'
import { COOKIE_SECRET, ORIGIN, PORT } from '../config/index.js'
import postRouter from './routes/post/controller.js'
import postsRouter from './routes/posts/controller.js'
import userRouter from './routes/user/controller.js'

class Server {
	constructor() {
		const app = express()
		this.app = app
	}

	setRoute() {
		this.app.use('/post', postRouter)
		this.app.use('/posts', postsRouter)
		this.app.use('/user', userRouter)
	}

	setMiddleware() {
		const sessionConfig = {
			saveUninitialized: false,
			resave: false,
			secret: COOKIE_SECRET
		}
		this.app.use(express.json())
		this.app.use(express.urlencoded({ extended: true }))
		this.app.use(cors({ origin: ORIGIN, credentials: true }))
		this.app.use(cookieParser(COOKIE_SECRET))
		this.app.use(session(sessionConfig))
		this.app.use(passport.initialize())
		this.app.use(passport.session())
		this.app.use(morgan('dev'))
		this.setRoute()
	}

	listen() {
		this.setMiddleware()
		this.app.listen(PORT, () =>
			console.log(`express 서버 시작! http://localhost:${PORT}`)
		)
	}
}

const init = async () => {
	try {
		const server = new Server()
		await db.sequelize.sync()
		console.log('db 연결 성공!')
		passportConfig()
		server.listen()
	} catch (error) {
		console.error(error)
	}
}

init()
