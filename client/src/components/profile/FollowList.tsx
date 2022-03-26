import { FC, useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button, Card, List } from 'antd'
import { StopOutlined } from '@ant-design/icons'

import {
	loadFollowersAction,
	loadFollowingsAction,
	removeFollowerAction,
	unfollowAction
} from '@store/actions/user'
import { UserDataType } from '@typings/user'
import { RootState } from '@store/reducers'

const ListWrapper = styled(List)`
	margin-bottom: 20px;
`

const LoadMore = styled.div`
	text-align: center;
	margin: 10px 0;
`

const ListItem = styled(List.Item)`
	margin-top: 20px;
`

interface Props {
	header: '팔로잉 목록' | '팔로워 목록'
	data?: UserDataType[]
}

const FollowList: FC<Props> = ({ header, data }) => {
	const dispatch = useDispatch()
	const { loadFollowersLoading, loadFollowingsLoading } = useSelector(
		(state: RootState) => state.user
	)

	const [limit, setLimit] = useState(6)

	const onClickAddFollow = useCallback(() => {
		header === '팔로잉 목록'
			? dispatch(loadFollowingsAction(limit))
			: dispatch(loadFollowersAction(limit))
		setLimit(prev => prev + 3)
	}, [dispatch, header, limit])

	const onClickUnFollow = useCallback(
		(id: number) => () =>
			header === '팔로잉 목록'
				? dispatch(unfollowAction(id))
				: dispatch(removeFollowerAction(id)),
		[dispatch, header]
	)

	const listGrid = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), [])

	return (
		<ListWrapper
			grid={listGrid}
			size="small"
			header={<div>{header}</div>}
			loadMore={
				<LoadMore>
					<Button
						onClick={onClickAddFollow}
						loading={loadFollowersLoading || loadFollowingsLoading}
					>
						더 보기
					</Button>
				</LoadMore>
			}
			bordered
			dataSource={data}
			renderItem={(item, index) => (
				<ListItem key={index}>
					<Card
						actions={[<StopOutlined key="stop" />]}
						onClick={onClickUnFollow((item as UserDataType).id)}
					>
						<Card.Meta description={(item as { nickname: string }).nickname} />
					</Card>
				</ListItem>
			)}
		/>
	)
}

export default FollowList
