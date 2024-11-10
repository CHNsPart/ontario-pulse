import type { Metadata } from "next";
import Blog from "../../components/Blog";
import { type PostData, getAllPostIds, getPostData } from "../../lib/posts";

export async function generateMetadata({
	params,
}: { params: { id: string } }): Promise<Metadata> {
	const postData = await getPostData(params.id);
	return {
		title: postData.title,
		description: postData.description,
		openGraph: {
			images: [
				{
					url: postData.ogImage,
					alt: postData.title,
				},
			],
			title: postData.title,
			description: postData.description,
		},
	};
}

export default async function Post({ params }: { params: { id: string } }) {
	const postData: PostData = await getPostData(params.id);
	console.log({ params });
	return (
		// <article>
		// 	<h1 className="text-2xl font-bold leading-loose">{postData.title}</h1>
		// 	<div
		// 		className="space-y-5"
		// 		dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
		// 	/>
		// </article>

		<Blog postName={postData.id} />
	);
}

export async function generateStaticParams() {
	const ids = getAllPostIds();
	return ids.map((id) => ({ id: id.id }));
}