'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SocialShareButtons from '../shared/SocialShareButtons';

interface SearchBlogItemProps {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  categories: {
    nodes: Array<{
      slug: string;
      name: string;
    }>;
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  index?: number;
}

const SearchBlogItem: React.FC<SearchBlogItemProps> = ({
  title,
  excerpt,
  categories,
  featuredImage,
  date,
  slug,
  index = 0
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [showSocialMenu, setShowSocialMenu] = useState(false);

  const cleanExcerpt = excerpt
    ? excerpt.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
    : 'Read more about this post...';

  const category = categories?.nodes?.[0]?.name || 'General';
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const isLCPCandidate = index < 3;

  // Close social menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSocialMenu) {
        setShowSocialMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showSocialMenu]);

  return (
    <div className='max-w-[330px] bg-white dark:bg-gray-800 border border-red-900 dark:border-red-800 hover:shadow-[-7px_7px_0px_#8b0000bb] dark:hover:shadow-[-7px_7px_0px_#7f1d1d] transition-all duration-300 cursor-pointer mx-auto group'>
      <Link href={`/posts/${slug}`} className="block">
        <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          {featuredImage?.node?.sourceUrl && !imageError ? (
            <>
              <Image
                src={featuredImage.node.sourceUrl}
                alt={featuredImage.node.altText || title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => setImageError(true)}
                onLoad={() => setImageLoading(false)}
                loading={isLCPCandidate ? "eager" : "lazy"}
                priority={isLCPCandidate}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 animate-pulse z-10 flex items-center justify-center">
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Loading...</div>
                </div>
              )}
            </>
          ) : (
            <div className='flex items-center justify-center h-full bg-linear-to-br from-red-50 to-red-100 dark:from-gray-700 dark:to-gray-600'>
              <div className='text-center p-4'>
                <svg className="w-12 h-12 text-red-300 dark:text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className='text-red-400 dark:text-gray-300 text-sm'>
                  {imageError ? 'Failed to load image' : 'No Image Available'}
                </p>
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className='p-5'>
        <div className='flex justify-between items-center mb-4'>
          <span className='bg-red-900 dark:bg-red-800 text-white text-sm px-4 py-2 rounded-full font-medium min-h-11 flex items-center'>
            {category}
          </span>
          
          <div className="relative">
            <button
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowSocialMenu(!showSocialMenu);
              }}
              aria-label="Share options"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
              </svg>
            </button>

            {showSocialMenu && (
              <div 
                className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-10 min-w-[200px]"
                onClick={(e) => e.stopPropagation()}
              >
                <SocialShareButtons title={title} slug={slug} excerpt={cleanExcerpt} />
              </div>
            )}
          </div>
        </div>

        <Link href={`/posts/${slug}`} className="block">
          <h3 className='mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 min-h-14 leading-tight group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors duration-200'>
            {title}
          </h3>
        </Link>

        <p className='mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3 min-h-[60px] leading-relaxed'>
          {cleanExcerpt}
        </p>

        <div className='flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700'>
          <span className='text-xs text-gray-500 dark:text-gray-400 font-medium py-2'>
            {formattedDate}
          </span>
          <Link
            href={`/posts/${slug}`}
            className='inline-flex items-center font-medium text-red-900 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors text-sm group/link px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 min-h-11'
          >
            Read More
            <svg className='ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchBlogItem;