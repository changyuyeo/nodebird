import { AppProps } from 'next/app'
import Head from 'next/head'

import 'antd/dist/antd.css'

const App = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<title>NodeBird</title>
		</Head>
		<Component {...pageProps} />
	</>
)

export default App
