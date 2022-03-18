import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, Card } from 'antd'

import { logOutAction } from '@store/actions/user'
import { RootState } from '@store/reducers'

const UserProfile = () => {
	const dispatch = useDispatch()
	const { me, logOutLoading, logOutError } = useSelector(
		(state: RootState) => state.user
	)

	const onLogOut = useCallback(() => dispatch(logOutAction()), [dispatch])

	useEffect(() => {
		if (logOutError) alert(logOutError)
	}, [logOutError])

	return (
		me && (
			<Card
				actions={[
					<div key="twit">
						짹짹
						<br />
						{me.Posts?.length}
					</div>,
					<div key="followings">
						팔로잉
						<br />
						{me.Followings?.length}
					</div>,
					<div key="followers">
						팔로워
						<br />
						{me.Followers?.length}
					</div>
				]}
			>
				<Card.Meta
					avatar={<Avatar>{me.nickname[0]}</Avatar>}
					title={`${me.nickname} 님`}
				/>
				<Button onClick={onLogOut} loading={logOutLoading}>
					로그아웃
				</Button>
			</Card>
		)
	)
}

export default UserProfile
