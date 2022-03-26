import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
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
						<Link href={`/user/${me.id}`}>
							<a>
								짹짹
								<br />
								{me.Posts?.length}
							</a>
						</Link>
					</div>,
					<div key="followings">
						<Link href="/profile">
							<a>
								팔로잉
								<br />
								{me.Followings?.length}
							</a>
						</Link>
					</div>,
					<div key="followers">
						<Link href="/profile">
							<a>
								팔로워
								<br />
								{me.Followers?.length}
							</a>
						</Link>
					</div>
				]}
			>
				<Card.Meta
					avatar={
						<Link href={`/user/${me.id}`}>
							<a>
								<Avatar>{me.nickname && me.nickname[0]}</Avatar>
							</a>
						</Link>
					}
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
