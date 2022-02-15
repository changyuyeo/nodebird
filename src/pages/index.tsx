import { useSelector } from 'react-redux'

import { RootState } from '@store/reducers'
import AppLayout from '@components/layout/AppLayout'
import PostForm from '@components/post/PostForm'
import PostCard from '@components/post/PostCard'

const IndexPage = () => {
	const { isLoggedIn } = useSelector((state: RootState) => state.user)
	const { mainPosts } = useSelector((state: RootState) => state.post)

	return (
		<AppLayout>
			{isLoggedIn && <PostForm />}
			{mainPosts.map(mainPost => (
				<PostCard key={mainPost.id} post={mainPost} />
			))}
		</AppLayout>
	)
}

export default IndexPage
