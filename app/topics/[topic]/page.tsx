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
  // Convert hyphens back to spaces
  const topicParam = params.topic.replace(/-/g, ' ');
  
  // Find the exact topic for title
  const allTopics = await getAllTopics();
  const exactTopic = allTopics.find(
    topic => topic.toLowerCase() === topicParam.toLowerCase()
  );
  
  const topicTitle = exactTopic || topicParam;
  
  return {
    title: `${topicTitle} - Ontario Pulse`,
    description: `Browse all ${topicTitle} articles on Ontario Pulse`,
  };
}

export async function generateStaticParams() {
  const topics = await getAllTopics();
  return topics.map((topic) => ({
    topic: topic.toLowerCase().replace(/ /g, '-'),
  }));
}

export default async function TopicPage({ params }: Props) {
  const topicParam = params.topic.replace(/-/g, ' ');
  
  // Find the exact topic with correct case
  const allTopics = await getAllTopics();
  const exactTopic = allTopics.find(
    topic => topic.toLowerCase() === topicParam.toLowerCase()
  );

  // If we can't find the topic, return 404
  if (!exactTopic) {
    notFound();
  }

  const posts = await getPostsByTopic(exactTopic);

  if (posts.length === 0) {
    notFound();
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{exactTopic}</h1>
      
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