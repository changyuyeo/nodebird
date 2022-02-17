import { all, delay, fork, put, takeLatest } from 'redux-saga/effects'

import * as userActions from '@store/actions/actionTypes/user'
import * as postActions from '@store/actions/actionTypes/post'

import shortId from 'shortid'
import { generateDummyPost } from '@store/reducers/post'

function* addPost(action: any) {
	const id = shortId.generate()
	try {
		yield delay(1000)
		yield put({
			type: postActions.ADD_POST_SUCCESS,
			data: { id, content: action.data }
		})
		yield put({
			type: userActions.ADD_POST_TO_ME,
			data: id
		})
	} catch (error: any) {
		yield put({
			type: postActions.ADD_POST_FAILURE,
			error: error.response.data
		})
	}
}

function* addComment(action: any) {
	try {
		yield delay(1000)
		yield put({
			type: postActions.ADD_COMMENT_SUCCESS,
			data: action.data
		})
	} catch (error: any) {
		yield put({
			type: postActions.ADD_COMMENT_FAILURE,
			error: error.response.data
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
	} catch (error: any) {
		yield put({
			type: postActions.REMOVE_POST_FAILURE,
			error: error.response.data
		})
	}
}

function* loadPost() {
	try {
		yield delay(2000)
		yield put({
			type: postActions.LOAD_POSTS_SUCCESS,
			data: generateDummyPost(10)
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
