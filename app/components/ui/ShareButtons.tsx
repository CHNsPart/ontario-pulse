'use client';

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { SocialIcon } from 'react-social-icons';

interface ShareButtonsProps {
  url: string;
}

export const ShareButtons = ({ url }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const [showMobileShare, setShowMobileShare] = useState(false);
  
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

  const socialLinks = [
    {
      network: 'twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}`
    },
    {
      network: 'facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`
    },
    {
      network: 'linkedin',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`
    },
    {
      network: 'whatsapp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(fullUrl)}`
    }
  ];

  return (
    <div className="relative">
      {/* Mobile Share Button */}
      <div className="md:hidden">
        <button
          onClick={() => setShowMobileShare(!showMobileShare)}
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2"
        >
          <Share2 className="h-4 w-4" />
          <span className="text-sm">Share</span>
        </button>

        {/* Mobile Share Menu */}
        {showMobileShare && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setShowMobileShare(false)}
            />
            
            {/* Share Menu */}
            <div className="absolute right-0 bottom-full mb-2 bg-white rounded-lg shadow-lg p-4 z-50 min-w-64">
              <div className="grid grid-cols-4 gap-4 mb-4">
                {socialLinks.map((link) => (
                  <SocialIcon
                    key={link.network}
                    url={link.url}
                    network={link.network}
                    target="_blank"
                    style={{ width: 40, height: 40 }}
                    className="hover:scale-110 transition-transform"
                  />
                ))}
              </div>
              
              <button 
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-2 w-full text-gray-600 hover:text-red-500 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2"
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
          </>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center gap-3">
        {socialLinks.map((link) => (
          <SocialIcon
            key={link.network}
            url={link.url}
            network={link.network}
            target="_blank"
            style={{ width: 35, height: 35 }}
            className="hover:scale-110 transition-transform"
          />
        ))}
        
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
    </div>
  );
};

export default ShareButtons;