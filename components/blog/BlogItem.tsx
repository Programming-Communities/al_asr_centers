'use client';
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SocialShareButtons from '../shared/SocialShareButtons';
import { Post } from '@/types/blog';
import { CardLoader } from '../shared/CardLoader'; // ✅ ADD THIS IMPORT

interface BlogItemProps extends Post {
  index?: number;
  readingTime?: number;
  views?: number;
  priority?: boolean;
}

const BlogItem: React.FC<BlogItemProps> = ({
  title,
  excerpt,
  categories,
  featuredImage,
  date,
  slug,
  index = 0,
  readingTime = 3,
  views = 0,
  priority = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [showSocialMenu, setShowSocialMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCardLoading, setIsCardLoading] = useState(false); // ✅ ADD CARD LOADING STATE
  
  const socialMenuRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ✅ Optimized memoized values
  const postUrl = useMemo(() => 
    typeof window !== 'undefined' ? `${window.location.origin}/posts/${slug}` : '',
    [slug]
  );

  const cleanExcerpt = useMemo(() => {
    if (!excerpt) return 'Discover insights and valuable information in this post...';
    const text = excerpt.replace(/<[^>]*>/g, '').trim();
    return text.length > 120 ? `${text.substring(0, 120)}...` : text;
  }, [excerpt]);

  const category = useMemo(() => {
    const categoryName = categories?.nodes?.[0]?.name || 'Islamic Insights';
    return categoryName.length > 15 ? `${categoryName.substring(0, 15)}...` : categoryName;
  }, [categories]);

  const formattedDate = useMemo(() => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  }, [date]);

  // ✅ UPDATED: Navigation handler with CARD loading
  const handleNavigation = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCardLoading(true); // ✅ SHOW CARD LOADER
    
    // Navigate after a small delay to show loader
    setTimeout(() => {
      router.push(`/posts/${slug}`);
    }, 100);
  }, [router, slug]);

  const handleShareClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSocialMenu(prev => !prev);
  }, []);

  const closeSocialMenu = useCallback(() => {
    setShowSocialMenu(false);
  }, []);

  // ✅ Optimized Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ✅ Optimized click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (socialMenuRef.current && !socialMenuRef.current.contains(event.target as Node)) {
        setShowSocialMenu(false);
      }
    };

    if (showSocialMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSocialMenu]);

  // ✅ Optimized image handlers
  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  // ✅ Optimized blur data URL
  const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

  return (
    <article 
      ref={cardRef}
      className={`group relative w-full bg-white/90 dark:bg-gray-900/90 border-2 border-red-900/20 dark:border-red-800/30 rounded-xl backdrop-blur-sm transition-all duration-300 ease-out cursor-pointer mx-auto overflow-hidden will-change-transform ${
        isHovered 
          ? 'border-red-900/40 dark:border-red-800/60 shadow-[-8px_8px_20px_rgba(153,27,27,0.3)] dark:shadow-[-8px_8px_20px_rgba(127,29,29,0.4)] transform -translate-y-1 scale-[1.02]' 
          : 'shadow-sm'
      }`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-out, transform 0.2s ease-out, box-shadow 0.2s ease-out'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ✅ CARD LOADER - Shows on card click */}
      {isCardLoading && <CardLoader size="md" />}

      {/* Image Container - Optimized */}
      <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div 
          className="block h-full w-full cursor-pointer"
          onClick={handleNavigation}
          aria-label={`Read article: ${title}`}
        >
          {featuredImage?.node?.sourceUrl && !imageError ? (
            <>
              <Image
                src={featuredImage.node.sourceUrl}
                alt={featuredImage.node.altText || title}
                width={400}
                height={240}
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading={index < 3 ? "eager" : "lazy"}
                priority={index < 2}
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                quality={65}
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
              
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              )}

              {/* Read Article Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-semibold bg-red-600/90 px-3 py-2 rounded-lg backdrop-blur-sm">
                  Read Article
                </span>
              </div>
            </>
          ) : (
            <div 
              className="flex flex-col items-center justify-center h-full w-full bg-gray-100 dark:bg-gray-800 p-4 text-center cursor-pointer"
              onClick={handleNavigation}
            >
              <div className="flex flex-col items-center gap-2">
                <svg className="w-8 h-8 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {imageError ? 'Image unavailable' : 'Featured Image'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        {/* Meta Information */}
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={date}>{formattedDate}</time>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{readingTime} min</span>
          </div>
        </div>

        {/* Title */}
        <div 
          className="mb-2 cursor-pointer"
          onClick={handleNavigation}
        >
          <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight hover:text-red-700 dark:hover:text-red-400 transition-colors duration-200">
            {title}
          </h3>
        </div>

        {/* Excerpt */}
        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed mb-3">
          {cleanExcerpt}
        </p>

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
          {/* Categories */}
          <div className="flex items-center max-w-[70%]">
            <span className="text-xs text-red-700 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md border border-red-200 dark:border-red-800 truncate">
              {category}
            </span>
          </div>

          {/* Share Button */}
          <div className="relative" ref={socialMenuRef}>
            <button
              className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200 backdrop-blur-sm border ${
                showSocialMenu 
                  ? 'bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' 
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 border-gray-200/50 dark:border-gray-700/50 hover:bg-red-50 dark:hover:bg-red-900/30'
              }`}
              onClick={handleShareClick}
              aria-label="Share this post"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 00-5.368-2.684z" />
              </svg>
            </button>

            {showSocialMenu && (
              <div className="absolute right-0 bottom-full mb-2 bg-white/95 dark:bg-gray-900/95 border border-gray-200/50 dark:border-gray-700/50 rounded-lg shadow-xl p-2 z-50 backdrop-blur-sm min-w-[140px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Share
                  </span>
                  <button
                    onClick={closeSocialMenu}
                    className="p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <SocialShareButtons 
                  title={title} 
                  url={postUrl}
                  excerpt={cleanExcerpt}
                  onShare={closeSocialMenu}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default React.memo(BlogItem);