import { useSelector } from 'react-redux'
import Head from 'next/head'
import { END } from 'redux-saga'

import { Avatar, Card } from 'antd'
import AppLayout from '@components/layout/AppLayout'
import { RootState } from '@store/reducers'
import wrapper from '@store/index'
import { loadUserAction } from '@store/actions/user'

const AboutPage = () => {
	const { userInfo } = useSelector((state: RootState) => state.user)

	return (
		<AppLayout>
			<Head>
				<title>ZeroCho | NodeBird</title>
			</Head>
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
						description="노드버드 매니아"
					/>
				</Card>
			) : null}
		</AppLayout>
	)
}

export const getStaticProps = wrapper.getStaticProps(store => async () => {
	store.dispatch(loadUserAction(4))
	store.dispatch(END)
	await store.sagaTask?.toPromise()
	return { props: {} }
})

export default AboutPage
