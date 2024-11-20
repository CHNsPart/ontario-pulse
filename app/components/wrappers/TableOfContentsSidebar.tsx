'use client';

import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface HeadingInfo {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsSidebarProps {
  contentId: string;
}

export const TableOfContentsSidebar = ({ contentId }: TableOfContentsSidebarProps) => {
  const [headings, setHeadings] = useState<HeadingInfo[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const contentElement = document.getElementById(contentId);
    if (!contentElement) return;

    const headingElements = contentElement.querySelectorAll('h1, h2, h3');
    
    const headingsInfo: HeadingInfo[] = Array.from(headingElements).map((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
      }
      
      return {
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName[1]),
      };
    });

    setHeadings(headingsInfo);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [contentId]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="w-full pr-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Table of Contents
      </h2>
      
      <div className="space-y-2">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={`
              block w-full text-left text-sm
              ${heading.level === 1 ? 'pl-0' : heading.level === 2 ? 'pl-3' : 'pl-6'}
              ${
                activeId === heading.id
                  ? 'text-red-500 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }
              transition-colors duration-200
              group
            `}
          >
            <div className="flex items-center">
              <ChevronRight
                className={`
                  h-3 w-3 min-w-[12px] mr-1 transition-transform
                  ${activeId === heading.id ? 'text-red-500' : 'text-gray-400'}
                  ${activeId === heading.id ? 'rotate-90' : 'rotate-0'}
                  group-hover:translate-x-1
                `}
              />
              <span className="line-clamp-2">{heading.text}</span>
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};