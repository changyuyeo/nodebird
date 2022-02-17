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
import { removePostAction } from '@store/actions/post'
import { IMainPostData } from '@store/types/post'
import PostImages from '@components/post/PostImages'
import CommentForm from '@components/post/CommentForm'
import PostCardContent from '@components/post/PostCardContent'
import FollowButton from '@components/post/FollowButton'

const CardWrapper = styled.div`
	margin-bottom: 20px;
`

interface Props {
	post: IMainPostData
}

const PostCard: FC<Props> = ({ post }) => {
	const dispatch = useDispatch()
	const id = useSelector((state: RootState) => state.user.me?.id)
	const { removePostLoading } = useSelector((state: RootState) => state.post)

	const [liked, setLiked] = useState(false)
	const [commentFormOpened, setCommentFormOpened] = useState(false)

	const onToggleLike = useCallback(() => setLiked(prev => !prev), [])

	const onToggleComment = useCallback(
		() => setCommentFormOpened(prev => !prev),
		[]
	)

	const onRemovePost = useCallback(() => {
		dispatch(removePostAction(post.id))
	}, [dispatch, post.id])

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
							onClick={onToggleLike}
						/>
					) : (
						<HeartOutlined key="heart" onClick={onToggleLike} />
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
					avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
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
									avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
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
