import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Router from 'next/router'
import Head from 'next/head'

import AppLayout from '@components/layout/AppLayout'
import NicknameForm from '@components/profile/NicknameForm'
import FollowList from '@components/profile/FollowList'
import wrapper from '@store/index'
import { RootState } from '@store/reducers'
import {
	loadFollowersAction,
	loadFollowingsAction,
	loadMyInfoAction
} from '@store/actions/user'
import axios from 'axios'
import { END } from 'redux-saga'

const ProfilePage = () => {
	const { me } = useSelector((state: RootState) => state.user)

	useEffect(() => {
		if (!(me && me.id)) Router.push('/')
	}, [me])

	if (!me) return null

	return (
		<>
			<Head>
				<title>내 프로필 | NodeBird</title>
			</Head>
			<AppLayout>
				<NicknameForm />
				<FollowList header="팔로잉 목록" data={me.Followings} />
				<FollowList header="팔로워 목록" data={me.Followers} />
			</AppLayout>
		</>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(
	store =>
		async ({ req }) => {
			const cookie = req ? req.headers.cookie : ''
			axios.defaults.headers.Cookie = ''
			req && cookie && (axios.defaults.headers.Cookie = cookie)
			store.dispatch(loadMyInfoAction())
			store.dispatch(loadFollowersAction(3))
			store.dispatch(loadFollowingsAction(3))
			store.dispatch(END)
			await store.sagaTask?.toPromise()
			return { props: {} }
		}
)

export default ProfilePage
