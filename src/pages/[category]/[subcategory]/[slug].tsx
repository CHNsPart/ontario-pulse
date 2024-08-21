"use client"

// Import React and Next.js essentials
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { Blog, Content, ImageContent } from '../../../types/blogTypes';  

const BlogPage = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const router = useRouter();
  const { category, subcategory, slug } = router.query;

  useEffect(() => {
    fetch('/api/blogs')
      .then(response => response.json())
      .then((blogs: Blog[]) => {
        const currentBlog = blogs.find(b => b.category === category && b.subcategory === subcategory && b.slug === slug);
        const related = blogs.filter(b => b.subcategory === subcategory && b.slug !== slug);
        setBlog(currentBlog ?? null);
        setRelatedBlogs(related);
      });
  }, [category, subcategory, slug]);

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-8 bg-red-500">
      {/* Blog Content Section */}
      <main className="flex-grow p-5 bg-white shadow-md rounded-md md:w-2/3">
        {blog ? (
          <div>
            <h1 className="text-4xl font-bold leading-tight mb-4">{blog.title}</h1>
            {blog.content.map((content, index) => {
              switch (content.type) {
                case 'title':
                  return <h2 key={index} className="text-3xl font-semibold mt-6 mb-2">{content.text}</h2>;
                case 'subtitle':
                  return <h3 key={index} className="text-2xl font-medium mt-4 mb-2">{content.text}</h3>;
                case 'paragraph':
                  return <p key={index} className="text-lg leading-relaxed mb-4">{content.text}</p>;
                case 'smallText':
                  return <small key={index} className="text-sm block mt-2">{content.text}</small>;
                case 'quote':
                  return <blockquote key={index} className="italic border-l-4 border-gray-300 pl-4 my-4">{content.text}</blockquote>;
                case 'italic':
                  return <em key={index} className="block mt-2 mb-4">{content.text}</em>;
                case 'image':
                  if (content.src && content.alt) {
                    return (
                      <div key={index} className="my-6">
                        <Image 
                          src={content.src} 
                          alt={content.alt} 
                          width={600} 
                          height={400} 
                          layout="responsive" 
                          className="rounded-md"
                        />
                      </div>
                    );
                  } else {
                    return null;
                  }
                default:
                  return null;
              }
            })}
          </div>
        ) : <p>Blog not found.</p>}
      </main>

      {/* Related Blogs Section */}
      <aside className="w-full md:w-1/3 p-5 bg-gray-100 shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Related Posts</h2>
        <div className="grid grid-cols-1 gap-4">
          {relatedBlogs.map(blog => (
            <div key={blog.slug} className="bg-white p-4 rounded-md shadow-md">
              <Image src={blog.imageUrl || '/images/default.jpg'} alt="Related Blog" width={280} height={175} layout="responsive" className="rounded-md" />
              <h3 className="text-lg font-medium mt-2">{blog.title}</h3>
              <p className="text-sm text-gray-600">{blog.description}</p>
              <Link href={`/${blog.category}/${blog.subcategory}/${blog.slug}`}>
                <span className="text-red-500 hover:underline mt-2 inline-block">Read more</span>
              </Link>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default BlogPage;
