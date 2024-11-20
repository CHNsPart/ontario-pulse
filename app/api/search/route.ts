import { NextResponse } from 'next/server';
import { getSortedPostsData } from '@/app/lib/posts';
import Fuse from 'fuse.js';

const fuseOptions = {
  keys: ['title', 'description', 'categories', 'topics'],
  threshold: 0.3,
  includeScore: true
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category');
    const topic = searchParams.get('topic');
    const date = searchParams.get('date');

    const posts = await getSortedPostsData();
    
    // Apply filters
    let filteredPosts = posts;
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.categories.some(cat => 
          cat.toLowerCase() === category.toLowerCase()
        )
      );
    }
    if (topic) {
      filteredPosts = filteredPosts.filter(post => 
        post.topics.some(t => 
          t.toLowerCase() === topic.toLowerCase()
        )
      );
    }
    if (date) {
      filteredPosts = filteredPosts.filter(post => 
        post.date.includes(date)
      );
    }

    // Apply search if query exists
    if (query) {
      const fuse = new Fuse(filteredPosts, fuseOptions);
      const results = fuse.search(query);
      filteredPosts = results.map(result => result.item);
    }

    return NextResponse.json({ success: true, data: filteredPosts });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search posts' },
      { status: 500 }
    );
  }
}