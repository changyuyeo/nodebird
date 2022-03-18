import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects'

import { loadMyInfoAPI, logInAPI, logOutAPI, signUpAPI } from '@lib/api/user'
import * as actions from '@store/actions/actionTypes/user'
import { logInActionType, signUpActionType } from '@store/actions/user'

interface Error {
	response: {
		data: { message: string }
	}
}

function* loadMyInfo() {
	try {
		const { data } = yield call(loadMyInfoAPI)
		yield put({ type: actions.LOAD_MY_INFO_SUCCESS, data })
	} catch (error) {
		yield put({
			type: actions.LOAD_MY_INFO_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

function* signUp(action: signUpActionType) {
	try {
		yield call(signUpAPI, action.payload)
		yield put({ type: actions.SIGN_UP_SUCCESS })
	} catch (error) {
		yield put({
			type: actions.SIGN_UP_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

function* logIn(action: logInActionType) {
	try {
		const { data } = yield call(logInAPI, action.payload)
		yield put({ type: actions.LOG_IN_SUCCESS, data })
	} catch (error) {
		yield put({
			type: actions.LOG_IN_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

function* logOut() {
	try {
		yield call(logOutAPI)
		yield put({ type: actions.LOG_OUT_SUCCESS })
	} catch (error) {
		yield put({
			type: actions.LOG_OUT_FAILURE,
			error: (error as Error).response.data.message
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
	} catch (error) {
		yield put({
			type: actions.FOLLOW_FAILURE,
			error: (error as Error).response.data
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
	} catch (error) {
		yield put({
			type: actions.UNFOLLOW_FAILURE,
			error: (error as Error).response.data
		})
	}
}

// watch
function* watchLoadMyInfo() {
	yield takeLatest(actions.LOAD_MY_INFO_REQUEST, loadMyInfo)
}

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
		fork(watchLoadMyInfo),
		fork(watchLogIn),
		fork(watchLogOut),
		fork(watchSignUp),
		fork(watchFollow),
		fork(watchUnFollow)
	])
}
