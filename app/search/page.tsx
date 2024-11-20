'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SearchBar } from '@/app/components/ui/SearchBar';
import { BlogCard } from '@/app/components/ui/BlogCard';
import type { PostData } from '@/app/lib/posts';
import { Loader2 } from 'lucide-react';

export default function SearchPage() {
  const [results, setResults] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const performSearch = async (query: string, filters: {
    date?: string;
    category?: string;
    topic?: string;
  }) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (filters.category) params.set('category', filters.category);
      if (filters.topic) params.set('topic', filters.topic);
      if (filters.date) params.set('date', filters.date);

      // Update URL with search params
      router.push(`/search?${params.toString()}`);

      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setResults(data.data);
      } else {
        console.error('Search failed:', data.error);
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial search based on URL params
  useEffect(() => {
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const topic = searchParams.get('topic') || '';
    const date = searchParams.get('date') || '';

    if (query || category || topic || date) {
      performSearch(query, { category, topic, date });
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Articles</h1>
      
      <div className="mb-8">
        <SearchBar 
          onSearch={performSearch}
          initialQuery={searchParams.get('q') || ''}
          initialCategory={searchParams.get('category') || ''}
          initialTopic={searchParams.get('topic') || ''}
          initialDate={searchParams.get('date') || ''}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-red-500" />
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-gray-600">
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(post => (
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

          {results.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500">No articles found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}