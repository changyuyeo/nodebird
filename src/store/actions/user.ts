import { ILoginData } from '@store/types/user'
import * as actions from '@store/actions/actionTypes'

export const logInAction = (data: ILoginData) => ({
	type: actions.LOG_IN,
	data
})

export const logOutAction = () => ({
	type: actions.LOG_OUT
})

export type UserAction =
	| ReturnType<typeof logInAction>
	| ReturnType<typeof logOutAction>
