import { IPostState } from '@store/types/post'
import { PostAction } from '@store/actions/post'
import * as actions from '@store/actions/actionTypes'

const dummyPost = {
	id: 2,
	content: '더미데이터입니다.',
	User: {
		id: 1,
		nickname: '제로초'
	},
	Images: [],
	Comments: []
}

const initialState: IPostState = {
	mainPosts: [
		{
			id: 1,
			User: {
				id: 'test@test.com',
				nickname: '제로초'
			},
			content: '첫 번째 게시글 #test #test1 ##test2',
			Images: [
				{
					src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726'
				},
				{
					src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg'
				},
				{
					src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg'
				}
			],
			Comments: [
				{
					User: {
						nickname: 'nero'
					},
					content: '우와 개정판이 나왔군요~'
				},
				{
					User: {
						nickname: 'hero'
					},
					content: '얼른 사고싶어요~'
				}
			]
		}
	],
	imagePaths: [],
	postAdded: false
}

const postReducer = (state = initialState, action: PostAction) => {
	switch (action.type) {
		case actions.ADD_POST:
			return {
				...state,
				mainPosts: [dummyPost, ...state.mainPosts],
				postAdded: true
			}
		default:
			return state
	}
}

export default postReducer
