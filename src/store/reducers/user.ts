import { IUserState } from '@store/types/user'
import { UserAction } from '@store/actions/user'
import * as actions from '@store/actions/actionTypes'

const initialState: IUserState = {
	isLoggedIn: false,
	me: null,
	signUpData: null,
	loginData: null
}

const userReducers = (state = initialState, action: UserAction) => {
	switch (action.type) {
		case actions.LOG_IN:
			return {
				...state,
				isLoggedIn: true,
				me: action.data
			}
		case actions.LOG_OUT:
			return {
				...state,
				isLoggedIn: false,
				me: null
			}
		default:
			return state
	}
}

export default userReducers
