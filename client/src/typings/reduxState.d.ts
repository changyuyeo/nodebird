import { UserDataType } from '@typings/user'
import { PostDataType } from '@typings/post'

export interface UserState {
	loadMyInfoLoading: boolean
	loadMyInfoDone: boolean
	loadMyInfoError: string | null
	signUpLoading: boolean
	signUpDone: boolean
	signUpError: string | null
	logInLoading: boolean
	logInDone: boolean
	logInError: string | null
	logOutLoading: boolean
	logOutDone: boolean
	logOutError: string | null
	changeNicknameLoading: boolean
	changeNicknameDone: boolean
	changeNicknameError: string | null
	followLoading: boolean
	followDone: boolean
	followError: string | null
	unfollowLoading: boolean
	unfollowDone: boolean
	unfollowError: string | null
	me: UserDataType | null
}

export interface PostState {
	loadPostsLoading: boolean
	loadPostsDone: boolean
	loadPostsError: string | null
	addPostLoading: boolean
	addPostDone: boolean
	addPostError: string | null
	removePostLoading: boolean
	removePostDone: boolean
	removePostError: string | null
	addCommentLoading: boolean
	addCommentDone: boolean
	addCommentError: string | null
	mainPosts: PostDataType[]
	imagePaths: string[]
	hasMorePost: boolean
}
