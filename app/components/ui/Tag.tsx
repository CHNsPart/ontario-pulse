import Link from 'next/link';

interface TagProps {
  name: string;
  type: 'category' | 'topic';
  className?: string;
}

export const Tag = ({ name, type, className = "" }: TagProps) => {
  const href = type === 'category' 
    ? `/categories/${encodeURIComponent(name.toLowerCase())}` 
    : `/topics/${encodeURIComponent(name.toLowerCase())}`;

  return (
    <Link 
      href={href}
      className={`inline-block px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm ${className}`}
    >
      {name}
    </Link>
  );
};