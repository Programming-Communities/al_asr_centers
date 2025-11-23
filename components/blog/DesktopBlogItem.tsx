'use client';
import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Post } from '@/types/blog';

interface DesktopBlogItemProps extends Post {
  index?: number;
  readingTime?: number;
  cardType?: 'featured' | 'trending' | 'category' | 'compact';
  views?: number | string;
}

const DesktopBlogItem: React.FC<DesktopBlogItemProps> = ({
  title,
  excerpt,
  categories,
  featuredImage,
  date,
  slug,
  index = 0,
  readingTime = 3,
  cardType = 'compact',
  views = '1.2k'
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  const router = useRouter();

  // ✅ Category-based styling
  const categoryConfig = useMemo(() => {
    const categoryName = categories?.nodes?.[0]?.name || 'Islamic';
    
    const configs: {[key: string]: {bg: string, icon: string, gradient: string}} = {
      'Quran': { 
        bg: 'bg-linear-to-r from-green-500 to-emerald-600', 
        icon: '📖', 
        gradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' 
      },
      'Prayer': { 
        bg: 'bg-linear-to-r from-blue-500 to-cyan-600', 
        icon: '🕌', 
        gradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20' 
      },
      'Hadith': { 
        bg: 'bg-linear-to-r from-purple-500 to-indigo-600', 
        icon: '💬', 
        gradient: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20' 
      },
      'Islamic History': { 
        bg: 'bg-linear-to-r from-amber-500 to-orange-600', 
        icon: '📜', 
        gradient: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20' 
      },
      'Fiqh': { 
        bg: 'bg-linear-to-r from-red-500 to-pink-600', 
        icon: '⚖️', 
        gradient: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20' 
      },
      'Daily Post': { 
        bg: 'bg-linear-to-r from-indigo-500 to-purple-600', 
        icon: '📅', 
        gradient: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20' 
      },
      'Calendar': { 
        bg: 'bg-linear-to-r from-teal-500 to-cyan-600', 
        icon: '📆', 
        gradient: 'from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20' 
      }
    };

    return configs[categoryName] || { 
      bg: 'bg-linear-to-r from-gray-500 to-gray-600', 
      icon: '📚', 
      gradient: 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700' 
    };
  }, [categories]);

  const cleanExcerpt = useMemo(() => {
    if (!excerpt) return 'Discover Islamic insights and wisdom...';
    const text = excerpt.replace(/<[^>]*>/g, '').trim();
    
    if (cardType === 'featured') return text.length > 150 ? `${text.substring(0, 150)}...` : text;
    if (cardType === 'trending') return text.length > 100 ? `${text.substring(0, 100)}...` : text;
    return text.length > 60 ? `${text.substring(0, 60)}...` : text;
  }, [excerpt, cardType]);

  const formattedDate = useMemo(() => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  }, [date]);

  // ✅ Navigation
  const handleNavigation = useCallback(() => {
    router.push(`/posts/${slug}`);
  }, [router, slug]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  // ✅ Better image handling with optimized loading
  const imageUrl = useMemo(() => {
    if (featuredImage?.node?.sourceUrl && !imageError) {
      return featuredImage.node.sourceUrl;
    }
    return null;
  }, [featuredImage, imageError]);

  const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

  // ✅ Default Compact Card (Mostly used)
  return (
    <div 
      className={`relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer group ${
        isHovered ? 'transform scale-[1.02] shadow-xl' : 'shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNavigation}
    >
      {/* Image Container with Better Handling */}
      <div className="relative h-48 w-full bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading={index < 4 ? "eager" : "lazy"}
              quality={80}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
            {imageLoading && (
              <div className="absolute inset-0 bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
            )}
          </>
        ) : (
          <div className={`flex items-center justify-center h-full bg-linear-to-br ${categoryConfig.gradient}`}>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">{categoryConfig.icon}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">Islamic Content</p>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`${categoryConfig.bg} text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm`}>
            {categories?.nodes?.[0]?.name || 'Islamic'}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-lg backdrop-blur-sm">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Read Article</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed mb-3">
          {cleanExcerpt}
        </p>
        
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs">
          <span>📅 {formattedDate}</span>
          <div className="flex items-center gap-2">
            <span>⏱️ {readingTime} min</span>
            <span>•</span>
            <span>👁️ {views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DesktopBlogItem);