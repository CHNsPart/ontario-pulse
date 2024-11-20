import { getPostsByTopic, getAllTopics } from '@/app/lib/posts';
import { BlogCard } from '@/app/components/ui/BlogCard';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: { topic: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const topic = decodeURIComponent(params.topic);
  return {
    title: `${topic} - Ontario Pulse`,
    description: `Browse all ${topic} articles on Ontario Pulse`,
  };
}

export async function generateStaticParams() {
  const topics = await getAllTopics();
  return topics.map((topic) => ({
    topic: topic.toLowerCase(),
  }));
}

export default async function TopicPage({ params }: Props) {
  const topic = decodeURIComponent(params.topic);
  const posts = await getPostsByTopic(topic);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{topic}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
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
    </div>
  );
}