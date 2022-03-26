import { all, call, fork, put, takeLatest } from 'redux-saga/effects'

import * as apis from '@lib/api/user'
import * as actions from '@store/actions/actionTypes/user'
import * as types from '@store/actions/user'

interface Error {
	response: {
		data: { message: string }
	}
}

function* loadMyInfo() {
	try {
		const { data } = yield call(apis.loadMyInfoAPI)
		yield put({ type: actions.LOAD_MY_INFO_SUCCESS, data })
	} catch (error) {
		yield put({
			type: actions.LOAD_MY_INFO_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

function* logIn(action: types.LogInActionType) {
	try {
		const { data } = yield call(apis.logInAPI, action.payload)
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
		yield call(apis.logOutAPI)
		yield put({ type: actions.LOG_OUT_SUCCESS })
	} catch (error) {
		yield put({
			type: actions.LOG_OUT_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

function* signUp(action: types.SignUpActionType) {
	try {
		yield call(apis.signUpAPI, action.payload)
		yield put({ type: actions.SIGN_UP_SUCCESS })
	} catch (error) {
		yield put({
			type: actions.SIGN_UP_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

function* changeNickname(action: types.ChangeNicknameActionType) {
	try {
		const { data } = yield call(apis.changeNicknameAPI, action.payload)
		yield put({ type: actions.CHANGE_NICKNAME_SUCCESS, data })
	} catch (error) {
		yield put({
			type: actions.CHANGE_NICKNAME_FAILURE,
			error: (error as Error).response.data.message
		})
	}
}

function* follow(action: types.FollowActionType) {
	try {
		const { data } = yield call(apis.followAPI, action.payload)
		yield put({ type: actions.FOLLOW_SUCCESS, data })
	} catch (error) {
		yield put({
			type: actions.FOLLOW_FAILURE,
			error: (error as Error).response.data
		})
	}
}

function* unFollow(action: types.UnfollowActionType) {
	try {
		const { data } = yield call(apis.unFollowAPI, action.payload)
		yield put({ type: actions.UNFOLLOW_SUCCESS, data })
	} catch (error) {
		yield put({
			type: actions.UNFOLLOW_FAILURE,
			error: (error as Error).response.data
		})
	}
}

function* loadFollowers(action: types.LoadFollowersActionType) {
	try {
		const { data } = yield call(apis.loadFollowersAPI, action.data)
		yield put({ type: actions.LOAD_FOLLOWERS_SUCCESS, data })
	} catch (error) {
		yield put({
			type: actions.LOAD_FOLLOWERS_SUCCESS,
			error: (error as Error).response.data
		})
	}
}

function* loadFollowings(action: types.LoadFollowingsActionType) {
	try {
		const { data } = yield call(apis.loadFollowingsAPI, action.data)
		yield put({ type: actions.LOAD_FOLLOWINGS_SUCCESS, data })
	} catch (error) {
		yield put({
			type: actions.LOAD_FOLLOWINGS_FAILURE,
			error: (error as Error).response.data
		})
	}
}

function* removeFollower(action: types.RemoveFollowerActionType) {
	try {
		const { data } = yield call(apis.removeFollowerAPI, action.payload)
		yield put({ type: actions.REMOVE_FOLLOWER_SUCCESS, data })
	} catch (error) {
		yield put({
			type: actions.REMOVE_FOLLOWER_FAILURE,
			error: (error as Error).response.data
		})
	}
}

function* loadUser(action: types.LoadUserActionType) {
	try {
		const { data } = yield call(apis.loadUserAPI, action.data)
		yield put({ type: actions.LOAD_USER_SUCCESS, data })
	} catch (error) {
		yield put({
			type: actions.LOAD_USER_FAILURE,
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

function* watchChangeNickname() {
	yield takeLatest(actions.CHANGE_NICKNAME_REQUEST, changeNickname)
}

function* watchFollow() {
	yield takeLatest(actions.FOLLOW_REQUEST, follow)
}

function* watchUnFollow() {
	yield takeLatest(actions.UNFOLLOW_REQUEST, unFollow)
}

function* watchLoadFollowers() {
	yield takeLatest(actions.LOAD_FOLLOWERS_REQUEST, loadFollowers)
}

function* watchLoadFollowings() {
	yield takeLatest(actions.LOAD_FOLLOWINGS_REQUEST, loadFollowings)
}

function* watchRemoveFollower() {
	yield takeLatest(actions.REMOVE_FOLLOWER_REQUEST, removeFollower)
}

function* watchLoadUser() {
	yield takeLatest(actions.LOAD_USER_REQUEST, loadUser)
}

export default function* userSaga() {
	yield all([
		fork(watchLoadMyInfo),
		fork(watchLogIn),
		fork(watchLogOut),
		fork(watchSignUp),
		fork(watchChangeNickname),
		fork(watchFollow),
		fork(watchUnFollow),
		fork(watchLoadFollowers),
		fork(watchLoadFollowings),
		fork(watchRemoveFollower),
		fork(watchLoadUser)
	])
}
