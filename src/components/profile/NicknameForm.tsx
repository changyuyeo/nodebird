import styled from 'styled-components'
import { Form, Input } from 'antd'

const FormWrapper = styled(Form)`
	margin-bottom: 20px;
	border: 1px solid #d9d9d9;
	padding: 20px;
`

const NicknameForm = () => {
	return (
		<FormWrapper>
			<Input.Search addonBefore="닉네임" enterButton="수정" />
		</FormWrapper>
	)
}

export default NicknameForm
