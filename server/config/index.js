import dotenv from 'dotenv'

dotenv.config()

export const { COOKIE_SECRET, DB_PASSOWRD, ORIGIN, PORT } = process.env
