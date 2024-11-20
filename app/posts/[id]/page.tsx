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

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const postData = await getPostData(params.id);
    return {
      title: `${postData.title} - Ontario Pulse`,
      description: postData.description,
      openGraph: {
        images: [
          {
            url: postData.ogImage,
            alt: postData.title,
          },
        ],
        title: postData.title,
        description: postData.description,
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

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-14 gap-6 relative">
          {/* Left Sidebar - Table of Contents */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <div className="sticky top-20 overflow-y-auto max-h-[calc(100vh-6rem)]">
              <TableOfContentsSidebar contentId="post-content" />
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
                  <time>{postData.date}</time>
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

              <div 
                id="post-content"
                className="prose max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
              />

              <ShareButtons url={`/posts/${postData.id}`} />
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
    );
  } catch (error) {
    notFound();
  }
}