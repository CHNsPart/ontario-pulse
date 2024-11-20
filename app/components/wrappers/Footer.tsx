// app/components/wrappers/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getAllCategories } from '@/app/lib/posts';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await getAllCategories();
        // Get top 5 categories
        setCategories(allCategories.slice(0, 5));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-8">
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-6">
            <Link href="/" className="block w-fit">
              <Image
                src="/logo.svg"
                alt="Ontario Pulse Logo"
                width={140}
                height={140}
                className="h-auto"
              />
            </Link>
            <p className="text-gray-600 text-sm mt-4 max-w-md">
              Your trusted source for Ontario news and updates. 
              Stay informed with the latest stories from your community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h3 className="font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/"
                  className="text-gray-600 hover:text-red-500 text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/search"
                  className="text-gray-600 hover:text-red-500 text-sm transition-colors"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h3 className="font-semibold mb-4 text-gray-900">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link 
                    href={`/categories/${category.toLowerCase()}`}
                    className="text-gray-600 hover:text-red-500 text-sm transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/categories"
                  className="text-red-500 hover:text-red-600 text-sm transition-colors inline-flex items-center gap-1"
                >
                  View All
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div>
              © {currentYear} Ontario Pulse. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-red-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-red-500 transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;