import { AxiosPromise } from 'axios'
import { post, posts } from '@lib/api'
import { CommentDataType, LikePostDataType, PostDataType } from '@typings/post'

export interface addPostAPIBody {
	content: string
}

export interface addCommentAPIBody {
	content: string
	postId: number
	userId: number
}

export const loadPostsAPI = (): AxiosPromise<PostDataType> => posts.get('/')

export const addPostAPI = (data: addPostAPIBody): AxiosPromise<PostDataType> =>
	post.post('/', data)

export const addCommentAPI = (
	data: addCommentAPIBody
): AxiosPromise<CommentDataType> => post.post(`/${data.postId}/comment`, data)

export const likePostAPI = (postId: number): AxiosPromise<LikePostDataType> =>
	post.patch(`/${postId}/like`)

export const unLikePostAPI = (postId: number): AxiosPromise<LikePostDataType> =>
	post.delete(`/${postId}/like`)

export const removePostAPI = (postId: number) => post.delete(`/${postId}`)
