import Link from "next/link";
import { type PostData, getSortedPostsData } from "./lib/posts"; // Ensure the correct path

export default function Home() {
	const allPostsData: PostData[] = getSortedPostsData();
	console.log(allPostsData);

	return (
		<section className="w-full h-screen flex flex-col justify-start p-5">
			<h1 className="text-4xl font-bold py-5">Ontario Pulse</h1>
			<ul className="border w-full">
				{allPostsData.map(({ id, date, title }) => (
					<li className="border" key={id}>
						<Link href={`/posts/${id}`}>{title}</Link>
						<br />
						<small>{date}</small>
					</li>
				))}
			</ul>
		</section>
	);
}
