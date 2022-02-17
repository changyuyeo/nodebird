import * as actions from '@store/actions/actionTypes/user'

export interface ILoginData {
	email: string
	password: string
}

export interface ISignUpData extends ILoginData {
	nickname: string
}

export interface IUserData {
	nickname: string
}

export const logInAction = (data: ILoginData) => ({
	type: actions.LOG_IN_REQUEST,
	data
})

export const logOutAction = () => ({
	type: actions.LOG_OUT_REQUEST
})

export const signUpAction = (data: ISignUpData) => ({
	type: actions.SIGN_UP_REQUEST,
	data
})

export const followAction = (data: string) => ({
	type: actions.FOLLOW_REQUEST,
	data
})

export const unfollowAction = (data: string) => ({
	type: actions.UNFOLLOW_REQUEST,
	data
})
