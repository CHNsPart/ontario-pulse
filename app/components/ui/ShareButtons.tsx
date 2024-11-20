'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { SocialIcon } from 'react-social-icons';

interface ShareButtonsProps {
  url: string;
}

export const ShareButtons = ({ url }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  
  // Construct full URL
  const fullUrl = `https://ontariopulse.com${url}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Social Icons */}
      <SocialIcon 
        url={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}`}
        network="twitter"
        target="_blank"
        style={{ width: 35, height: 35 }}
        className="hover:scale-110 transition-transform"
      />
      <SocialIcon 
        url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`}
        network="facebook"
        target="_blank"
        style={{ width: 35, height: 35 }}
        className="hover:scale-110 transition-transform"
      />
      <SocialIcon 
        url={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`}
        network="linkedin"
        target="_blank"
        style={{ width: 35, height: 35 }}
        className="hover:scale-110 transition-transform"
      />
      <SocialIcon 
        url={`https://api.whatsapp.com/send?text=${encodeURIComponent(fullUrl)}`}
        network="whatsapp"
        target="_blank"
        style={{ width: 35, height: 35 }}
        className="hover:scale-110 transition-transform"
      />
      
      {/* Copy Link Button */}
      <button 
        onClick={copyToClipboard}
        className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors ml-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-green-500 text-sm">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            <span className="text-sm">Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
};