// app/privacy/page.tsx
import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Metadata } from 'next';
import { Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - Ontario Pulse',
  description: "Ontario Pulse's Privacy Policy outlines how we collect, use, and protect your personal information.",
};

interface PrivacyPolicy {
  contentHtml: string;
  title: string;
  date: string;
  description: string;
  ogImage: string;
}

async function getPrivacyPolicy(): Promise<PrivacyPolicy> {
  const filePath = path.join(process.cwd(), 'documents', 'privacy-policy.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    ogImage: data.ogImage as string,
  };
}

export default async function PrivacyPage() {
  const policy = await getPrivacyPolicy();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{policy.title}</h1>
          
          <div className="flex items-center text-red-500 mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            <time>{policy.date}</time>
          </div>

          <div className="prose max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: policy.contentHtml }} 
              className="bg-white rounded-lg p-6 shadow-sm"
            />
          </div>
        </header>
      </div>
    </div>
  );
}