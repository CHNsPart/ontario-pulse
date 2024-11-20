import { getAllCategories, getTopicsByCategory } from '@/app/lib/posts';
import { Tag } from '@/app/components/ui/Tag';

export const metadata = {
  title: 'Topics - Ontario Pulse',
  description: 'Browse all topics on Ontario Pulse',
};

export default async function TopicsPage() {
  const categories = await getAllCategories();
  const topicsPromises = categories.map(async category => ({
    category,
    topics: await getTopicsByCategory(category)
  }));
  
  const allTopics = await Promise.all(topicsPromises);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Topics</h1>
      
      <div className="grid gap-8">
        {allTopics.map(({ category, topics }) => (
          <div key={category} className="border rounded-lg p-6">
            <Tag 
              name={category}
              type="category"
              className="mb-4"
            />
            <div className="flex flex-wrap gap-2">
              {topics.map(topic => (
                <Tag 
                  key={topic} 
                  name={topic}
                  type="topic"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}