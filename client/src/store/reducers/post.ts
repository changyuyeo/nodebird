import { AnyAction } from 'redux'
import produce from 'immer'

import * as actions from '@store/actions/actionTypes/post'
import { PostState } from '@typings/reduxState'

const initialState: PostState = {
	loadPostsLoading: false,
	loadPostsDone: false,
	loadPostsError: null,
	addPostLoading: false,
	addPostDone: false,
	addPostError: null,
	addCommentLoading: false,
	addCommentDone: false,
	addCommentError: null,
	removePostLoading: false,
	removePostDone: false,
	removePostError: null,
	likePostLoading: false,
	likePostDone: false,
	likePostError: null,
	unLikePostLoading: false,
	unLikePostDone: false,
	unLikePostError: null,
	uploadImagesLoading: false,
	uploadImagesDone: false,
	uploadImagesError: null,
	retweetLoading: false,
	retweetDone: false,
	retweetError: null,
	mainPosts: [],
	singlePost: null,
	imagePaths: [],
	hasMorePost: true
}

const postReducer = (state = initialState, action: AnyAction) =>
	produce(state, draft => {
		switch (action.type) {
			//* LOAD_POSTS
			case actions.LOAD_POSTS_REQUEST:
			case actions.LOAD_USER_POSTS_REQUEST:
			case actions.LOAD_HASHTAG_POSTS_REQUEST:
				draft.loadPostsLoading = true
				draft.loadPostsDone = false
				draft.loadPostsError = null
				break
			case actions.LOAD_POSTS_SUCCESS:
			case actions.LOAD_USER_POSTS_SUCCESS:
			case actions.LOAD_HASHTAG_POSTS_SUCCESS:
				draft.loadPostsLoading = false
				draft.loadPostsDone = true
				draft.mainPosts = draft.mainPosts.concat(action.data)
				draft.hasMorePost = action.data.length === 10
				break
			case actions.LOAD_POSTS_FAILURE:
			case actions.LOAD_USER_POSTS_FAILURE:
			case actions.LOAD_HASHTAG_POSTS_FAILURE:
				draft.loadPostsLoading = false
				draft.loadPostsError = action.error
				break
			//* LOAD_POST
			case actions.LOAD_POST_REQUEST:
				draft.loadPostsLoading = true
				draft.loadPostsDone = false
				draft.loadPostsError = null
				break
			case actions.LOAD_POST_SUCCESS:
				draft.loadPostsLoading = false
				draft.loadPostsDone = true
				draft.singlePost = action.data
				break
			case actions.LOAD_POST_FAILURE:
				draft.loadPostsLoading = false
				draft.loadPostsError = action.error
				break
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
				draft.imagePaths = []
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
			case actions.ADD_COMMENT_SUCCESS: {
				console.log(action.data)
				draft.addCommentLoading = false
				draft.addCommentDone = true
				const post = draft.mainPosts.find(v => v.id === action.data.PostId)
				post && post.Comments.unshift(action.data)
				break
			}
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
				draft.mainPosts = draft.mainPosts.filter(
					v => v.id !== action.data.PostId
				)
				break
			case actions.REMOVE_POST_FAILURE:
				draft.removePostLoading = false
				draft.removePostError = action.error
				break
			//* LIKE_POST
			case actions.LIKE_POST_REQUEST:
				draft.likePostLoading = true
				draft.likePostDone = false
				draft.likePostError = null
				break
			case actions.LIKE_POST_SUCCESS: {
				draft.likePostLoading = false
				draft.likePostDone = true
				const post = draft.mainPosts.find(v => v.id === action.data.PostId)
				post && post.Likers.push({ id: action.data.UserId })
				break
			}
			case actions.LIKE_POST_FAILURE:
				draft.likePostLoading = false
				draft.likePostError = action.error
				break
			//* UN_LIKE_POST
			case actions.UNLIKE_POST_REQUEST:
				draft.unLikePostLoading = true
				draft.unLikePostDone = false
				draft.unLikePostError = null
				break
			case actions.UN_LIKE_POST_SUCCESS:
				{
					draft.unLikePostLoading = false
					draft.unLikePostDone = true
					const post = draft.mainPosts.find(v => v.id === action.data.PostId)
					post &&
						(post.Likers = post.Likers.filter(v => v.id !== action.data.UserId))
				}
				break
			case actions.UN_LIKE_POST_FAILURE:
				draft.unLikePostLoading = false
				draft.unLikePostError = action.error
				break
			//* UPLOAD_IMAGES
			case actions.UPLOAD_IMAGES_REQUEST:
				draft.uploadImagesLoading = true
				draft.uploadImagesDone = false
				draft.uploadImagesError = null
				break
			case actions.UPLOAD_IMAGES_SUCCESS:
				draft.uploadImagesLoading = false
				draft.uploadImagesDone = true
				draft.imagePaths = action.data
				break
			case actions.UPLOAD_IMAGES_FAILURE:
				draft.uploadImagesLoading = false
				draft.uploadImagesError = action.error
				break
			//* RETWEET
			case actions.RETWEET_REQUEST:
				draft.retweetLoading = true
				draft.retweetDone = false
				draft.retweetError = null
				break
			case actions.RETWEET_SUCCESS:
				draft.retweetLoading = false
				draft.retweetDone = true
				draft.mainPosts.unshift(action.data)
				break
			case actions.RETWEET_FAILURE:
				draft.retweetLoading = false
				draft.retweetError = action.error
				break
			//* REMOVE_IMAGE
			case actions.REMOVE_IMAGE:
				draft.imagePaths = draft.imagePaths.filter((_, i) => i !== action.data)
				break
			default:
				break
		}
	})

export default postReducer
