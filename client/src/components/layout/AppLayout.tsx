import { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import styled from 'styled-components'
import { Col, Input, Menu, Row } from 'antd'

import UserProfile from '@components/common/UserProfile'
import LoginForm from '@components/common/LoginForm'
import { RootState } from '@store/reducers'
import useInput from '@hooks/useInput'

const SearchInput = styled(Input.Search)`
	vertical-align: middle;
`

const AppLayout: FC = ({ children }) => {
	const { me } = useSelector((state: RootState) => state.user)

	const router = useRouter()

	const [searchInput, onChangeSearchInput] = useInput('')

	const onSearch = useCallback(
		() => Router.push(`/hashtag/${searchInput}`),
		[searchInput]
	)

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
					<SearchInput
						enterButton
						value={searchInput}
						onChange={onChangeSearchInput}
						onSearch={onSearch}
					/>
				</Menu.Item>
			</Menu>
			<Row gutter={8}>
				<Col xs={24} md={6}>
					{me ? <UserProfile /> : <LoginForm />}
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
