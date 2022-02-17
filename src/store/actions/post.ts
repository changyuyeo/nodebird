import * as actions from '@store/actions/actionTypes/post'

interface IPostData {
	text: string
}

interface ICommentData {
	content: string
	postId: number | string
	userId: number | string
}

export const addPostAction = (data: IPostData) => ({
	type: actions.ADD_POST_REQUEST,
	data
})

export const addCommentAction = (data: ICommentData) => ({
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
