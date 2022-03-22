import { FC, useCallback, useState } from 'react'
import styled from 'styled-components'
import { PlusOutlined } from '@ant-design/icons'

import ImagesZoom from '@components/post/ImagesZoom'
import { BASE_URL } from '@lib/api'

const HalfImage = styled.img`
	display: inline-block;
	width: 50%;
`

const MoreBox = styled.div`
	display: inline-block;
	width: 50%;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
`

interface Props {
	images: { src: string }[]
}

const PostImages: FC<Props> = ({ images }) => {
	const [showImagesZoom, setShowImagesZoom] = useState(false)

	const onZoom = useCallback(() => setShowImagesZoom(true), [])
	const onClose = useCallback(() => setShowImagesZoom(false), [])

	if (images.length === 1) {
		return (
			<>
				<img
					src={`${BASE_URL}/${images[0].src}`}
					alt={`${BASE_URL}/${images[0].src}`}
					onClick={onZoom}
					role="presentation"
				/>
				{showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
			</>
		)
	}

	if (images.length === 2) {
		return (
			<>
				<HalfImage
					src={`${BASE_URL}/${images[0].src}`}
					alt={`${BASE_URL}/${images[0].src}`}
					onClick={onZoom}
					role="presentation"
				/>
				<HalfImage
					src={`${BASE_URL}/${images[1].src}`}
					alt={`${BASE_URL}/${images[1].src}`}
					onClick={onZoom}
					role="presentation"
				/>
				{showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
			</>
		)
	}

	return (
		<>
			<div>
				<HalfImage
					src={`${BASE_URL}/${images[0].src}`}
					alt={`${BASE_URL}/${images[0].src}`}
					role="presentation"
				/>
				<MoreBox onClick={onZoom} role="presentation">
					<PlusOutlined />
					<br />
					{images.length - 1}
					개의 사진 더보기
				</MoreBox>
			</div>
			{showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
		</>
	)
}

export default PostImages
