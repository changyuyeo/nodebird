import { all, call, fork, put, takeLatest } from 'redux-saga/effects'

import * as apis from '@lib/api/post'
import * as userActions from '@store/actions/actionTypes/user'
import * as postActions from '@store/actions/actionTypes/post'
import * as types from '@store/actions/post'

interface Error {
	response: {
		data: { message: string }
	}
}

function* loadPost(action: types.LoadPostActionType) {
	try {
		const { data } = yield call(apis.loadPostsAPI, action.data)
		yield put({ type: postActions.LOAD_POSTS_SUCCESS, data })
	} catch (error) {
		yield put({
			type: postActions.LOAD_POSTS_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

function* addPost(action: types.AddPostActionType) {
	try {
		const { data } = yield call(apis.addPostAPI, action.payload)
		yield put({ type: postActions.ADD_POST_SUCCESS, data })
		yield put({ type: userActions.ADD_POST_TO_ME, data: data.id })
	} catch (error) {
		yield put({
			type: postActions.ADD_POST_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

function* addComment(action: types.AddCommentActionType) {
	try {
		const { data } = yield call(apis.addCommentAPI, action.payload)
		yield put({ type: postActions.ADD_COMMENT_SUCCESS, data })
	} catch (error) {
		yield put({
			type: postActions.ADD_COMMENT_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

function* removePost(action: types.RemovePostActionType) {
	try {
		const { data } = yield call(apis.removePostAPI, action.payload)
		yield put({ type: postActions.REMOVE_POST_SUCCESS, data })
		yield put({ type: userActions.REMOVE_POST_OF_ME, data })
	} catch (error) {
		yield put({
			type: postActions.REMOVE_POST_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

function* likePost(action: types.LikePostActionType) {
	try {
		const { data } = yield call(apis.likePostAPI, action.payload)
		yield put({ type: postActions.LIKE_POST_SUCCESS, data })
	} catch (error) {
		yield put({
			type: postActions.LIKE_POST_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

function* unLikePost(action: types.UnLikePostActionType) {
	try {
		const { data } = yield call(apis.unLikePostAPI, action.payload)
		yield put({ type: postActions.UN_LIKE_POST_SUCCESS, data })
	} catch (error) {
		yield put({
			type: postActions.UN_LIKE_POST_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

function* uploadImages(action: types.UploadImagesActionType) {
	try {
		const { data } = yield call(apis.uploadImagesAPI, action.payload)
		yield put({ type: postActions.UPLOAD_IMAGES_SUCCESS, data })
	} catch (error) {
		yield put({
			type: postActions.UPLOAD_IMAGES_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

function* retweet(action: types.RetweetActionType) {
	try {
		const { data } = yield call(apis.retweetAPI, action.data)
		yield put({ type: postActions.RETWEET_SUCCESS, data })
	} catch (error) {
		yield put({
			type: postActions.RETWEET_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

//* watch
function* watchLoadPost() {
	yield takeLatest(postActions.LOAD_POSTS_REQUEST, loadPost)
}

function* watchAddPost() {
	yield takeLatest(postActions.ADD_POST_REQUEST, addPost)
}

function* watchAddComment() {
	yield takeLatest(postActions.ADD_COMMENT_REQUEST, addComment)
}

function* watchRemovePost() {
	yield takeLatest(postActions.REMOVE_POST_REQUEST, removePost)
}

function* watchLikePost() {
	yield takeLatest(postActions.LIKE_POST_REQUEST, likePost)
}

function* watchUnLikePost() {
	yield takeLatest(postActions.UNLIKE_POST_REQUEST, unLikePost)
}

function* watchUploadImages() {
	yield takeLatest(postActions.UPLOAD_IMAGES_REQUEST, uploadImages)
}

function* watchRetweet() {
	yield takeLatest(postActions.RETWEET_REQUEST, retweet)
}

export default function* postSaga() {
	yield all([
		fork(watchLoadPost),
		fork(watchAddPost),
		fork(watchAddComment),
		fork(watchRemovePost),
		fork(watchLikePost),
		fork(watchUnLikePost),
		fork(watchUploadImages),
		fork(watchRetweet)
	])
}
