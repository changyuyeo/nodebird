import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AppLayout from '@components/layout/AppLayout'
import PostForm from '@components/post/PostForm'
import PostCard from '@components/post/PostCard'
import { loadPostAction } from '@store/actions/post'
import { RootState } from '@store/reducers'
import { loadMyInfoAction } from '@store/actions/user'

const IndexPage = () => {
	const dispatch = useDispatch()
	const { me } = useSelector((state: RootState) => state.user)
	const { mainPosts, hasMorePost, loadPostsLoading, retweetError } =
		useSelector((state: RootState) => state.post)

	useEffect(() => {
		if (retweetError) alert(retweetError)
	}, [retweetError])

	useEffect(() => {
		dispatch(loadMyInfoAction())
		dispatch(loadPostAction())
	}, [dispatch])

	useEffect(() => {
		const onScroll = () => {
			const { clientHeight, scrollHeight } = document.documentElement
			if (window.scrollY + clientHeight > scrollHeight - 300) {
				if (hasMorePost && !loadPostsLoading) {
					const lastId = mainPosts[mainPosts.length - 1]?.id
					console.log(lastId)
					dispatch(loadPostAction(lastId))
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

export default IndexPage
