'use client';

import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { getAllCategories, getAllTopics } from '@/app/lib/posts';

interface SearchBarProps {
  onSearch: (query: string, filters: {
    date?: string;
    category?: string;
    topic?: string;
  }) => void;
  initialQuery?: string;
  initialCategory?: string;
  initialTopic?: string;
  initialDate?: string;
}

export const SearchBar = ({ 
  onSearch, 
  initialQuery = '',
  initialCategory = '',
  initialTopic = '',
  initialDate = ''
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    date: initialDate,
    category: initialCategory,
    topic: initialTopic
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, topicsData] = await Promise.all([
          getAllCategories(),
          getAllTopics()
        ]);
        setCategories(categoriesData);
        setTopics(topicsData);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    onSearch(query, filters);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 border rounded-lg hover:bg-gray-50"
        >
          <Filter className="h-5 w-5" />
        </button>
      </div>

      {showFilters && (
        <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={filters.topic}
            onChange={(e) => setFilters({ ...filters, topic: e.target.value })}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Topics</option>
            {topics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>

          <input
            type="month"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      )}
    </div>
  );
};