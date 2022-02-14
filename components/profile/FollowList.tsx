import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { Button, Card, List } from 'antd'
import { StopOutlined } from '@ant-design/icons'

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
	header: string
	data: {
		nickname: string
	}[]
}

const FollowList: FC<Props> = ({ header, data }) => {
	const listGrid = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), [])

	return (
		<ListWrapper
			grid={listGrid}
			size="small"
			header={<div>{header}</div>}
			loadMore={
				<LoadMore>
					<Button>더 보기</Button>
				</LoadMore>
			}
			bordered
			dataSource={data}
			renderItem={(item, index) => (
				<ListItem key={index}>
					<Card actions={[<StopOutlined key="stop" />]}>
						<Card.Meta description={(item as { nickname: string }).nickname} />
					</Card>
				</ListItem>
			)}
		/>
	)
}

export default FollowList
