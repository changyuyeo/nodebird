import { UserDataType } from '@typings/user'
import { PostDataType } from '@typings/post'
import { type } from 'os'

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
	loadFollowingsLoading: boolean
	loadFollowingsDone: boolean
	loadFollowingsError: string | null
	loadFollowersLoading: boolean
	loadFollowersDone: boolean
	loadFollowersError: string | null
	removeFollowerLoading: boolean
	removeFollowerDone: boolean
	removeFollowerError: string | null
	loadUserLoading: boolean
	loadUserDone: boolean
	loadUserError: string | null
	me: UserDataType | null
	userInfo: UserDataType | null
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
	likePostLoading: boolean
	likePostDone: boolean
	likePostError: string | null
	unLikePostLoading: boolean
	unLikePostDone: boolean
	unLikePostError: string | null
	uploadImagesLoading: boolean
	uploadImagesDone: boolean
	uploadImagesError: string | null
	retweetLoading: boolean
	retweetDone: boolean
	retweetError: string | null
	mainPosts: PostDataType[]
	singlePost: PostDataType | null
	imagePaths: string[]
	hasMorePost: boolean
}
