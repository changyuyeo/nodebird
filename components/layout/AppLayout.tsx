import { FC } from 'react'
import Link from 'next/link'

const AppLayout: FC = ({ children }) => {
	return (
		<div>
			<Link href="/">
				<a>노드버드</a>
			</Link>
			<Link href="/profile">
				<a>프로필</a>
			</Link>
			<Link href="signup">
				<a>회원가입</a>
			</Link>
			<div>공통메뉴</div>
			{children}
		</div>
	)
}

export default AppLayout
