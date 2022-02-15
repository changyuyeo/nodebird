import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, Button, Card } from 'antd'

import { logOutAction } from '@store/actions/user'

const UserProfile = () => {
	const dispatch = useDispatch()

	const onLogOut = useCallback(() => dispatch(logOutAction()), [dispatch])

	return (
		<Card
			actions={[
				<div key="twit">
					짹짹
					<br />0
				</div>,
				<div key="followings">
					팔로잉
					<br />0
				</div>,
				<div key="followers">
					팔로워
					<br />0
				</div>
			]}
		>
			<Card.Meta avatar={<Avatar>JB</Avatar>} title="jebong" />
			<Button onClick={onLogOut}>로그아웃</Button>
		</Card>
	)
}

export default UserProfile
