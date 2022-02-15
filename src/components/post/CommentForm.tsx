import { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button, Form, Input } from 'antd'

import useInput from '@hooks/useInput'
import { RootState } from '@store/reducers'

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
	const email = useSelector((state: RootState) => state.user.me?.email)

	const [commentText, onChangeCommentText] = useInput('')

	const onSubmitComment = useCallback(() => {
		console.log(email, postId, commentText)
	}, [commentText, email, postId])

	return (
		<Form onFinish={onSubmitComment}>
			<Form.Item>
				<FormWrapper>
					<Input.TextArea
						value={commentText}
						onChange={onChangeCommentText}
						rows={4}
					/>
					<Button type="primary" htmlType="submit" className="comment_btn">
						삐약
					</Button>
				</FormWrapper>
			</Form.Item>
		</Form>
	)
}

export default CommentForm
