'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Standard leaderboard ad size: 728×90
// Standard large rectangle ad size: 336×280
// We'll use large rectangle as it works well across devices

interface Slide {
  id: number;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  background: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Your Window to Ontario",
    description: "Join our community to discover the hottest trends, news, and stories happening across Canada.",
    ctaText: "Explore More",
    ctaLink: "/categories",
    background: "bg-gradient-to-r from-red-500 to-red-700"
  },
  {
    id: 2,
    title: "Advertise With Us",
    description: "Reach thousands of engaged Ontario readers interested in local stories and trends.",
    ctaText: "Contact Us",
    ctaLink: "mailto:oonkoo.mail@gmail.com",
    background: "bg-gradient-to-r from-blue-500 to-blue-700"
  },
  {
    id: 3,
    title: "Promote Your Business",
    description: "Get your brand in front of our growing community of Canadian readers.",
    ctaText: "Email Now",
    ctaLink: "mailto:oonkoo.mail@gmail.com",
    background: "bg-gradient-to-r from-purple-500 to-purple-700"
  }
];

const HomeAdBannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);
  
  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);
  
  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [nextSlide]);
  
  return (
    <div className="w-full mx-auto mb-8 overflow-hidden rounded-lg">
      <div className="relative h-[280px] w-full mx-auto">
        {/* Navigation buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full p-1 text-white shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full p-1 text-white shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        {/* Slides */}
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`absolute inset-0 w-full h-full flex items-center transition-all duration-500 ease-in-out ${
                index === currentSlide 
                  ? "opacity-100 translate-x-0" 
                  : index < currentSlide 
                    ? "opacity-0 -translate-x-full" 
                    : "opacity-0 translate-x-full"
              }`}
            >
              <div className={`w-full h-full ${slide.background} text-white flex flex-col items-center justify-center px-6 py-4`}>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3">{slide.title}</h3>
                  <p className="mb-4 max-w-md mx-auto">{slide.description}</p>
                  
                  {slide.ctaText && slide.ctaLink && (
                    <a 
                      href={slide.ctaLink} 
                      className="inline-block px-6 py-2 bg-white text-red-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {slide.ctaText}
                    </a>
                  )}
                </div>
                  {/* See Prices link - added to all slides */}
                  <Link 
                    href="/ad-price-breakdown"
                    className="inline-block mt-3 text-white hover:underline text-sm"
                  >
                    See Advertising Prices
                  </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Indicators */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Ad label */}
        <div className="absolute top-1 left-1 bg-black/30 text-white text-xs px-2 py-0.5 rounded">
          Advertisement
        </div>
      </div>
    </div>
  );
};

export default HomeAdBannerSlider;