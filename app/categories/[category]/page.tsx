import { getPostsByCategory, getAllCategories } from '@/app/lib/posts';
import { BlogCard } from '@/app/components/ui/BlogCard';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: { category: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const category = decodeURIComponent(params.category);
  return {
    title: `${category} - Ontario Pulse`,
    description: `Browse all ${category} articles on Ontario Pulse`,
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export default async function CategoryPage({ params }: Props) {
  const category = decodeURIComponent(params.category);
  const posts = await getPostsByCategory(category);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{category}</h1>
      
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