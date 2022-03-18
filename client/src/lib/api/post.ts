import { post } from '@lib/api'
import { PostDataType } from '@typings/post'
import { AxiosPromise } from 'axios'

export interface addPostAPIBody {
	content: string
}

export interface addCommentAPIBody {
	content: string
	postId: string
	userId: number
}

export const addPostAPI = (data: addPostAPIBody): AxiosPromise<PostDataType> =>
	post.post('/', data)

export const addCommentAPI = (data: addCommentAPIBody) =>
	post.post(`/post/${data.postId}/comment`, data)
