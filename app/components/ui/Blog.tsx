import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
	postName: string;
};

const Blog = ({ postName }: Props) => {
	// Path to your markdown file
	const filePath = path.join(process.cwd(), `./posts/${postName}.md`);
	const fileContents = fs.readFileSync(filePath, "utf-8");

	const { content } = matter(fileContents);

	return (
		<div className="prose mx-auto p-4">
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
		</div>
	);
};

export default Blog;
