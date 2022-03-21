import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Form, Input } from 'antd'

import useInput from '@hooks/useInput'
import { changeNicknameAction } from '@store/actions/user'
import { RootState } from '@store/reducers'

const FormWrapper = styled(Form)`
	margin-bottom: 20px;
	border: 1px solid #d9d9d9;
	padding: 20px;
`

const NicknameForm = () => {
	const dispatch = useDispatch()
	const { me } = useSelector((state: RootState) => state.user)

	const [nickname, onChangeNickname] = useInput(me?.nickname || '')

	const onSubmit = useCallback(() => {
		dispatch(changeNicknameAction({ nickname }))
	}, [dispatch, nickname])

	return (
		<FormWrapper>
			<Input.Search
				value={nickname}
				onChange={onChangeNickname}
				addonBefore="닉네임"
				enterButton="수정"
				onSearch={onSubmit}
			/>
		</FormWrapper>
	)
}

export default NicknameForm
