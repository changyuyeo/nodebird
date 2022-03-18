import { user } from '@lib/api'
import { UserDataType } from '@typings/user'
import { AxiosPromise } from 'axios'

export interface LoginAPIBody {
	email: string
	password: string
}

export interface SignUpAPIBody extends LoginAPIBody {
	nickname: string
}

export const loadMyInfoAPI = (): AxiosPromise<UserDataType> => user.get('/')

export const signUpAPI = (data: SignUpAPIBody) => user.post('/signup', data)

export const logInAPI = (data: LoginAPIBody): AxiosPromise<UserDataType> =>
	user.post('/login', data)

export const logOutAPI = () => user.post('/logout')
