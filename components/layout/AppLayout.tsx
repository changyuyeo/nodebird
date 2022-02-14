import { FC, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Col, Input, Menu, Row } from 'antd'

import UserProfile from 'components/common/UserProfile'
import LoginForm from 'components/common/LoginForm'

const SearchInput = styled(Input.Search)`
	vertical-align: middle;
`

const AppLayout: FC = ({ children }) => {
	const router = useRouter()

	const [isLoggedIn, setIsLoggedIn] = useState(false)

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
					{isLoggedIn ? (
						<UserProfile setIsLoggedIn={setIsLoggedIn} />
					) : (
						<LoginForm setIsLoggedIn={setIsLoggedIn} />
					)}
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
