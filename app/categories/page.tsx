import { getAllCategories, getTopicsByCategory } from '@/app/lib/posts';
import Link from 'next/link';
import { Tag } from '@/app/components/ui/Tag';

export const metadata = {
  title: 'Categories - Ontario Pulse',
  description: 'Browse all categories on Ontario Pulse',
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Categories</h1>
      
      <div className="grid gap-8">
        {categories.map(async category => {
          const topics = await getTopicsByCategory(category);
          
          return (
            <div key={category} className="border rounded-lg p-6">
              <Link 
                href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
                className="text-xl font-semibold text-red-500 hover:text-red-600 mb-4 block"
              >
                {category}
              </Link>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {topics.map(topic => (
                  <Tag 
                    key={topic} 
                    name={topic}
                    type="topic"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}