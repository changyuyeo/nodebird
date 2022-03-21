import { FC, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Avatar, Button, Card, Comment, List, Popover } from 'antd'
import {
	EllipsisOutlined,
	HeartOutlined,
	HeartTwoTone,
	MessageOutlined,
	RetweetOutlined
} from '@ant-design/icons'

import { RootState } from '@store/reducers'
import PostImages from '@components/post/PostImages'
import CommentForm from '@components/post/CommentForm'
import PostCardContent from '@components/post/PostCardContent'
import FollowButton from '@components/post/FollowButton'
import {
	likePostAction,
	removePostAction,
	unLikePostAction
} from '@store/actions/post'
import { PostDataType } from '@typings/post'

const CardWrapper = styled.div`
	margin-bottom: 20px;
`

interface Props {
	post: PostDataType
}

const PostCard: FC<Props> = ({ post }) => {
	const dispatch = useDispatch()
	const id = useSelector((state: RootState) => state.user.me?.id)
	const { removePostLoading } = useSelector((state: RootState) => state.post)

	const [commentFormOpened, setCommentFormOpened] = useState(false)

	const onLike = useCallback(
		() => dispatch(likePostAction(post.id)),
		[dispatch, post.id]
	)

	const onUnLike = useCallback(
		() => dispatch(unLikePostAction(post.id)),
		[dispatch, post.id]
	)

	const onToggleComment = useCallback(
		() => setCommentFormOpened(prev => !prev),
		[]
	)

	const onRemovePost = useCallback(() => {
		dispatch(removePostAction(post.id))
	}, [dispatch, post.id])

	const liked = post.Likers.find(v => v.id === id)

	return (
		<CardWrapper>
			<Card
				cover={post.Images[0] && <PostImages images={post.Images} />}
				actions={[
					<RetweetOutlined key="retweet" />,
					liked ? (
						<HeartTwoTone
							key="heart"
							twoToneColor="#eb2f96"
							onClick={onUnLike}
						/>
					) : (
						<HeartOutlined key="heart" onClick={onLike} />
					),
					<MessageOutlined key="comment" onClick={onToggleComment} />,
					<Popover
						key="more"
						content={
							<Button.Group>
								{id && post.User.id === id ? (
									<>
										<Button type="primary">수정</Button>
										<Button onClick={onRemovePost} loading={removePostLoading}>
											삭제
										</Button>
									</>
								) : (
									<Button>신고</Button>
								)}
							</Button.Group>
						}
					>
						<EllipsisOutlined />
					</Popover>
				]}
				extra={id && <FollowButton post={post} />}
			>
				<Card.Meta
					avatar={
						<Avatar>{post.User.nickname && post.User.nickname[0]}</Avatar>
					}
					title={post.User.nickname}
					description={<PostCardContent postData={post.content} />}
				/>
			</Card>
			{commentFormOpened && (
				<div>
					<CommentForm postId={post.id} />
					<List
						header={`${post.Comments.length}개의 댓글`}
						itemLayout="horizontal"
						dataSource={post.Comments}
						renderItem={(item, index) => (
							<li key={index}>
								<Comment
									author={item.User.nickname}
									avatar={
										<Avatar>
											{item.User.nickname && item.User.nickname[0]}
										</Avatar>
									}
									content={item.content}
								/>
							</li>
						)}
					/>
				</div>
			)}
		</CardWrapper>
	)
}

export default PostCard
