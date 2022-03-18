import { AnyAction } from 'redux'
import produce from 'immer'

import * as actions from '@store/actions/actionTypes/post'
import { PostState } from '@typings/reduxState'

const initialState: PostState = {
	addPostLoading: false,
	addPostDone: false,
	addPostError: null,
	addCommentLoading: false,
	addCommentDone: false,
	addCommentError: null,
	removePostLoading: false,
	removePostDone: false,
	removePostError: null,
	loadPostsLoading: false,
	loadPostsDone: false,
	loadPostsError: null,
	mainPosts: [],
	imagePaths: [],
	hasMorePost: true
}

const postReducer = (state = initialState, action: AnyAction) =>
	produce(state, draft => {
		switch (action.type) {
			//* ADD_POST
			case actions.ADD_POST_REQUEST:
				draft.addPostLoading = true
				draft.addPostDone = false
				draft.addPostError = null
				break
			case actions.ADD_POST_SUCCESS:
				draft.addPostLoading = false
				draft.addPostDone = true
				draft.mainPosts.unshift(action.data)
				break
			case actions.ADD_POST_FAILURE:
				draft.addPostLoading = false
				draft.addPostError = action.error
				break
			//* ADD_COMMENT
			case actions.ADD_COMMENT_REQUEST:
				draft.addCommentLoading = true
				draft.addCommentDone = false
				break
			case actions.ADD_COMMENT_SUCCESS:
				draft.addCommentLoading = false
				draft.addCommentDone = true
				const post = draft.mainPosts.find(v => v.id === action.data.PostId)
				post && post.Comments.unshift(action.data)
				break
			case actions.ADD_COMMENT_FAILURE:
				draft.addCommentLoading = false
				draft.addCommentError = action.error
				break
			//* REMOVE_POST
			case actions.REMOVE_POST_REQUEST:
				draft.removePostLoading = true
				draft.removePostDone = false
				draft.removePostError = null
				break
			case actions.REMOVE_POST_SUCCESS:
				draft.removePostLoading = false
				draft.removePostDone = true
				draft.mainPosts = draft.mainPosts.filter(v => v.id !== action.data)
				break
			case actions.REMOVE_POST_FAILURE:
				draft.removePostLoading = false
				draft.removePostError = action.error
				break
			//* LOAD_POSTS
			case actions.LOAD_POSTS_REQUEST:
				draft.loadPostsLoading = true
				draft.loadPostsDone = false
				draft.loadPostsError = null
				break
			case actions.LOAD_POSTS_SUCCESS:
				draft.loadPostsLoading = false
				draft.loadPostsDone = true
				draft.mainPosts = action.data.concat(draft.mainPosts)
				draft.hasMorePost = draft.mainPosts.length < 50
				break
			case actions.LOAD_POSTS_FAILURE:
				draft.loadPostsLoading = false
				draft.loadPostsError = action.error
				break
			default:
				break
		}
	})

export default postReducer
