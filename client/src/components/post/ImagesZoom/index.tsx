import { FC, useState } from 'react'
import Slick from 'react-slick'

import {
	Overlay,
	Header,
	CloseBtn,
	SlickWrapper,
	ImgWrapper,
	Indicator,
	Global
} from '@components/post/ImagesZoom/styles'
import { BASE_URL } from '@lib/api'

interface Props {
	images: { src: string }[]
	onClose: () => void
}

const ImagesZoom: FC<Props> = ({ images, onClose }) => {
	const [currentSlide, setCurrentSlide] = useState(0)

	return (
		<Overlay>
			<Global />
			<Header>
				<h1>상세 이미지</h1>
				<CloseBtn onClick={onClose} />
			</Header>
			<SlickWrapper>
				<div>
					<Slick
						initialSlide={0}
						beforeChange={(_, newSlide) => setCurrentSlide(newSlide)}
						infinite
						arrows={false}
						slidesToShow={1}
						slidesToScroll={1}
					>
						{images.map(v => (
							<ImgWrapper key={v.src}>
								<img src={`${BASE_URL}/${v.src}`} alt={v.src} />
							</ImgWrapper>
						))}
					</Slick>
					<Indicator>
						<div>
							{currentSlide + 1} /{images.length}
						</div>
					</Indicator>
				</div>
			</SlickWrapper>
		</Overlay>
	)
}

export default ImagesZoom
