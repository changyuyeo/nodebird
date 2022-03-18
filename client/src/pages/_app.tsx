import { AppProps } from 'next/app'
import Head from 'next/head'

import wrapper from '@store/index'
import 'antd/dist/antd.css'

const App = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<title>NodeBird</title>
		</Head>
		<Component {...pageProps} />
	</>
)

export default wrapper.withRedux(App)
