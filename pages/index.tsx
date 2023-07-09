import Link from "next/link";

const HomePage = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-zinc-800">
			<Link
				href="/slideshow"
				className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
			>
				Start Slideshow
			</Link>
		</div>
	);
};

export default HomePage;
