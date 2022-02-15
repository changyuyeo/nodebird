import { FC } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Col, Input, Menu, Row } from 'antd'

import { RootState } from '@store/reducers'
import UserProfile from '@components/common/UserProfile'
import LoginForm from '@components/common/LoginForm'

const SearchInput = styled(Input.Search)`
	vertical-align: middle;
`

const AppLayout: FC = ({ children }) => {
	const { isLoggedIn } = useSelector((state: RootState) => state.user)

	const router = useRouter()

	return (
		<>
			<Menu mode="horizontal" selectedKeys={[router.pathname]}>
				<Menu.Item key="/">
					<Link href="/">
						<a>노드버드</a>
					</Link>
				</Menu.Item>
				<Menu.Item key="/profile">
					<Link href="/profile">
						<a>프로필</a>
					</Link>
				</Menu.Item>
				<Menu.Item key="searchInput">
					<SearchInput enterButton />
				</Menu.Item>
				<Menu.Item key="/signup">
					<Link href="/signup">
						<a>회원가입</a>
					</Link>
				</Menu.Item>
			</Menu>
			<Row gutter={8}>
				<Col xs={24} md={6}>
					{isLoggedIn ? <UserProfile /> : <LoginForm />}
				</Col>
				<Col xs={24} md={12}>
					{children}
				</Col>
				<Col xs={24} md={6}>
					<a
						href="https://github.com/changyuyeo"
						target="_blank"
						rel="noreferrer noopener"
					>
						Changyu&apos;s Github
					</a>
				</Col>
			</Row>
		</>
	)
}

export default AppLayout
