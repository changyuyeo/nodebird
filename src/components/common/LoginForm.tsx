import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import styled from 'styled-components'
import { Button, Form, Input } from 'antd'

import useInput from '@hooks/useInput'
import { logInAction } from '@store/actions/user'

const FormWrapper = styled(Form)`
	padding: 10px;
`

const ButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;
	gap: 10px;
	> * {
		width: 100%;
	}
`

const LoginForm = () => {
	const dispatch = useDispatch()

	const [email, onChangeEmail] = useInput('')
	const [password, onChangePassword] = useInput('')

	const onSubmitForm = useCallback(() => {
		dispatch(logInAction({ email, password }))
	}, [dispatch, email, password])

	return (
		<FormWrapper onFinish={onSubmitForm}>
			<div>
				<label htmlFor="user-email">이메일</label>
				<br />
				<Input name="user-email" value={email} onChange={onChangeEmail} />
			</div>
			<div>
				<label htmlFor="user-password">비밀번호</label>
				<br />
				<Input
					name="user-password"
					type="password"
					value={password}
					onChange={onChangePassword}
				/>
			</div>
			<ButtonWrapper>
				<Button type="primary" htmlType="submit" loading={false}>
					로그인
				</Button>
				<Button>
					<Link href="/signup">
						<a>회원가입</a>
					</Link>
				</Button>
			</ButtonWrapper>
		</FormWrapper>
	)
}

export default LoginForm
