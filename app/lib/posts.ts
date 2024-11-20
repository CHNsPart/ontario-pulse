'use server';

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  id: string;
  title: string;
  date: string;
  description: string;
  ogImage: string;
  contentHtml: string;
  categories: string[];
  topics: string[];
}

export async function getSortedPostsData(): Promise<PostData[]> {
  try {
    // Log the directory path
    console.log('Posts directory:', postsDirectory);
    
    const fileNames = await fs.promises.readdir(postsDirectory);
    console.log('Found files:', fileNames);
    
    const allPostsDataPromises = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async fileName => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        
        const fileContents = await fs.promises.readFile(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        
        return {
          id,
          title: matterResult.data.title,
          date: matterResult.data.date,
          description: matterResult.data.description,
          ogImage: matterResult.data.ogImage,
          categories: matterResult.data.categories || [],
          topics: matterResult.data.topics || [],
          contentHtml: ''
        };
    });

    const allPostsData = await Promise.all(allPostsDataPromises);
    console.log('Processed posts:', allPostsData);

    return allPostsData.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error in getSortedPostsData:', error);
    return [];
  }
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getSortedPostsData();
  const categoriesSet = new Set(
    posts.flatMap(post => post.categories || []).map(category => category.toLowerCase())
  );
  return Array.from(categoriesSet);
}

export async function getAllTopics(): Promise<string[]> {
  const posts = await getSortedPostsData();
  const topicsSet = new Set(
    posts.flatMap(post => post.topics || []).map(topic => topic.toLowerCase())
  );
  return Array.from(topicsSet);
}

export async function getTopicsByCategory(category: string): Promise<string[]> {
  const posts = await getSortedPostsData();
  const categoryPosts = posts.filter(
    post => post.categories?.some(cat => cat.toLowerCase() === category.toLowerCase())
  );
  const topicsSet = new Set(
    categoryPosts.flatMap(post => post.topics || []).map(topic => topic.toLowerCase())
  );
  return Array.from(topicsSet);
}

export async function getPostsByCategory(category: string): Promise<PostData[]> {
  const posts = await getSortedPostsData();
  return posts.filter(post => post.categories?.includes(category));
}

export async function getPostsByTopic(topic: string): Promise<PostData[]> {
  const posts = await getSortedPostsData();
  return posts.filter(
    post => post.topics?.some(t => t.toLowerCase() === topic.toLowerCase())
  );
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = await fs.promises.readFile(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as Omit<PostData, 'id' | 'contentHtml'>)
  };
}

export async function getAllPostIds() {
  const fileNames = await fs.promises.readdir(postsDirectory);
  return fileNames.map(fileName => ({
    id: fileName.replace(/\.md$/, '')
  }));
}