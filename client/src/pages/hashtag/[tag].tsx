import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { END } from 'redux-saga'
import { useRouter } from 'next/router'
import axios from 'axios'

import AppLayout from '@components/layout/AppLayout'
import PostCard from '@components/post/PostCard'
import wrapper from '@store/index'
import { RootState } from '@store/reducers'
import { loadHashtagPostsAction } from '@store/actions/post'
import { loadMyInfoAction } from '@store/actions/user'

const HashtagPage = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const { tag } = router.query
	const { mainPosts, hasMorePost, loadPostsLoading } = useSelector(
		(state: RootState) => state.post
	)

	useEffect(() => {
		const onScroll = () => {
			const { clientHeight, scrollHeight } = document.documentElement
			if (window.scrollY + clientHeight > scrollHeight - 300) {
				if (hasMorePost && !loadPostsLoading) {
					dispatch(
						loadHashtagPostsAction({
							lastId:
								mainPosts[mainPosts.length - 1] &&
								mainPosts[mainPosts.length - 1].id,
							hashtag: tag as string
						})
					)
				}
			}
		}
		window.addEventListener('scroll', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [dispatch, hasMorePost, loadPostsLoading, mainPosts, tag])

	return (
		<AppLayout>
			{mainPosts.map(mainPost => (
				<PostCard key={mainPost.id} post={mainPost} />
			))}
		</AppLayout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(
	store =>
		async ({ req, params }) => {
			const hashtag = (params && params.tag) as string
			const cookie = req ? req.headers.cookie : ''
			axios.defaults.headers.Cookie = ''
			req && cookie && (axios.defaults.headers.Cookie = cookie)
			store.dispatch(loadMyInfoAction())
			store.dispatch(loadHashtagPostsAction({ hashtag }))
			store.dispatch(END)
			await store.sagaTask?.toPromise()
			return { props: {} }
		}
)

export default HashtagPage
