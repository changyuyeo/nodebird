export interface ILoginData {
	email: string
	password: string
}

export interface ISignUpData extends ILoginData {
	nickname: string
}

export interface IUserState {
	isLoggedIn: boolean
	me: ILoginData | null
	signUpData: ISignUpData | null
	loginData: ILoginData | null
}
