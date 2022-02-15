import { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button, Form, Input } from 'antd'

import useInput from '@hooks/useInput'
import { RootState } from '@store/reducers'
import { addPostAction } from '@store/actions/post'

const FormWrapper = styled(Form)`
	margin: 10px 0 20px;
`

const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-between;
`

const Image = styled.div`
	display: inline-block;
	> img {
		width: 200px;
	}
`

const PostForm = () => {
	const dispatch = useDispatch()
	const { imagePaths } = useSelector((state: RootState) => state.post)

	const [text, onChangeText, setText] = useInput('')

	const imageRef = useRef<HTMLInputElement>(null)
	const textRef = useRef<HTMLTextAreaElement>(null)

	const onClickImageUpload = useCallback(() => {
		if (imageRef.current) imageRef.current.click()
	}, [])

	const onSubmitForm = useCallback(() => {
		dispatch(addPostAction())
		setText('')
		if (textRef.current) textRef.current.focus()
	}, [dispatch, setText])

	return (
		<FormWrapper onFinish={onSubmitForm}>
			<Input.TextArea
				ref={textRef}
				value={text}
				onChange={onChangeText}
				maxLength={140}
				placeholder="어떤 신기한 일이 있었나요?"
			/>
			<ButtonGroup>
				<input ref={imageRef} type="file" multiple hidden />
				<Button onClick={onClickImageUpload}>이미지 업로드</Button>
				<Button type="primary" htmlType="submit">
					짹짹
				</Button>
			</ButtonGroup>
			<div>
				{imagePaths.map(imagePath => (
					<Image key={imagePath}>
						<img src={imagePath} alt={imagePath} />
					</Image>
				))}
			</div>
		</FormWrapper>
	)
}

export default PostForm
