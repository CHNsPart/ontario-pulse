'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HomeIcon, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAllCategories } from '@/app/lib/posts';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    
    // Fetch categories when component mounts
    const fetchCategories = async () => {
      try {
        const allCategories = await getAllCategories();
        // Get first 4 categories (or adjust number as needed)
        setCategories(allCategories.slice(0, 4));
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback categories in case of error
        setCategories(['Technology', 'Business', 'Health', 'Community']);
      }
    };

    fetchCategories();
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="text-[150px] font-bold text-red-500/10 select-none md:text-[200px]">
            404
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-gray-900 whitespace-nowrap">
            Page Not Found
          </div>
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-600 text-lg max-w-md mx-auto"
        >
          {"Oops! The page you're looking for seems to have vanished into the digital ether."}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors group"
          >
            <HomeIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>Go Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Go Back</span>
          </button>

          <Link
            href="/search"
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors group"
          >
            <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>Search</span>
          </Link>
        </motion.div>

        {/* Suggested Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-8 border-t"
        >
          <h2 className="text-lg font-semibold mb-4">
            Popular Categories
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors hover:text-red-500"
              >
                {category}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}