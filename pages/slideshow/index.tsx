import { CONTENT_PATH, contentPath } from "@/utils/mdxUtils";
import { readFileSync } from "fs";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import path from "path";
import { useEffect, useState } from "react";
import rehypeHighlight from "rehype-highlight/lib";

const H1 = ({ children }: { children: React.ReactNode }) => (
	<h1 className="text-4xl font-bold">{children}</h1>
);

const Center = ({ children }: { children: React.ReactNode }) => (
	<div className="flex justify-center">{children}</div>
);

export default function TestPage({ slides }: { slides: any }) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [transitionClass, setTransitionClass] = useState("");

	useEffect(() => {
		let listner = (e: KeyboardEvent) => {
			if (e.key === "ArrowRight") {
				setCurrentSlide((prev) => {
					if (prev === slides.length - 1) return prev;

					return prev + 1;
				});
				setTransitionClass("right-to-left");
			}

			if (e.key === "ArrowLeft") {
				setCurrentSlide((prev) => {
					if (prev === 0) return prev;

					return prev - 1;
				});
				setTransitionClass("left-to-right");
			}
		};

		window.addEventListener("keydown", listner);

		return () => {
			window.removeEventListener("keydown", listner);
		};
	}, [currentSlide]);

	return (
		<>
			<Head>
				<title>Slideshow</title>
			</Head>
			<div className="flex overflow-x-hidden flex-col items-center justify-center bg-zinc-800 min-h-screen text-white">
				{slides.map((slide: any, index: number) => {
					if (index !== currentSlide) return null;

					return (
						<div
							key={slide}
							className={`prose-invert mx-auto prose-2xl m-8 
							prose-pre:m-0 
							prose-table:border prose-table:border-gray-500
							prose-tr:border-b prose-tr:border-gray-500
							prose-th:text-center prose-th:p-1 prose-th:border-l prose-th:border-gray-500
							prose-table:mx-auto
							prose-table:prose-lg
							prose-td:border-l prose-td:border-gray-500
							prose-table:min-w-full

							${transitionClass}`}
						>
							<MDXRemote {...slide} components={{ H1, Center }} />
						</div>
					);
				})}

				<div className="fixed bottom-4 left-4">{currentSlide}</div>
			</div>
		</>
	);
}

export async function getServerSideProps() {
	const content = contentPath.map(async (filePath) => {
		const source = await serialize(
			readFileSync(path.join(CONTENT_PATH, filePath)).toString(),
			{
				mdxOptions: {
					rehypePlugins: [rehypeHighlight],
				},
			}
		);
		return {
			source,
			index: filePath.split(".")[0],
		};
	});

	let source = await Promise.all(content);

	source.sort((a, b) => {
		// @ts-ignore
		return a.index - b.index;
	});

	let slides = source.map((slide) => slide.source);

	return {
		props: {
			slides,
		},
	};
}
