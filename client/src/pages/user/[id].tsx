import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { END } from 'redux-saga'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Avatar, Card } from 'antd'
import axios from 'axios'

import AppLayout from '@components/layout/AppLayout'
import PostCard from '@components/post/PostCard'
import wrapper from '@store/index'
import { RootState } from '@store/reducers'
import { loadUserPostsAction } from '@store/actions/post'
import { loadMyInfoAction, loadUserAction } from '@store/actions/user'

const UserPage = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const { id } = router.query
	const { mainPosts, hasMorePost, loadPostsLoading } = useSelector(
		(state: RootState) => state.post
	)
	const { userInfo } = useSelector((state: RootState) => state.user)

	useEffect(() => {
		const onScroll = () => {
			const { clientHeight, scrollHeight } = document.documentElement
			if (window.scrollY + clientHeight > scrollHeight - 300) {
				if (hasMorePost && !loadPostsLoading) {
					dispatch(
						loadUserPostsAction({
							lastId:
								mainPosts[mainPosts.length - 1] &&
								mainPosts[mainPosts.length - 1].id,
							userId: parseInt(id as string, 10)
						})
					)
				}
			}
		}
		window.addEventListener('scroll', onScroll)
		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [mainPosts.length, hasMorePost, id, loadPostsLoading, dispatch, mainPosts])

	return (
		<>
			{userInfo && (
				<Head>
					<title>{userInfo.nickname} 님의 글</title>
					<meta
						name="description"
						content={`${userInfo.nickname}님의 게시글`}
					/>
					<meta
						property="og:title"
						content={`${userInfo.nickname}님의 게시글`}
					/>
					<meta
						property="og:description"
						content={`${userInfo.nickname}님의 게시글`}
					/>
					<meta
						property="og:image"
						content="https://nodebird.com/favicon.ico"
					/>
					<meta property="og:url" content={`https://nodebird.com/user/${id}`} />
				</Head>
			)}
			<AppLayout>
				{userInfo ? (
					<Card
						actions={[
							<div key="twit">
								짹짹
								<br />
								{userInfo.Posts?.length}
							</div>,
							<div key="following">
								팔로잉
								<br />
								{userInfo.Followings?.length}
							</div>,
							<div key="follower">
								팔로워
								<br />
								{userInfo.Followers?.length}
							</div>
						]}
					>
						<Card.Meta
							avatar={
								<Avatar>{userInfo.nickname && userInfo.nickname[0]}</Avatar>
							}
							title={userInfo.nickname}
						/>
					</Card>
				) : null}
				{mainPosts.map(post => (
					<PostCard key={post.id} post={post} />
				))}
			</AppLayout>
		</>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(
	store =>
		async ({ req, params }) => {
			const id = parseInt((params && params.id) as string, 10)
			const cookie = req ? req.headers.cookie : ''
			axios.defaults.headers.Cookie = ''
			req && cookie && (axios.defaults.headers.Cookie = cookie)
			store.dispatch(loadUserPostsAction({ userId: id }))
			store.dispatch(loadMyInfoAction())
			store.dispatch(loadUserAction(id))
			store.dispatch(END)
			await store.sagaTask?.toPromise()
			return { props: {} }
		}
)

export default UserPage
