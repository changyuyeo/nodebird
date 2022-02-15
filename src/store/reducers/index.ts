import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'

import userReducers from '@store/reducers/user'
import postReducers from '@store/reducers/post'

const rootReducer = combineReducers({
	index: (state = {}, action) => {
		switch (action.type) {
			case HYDRATE:
				return { ...(state as {}), ...action.payload }
			default:
				return state
		}
	},
	user: userReducers,
	post: postReducers
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
