import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ontariopulse.com';
  
  // Static blog posts
  const posts = [
    {
      url: `${baseUrl}/posts/Most-Searched-Topics-Blog`,
      lastModified: new Date('2024-11-20'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/posts/pgwp-in-ontario-step-by-step-process`,
      lastModified: new Date('2024-11-20'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/posts/Top-5-AI-Tools-for-Full-Stack-Development-in-2024`,
      lastModified: new Date('2024-11-19'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/posts/Top-10-Halal-Meat-Markets-in-Ontario-Canada`,
      lastModified: new Date('2024-11-19'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Categories
  const categories = [
    'technology',
    'trends',
    'digital-culture',
    'immigration',
    'education',
    'programming',
    'lifestyle',
    'food',
    'ontario'
  ].map(category => ({
    url: `${baseUrl}/categories/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Topics
  const topics = [
    'search-trends',
    'digital-analytics',
    'popular-topics',
    'pgwp',
    'international-students',
    'work-permits',
    'canadian-immigration',
    'ai-tools',
    'full-stack-development',
    'web-development',
    'halal-food',
    'ontario-shopping',
    'halal-markets'
  ].map(topic => ({
    url: `${baseUrl}/topics/${topic}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/topics`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  return [...staticPages, ...posts, ...categories, ...topics];
}