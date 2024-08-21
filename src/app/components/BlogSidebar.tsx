import React from 'react';
import { Blog } from '../../types/blogTypes';

interface BlogSidebarProps {
  relatedBlogs: Blog[];
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ relatedBlogs }) => {
  return (
    <aside className="w-1/4 bg-white p-4">
      <h2 className="text-lg font-semibold text-red-500">Related Posts</h2>
      <div className="flex flex-col space-y-4">
        {relatedBlogs.map((blog, index) => (
          <div key={index} className="card bg-gray-100 p-3">
            <h3 className="text-md font-semibold">{blog.title}</h3>
            <p>{blog.description}</p>
            <a href={`/blog/${blog.slug}`} className="text-blue-500 hover:text-blue-600">Read more</a>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default BlogSidebar;
