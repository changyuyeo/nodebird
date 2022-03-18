export interface UserDataType {
	id: number
	nickname: string
	Followers?: Array<{ id: number }>
	Followings?: Array<{ id: number }>
	Posts?: Array<{ id: number }>
}
