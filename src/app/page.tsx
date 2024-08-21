"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';

interface Blog {
  slug: string;
  title: string;
  author: string;
  datePublished: string;
  description: string;
  imageUrl: string;
  category: string;
  subcategory: string;
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // Ensure the endpoint matches your API route
    fetch('/api/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Failed to load blogs:', error));
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen w-full">
      <main className="p-24 flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl font-bold text-center">Welcome to Ontario Pulse</h1>
        <p className="text-xl mt-4 text-center">Your prime source for in-depth news and analysis across various sectors in Ontario.</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {blogs.map(blog => (
            <div key={blog.slug} className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col">
              <Image src={blog.imageUrl || '/images/default-image.jpg'} alt="Blog Image" width={600} height={400} layout="responsive" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{blog.title}</div>
                <p className="text-gray-700 text-base">
                  {blog.description}
                </p>
                <Link href={`/${blog.category}/${blog.subcategory}/${blog.slug}`}>
                  <span className="mt-5 inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">Read More</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
