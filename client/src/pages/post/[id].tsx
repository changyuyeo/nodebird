import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { END } from 'redux-saga'
import axios from 'axios'

import AppLayout from '@components/layout/AppLayout'
import PostCard from '@components/post/PostCard'
import wrapper from '@store/index'
import { RootState } from '@store/reducers'
import { loadPostAction } from '@store/actions/post'
import { loadMyInfoAction } from '@store/actions/user'

const PostPage = () => {
	const router = useRouter()
	const { singlePost } = useSelector((state: RootState) => state.post)

	return (
		singlePost && (
			<>
				<Head>
					<title>{singlePost.User.nickname} 님의 글</title>
					<meta name="description" content={singlePost.content} />
					<meta
						property="og:title"
						content={`${singlePost.User.nickname}님의 게시글`}
					/>
					<meta property="og:description" content={singlePost.content} />
					<meta
						property="og:image"
						content={
							singlePost.Images[0]
								? singlePost.Images[0].src
								: 'https://nodebird.com/favicon.ico'
						}
					/>
					<meta
						property="og:url"
						content={`https://nodebird.com/post/${router.query.id}`}
					/>
				</Head>
				<AppLayout>
					<PostCard post={singlePost} />
				</AppLayout>
			</>
		)
	)
}

export const getServerSideProps = wrapper.getServerSideProps(
	store =>
		async ({ req, params }) => {
			const id = params?.id as string
			const cookie = req ? req.headers.cookie : ''
			axios.defaults.headers.Cookie = ''
			req && cookie && (axios.defaults.headers.Cookie = cookie)
			store.dispatch(loadMyInfoAction())
			store.dispatch(loadPostAction(parseInt(id, 10)))
			store.dispatch(END)
			await store.sagaTask?.toPromise()
			return { props: {} }
		}
)

export default PostPage
