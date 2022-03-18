import { LoginAPIBody, SignUpAPIBody } from '@lib/api/user'
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

export const followAction = (payload: any) => ({
	type: actions.FOLLOW_REQUEST,
	payload
})

export const unfollowAction = (payload: any) => ({
	type: actions.UNFOLLOW_REQUEST,
	payload
})

export type signUpActionType = ReturnType<typeof signUpAction>
export type logInActionType = ReturnType<typeof logInAction>
export type logOutActionType = ReturnType<typeof logOutAction>
export type followActionType = ReturnType<typeof followAction>
export type unfollowActionType = ReturnType<typeof unfollowAction>
