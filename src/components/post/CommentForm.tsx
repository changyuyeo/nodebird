import { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button, Form, Input } from 'antd'

import useInput from '@hooks/useInput'
import { RootState } from '@store/reducers'
import { addCommentAction } from '@store/actions/post'

const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 5px;
`

interface Props {
	postId: number
}

const CommentForm: FC<Props> = ({ postId }) => {
	const dispatch = useDispatch()
	const id = useSelector((state: RootState) => state.user.me?.id)
	const { addCommentLoading, addCommentDone } = useSelector(
		(state: RootState) => state.post
	)

	const [commentText, onChangeCommentText, setCommentText] = useInput('')

	useEffect(() => {
		if (addCommentDone) setCommentText('')
	}, [addCommentDone, setCommentText])

	const onSubmitComment = useCallback(() => {
		const commentData = { content: commentText, postId, userId: id }
		dispatch(addCommentAction(commentData))
	}, [commentText, dispatch, id, postId])

	return (
		<Form onFinish={onSubmitComment}>
			<Form.Item>
				<FormWrapper>
					<Input.TextArea
						value={commentText}
						onChange={onChangeCommentText}
						rows={4}
					/>
					<Button
						type="primary"
						htmlType="submit"
						className="comment_btn"
						loading={addCommentLoading}
					>
						삐약
					</Button>
				</FormWrapper>
			</Form.Item>
		</Form>
	)
}

export default CommentForm
