import { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'

import { RootState } from '@store/reducers'
import { IMainPostData } from '@store/types/post'
import { followAction, unfollowAction } from '@store/actions/user'

interface Props {
	post: IMainPostData
}

const FollowButton: FC<Props> = ({ post }) => {
	const dispatch = useDispatch()
	const { me, followLoading, unfollowLoading } = useSelector(
		(state: RootState) => state.user
	)

	const isFollowing = me?.Followings.find((v: any) => v.id === post.User.id)

	const onClickFollowButton = useCallback(() => {
		if (isFollowing) dispatch(unfollowAction(post.User.id))
		else dispatch(followAction(post.User.id))
	}, [dispatch, isFollowing, post.User.id])

	return (
		<Button
			onClick={onClickFollowButton}
			loading={followLoading || unfollowLoading}
		>
			{isFollowing ? '언팔로우' : '팔로우'}
		</Button>
	)
}

export default FollowButton
