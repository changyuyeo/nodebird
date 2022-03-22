import { addCommentAPIBody } from '@lib/api/post'
import * as actions from '@store/actions/actionTypes/post'

export const loadPostAction = (data?: number) => ({
	type: actions.LOAD_POSTS_REQUEST,
	data
})

export const addPostAction = (payload: FormData) => ({
	type: actions.ADD_POST_REQUEST,
	payload
})

export const addCommentAction = (payload: addCommentAPIBody) => ({
	type: actions.ADD_COMMENT_REQUEST,
	payload
})

export const removePostAction = (payload: number) => ({
	type: actions.REMOVE_POST_REQUEST,
	payload
})

export const likePostAction = (payload: number) => ({
	type: actions.LIKE_POST_REQUEST,
	payload
})

export const unLikePostAction = (payload: number) => ({
	type: actions.UNLIKE_POST_REQUEST,
	payload
})

export const uploadImagesAction = (payload: FormData) => ({
	type: actions.UPLOAD_IMAGES_REQUEST,
	payload
})

export const removeImageAction = (data: number) => ({
	type: actions.REMOVE_IMAGE,
	data
})

export const retweetAction = (data: number) => ({
	type: actions.RETWEET_REQUEST,
	data
})

export type LoadPostActionType = ReturnType<typeof loadPostAction>
export type AddPostActionType = ReturnType<typeof addPostAction>
export type AddCommentActionType = ReturnType<typeof addCommentAction>
export type RemovePostActionType = ReturnType<typeof removePostAction>
export type LikePostActionType = ReturnType<typeof likePostAction>
export type UnLikePostActionType = ReturnType<typeof unLikePostAction>
export type UploadImagesActionType = ReturnType<typeof uploadImagesAction>
export type RetweetActionType = ReturnType<typeof retweetAction>
