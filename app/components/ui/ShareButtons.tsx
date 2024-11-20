'use client';

import { Share2, Copy } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
}

export const ShareButtons = ({ url }: ShareButtonsProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex items-center space-x-4">
      <button 
        onClick={() => {}} 
        className="flex items-center text-gray-600 hover:text-red-500"
      >
        <Share2 className="h-5 w-5 mr-2" />
        Share This
      </button>
      <button 
        onClick={copyToClipboard} 
        className="flex items-center text-gray-600 hover:text-red-500"
      >
        <Copy className="h-5 w-5 mr-2" />
        Copy Link
      </button>
    </div>
  );
};