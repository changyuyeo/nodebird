import { Sequelize } from 'sequelize'

import comment from './comment.js'
import hashtag from './hashtag.js'
import image from './image.js'
import post from './post.js'
import user from './user.js'
import dbConfig from '../../config/config.js'

const env = process.env.NODE_ENV || 'development'
const config = dbConfig[env]
const db = {}

const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
)

db.Comment = comment
db.Hashtag = hashtag
db.Image = image
db.Post = post
db.User = user

Object.keys(db).forEach(modelName => db[modelName].init(sequelize))
Object.keys(db).forEach(
	modelName => db[modelName].associate && db[modelName].associate(db)
)

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
