import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { END } from 'redux-saga'
import { NextPage } from 'next'
import axios from 'axios'

import AppLayout from '@components/layout/AppLayout'
import PostForm from '@components/post/PostForm'
import PostCard from '@components/post/PostCard'
import wrapper from '@store/index'
import { RootState } from '@store/reducers'
import { loadPostsAction } from '@store/actions/post'
import { loadMyInfoAction } from '@store/actions/user'

const IndexPage: NextPage = () => {
	const dispatch = useDispatch()
	const { me } = useSelector((state: RootState) => state.user)
	const { mainPosts, hasMorePost, loadPostsLoading, retweetError } =
		useSelector((state: RootState) => state.post)

	useEffect(() => {
		if (retweetError) alert(retweetError)
	}, [retweetError])

	useEffect(() => {
		const onScroll = () => {
			const { clientHeight, scrollHeight } = document.documentElement
			if (window.scrollY + clientHeight > scrollHeight - 300) {
				if (hasMorePost && !loadPostsLoading) {
					const lastId = mainPosts[mainPosts.length - 1]?.id
					dispatch(loadPostsAction(lastId))
				}
			}
		}
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [dispatch, hasMorePost, loadPostsLoading, mainPosts])

	return (
		<AppLayout>
			{me && <PostForm />}
			{mainPosts.map(mainPost => (
				<PostCard key={mainPost.id} post={mainPost} />
			))}
		</AppLayout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(
	store =>
		async ({ req }) => {
			const cookie = req ? req.headers.cookie : ''
			axios.defaults.headers.Cookie = ''
			req && cookie && (axios.defaults.headers.Cookie = cookie)
			store.dispatch(loadMyInfoAction())
			store.dispatch(loadPostsAction())
			store.dispatch(END)
			await store.sagaTask?.toPromise()
			return { props: {} }
		}
)

export default IndexPage
