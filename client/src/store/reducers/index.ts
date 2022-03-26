import { AnyAction, CombinedState, combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'

import userReducers from '@store/reducers/user'
import postReducers from '@store/reducers/post'
import { PostState, UserState } from '@typings/reduxState'

interface State {
	user: UserState
	post: PostState
}

const rootReducer = (
	state: CombinedState<State>,
	action: AnyAction
): CombinedState<State> => {
	switch (action.type) {
		case HYDRATE:
			return action.payload
		default:
			const combineReducer = combineReducers({
				user: userReducers,
				post: postReducers
			})
			return combineReducer(state, action)
	}
}

// const rootReducer = combineReducers({
// 	index: (state = {}, action) => {
// 		switch (action.type) {
// 			case HYDRATE:
// 				return { ...(state as {}), ...action.payload }
// 			default:
// 				return state
// 		}
// 	},
// 	user: userReducers,
// 	post: postReducers
// })

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
