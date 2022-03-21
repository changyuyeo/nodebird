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

function* loadPost() {
	try {
		const { data } = yield call(apis.loadPostsAPI)
		yield put({ type: postActions.LOAD_POSTS_SUCCESS, data })
	} catch (error) {
		yield put({
			type: postActions.LOAD_POSTS_FAILURE
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
			error: (error as Error).response.data
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
			error: (error as Error).response.data
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
			error: (error as Error).response.data
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
			error: (error as Error).response.data
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
			error: (error as Error).response.data
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

export default function* postSaga() {
	yield all([
		fork(watchLoadPost),
		fork(watchAddPost),
		fork(watchAddComment),
		fork(watchRemovePost),
		fork(watchLikePost),
		fork(watchUnLikePost)
	])
}
