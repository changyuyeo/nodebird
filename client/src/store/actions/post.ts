import { addPostAPIBody, addCommentAPIBody } from '@lib/api/post'
import * as actions from '@store/actions/actionTypes/post'

export const addPostAction = (data: addPostAPIBody) => ({
	type: actions.ADD_POST_REQUEST,
	data
})

export const addCommentAction = (data: addCommentAPIBody) => ({
	type: actions.ADD_COMMENT_REQUEST,
	data
})

export const removePostAction = (data: any) => ({
	type: actions.REMOVE_POST_REQUEST,
	data
})

export const loadPostAction = () => ({
	type: actions.LOAD_POSTS_REQUEST
})

export type addPostActionType = ReturnType<typeof addPostAction>
export type addCommentActionType = ReturnType<typeof addCommentAction>
