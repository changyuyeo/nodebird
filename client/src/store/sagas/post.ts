import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects'

import * as userActions from '@store/actions/actionTypes/user'
import * as postActions from '@store/actions/actionTypes/post'

import { addCommentAPI, addPostAPI } from '@lib/api/post'
import { addCommentActionType, addPostActionType } from '@store/actions/post'

interface Error {
	response: {
		data: { message: string }
	}
}

function* addPost(action: addPostActionType) {
	try {
		const { data } = yield call(addPostAPI, action.data)
		yield put({ type: postActions.ADD_POST_SUCCESS, data })
		yield put({ type: userActions.ADD_POST_TO_ME, data: data.id })
	} catch (error) {
		yield put({
			type: postActions.ADD_POST_FAILURE,
			error: (error as Error).response.data
		})
	}
}

function* addComment(action: addCommentActionType) {
	try {
		const { data } = yield call(addCommentAPI, action.data)
		yield put({ type: postActions.ADD_COMMENT_SUCCESS, data })
	} catch (error) {
		yield put({
			type: postActions.ADD_COMMENT_FAILURE,
			error: (error as Error).response.data
		})
	}
}

function* removePost(action: any) {
	try {
		yield delay(1000)
		yield put({
			type: postActions.REMOVE_POST_SUCCESS,
			data: action.data
		})
		yield put({
			type: userActions.REMOVE_POST_OF_ME,
			data: action.data
		})
	} catch (error) {
		yield put({
			type: postActions.REMOVE_POST_FAILURE,
			error: (error as Error).response.data
		})
	}
}

function* loadPost() {
	try {
		yield delay(2000)
		yield put({
			type: postActions.LOAD_POSTS_SUCCESS
		})
	} catch (error) {
		yield put({
			type: postActions.LOAD_POSTS_FAILURE
		})
	}
}

//* watch
function* watchAddPost() {
	yield takeLatest(postActions.ADD_POST_REQUEST, addPost)
}

function* watchAddComment() {
	yield takeLatest(postActions.ADD_COMMENT_REQUEST, addComment)
}

function* watchRemovePost() {
	yield takeLatest(postActions.REMOVE_POST_REQUEST, removePost)
}

function* watchLoadPost() {
	yield takeLatest(postActions.LOAD_POSTS_REQUEST, loadPost)
}

export default function* postSaga() {
	yield all([
		fork(watchAddPost),
		fork(watchAddComment),
		fork(watchRemovePost),
		fork(watchLoadPost)
	])
}
