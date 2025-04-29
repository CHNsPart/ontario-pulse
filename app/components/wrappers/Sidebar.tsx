import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData } from '@/app/lib/posts';
import { Tag } from '@/app/components/ui/Tag';
import type { PostData } from '@/app/lib/posts';
import { Calendar } from 'lucide-react';
import BlogPostAdUnit from '../ads/BlogPostAdUnit';

interface SidebarProps {
  currentPostId?: string;  // Optional: to exclude current post from recommendations
}

const Sidebar = async ({ currentPostId }: SidebarProps = {}) => {
  // Get all posts
  const posts = await getSortedPostsData();

  // Extract and count categories
  const categoryCount = posts.reduce((acc, post) => {
    post.categories.forEach(category => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Extract and count topics
  const topicCount = posts.reduce((acc, post) => {
    post.topics.forEach(topic => {
      acc[topic] = (acc[topic] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Sort categories by post count and get top 5
  const topCategories = Object.entries(categoryCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([category]) => category);

  // Sort topics by post count and get top 5
  const topTopics = Object.entries(topicCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([topic]) => topic);

  // Get recommended posts (excluding current post if provided)
  const recommendedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3);  // Get top 3 recent posts

  return (
    <div className="space-y-8 sticky top-24">

      {/* Categories Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Link href="/categories" className="text-red-500 text-sm hover:text-red-600">
            View All
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {topCategories.map((category) => (
            <Tag 
              key={category} 
              name={category} 
              type="category"
              className="flex items-center"
            />
          ))}
        </div>
      </div>

      {/* Topics Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Topics</h2>
          <Link href="/topics" className="text-red-500 text-sm hover:text-red-600">
            View All
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {topTopics.map((topic) => (
            <Tag 
              key={topic} 
              name={topic} 
              type="topic"
              className="flex items-center"
            />
          ))}
        </div>
      </div>

      {/* Recommended Posts Section */}
      <div className='space-y-6'>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recommended</h2>
        </div>
        <div className="space-y-4">
          {recommendedPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/posts/${post.id}`}
              className="group block"
            >
              <div className="flex gap-3">
                <div className="relative h-16 w-24 flex-shrink-0">
                  <Image
                    src={post.ogImage}
                    alt={post.title}
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 96px) 100vw, 96px"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-sm font-medium group-hover:text-red-500 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <BlogPostAdUnit size="square" position="sidebar" />
      </div>
    </div>
  );
};

export default Sidebar;