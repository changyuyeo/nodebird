import { DB_PASSOWRD } from './index.js'

export default {
	development: {
		username: 'root',
		password: DB_PASSOWRD,
		database: 'react-nodebird',
		host: '127.0.0.1',
		dialect: 'mysql'
	},
	test: {
		username: 'root',
		password: DB_PASSOWRD,
		database: 'react-nodebird',
		host: '127.0.0.1',
		dialect: 'mysql'
	},
	production: {
		username: 'root',
		password: DB_PASSOWRD,
		database: 'react-nodebird',
		host: '127.0.0.1',
		dialect: 'mysql'
	}
}
