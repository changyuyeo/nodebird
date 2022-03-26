import dotenv from 'dotenv'

dotenv.config()

export const { COOKIE_SECRET, DB_PASSWORD, ORIGIN, PORT } = process.env
