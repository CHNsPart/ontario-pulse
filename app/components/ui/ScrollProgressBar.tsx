"use client"
import { useState, useEffect } from 'react';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      // Calculate how far we've scrolled
      const scrollPx = document.documentElement.scrollTop;
      // Calculate the total scrollable height
      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      // Convert to percentage      
      setScrollProgress(scrollPx / winHeight * 100);
    };

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress);

    // Cleanup
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-16 left-0 w-full h-1 z-50">
      <div 
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(to right, #FF0000, #520000)`,
        }}
        className="h-full transition-all duration-100"
      />
    </div>
  );
};

export default ScrollProgressBar;