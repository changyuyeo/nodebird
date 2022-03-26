import axios from 'axios'

// export const BASE_URL = 'http://localhost:8000' as const
export const BASE_URL = 'http://3.38.93.153/' as const

const instance = (url: string) =>
	axios.create({
		baseURL: `${BASE_URL}/${url}`,
		withCredentials: true
	})

export const post = instance('post')
export const posts = instance('posts')
export const user = instance('user')
