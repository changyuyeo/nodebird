export interface IMainPostData {
	id: string
	User: {
		id: string
		nickname: string
	}
	content: string
	Images: {
		id: string
		src: string
	}[]
	Comments: {
		id: string
		User: {
			id: string
			nickname: string
		}
		content: string
	}[]
}

export interface IPostState {
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
	mainPosts: IMainPostData[]
	imagePaths: string[]
	hasMorePost: boolean
}
