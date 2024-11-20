import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Tag } from './Tag';

interface BreadcrumbProps {
  categories: string[];
  topics: string[];
}

export const Breadcrumb = ({ categories, topics }: BreadcrumbProps) => {
  // If there are no categories or topics, we'll just show the home link
  if (!categories?.length && !topics?.length) {
    return (
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <Link href="/" className="hover:text-red-500">
          Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3 mb-4">
      {/* Basic breadcrumb navigation */}
      <div className="flex items-center text-sm text-gray-600">
        <Link href="/" className="hover:text-red-500">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/categories" className="hover:text-red-500">
          Categories
        </Link>
      </div>

      {/* Categories and Topics tags */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Categories */}
        {categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Categories:</span>
            {categories.map((category) => (
              <Tag
                key={category}
                name={category}
                type="category"
                className="!py-1 !px-3 text-xs"
              />
            ))}
          </div>
        )}

        {/* Visual separator if both categories and topics exist */}
        {categories?.length > 0 && topics?.length > 0 && (
          <span className="text-gray-300 mx-2">|</span>
        )}

        {/* Topics */}
        {topics?.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Topics:</span>
            {topics.map((topic) => (
              <Tag
                key={topic}
                name={topic}
                type="topic"
                className="!py-1 !px-3 text-xs"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};