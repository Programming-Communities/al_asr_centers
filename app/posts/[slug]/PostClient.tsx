'use client';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Post } from '@/types/blog';
import ReadingControls from '@/components/shared/ReadingControls';
import { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client/react';

// Updated Social Sharing Component
function PostSocialShareButtons({ title, slug, isRTL }: { 
  title: string; 
  slug: string; 
  isRTL: boolean; 
}) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/posts/${slug}`;
    }
    return `/posts/${slug}`;
  };

  const shareOnPlatform = (platform: string) => {
    const shareUrl = getShareUrl();
    const shareText = `${title} - Al Asr Islamic Service`;
    
    const platforms: { [key: string]: string } = {
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`
    };

    const windowFeatures = 'width=600,height=400,menubar=no,toolbar=no,location=no';
    const newWindow = window.open(platforms[platform], '_blank', windowFeatures);
    
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  const copyToClipboard = async () => {
    const shareUrl = getShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const socialButtons = [
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      color: 'bg-green-600 hover:bg-green-700',
      icon: '📱'
    },
    {
      key: 'facebook',
      label: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      icon: '🔵'
    },
    {
      key: 'twitter',
      label: 'Twitter',
      color: 'bg-sky-500 hover:bg-sky-600',
      icon: '🐦'
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      color: 'bg-blue-700 hover:bg-blue-800',
      icon: '💼'
    },
    {
      key: 'telegram',
      label: 'Telegram',
      color: 'bg-blue-400 hover:bg-blue-500',
      icon: '✈️'
    },
    {
      key: 'reddit',
      label: 'Reddit',
      color: 'bg-orange-600 hover:bg-orange-700',
      icon: '🔺'
    }
  ];

  return (
    <div className={`mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="mb-4">
        <span className={`text-sm font-semibold text-gray-700 dark:text-gray-300 ${isRTL ? 'ml-2' : 'mr-2'}`}>
          Share this post:
        </span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-2xl">
        {socialButtons.map((button) => (
          <button
            key={button.key}
            onClick={() => shareOnPlatform(button.key)}
            className={`flex flex-col items-center justify-center p-3 ${button.color} text-white rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 min-h-20`}
            title={`Share on ${button.label}`}
            aria-label={`Share on ${button.label}`}
          >
            <span className="text-xl mb-1">{button.icon}</span>
            <span className="text-xs font-medium">{button.label}</span>
          </button>
        ))}
        
        {/* Copy Link Button */}
        <button
          onClick={copyToClipboard}
          className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 min-h-20 ${
            copied 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
          title={copied ? "Copied!" : "Copy link"}
          aria-label={copied ? "Link copied" : "Copy link to clipboard"}
        >
          {copied ? (
            <>
              <span className="text-xl mb-1">✅</span>
              <span className="text-xs font-medium">Copied!</span>
            </>
          ) : (
            <>
              <span className="text-xl mb-1">📋</span>
              <span className="text-xs font-medium">Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Post Meta Information Component (Fixed categories error)
function PostMetaInfo({ post, isRTL }: { 
  post: Post; 
  isRTL: boolean; 
}) {
  const readingTime = (content: string) => {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Safe categories access
  const categories = post.categories?.nodes || [];

  return (
    <div className={`bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300`}>
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-red-900 dark:text-red-400">📖</span>
          <span>{readingTime(post.content)}</span>
        </div>
      
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-red-900 dark:text-red-400">📅</span>
          <span>Published on {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}</span>
        </div>
      
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-red-900 dark:text-red-400">👤</span>
          <span>By {post.author?.node?.name || 'Admin'}</span>
        </div>
      </div>
    
      {categories.length > 0 && (
        <div className={`mt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          <span className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${isRTL ? 'ml-2' : 'mr-2'}`}>
            Categories:
          </span>
          {categories.map((category, index) => (
            <span
              key={category.slug}
              className={`inline-block bg-red-900 dark:bg-red-800 text-white text-xs px-3 py-1 rounded-full ${isRTL ? 'ml-2' : 'mr-2'} mb-2 min-h-6 flex items-center`}
            >
              {category.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Main Post Client Component
interface PostClientProps {
  post: Post;
  slug: string;
  isUrdu: boolean;
}

export default function PostClient({ post, slug, isUrdu }: PostClientProps) {
  const isTitleRTL = isUrdu;
  const isContentRTL = isUrdu;
  const currentIsRTL = isTitleRTL || isContentRTL;
  const apolloClient = useApolloClient();

  const [fontSize, setFontSize] = useState(100);
  const [readingTheme, setReadingTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const contentElement = document.getElementById('blog-content');
    if (contentElement) {
      contentElement.style.fontSize = `${fontSize}%`;
      contentElement.style.lineHeight = fontSize > 115 ? '2.2' : '1.8';
    }
  }, [fontSize]);

  useEffect(() => {
    const root = document.documentElement;
    if (readingTheme === 'dark') {
      root.classList.add('reading-dark');
    } else {
      root.classList.remove('reading-dark');
    }
  }, [readingTheme]);

  // Prefetch related posts when component mounts
  useEffect(() => {
    // This will be used for cache prefetching in future
  }, [apolloClient]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      readingTheme === 'dark' 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-white dark:bg-gray-900'
    }`}>
      <Header />
    
      <div className="py-8">
        <article
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          dir={currentIsRTL ? "rtl" : "ltr"}
        >
          {/* Featured Image */}
          {post.featuredImage?.node?.sourceUrl && (
            <div className="w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div className="relative w-full h-[500px] mx-auto">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-contain object-center bg-black"
                  priority
                  sizes="100vw"
                />
              </div>
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Title */}
            <h1
              className={`text-3xl md:text-4xl font-bold mb-6 leading-tight ${
                currentIsRTL ? 'text-right' : 'text-left'
              } ${readingTheme === 'dark' ? 'text-gray-100' : 'text-gray-900 dark:text-white'}`}
              style={{
                fontFamily: currentIsRTL 
                  ? "'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif" 
                  : "system-ui, -apple-system, sans-serif"
              }}
            >
              {post.title}
            </h1>

            {/* Meta Information */}
            <PostMetaInfo post={post} isRTL={currentIsRTL} />

            {/* Main Content */}
            <div
              id="blog-content"
              className={`wp-content max-w-none transition-all duration-300 ${
                currentIsRTL ? 'urdu-arabic-content' : 'english-content'
              } ${readingTheme === 'dark' ? 'text-gray-300' : 'text-gray-700 dark:text-gray-300'}`}
              style={{
                fontFamily: currentIsRTL 
                  ? "'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif" 
                  : "system-ui, -apple-system, sans-serif",
                textAlign: currentIsRTL ? 'right' : 'left'
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Updated Social Sharing */}
            <PostSocialShareButtons title={post.title} slug={slug} isRTL={currentIsRTL} />

            {/* Back to Posts */}
            <div className={`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 ${currentIsRTL ? 'text-right' : 'text-left'}`}>
                    <Link
                href="/"
                className={`inline-flex items-center gap-2 bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-lg transition-colors duration-200 ${
                  currentIsRTL ? 'flex-row-reverse' : ''
                }`}
                prefetch={true}
              >
                <svg
                  className={`w-5 h-5 ${currentIsRTL ? 'ml-2' : 'mr-2'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to All Posts
              </Link>
            </div>
          </div>
        </article>
      </div>

      {/* Reading Controls */}
      <ReadingControls 
        onFontSizeChange={setFontSize}
        onThemeChange={setReadingTheme}
      />

      {/* Global Styles for Content */}
      <style jsx global>{`
        .wp-content {
          color: inherit;
          transition: all 0.3s ease;
        }

        .wp-content p {
          margin-bottom: 1.5rem;
          color: inherit;
        }

        .wp-content h1, .wp-content h2, .wp-content h3, 
        .wp-content h4, .wp-content h5, .wp-content h6 {
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.3;
          color: inherit;
        }

        .wp-content h1 { font-size: 2.5rem; }
        .wp-content h2 { font-size: 2rem; }
        .wp-content h3 { font-size: 1.75rem; }
        .wp-content h4 { font-size: 1.5rem; }
        .wp-content h5 { font-size: 1.25rem; }
        .wp-content h6 { font-size: 1.125rem; }

        /* Urdu/Arabic Content Styling */
        .urdu-arabic-content {
          font-family: 'Noto Nastaliq Urdu', 'Noto Sans Arabic', 'Scheherazade New', serif;
          text-align: right;
        }

        .urdu-arabic-content h1, 
        .urdu-arabic-content h2, 
        .urdu-arabic-content h3, 
        .urdu-arabic-content h4, 
        .urdu-arabic-content h5, 
        .urdu-arabic-content h6 {
          font-family: 'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif;
          text-align: right;
        }

        .urdu-arabic-content h1 { font-size: 2.8rem; }
        .urdu-arabic-content h2 { font-size: 2.4rem; }
        .urdu-arabic-content h3 { font-size: 2rem; }
        .urdu-arabic-content h4 { font-size: 1.6rem; }
        .urdu-arabic-content h5 { font-size: 1.4rem; }
        .urdu-arabic-content h6 { font-size: 1.2rem; }

        /* English Content Styling */
        .english-content {
          font-family: system-ui, -apple-system, sans-serif;
          text-align: left;
        }

        .english-content h1, 
        .english-content h2, 
        .english-content h3, 
        .english-content h4, 
        .english-content h5, 
        .english-content h6 {
          font-family: system-ui, -apple-system, sans-serif;
          text-align: left;
        }

        /* Reading Dark Mode */
        .reading-dark {
          --tw-bg-opacity: 1;
          background-color: rgb(17 24 39 / var(--tw-bg-opacity)) !important;
        }

        .reading-dark .wp-content {
          color: rgb(209 213 219) !important;
        }

        .reading-dark .wp-content h1,
        .reading-dark .wp-content h2,
        .reading-dark .wp-content h3,
        .reading-dark .wp-content h4,
        .reading-dark .wp-content h5,
        .reading-dark .wp-content h6 {
          color: rgb(249 250 251) !important;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .wp-content h1 { font-size: 2rem; }
          .wp-content h2 { font-size: 1.75rem; }
          .wp-content h3 { font-size: 1.5rem; }
          
          .urdu-arabic-content h1 { font-size: 2.2rem; }
          .urdu-arabic-content h2 { font-size: 1.9rem; }
          .urdu-arabic-content h3 { font-size: 1.6rem; }
        }
      `}</style>
    </div>
  );
}