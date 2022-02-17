import { all, delay, fork, put, takeLatest } from 'redux-saga/effects'

import * as actions from '@store/actions/actionTypes/user'

function* logIn() {
	try {
		yield delay(1000)
		yield put({
			type: actions.LOG_IN_SUCCESS,
			data: { email: 'test@test.com', nickname: '제봉' }
		})
	} catch (error: any) {
		yield put({
			type: actions.LOG_IN_FAILURE,
			error: error.response.data
		})
	}
}

function* logOut() {
	try {
		yield delay(1000)
		yield put({ type: actions.LOG_OUT_SUCCESS })
	} catch (error: any) {
		yield put({
			type: actions.LOG_OUT_FAILURE,
			error: error.response.data
		})
	}
}

function* signUp() {
	try {
		yield delay(1000)
		yield put({ type: actions.SIGN_UP_SUCCESS })
	} catch (error: any) {
		yield put({
			type: actions.SIGN_UP_FAILURE,
			error: error.response.data
		})
	}
}

function* follow(action: any) {
	try {
		yield delay(1000)
		yield put({
			type: actions.FOLLOW_SUCCESS,
			data: action.data
		})
	} catch (error: any) {
		yield put({
			type: actions.FOLLOW_FAILURE,
			error: error.response.data
		})
	}
}

function* unFollow(action: any) {
	try {
		yield delay(1000)
		yield put({
			type: actions.UNFOLLOW_SUCCESS,
			data: action.data
		})
	} catch (error: any) {
		yield put({
			type: actions.UNFOLLOW_FAILURE,
			error: error.response.data
		})
	}
}

// watch
function* watchLogIn() {
	yield takeLatest(actions.LOG_IN_REQUEST, logIn)
}

function* watchLogOut() {
	yield takeLatest(actions.LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
	yield takeLatest(actions.SIGN_UP_REQUEST, signUp)
}

function* watchFollow() {
	yield takeLatest(actions.FOLLOW_REQUEST, follow)
}

function* watchUnFollow() {
	yield takeLatest(actions.UNFOLLOW_REQUEST, unFollow)
}

export default function* userSaga() {
	yield all([
		fork(watchLogIn),
		fork(watchLogOut),
		fork(watchSignUp),
		fork(watchFollow),
		fork(watchUnFollow)
	])
}
