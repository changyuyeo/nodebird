import Head from 'next/head'

import AppLayout from '@components/layout/AppLayout'
import NicknameForm from '@components/profile/NicknameForm'
import FollowList from '@components/profile/FollowList'

const ProfilePage = () => {
	const followerList = [
		{ nickname: '노경호' },
		{ nickname: '박제봉' },
		{ nickname: '제봉팍' }
	]
	const followingList = [
		{ nickname: '노경호' },
		{ nickname: '박제봉' },
		{ nickname: '제봉팍' }
	]

	return (
		<>
			<Head>
				<title>내 프로필 | NodeBird</title>
			</Head>
			<AppLayout>
				<NicknameForm />
				<FollowList header="팔로잉 목록" data={followerList} />
				<FollowList header="팔로워 목록" data={followingList} />
			</AppLayout>
		</>
	)
}

export default ProfilePage
