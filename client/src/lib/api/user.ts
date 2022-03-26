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

export interface ChangeNicknameAPIBody {
	nickname: string
}

export const loadMyInfoAPI = (): AxiosPromise<UserDataType> => user.get('/')

export const signUpAPI = (data: SignUpAPIBody) => user.post('/signup', data)

export const logInAPI = (data: LoginAPIBody): AxiosPromise<UserDataType> =>
	user.post('/login', data)

export const logOutAPI = () => user.post('/logout')

export const changeNicknameAPI = (data: ChangeNicknameAPIBody) =>
	user.patch('/nickname', data)

export const followAPI = (userId: number) => user.patch(`/${userId}/follow`)

export const unFollowAPI = (userId: number) => user.delete(`/${userId}/follow`)

export const loadFollowersAPI = (data: number) =>
	user.get(`/followers?limit=${data}`)

export const loadFollowingsAPI = (data: number) =>
	user.get(`/followings?limit=${data}`)

export const removeFollowerAPI = (userId: number) =>
	user.delete(`/follower/${userId}`)

export const loadUserAPI = (userId: number) => user.get(`/${userId}`)
