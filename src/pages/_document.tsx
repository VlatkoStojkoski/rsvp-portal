import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '../components/Navbar';

const DocumentElement = () => {
	return (
		<Html lang="en">
			<Head>
				<meta name="description" content="A simple project starter to build amazing apps" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<Navbar />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

export default DocumentElement;