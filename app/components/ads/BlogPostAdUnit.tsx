'use client';

import Link from 'next/link';
import React from 'react';

interface AdUnitProps {
  size: 'rectangle' | 'banner' | 'square';
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
}

const AdUnitSize = {
  rectangle: 'w-full max-w-[336px] h-[280px]', // 336×280 - Large Rectangle
  banner: 'w-full max-w-[728px] h-[90px]',     // 728×90 - Leaderboard
  square: 'w-full max-w-[300px] h-[250px]'     // 300×250 - Medium Rectangle
};

const BlogPostAdUnit = ({ size, position }: AdUnitProps) => {
  // Generate a random ad variant for demonstration
  const variant = Math.floor(Math.random() * 3) + 1;
  
  const bgColor = [
    'bg-gradient-to-r from-blue-500 to-blue-600',
    'bg-gradient-to-r from-purple-500 to-purple-600',
    'bg-gradient-to-r from-gray-500 to-gray-600'
  ][variant - 1];
  
  return (
    <div className={`mx-auto my-6 ${position === 'sidebar' ? 'mt-4 mb-6' : 'my-8'}`}>
      <div className={`${AdUnitSize[size]} relative overflow-hidden rounded-lg shadow-md mx-auto`}>
        {/* Ad content */}
        <div className={`h-full w-full ${bgColor} flex flex-col items-center justify-center text-white p-4`}>
          <p className="font-bold text-lg mb-2">Advertise Your Business Here</p>
          <p className="text-center text-sm mb-4">Reach thousands of engaged Ontario readers</p>
          <a 
            href="mailto:oonkoo.mail@gmail.com" 
            className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
          <Link 
            href="/ad-price-breakdown"
            className="text-white text-xs hover:underline mt-3"
          >
            See Pricing
          </Link>
        </div>
        
        {/* Ad label */}
        <div className="absolute top-1 left-1 bg-black/30 text-white text-xs px-2 py-0.5 rounded">
          Advertisement
        </div>
      </div>
    </div>
  );
};

export default BlogPostAdUnit;