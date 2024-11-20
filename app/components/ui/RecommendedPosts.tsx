import { BlogCard } from './BlogCard';
import type { PostData } from '@/app/lib/posts';

interface RecommendedPostsProps {
  posts: PostData[];
  currentPostId: string;
}

export const RecommendedPosts = ({ posts, currentPostId }: RecommendedPostsProps) => {
  // Filter out current post and get 4 recommended posts
  const recommendedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 4);

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendedPosts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            date={post.date}
            image={post.ogImage}
            slug={post.id}
            preview={post.description}
          />
        ))}
      </div>
    </section>
  );
};