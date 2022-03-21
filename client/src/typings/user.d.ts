export interface UserDataType {
	id: number
	nickname?: string
	Followers?: Array<UserDataType>
	Followings?: Array<UserDataType>
	Posts?: Array<{ id: number }>
}
