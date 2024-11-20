import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

interface BlogCardProps {
  title: string;
  date: string;
  image: string;
  slug: string;
  preview?: string;
}

export const BlogCard = ({ title, date, image, slug, preview }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).replace(',', '');
  };
  return (
    <Link href={`/posts/${slug}`} className="group block">
      <div className="rounded-lg overflow-hidden bg-white h-full shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold group-hover:text-red-500 transition-colors line-clamp-2">
            {title}
          </h2>
          
          <div className="flex items-center mt-3 text-sm text-red-500">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(date)}
          </div>
          
          {preview && (
            <p className="mt-2 text-gray-600 line-clamp-2">
              {preview}
            </p>
          )}
          
          <div className="mt-4 text-red-500 text-sm font-medium">
            Read More
          </div>
        </div>
      </div>
    </Link>
  );
};