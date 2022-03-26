import { FC, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Link from 'next/link'
import moment from 'moment'
import { Avatar, Button, Card, Comment, List, Popover } from 'antd'
import {
	EllipsisOutlined,
	HeartOutlined,
	HeartTwoTone,
	MessageOutlined,
	RetweetOutlined
} from '@ant-design/icons'

import PostImages from '@components/post/PostImages'
import CommentForm from '@components/post/CommentForm'
import PostCardContent from '@components/post/PostCardContent'
import FollowButton from '@components/post/FollowButton'
import { PostDataType } from '@typings/post'
import { RootState } from '@store/reducers'
import {
	likePostAction,
	removePostAction,
	retweetAction,
	unLikePostAction
} from '@store/actions/post'

const CardWrapper = styled.div`
	margin-bottom: 20px;
`

const CardDate = styled.div`
	float: right;
	color: #aaa;
`

interface Props {
	post: PostDataType
}

moment.locale('ko')

const PostCard: FC<Props> = ({ post }) => {
	const dispatch = useDispatch()
	const id = useSelector((state: RootState) => state.user.me?.id)
	const { removePostLoading } = useSelector((state: RootState) => state.post)

	const [commentFormOpened, setCommentFormOpened] = useState(false)

	const onLike = useCallback(() => {
		if (!id) return alert('로그인이 필요합니다.')
		return dispatch(likePostAction(post.id))
	}, [dispatch, id, post.id])

	const onUnLike = useCallback(() => {
		if (!id) return alert('로그인이 필요합니다.')
		return dispatch(unLikePostAction(post.id))
	}, [dispatch, id, post.id])

	const onRemovePost = useCallback(() => {
		if (!id) return alert('로그인이 필요합니다.')
		return dispatch(removePostAction(post.id))
	}, [dispatch, id, post.id])

	const onRetweet = useCallback(() => {
		if (!id) return alert('로그인이 필요합니다.')
		return dispatch(retweetAction(post.id))
	}, [dispatch, id, post.id])

	const onToggleComment = useCallback(
		() => setCommentFormOpened(prev => !prev),
		[]
	)

	const liked = post.Likers?.find(v => v.id === id)

	return (
		<CardWrapper>
			<Card
				cover={post.Images[0] && <PostImages images={post.Images} />}
				actions={[
					<RetweetOutlined key="retweet" onClick={onRetweet} />,
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
				title={
					post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null
				}
				extra={id && <FollowButton post={post} />}
			>
				{post.RetweetId && post.Retweet ? (
					<Card
						cover={
							post.Retweet.Images[0] && (
								<PostImages images={post.Retweet.Images} />
							)
						}
					>
						<CardDate>{moment(post.createdAt, 'YYYYMMDD').fromNow()}</CardDate>
						<Card.Meta
							avatar={
								<Link href={`/user/${post.Retweet.User.id}`}>
									<a>
										<Avatar>
											{post.Retweet.User.nickname &&
												post.Retweet.User.nickname[0]}
										</Avatar>
									</a>
								</Link>
							}
							title={post.Retweet.User.nickname}
							description={<PostCardContent postData={post.Retweet.content} />}
						/>
					</Card>
				) : (
					<>
						<CardDate>{moment(post.createdAt, 'YYYYMMDD').fromNow()}</CardDate>
						<Card.Meta
							avatar={
								<Link href={`/user/${post.User.id}`}>
									<a>
										<Avatar>
											{post.User.nickname && post.User.nickname[0]}
										</Avatar>
									</a>
								</Link>
							}
							title={post.User.nickname}
							description={<PostCardContent postData={post.content} />}
						/>
					</>
				)}
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
										<Link href={`/user/${item.User.id}`}>
											<a>
												<Avatar>
													{item.User.nickname && item.User.nickname[0]}
												</Avatar>
											</a>
										</Link>
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
