import { getPostsByCategory, getAllCategories } from '@/app/lib/posts';
import { BlogCard } from '@/app/components/ui/BlogCard';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/app/components/JsonLd';

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
    category: category.toLowerCase().replace(/ /g, '-'),
  }));
}

export default async function CategoryPage({ params }: Props) {
  // Properly decode the URL parameter
  const categoryParam = decodeURIComponent(params.category).replace(/-/g, ' ');
  
  // Fetch posts with case-insensitive matching
  const allCategories = await getAllCategories();
  
  // Find the correct case version of the category
  const exactCategory = allCategories.find(
    cat => cat.toLowerCase() === categoryParam.toLowerCase()
  );
  
  // If we can't find the category, return 404
  if (!exactCategory) {
    notFound();
  }
  
  // Use the exact case version to get posts
  const posts = await getPostsByCategory(exactCategory);

  if (posts.length === 0) {
    notFound();
  }

  // Create structured data for the category page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "headline": `${exactCategory} Articles - Ontario Pulse`,
    "description": `Browse all articles related to ${exactCategory} on Ontario Pulse`,
    "url": `https://ontariopulse.com/categories/${exactCategory.toLowerCase().replace(/ /g, '-')}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://ontariopulse.com/posts/${post.id}`,
        "name": post.title
      }))
    }
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{exactCategory}</h1>
        
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
    </>
  );
}