import { UserDataType } from './user'

export interface PostDataType {
	id: number
	content: string
	createdAt: string
	updatedAt: string
	UserId: number
	RetweetId: null
	User: UserDataType
	Images: Array<any>
	Comments: Array<CommentDataType>
	Likers: Array<{ id: number }>
	Retweet?: null
}

export interface CommentDataType {
	id: number
	content: string
	createdAt: string
	updatedAt: string
	UserId: number
	PostId: number
	User: UserDataType
}

export interface LikePostDataType {
	PostId: number
	UserId: number
}
