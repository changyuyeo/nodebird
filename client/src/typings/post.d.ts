import { UserDataType } from './user'

export interface PostDataType {
	id: number
	content: string
	createdAt: string
	updatedAt: string
	UserId: number
	RetweetId: null
	Images: Array<any>
	Comments: Array<any>
	User: UserDataType
	Likers: Array<any>
}
