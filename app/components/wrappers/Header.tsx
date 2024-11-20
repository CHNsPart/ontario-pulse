'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, TrendingUp } from 'lucide-react';
import { getAllCategories } from '@/app/lib/posts';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await getAllCategories();
        // Get top 3 categories
        setCategories(allCategories.slice(0, 3));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-20">
            <Image src="/logo.svg" alt="Logo" width={160} height={160} priority />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/categories" 
              className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Trending</span>
            </Link>
            
            {categories.map((category) => (
              <Link
                key={category}
                href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {category}
              </Link>
            ))}

            <Link 
              href="/search" 
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 relative z-20"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsMenuOpen(false)} />
        )}

        {/* Mobile Menu */}
        <div
          className={`
            fixed inset-x-0 top-0 z-10 bg-white transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-y-5 top-10 h-screen' : '-translate-y-full'}
            md:hidden
            max-h-[calc(100vh-4rem)] overflow-y-auto
          `}
        >
          <nav className="container mx-auto px-4 py-6 space-y-6">
            {/* Search Bar for Mobile */}
            <Link 
              href="/search"
              className="flex items-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg w-full justify-center mb-6"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search className="h-5 w-5" />
              <span>Search Articles</span>
            </Link>

            <div className="border-b pb-4">
              <Link 
                href="/categories"
                className="flex items-center gap-2 text-red-500 font-medium mb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <TrendingUp className="h-5 w-5" />
                Trending Categories
              </Link>
              
              <div className="space-y-4">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
                    className="block text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </Link>
                ))}
                <Link
                  href="/categories"
                  className="block text-gray-600 hover:text-gray-900 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View All Categories
                </Link>
              </div>
            </div>

            {/* Additional Mobile Menu Items */}
            <div className="space-y-4">
              <Link
                href="/about"
                className="block text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;