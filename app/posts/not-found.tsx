// app/posts/not-found.tsx
import Link from 'next/link';
import { HomeIcon, ArrowLeft, Search } from 'lucide-react';

// Move this to a separate page since this should be a server component
export default function PostNotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        {/* Article Not Found Text */}
        <div className="relative">
          <div className="text-[150px] font-bold text-red-500/10 select-none md:text-[200px]">
            404
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-gray-900 whitespace-nowrap">
            Article Not Found
          </div>
        </div>

        {/* Message */}
        <p className="text-gray-600 text-lg max-w-md mx-auto">
          {"We couldn't find the article you're looking for. It might have been moved, deleted, or never existed."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors group"
          >
            <HomeIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>Latest Articles</span>
          </Link>
          
          <Link
            href="/categories"
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Browse Categories</span>
          </Link>

          <Link
            href="/search"
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors group"
          >
            <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>Search Articles</span>
          </Link>
        </div>

        {/* Static Categories */}
        <div className="pt-8 border-t">
          <h2 className="text-lg font-semibold mb-4">
            Popular Categories
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {['Technology', 'Business', 'Health', 'Community'].map((category) => (
              <Link
                key={category}
                href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors hover:text-red-500"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}