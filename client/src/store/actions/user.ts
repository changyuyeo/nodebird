import {
	ChangeNicknameAPIBody,
	LoginAPIBody,
	SignUpAPIBody
} from '@lib/api/user'
import * as actions from '@store/actions/actionTypes/user'

export const loadMyInfoAction = () => ({ type: actions.LOAD_MY_INFO_REQUEST })

export const signUpAction = (payload: SignUpAPIBody) => ({
	type: actions.SIGN_UP_REQUEST,
	payload
})

export const logInAction = (payload: LoginAPIBody) => ({
	type: actions.LOG_IN_REQUEST,
	payload
})

export const logOutAction = () => ({ type: actions.LOG_OUT_REQUEST })

export const changeNicknameAction = (payload: ChangeNicknameAPIBody) => ({
	type: actions.CHANGE_NICKNAME_REQUEST,
	payload
})

export const followAction = (payload: number) => ({
	type: actions.FOLLOW_REQUEST,
	payload
})

export const unfollowAction = (payload: number) => ({
	type: actions.UNFOLLOW_REQUEST,
	payload
})

export const loadFollowersAction = (data: number) => ({
	type: actions.LOAD_FOLLOWERS_REQUEST,
	data
})

export const loadFollowingsAction = (data: number) => ({
	type: actions.LOAD_FOLLOWINGS_REQUEST,
	data
})

export const removeFollowerAction = (payload: number) => ({
	type: actions.REMOVE_FOLLOWER_REQUEST,
	payload
})

export const loadUserAction = (data: number) => ({
	type: actions.LOAD_USER_REQUEST,
	data
})

export type SignUpActionType = ReturnType<typeof signUpAction>
export type LogInActionType = ReturnType<typeof logInAction>
export type LogOutActionType = ReturnType<typeof logOutAction>
export type ChangeNicknameActionType = ReturnType<typeof changeNicknameAction>
export type FollowActionType = ReturnType<typeof followAction>
export type UnfollowActionType = ReturnType<typeof unfollowAction>
export type LoadFollowersActionType = ReturnType<typeof loadFollowersAction>
export type LoadFollowingsActionType = ReturnType<typeof loadFollowingsAction>
export type RemoveFollowerActionType = ReturnType<typeof removeFollowerAction>
export type LoadUserActionType = ReturnType<typeof loadUserAction>
