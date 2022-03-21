import axios from 'axios'

const BASE_URL = 'http://localhost:8000' as const

const instance = (url: string) =>
	axios.create({
		baseURL: `${BASE_URL}/${url}`,
		withCredentials: true
	})

export const post = instance('post')
export const posts = instance('posts')
export const user = instance('user')
