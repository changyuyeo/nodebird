import { addPostAPIBody, addCommentAPIBody } from '@lib/api/post'
import * as actions from '@store/actions/actionTypes/post'

export const loadPostAction = () => ({ type: actions.LOAD_POSTS_REQUEST })

export const addPostAction = (payload: addPostAPIBody) => ({
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

export type AddPostActionType = ReturnType<typeof addPostAction>
export type AddCommentActionType = ReturnType<typeof addCommentAction>
export type RemovePostActionType = ReturnType<typeof removePostAction>
export type LikePostActionType = ReturnType<typeof likePostAction>
export type UnLikePostActionType = ReturnType<typeof unLikePostAction>
