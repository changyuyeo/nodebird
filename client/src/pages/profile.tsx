import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import Head from 'next/head'

import AppLayout from '@components/layout/AppLayout'
import NicknameForm from '@components/profile/NicknameForm'
import FollowList from '@components/profile/FollowList'
import { RootState } from '@store/reducers'
import { loadFollowersAction, loadFollowingsAction } from '@store/actions/user'

const ProfilePage = () => {
	const dispatch = useDispatch()
	const { me } = useSelector((state: RootState) => state.user)

	useEffect(() => {
		dispatch(loadFollowersAction())
		dispatch(loadFollowingsAction())
	}, [dispatch])

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

export default ProfilePage
