import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* <link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
				/> */}
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/highlightjs-themes@1.0.0/monokai_sublime.css"
				/>
				{/* <link
					rel="stylesheet"
					href="https://unpkg.com/browse/highlightjs@9.16.2/styles/monokai.css"
				/> */}
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
