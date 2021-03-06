import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import Router from 'next/router'
import { END } from 'redux-saga'
import axios from 'axios'
import styled from 'styled-components'
import { Button, Checkbox, Form, Input } from 'antd'

import AppLayout from '@components/layout/AppLayout'
import useInput from '@hooks/useInput'
import { loadMyInfoAction, signUpAction } from '@store/actions/user'
import { RootState } from '@store/reducers'
import wrapper from '@store/index'

const ErrorMessage = styled.div`
	color: crimson;
`

const ButtonWrapper = styled.div`
	margin-top: 10px;
`

const SignupPage = () => {
	const dispatch = useDispatch()
	const { signUpLoading, signUpDone, signUpError, me } = useSelector(
		(state: RootState) => state.user
	)

	useEffect(() => {
		if (me && me.id) Router.replace('/')
		else if (signUpDone) Router.push('/')
		else if (signUpError) alert(signUpError)
	}, [me, signUpDone, signUpError])

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
		dispatch(signUpAction({ email, nickname, password }))
	}, [dispatch, email, nickname, password, passwordCheck, term])

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
						<Button type="primary" htmlType="submit" loading={signUpLoading}>
							가입하기
						</Button>
					</ButtonWrapper>
				</Form>
			</AppLayout>
		</>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(
	store =>
		async ({ req }) => {
			const cookie = req ? req.headers.cookie : ''
			axios.defaults.headers.Cookie = ''
			req && cookie && (axios.defaults.headers.Cookie = cookie)
			store.dispatch(loadMyInfoAction())
			store.dispatch(END)
			await store.sagaTask?.toPromise()
			return { props: {} }
		}
)

export default SignupPage
