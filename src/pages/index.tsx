import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@store/reducers'
import { loadPostAction } from '@store/actions/post'
import AppLayout from '@components/layout/AppLayout'
import PostForm from '@components/post/PostForm'
import PostCard from '@components/post/PostCard'

const IndexPage = () => {
	const dispatch = useDispatch()
	const { me } = useSelector((state: RootState) => state.user)
	const { mainPosts, hasMorePost, loadPostsLoading } = useSelector(
		(state: RootState) => state.post
	)

	useEffect(() => {
		dispatch(loadPostAction())
	}, [dispatch])

	useEffect(() => {
		const onScroll = () => {
			const { clientHeight, scrollHeight } = document.documentElement
			if (window.scrollY + clientHeight > scrollHeight - 300) {
				if (hasMorePost && !loadPostsLoading) dispatch(loadPostAction())
			}
		}
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [dispatch, hasMorePost, loadPostsLoading])

	return (
		<AppLayout>
			{me && <PostForm />}
			{mainPosts.map(mainPost => (
				<PostCard key={mainPost.id} post={mainPost} />
			))}
		</AppLayout>
	)
}

export default IndexPage
