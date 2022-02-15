import { ChangeEvent, useCallback, useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { Button, Checkbox, Form, Input } from 'antd'

import useInput from '@hooks/useInput'
import AppLayout from '@components/layout/AppLayout'

const ErrorMessage = styled.div`
	color: crimson;
`

const ButtonWrapper = styled.div`
	margin-top: 10px;
`

const SignupPage = () => {
	const [email, onChangeEmail] = useInput('')
	const [nickname, onChangeNickname] = useInput('')
	const [password, onChangePassword] = useInput('')
	const [passwordCheck, , setPasswordCheck] = useInput('')

	const [term, setTerm] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [termError, setTermError] = useState(false)

	const onChangePasswordCheck = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setPasswordCheck(e.currentTarget.value)
			setPasswordError(e.currentTarget.value !== password)
		},
		[password, setPasswordCheck]
	)

	const onChangeTerm = useCallback(() => {
		setTerm(prev => !prev)
		setTermError(false)
	}, [])

	const onSubmitForm = useCallback(() => {
		if (password !== passwordCheck) return setPasswordError(true)
		if (!term) return setTermError(true)
		const userData = { email, nickname, password }
		console.log(userData)
	}, [email, nickname, password, passwordCheck, term])

	return (
		<>
			<Head>
				<title>회원가입 | NodeBird</title>
			</Head>
			<AppLayout>
				<Form onFinish={onSubmitForm}>
					<div>
						<label htmlFor="email">이메일</label>
						<br />
						<Input
							name="email"
							type="email"
							value={email}
							onChange={onChangeEmail}
							required
						/>
					</div>
					<div>
						<label htmlFor="nickname">닉네임</label>
						<br />
						<Input
							name="nickname"
							value={nickname}
							onChange={onChangeNickname}
							required
						/>
					</div>
					<div>
						<label htmlFor="password">비밀번호</label>
						<br />
						<Input
							name="password"
							type="passowrd"
							value={password}
							onChange={onChangePassword}
							required
						/>
					</div>
					<div>
						<label htmlFor="passwordCheck">비밀번호 체크</label>
						<br />
						<Input
							name="passwordCheck"
							type="passowrd"
							value={passwordCheck}
							onChange={onChangePasswordCheck}
							required
						/>
						{passwordError && (
							<ErrorMessage>비밀번호가 일치하지 않습니다!</ErrorMessage>
						)}
					</div>
					<div>
						<Checkbox name="term" checked={term} onChange={onChangeTerm}>
							제봉이의 말을 잘 들을 것을 동의합니다.
							{termError && (
								<ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>
							)}
						</Checkbox>
					</div>
					<ButtonWrapper>
						<Button type="primary" htmlType="submit">
							가입하기
						</Button>
					</ButtonWrapper>
				</Form>
			</AppLayout>
		</>
	)
}

export default SignupPage
