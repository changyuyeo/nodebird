export interface IUserState {
	followLoading: boolean // 팔로우 시도중
	followDone: boolean
	followError: string | null
	unfollowLoading: boolean // 언팔로우 시도중
	unfollowDone: boolean
	unfollowError: string | null
	logInLoading: boolean // 로그인 시도중
	logInDone: boolean
	logInError: string | null
	logOutLoading: boolean // 로그아웃 시도중
	logOutDone: boolean
	logOutError: string | null
	signUpLoading: boolean // 회원가입 시도중
	signUpDone: boolean
	signUpError: string | null
	changeNicknameLoading: boolean // 닉네임 변경 시도중
	changeNicknameDone: boolean
	changeNicknameError: string | null
	me: any
	signUpData: {}
	loginData: {}
}
