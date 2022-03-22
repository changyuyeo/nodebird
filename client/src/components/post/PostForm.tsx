import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button, Form, Input } from 'antd'

import useInput from '@hooks/useInput'
import { RootState } from '@store/reducers'
import {
	addPostAction,
	removeImageAction,
	uploadImagesAction
} from '@store/actions/post'
import { BASE_URL } from '@lib/api'

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
	const { imagePaths, addPostLoading, addPostDone } = useSelector(
		(state: RootState) => state.post
	)

	const [text, onChangeText, setText] = useInput('')

	const imageRef = useRef<HTMLInputElement>(null)
	const textRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		if (addPostDone) setText('')
	}, [addPostDone, setText])

	const onClickImageUpload = useCallback(() => {
		if (imageRef.current) imageRef.current.click()
	}, [])

	const onSubmitForm = useCallback(() => {
		if (!text || !text.trim()) return alert('게시글을 작성하세요.')
		const formData = new FormData()
		formData.append('content', text)
		imagePaths.forEach(imagePath => formData.append('image', imagePath))
		dispatch(addPostAction(formData))
		if (textRef.current) textRef.current.focus()
	}, [dispatch, imagePaths, text])

	const onChangeImages = useCallback(
		e => {
			const imageFormData = new FormData()
			Array.from(e.target.files).forEach(file =>
				imageFormData.append('image', file as Blob)
			)
			dispatch(uploadImagesAction(imageFormData))
		},
		[dispatch]
	)

	const onRemoveImage = useCallback(
		(index: number) => () => dispatch(removeImageAction(index)),
		[dispatch]
	)

	return (
		<FormWrapper
			encType="multiple/form-data"
			name="image"
			onFinish={onSubmitForm}
		>
			<Input.TextArea
				ref={textRef}
				value={text}
				onChange={onChangeText}
				maxLength={140}
				placeholder="어떤 신기한 일이 있었나요?"
			/>
			<ButtonGroup>
				<input
					ref={imageRef}
					type="file"
					multiple
					hidden
					onChange={onChangeImages}
				/>
				<Button onClick={onClickImageUpload}>이미지 업로드</Button>
				<Button type="primary" htmlType="submit" loading={addPostLoading}>
					짹짹
				</Button>
			</ButtonGroup>
			<div>
				{imagePaths.map((imagePath, i) => (
					<Image key={imagePath}>
						<img src={`${BASE_URL}/${imagePath}`} alt={imagePath} />
						<div>
							<Button onClick={onRemoveImage(i)}>제거</Button>
						</div>
					</Image>
				))}
			</div>
		</FormWrapper>
	)
}

export default PostForm
