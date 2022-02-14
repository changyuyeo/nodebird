import { Dispatch, FC, SetStateAction, useCallback } from 'react'
import { Avatar, Button, Card } from 'antd'

interface Props {
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

const UserProfile: FC<Props> = ({ setIsLoggedIn }) => {
	const onLogOut = useCallback(() => setIsLoggedIn(false), [setIsLoggedIn])

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
