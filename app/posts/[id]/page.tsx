import type { Metadata } from "next";
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { type PostData, getPostData, getSortedPostsData } from '@/app/lib/posts';
import { Breadcrumb } from '@/app/components/ui/Breadcrumb';
import { ShareButtons } from '@/app/components/ui/ShareButtons';
import Sidebar from '@/app/components/wrappers/Sidebar';
import { Calendar } from 'lucide-react';
import { RecommendedPosts } from "@/app/components/ui/RecommendedPosts";
import { TableOfContentsSidebar } from "@/app/components/wrappers/TableOfContentsSidebar";
import ScrollProgressBar from "@/app/components/ui/ScrollProgressBar";
import JsonLd from "@/app/components/JsonLd";
import BlogPostAdUnit from "@/app/components/ads/BlogPostAdUnit";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const postData = await getPostData(params.id);
    
    let keywords = [
      ...postData.categories,
      ...postData.topics,
      "ontario news",
      "canada updates",
      "ontario pulse",
      "canadian lifestyle",
      "ontario events",
      "canada trending",
      "ontario living",
      "british columbia news",
      "alberta updates",
      "saskatchewan events",
      "manitoba highlights",
      "quebec news",
      "new brunswick updates",
      "nova scotia living",
      "prince edward island events",
      "newfoundland and labrador news",
      "yukon territory",
      "northwest territories",
      "nunavut updates",
      "canadian provinces"
    ];
    
    if (postData.keywords) {
      keywords = [...keywords, ...postData.keywords];
    }
    
    const uniqueKeywords = Array.from(new Set(keywords.map(k => k.toLowerCase())));
    return {
      title: `${postData.title} - Ontario Pulse`,
      description: postData.description,
      keywords: uniqueKeywords,
      openGraph: {
        images: [
          {
            url: postData.ogImage,
            alt: postData.title,
          },
        ],
        title: postData.title,
        description: postData.description,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: postData.title,
        description: postData.description,
        images: [postData.ogImage],
      },
    };
  } catch (error) {
    return {
      title: 'Article Not Found - Ontario Pulse',
      description: 'The requested article could not be found.',
    };
  }
}

export default async function Post({ params }: { params: { id: string } }) {
  try {
    const [postData, allPosts] = await Promise.all([
      getPostData(params.id),
      getSortedPostsData()
    ]);

    // If no post data is found, redirect to not-found
    if (!postData) {
      notFound();
    }
    
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).replace(',', '');
    };

    const keywordsForSchema = [
      ...postData.categories,
      ...postData.topics,
      "british columbia news",
      "alberta updates",
      "saskatchewan events",
      "manitoba highlights",
      "quebec news",
      "new brunswick updates",
      "nova scotia living",
      "prince edward island events",
      "newfoundland and labrador news",
      "canadian provinces",
      "ontario news",
      "ontario pulse",
      "canadian lifestyle"
    ];
    
    if (postData.keywords) {
      keywordsForSchema.push(...postData.keywords);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": postData.title,
      "description": postData.description,
      "image": postData.ogImage,
      "datePublished": postData.date,
      "keywords": keywordsForSchema,
      "author": {
        "@type": "Organization",
        "name": "Ontario Pulse",
        "url": "https://ontariopulse.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Ontario Pulse",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ontariopulse.com/icon_logo.svg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://ontariopulse.com/posts/${params.id}`
      }
    };

    return (
      <>
        <JsonLd data={structuredData} />
        <ScrollProgressBar />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-14 gap-6 relative">
            {/* Left Sidebar - Table of Contents */}
            <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
              <div className="sticky top-20 overflow-y-auto max-h-[calc(100vh-6rem)]">
                <TableOfContentsSidebar contentId="post-content" />
                <BlogPostAdUnit size="square" position="sidebar" />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8 xl:col-span-9">
              <article className="max-w-3xl mx-auto mb-12">
                <Breadcrumb 
                  categories={postData.categories} 
                  topics={postData.topics}
                />

                <h1 className="text-3xl font-bold leading-tight mb-4">
                  {postData.title}
                </h1>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-red-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <time>{formatDate(postData.date)}</time>
                  </div>
                  <ShareButtons url={`/posts/${postData.id}`} />
                </div>

                {postData.ogImage && (
                  <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                    <Image
                      src={postData.ogImage}
                      alt={postData.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                <BlogPostAdUnit size="banner" position="top" />

                <div 
                  id="post-content"
                  className="prose max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
                />

                <BlogPostAdUnit size="rectangle" position="bottom" />

                <div className="flex justify-end">
                  <ShareButtons url={`/posts/${postData.id}`} />
                </div>

                <BlogPostAdUnit size="banner" position="bottom" />
              </article>

              <div className="max-w-3xl mx-auto">
                <RecommendedPosts 
                  posts={allPosts}
                  currentPostId={params.id}
                />
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-20 overflow-y-auto max-h-[calc(100vh-6rem)]">
                <Sidebar currentPostId={params.id} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    notFound();
  }
}