import { AnyAction } from 'redux'
import produce from 'immer'

import * as actions from '@store/actions/actionTypes/user'
import { UserState } from '@typings/reduxState'

const initialState: UserState = {
	loadMyInfoLoading: false,
	loadMyInfoDone: false,
	loadMyInfoError: null,
	signUpLoading: false,
	signUpDone: false,
	signUpError: null,
	logInLoading: false,
	logInDone: false,
	logInError: null,
	logOutLoading: false,
	logOutDone: false,
	logOutError: null,
	changeNicknameLoading: false,
	changeNicknameDone: false,
	changeNicknameError: null,
	followLoading: false,
	followDone: false,
	followError: null,
	unfollowLoading: false,
	unfollowDone: false,
	unfollowError: null,
	loadFollowingsLoading: false,
	loadFollowingsDone: false,
	loadFollowingsError: null,
	loadFollowersLoading: false,
	loadFollowersDone: false,
	loadFollowersError: null,
	removeFollowerLoading: false,
	removeFollowerDone: false,
	removeFollowerError: null,
	loadUserLoading: false,
	loadUserDone: false,
	loadUserError: null,
	me: null,
	userInfo: null
}

const userReducers = (state = initialState, action: AnyAction) =>
	produce(state, draft => {
		switch (action.type) {
			//* LOAD_USER
			case actions.LOAD_MY_INFO_REQUEST:
				draft.loadMyInfoLoading = true
				draft.loadMyInfoDone = false
				draft.loadMyInfoError = null
				break
			case actions.LOAD_MY_INFO_SUCCESS:
				draft.loadMyInfoLoading = false
				draft.loadMyInfoDone = true
				draft.me = action.data
				break
			case actions.LOAD_MY_INFO_FAILURE:
				draft.loadMyInfoLoading = false
				draft.loadMyInfoError = action.error
				break
			//* SIGN_UP
			case actions.SIGN_UP_REQUEST:
				draft.signUpLoading = true
				draft.signUpDone = false
				draft.signUpError = null
				break
			case actions.SIGN_UP_SUCCESS:
				draft.signUpLoading = false
				draft.signUpDone = true
				break
			case actions.SIGN_UP_FAILURE:
				draft.signUpLoading = false
				draft.signUpError = action.error
				break
			//* LOG_IN
			case actions.LOG_IN_REQUEST:
				draft.logInLoading = true
				draft.logInDone = false
				draft.logInError = null
				break
			case actions.LOG_IN_SUCCESS:
				draft.logInLoading = false
				draft.logInDone = true
				draft.me = action.data
				break
			case actions.LOG_IN_FAILURE:
				draft.logInLoading = false
				draft.logInError = action.error
				break
			//* LOG_OUT
			case actions.LOG_OUT_REQUEST:
				draft.logOutLoading = true
				draft.logOutDone = false
				draft.logOutError = null
				break
			case actions.LOG_OUT_SUCCESS:
				draft.logOutLoading = false
				draft.logOutDone = true
				draft.me = null
				break
			case actions.LOG_OUT_FAILURE:
				draft.logOutLoading = false
				draft.logOutError = action.error
				break
			//* CHANGE_NICKNAME
			case actions.CHANGE_NICKNAME_REQUEST:
				draft.changeNicknameLoading = true
				draft.changeNicknameDone = false
				draft.changeNicknameError = null
				break
			case actions.CHANGE_NICKNAME_SUCCESS:
				draft.changeNicknameLoading = false
				draft.changeNicknameDone = true
				draft.me && (draft.me.nickname = action.data.nickname)
				break
			case actions.CHANGE_NICKNAME_FAILURE:
				draft.changeNicknameLoading = false
				draft.changeNicknameError = action.error
				break
			//* FOLLOW
			case actions.FOLLOW_REQUEST:
				draft.followLoading = true
				draft.followDone = false
				draft.followError = null
				break
			case actions.FOLLOW_SUCCESS:
				draft.followLoading = false
				draft.followDone = true
				draft.me && draft.me.Followings?.push({ id: action.data.UserId })
				break
			case actions.FOLLOW_FAILURE:
				draft.followLoading = false
				draft.followError = action.error
				break
			//* UNFOLLOW
			case actions.UNFOLLOW_REQUEST:
				draft.unfollowLoading = true
				draft.unfollowDone = false
				draft.unfollowError = null
				break
			case actions.UNFOLLOW_SUCCESS:
				draft.unfollowLoading = false
				draft.unfollowDone = true
				draft.me &&
					(draft.me.Followings = draft.me.Followings?.filter(
						v => v.id !== action.data.UserId
					))
				break
			case actions.UNFOLLOW_FAILURE:
				draft.unfollowLoading = false
				draft.unfollowError = action.error
				break
			//* LOAD_FOLLOWERS
			case actions.LOAD_FOLLOWERS_REQUEST:
				draft.loadFollowersLoading = true
				draft.loadFollowersDone = false
				draft.loadFollowersError = null
				break
			case actions.LOAD_FOLLOWERS_SUCCESS:
				draft.loadFollowersLoading = false
				draft.loadFollowersDone = true
				draft.me && (draft.me.Followers = action.data)
				break
			case actions.LOAD_FOLLOWERS_FAILURE:
				draft.loadFollowersLoading = false
				draft.loadFollowersError = action.error
				break
			//* LOAD_FOLLOWINGS
			case actions.LOAD_FOLLOWINGS_REQUEST:
				draft.loadFollowingsLoading = true
				draft.loadFollowingsDone = false
				draft.loadFollowingsError = null
				break
			case actions.LOAD_FOLLOWINGS_SUCCESS:
				draft.loadFollowingsLoading = false
				draft.loadFollowingsDone = true
				draft.me && (draft.me.Followings = action.data)
				break
			case actions.LOAD_FOLLOWINGS_FAILURE:
				draft.loadFollowingsLoading = false
				draft.loadFollowingsError = action.error
				break
			//* REMOVE_FOLLOWER
			case actions.REMOVE_FOLLOWER_REQUEST:
				draft.removeFollowerLoading = true
				draft.removeFollowerDone = false
				draft.removeFollowerError = null
				break
			case actions.REMOVE_FOLLOWER_SUCCESS:
				draft.removeFollowerLoading = false
				draft.removeFollowerDone = true
				draft.me &&
					(draft.me.Followers = draft.me.Followers?.filter(
						v => v.id !== action.data.UserId
					))
				break
			case actions.REMOVE_FOLLOWER_FAILURE:
				draft.removeFollowerLoading = false
				draft.removeFollowerError = action.error
				break
			//* LOAD_USER
			case actions.LOAD_USER_REQUEST:
				draft.loadUserLoading = true
				draft.loadUserDone = false
				draft.loadUserError = null
				break
			case actions.LOAD_USER_SUCCESS:
				draft.loadUserLoading = false
				draft.loadUserDone = true
				draft.userInfo = action.data
				break
			case actions.LOAD_USER_FAILURE:
				draft.loadUserLoading = false
				draft.loadUserError = action.error
				break
			//* POST_ME
			case actions.ADD_POST_TO_ME:
				draft.me && draft.me.Posts?.unshift({ id: action.data })
				break
			case actions.REMOVE_POST_OF_ME:
				draft.me &&
					(draft.me.Posts = draft.me.Posts?.filter(
						v => v.id !== action.data.PostId
					))
				break
			default:
				break
		}
	})

export default userReducers
