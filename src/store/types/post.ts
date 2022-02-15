export interface IMainPostData {
	id: number
	User: {
		id: string
		nickname: string
	}
	content: string
	Images: {
		src: string
	}[]
	Comments: {
		User: {
			nickname: string
		}
		content: string
	}[]
}

export interface IPostState {
	mainPosts: IMainPostData[]
	imagePaths: string[]
	postAdded: boolean
}
