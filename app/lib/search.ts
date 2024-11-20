import Fuse from 'fuse.js';
import { PostData, getSortedPostsData } from './posts';

const fuseOptions = {
  keys: ['title', 'description', 'categories', 'topics'],
  threshold: 0.3,
  includeScore: true
};

export async function searchPosts(query: string, filters?: {
  date?: string,
  category?: string,
  topic?: string
}): Promise<PostData[]> {
  const posts = await getSortedPostsData();
  
  // Apply filters first
  let filteredPosts = posts;
  if (filters) {
    if (filters.date) {
      filteredPosts = filteredPosts.filter(post => 
        post.date.includes(filters.date!)
      );
    }
    if (filters.category) {
      filteredPosts = filteredPosts.filter(post => 
        post.categories.some(cat => 
          cat.toLowerCase() === filters.category!.toLowerCase()
        )
      );
    }
    if (filters.topic) {
      filteredPosts = filteredPosts.filter(post => 
        post.topics.some(topic => 
          topic.toLowerCase() === filters.topic!.toLowerCase()
        )
      );
    }
  }

  if (!query) return filteredPosts;

  // Apply fuzzy search
  const fuse = new Fuse(filteredPosts, fuseOptions);
  const results = fuse.search(query);
  
  return results.map(result => result.item);
}