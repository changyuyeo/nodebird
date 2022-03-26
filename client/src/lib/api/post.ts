import { AxiosPromise } from 'axios'
import { post, posts } from '@lib/api'
import { CommentDataType, LikePostDataType, PostDataType } from '@typings/post'

export interface LoadUserPostsAPIBody {
	lastId?: number
	userId: number
}

export interface LoadHashtagPostsAPIBody {
	lastId?: number
	hashtag: string
}

export interface AddCommentAPIBody {
	content: string
	postId: number
	userId: number
}

export const loadPostsAPI = (postId?: number): AxiosPromise<PostDataType[]> =>
	posts.get(`/?lastId=${postId || 0}`)

export const loadUserPostsAPI = (
	data: LoadUserPostsAPIBody
): AxiosPromise<PostDataType[]> =>
	posts.get(`/user/${data.userId}?lastId=${data.lastId || 0}`)

export const loadHashtagPostsAPI = (data: LoadHashtagPostsAPIBody) =>
	posts.get(
		`/hashtag/${encodeURIComponent(data.hashtag)}?lastId=${data.lastId || 0}`
	)

export const loadPostAPI = (postId: number): AxiosPromise<PostDataType> =>
	post.get(`/${postId}`)

export const addPostAPI = (data: FormData): AxiosPromise<PostDataType> =>
	post.post('/', data)

export const addCommentAPI = (
	data: AddCommentAPIBody
): AxiosPromise<CommentDataType> => post.post(`/${data.postId}/comment`, data)

export const likePostAPI = (postId: number): AxiosPromise<LikePostDataType> =>
	post.patch(`/${postId}/like`)

export const unLikePostAPI = (postId: number): AxiosPromise<LikePostDataType> =>
	post.delete(`/${postId}/like`)

export const removePostAPI = (postId: number) => post.delete(`/${postId}`)

export const uploadImagesAPI = (data: FormData) => post.post('/images', data)

export const retweetAPI = (postId: number) => post.post(`/${postId}/retweet`)
