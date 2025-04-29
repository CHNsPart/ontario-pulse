import { type PostData, getSortedPostsData } from "./lib/posts";
import { BlogCard } from "./components/ui/BlogCard";
import Sidebar from "./components/wrappers/Sidebar";
import HomeAdBannerSlider from "./components/ads/HomeAdBannerSlider";

export default async function Home() {
  console.log('Starting Home page render');
  let allPostsData: PostData[] = [];
  
  try {
    allPostsData = await getSortedPostsData();
    console.log('Posts received:', allPostsData);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
      <HomeAdBannerSlider />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.isArray(allPostsData) ? (
              allPostsData.map(post => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  date={post.date}
                  image={post.ogImage || '/images/default-blog.jpg'}
                  slug={post.id}
                  preview={post.description}
                />
              ))
            ) : (
              <div>No posts available</div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}