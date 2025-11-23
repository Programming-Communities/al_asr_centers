'use client';
import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Post } from '@/types/blog';

interface MobileBlogItemProps extends Post {
  index?: number;
  readingTime?: number;
  cardType?: 'featured' | 'trending' | 'category' | 'latest' | 'compact' | 'minimal' | 'detailed';
  categoryType?: string;
  views?: number;
}

const MobileBlogItem: React.FC<MobileBlogItemProps> = ({
  title,
  excerpt,
  categories,
  featuredImage,
  date,
  slug,
  index = 0,
  readingTime = 3,
  cardType = 'compact',
  categoryType = 'general',
  views = 0
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  
  const router = useRouter();

  // ✅ Auto category color assignment for any new category
  const categoryConfig = useMemo(() => {
    const categoryName = categories?.nodes?.[0]?.name || 'Islamic';
    
    // Color palettes for auto assignment
    const colorPalettes = [
      { bg: 'bg-linear-to-r from-green-500 to-emerald-600', icon: '📖', gradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20', text: 'text-green-700 dark:text-green-300' },
      { bg: 'bg-linear-to-r from-blue-500 to-cyan-600', icon: '🕌', gradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20', text: 'text-blue-700 dark:text-blue-300' },
      { bg: 'bg-linear-to-r from-purple-500 to-indigo-600', icon: '💬', gradient: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20', text: 'text-purple-700 dark:text-purple-300' },
      { bg: 'bg-linear-to-r from-amber-500 to-orange-600', icon: '📜', gradient: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20', text: 'text-amber-700 dark:text-amber-300' },
      { bg: 'bg-linear-to-r from-red-500 to-pink-600', icon: '⚖️', gradient: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20', text: 'text-red-700 dark:text-red-300' },
      { bg: 'bg-linear-to-r from-indigo-500 to-purple-600', icon: '✨', gradient: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20', text: 'text-indigo-700 dark:text-indigo-300' },
      { bg: 'bg-linear-to-r from-teal-500 to-green-600', icon: '🌅', gradient: 'from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20', text: 'text-teal-700 dark:text-teal-300' },
      { bg: 'bg-linear-to-r from-pink-500 to-rose-600', icon: '👨‍👩‍👧‍👦', gradient: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20', text: 'text-pink-700 dark:text-pink-300' },
      { bg: 'bg-linear-to-r from-yellow-500 to-amber-600', icon: '🌟', gradient: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20', text: 'text-yellow-700 dark:text-yellow-300' },
      { bg: 'bg-linear-to-r from-cyan-500 to-blue-600', icon: '🌙', gradient: 'from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20', text: 'text-cyan-700 dark:text-cyan-300' }
    ];

    // Auto assign color based on category name hash
    const categoryHash = categoryName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const colorIndex = categoryHash % colorPalettes.length;
    
    return colorPalettes[colorIndex];
  }, [categories]);

  const cleanExcerpt = useMemo(() => {
    if (!excerpt) return 'Discover Islamic insights and wisdom for daily life...';
    const text = excerpt.replace(/<[^>]*>/g, '').trim();
    
    if (cardType === 'featured') return text.length > 100 ? `${text.substring(0, 100)}...` : text;
    if (cardType === 'trending') return text.length > 70 ? `${text.substring(0, 70)}...` : text;
    if (cardType === 'detailed') return text.length > 80 ? `${text.substring(0, 80)}...` : text;
    if (cardType === 'category') return text.length > 60 ? `${text.substring(0, 60)}...` : text;
    return text.length > 50 ? `${text.substring(0, 50)}...` : text;
  }, [excerpt, cardType]);

  const formattedDate = useMemo(() => {
    try {
      const postDate = new Date(date);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - postDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return 'Today';
      if (diffDays === 2) return 'Yesterday';
      if (diffDays <= 7) return `${diffDays - 1}d ago`;
      if (diffDays <= 30) return `${Math.floor(diffDays / 7)}w ago`;
      
      return postDate.toLocaleDateString('en-US', {
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

  // ✅ Touch handlers
  const handleTouchStart = useCallback(() => setIsPressed(true), []);
  const handleTouchEnd = useCallback(() => setIsPressed(false), []);

  // ✅ Image handlers
  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HbH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

  // ✅ Featured Card (Large - First Post) - Complete different design
  if (cardType === 'featured') {
    return (
      <div 
        className={`relative w-full bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
          isPressed ? 'scale-95 shadow-inner' : 'scale-100 active:scale-[0.98]'
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleNavigation}
      >
        {/* Image with proper fitting */}
        <div className="relative h-80 w-full bg-white dark:bg-gray-800 flex items-center justify-center">
          {featuredImage?.node?.sourceUrl && !imageError ? (
            <div className="relative w-full h-full flex items-center justify-center p-2">
              <Image
                src={featuredImage.node.sourceUrl}
                alt={title}
                width={320}
                height={240}
                className="object-contain max-w-full max-h-full rounded-2xl"
                onError={handleImageError}
                onLoad={handleImageLoad}
                priority={true}
                quality={90}
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl" />
              )}
            </div>
          ) : (
            <div className={`flex items-center justify-center h-full w-full bg-linear-to-br ${categoryConfig.gradient} rounded-3xl`}>
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{categoryConfig.icon}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-base font-medium">Featured Post</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className={`inline-flex items-center gap-2 ${categoryConfig.bg} text-white px-4 py-2 rounded-2xl text-sm font-bold mb-4 shadow-lg`}>
            <span>{categoryConfig.icon}</span>
            <span>{categories?.nodes?.[0]?.name || 'Islamic'}</span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 mb-3">
            {title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed line-clamp-2 mb-4">
            {cleanExcerpt}
          </p>
          
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
            <span>📅 {formattedDate}</span>
            <span>•</span>
            <span>⏱️ {readingTime} min</span>
            <span>•</span>
            <span>👁️ {views || '1.2k'} views</span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div className="h-1 bg-red-500 rounded-full w-3/4"></div>
            </div>
            <span className="text-xs text-gray-500">Read more</span>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Trending Card (Horizontal Scroll) - Different design
  if (cardType === 'trending') {
    return (
      <div 
        className={`relative w-full bg-linear-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl p-4 shadow-lg transition-all duration-300 ${
          isPressed ? 'scale-95' : 'scale-100 active:scale-[0.98]'
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleNavigation}
      >
        <div className="flex items-start gap-4">
          {/* Trending Badge */}
          <div className="shrink-0">
            <div className="w-12 h-12 bg-linear-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🔥</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className={`inline-flex items-center gap-2 ${categoryConfig.bg} text-white px-3 py-1 rounded-lg text-xs font-bold mb-2 shadow-md`}>
              <span className="text-xs">{categoryConfig.icon}</span>
              <span>{categories?.nodes?.[0]?.name || 'Islamic'}</span>
            </div>
            
            <h3 className="text-gray-900 dark:text-white font-bold text-base leading-tight line-clamp-2 mb-2">
              {title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed mb-3">
              {cleanExcerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-xs">
                <span>📅 {formattedDate}</span>
                <span>•</span>
                <span>⏱️ {readingTime} min</span>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 px-2 py-1 rounded text-xs font-bold">
                Trending
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Detailed Card - New design with image on side
  if (cardType === 'detailed') {
    return (
      <div 
        className={`flex gap-4 w-full bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-lg transition-all duration-300 ${
          isPressed ? 'scale-95 bg-gray-50 dark:bg-gray-800' : 'scale-100 active:scale-[0.98]'
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleNavigation}
      >
        {/* Image */}
        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white dark:bg-gray-800 flex items-center justify-center">
          {featuredImage?.node?.sourceUrl && !imageError ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={featuredImage.node.sourceUrl}
                alt={title}
                width={80}
                height={80}
                className="object-contain max-w-full max-h-full"
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"
                quality={75}
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>
          ) : (
            <div className={`flex items-center justify-center h-full w-full bg-linear-to-br ${categoryConfig.gradient}`}>
              <span className="text-lg">{categoryConfig.icon}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold ${categoryConfig.text}`}>
              {categories?.nodes?.[0]?.name || 'Islamic'}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 text-xs">{formattedDate}</span>
          </div>
          
          <h3 className="text-gray-900 dark:text-white font-bold text-sm leading-tight line-clamp-2 mb-2">
            {title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2 leading-relaxed mb-2">
            {cleanExcerpt}
          </p>
          
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs">
            <div className="flex items-center gap-3">
              <span>⏱️ {readingTime} min</span>
              {views > 0 && (
                <>
                  <span>•</span>
                  <span>👁️ {views}</span>
                </>
              )}
            </div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Minimal Card - Clean and simple
  if (cardType === 'minimal') {
    return (
      <div 
        className={`w-full bg-white dark:bg-gray-900 rounded-xl p-3 shadow-md transition-all duration-300 ${
          isPressed ? 'scale-95 bg-gray-50 dark:bg-gray-800' : 'scale-100 active:scale-[0.98]'
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleNavigation}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-8 h-8 ${categoryConfig.bg} rounded-lg flex items-center justify-center shrink-0`}>
            <span className="text-white text-xs">{categoryConfig.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 dark:text-white font-semibold text-sm leading-tight line-clamp-2">
              {title}
            </h3>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs">
          <span>{formattedDate}</span>
          <span>{readingTime} min</span>
        </div>
      </div>
    );
  }

  // ✅ Category-based Cards - Different styles for different categories
  if (cardType === 'category') {
    const categoryName = categories?.nodes?.[0]?.name || 'Islamic';
    
    // Quran Category - Special Design
    if (categoryName === 'Quran') {
      return (
        <div 
          className={`relative w-full bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-2xl p-4 shadow-lg transition-all duration-300 ${
            isPressed ? 'scale-95' : 'scale-100 active:scale-[0.98]'
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleNavigation}
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-linear-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shrink-0">
              <span className="text-white text-lg">📖</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-1">
                <span className="text-green-700 dark:text-green-300 text-xs font-bold">QURAN STUDIES</span>
              </div>
              <h3 className="text-gray-900 dark:text-white font-bold text-sm leading-tight line-clamp-2 mb-2">
                {title}
              </h3>
              <div className="flex items-center justify-between text-green-600 dark:text-green-400 text-xs">
                <span>{formattedDate}</span>
                <span>⏱️ {readingTime} min</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Prayer Category - Special Design
    if (categoryName === 'Prayer') {
      return (
        <div 
          className={`relative w-full bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-2xl p-4 shadow-lg transition-all duration-300 ${
            isPressed ? 'scale-95' : 'scale-100 active:scale-[0.98]'
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleNavigation}
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shrink-0">
              <span className="text-white text-lg">🕌</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-1">
                <span className="text-blue-700 dark:text-blue-300 text-xs font-bold">PRAYER GUIDE</span>
              </div>
              <h3 className="text-gray-900 dark:text-white font-bold text-sm leading-tight line-clamp-2 mb-2">
                {title}
              </h3>
              <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 text-xs">
                <span>{formattedDate}</span>
                <span>⏱️ {readingTime} min</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default Category Card with Image
    return (
      <div 
        className={`relative w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
          isPressed ? 'scale-95 bg-gray-50 dark:bg-gray-800' : 'scale-100 active:scale-[0.98]'
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleNavigation}
      >
        {/* Image with proper fitting */}
        <div className="relative h-32 w-full bg-white dark:bg-gray-800 flex items-center justify-center">
          {featuredImage?.node?.sourceUrl && !imageError ? (
            <div className="relative w-full h-full flex items-center justify-center p-2">
              <Image
                src={featuredImage.node.sourceUrl}
                alt={title}
                width={280}
                height={160}
                className="object-contain max-w-full max-h-full rounded-xl"
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"
                quality={75}
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>
          ) : (
            <div className={`flex items-center justify-center h-full w-full bg-linear-to-br ${categoryConfig.gradient}`}>
              <span className="text-2xl">{categoryConfig.icon}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className={`${categoryConfig.bg} text-white px-2 py-1 rounded text-xs font-bold shadow-md`}>
              {categories?.nodes?.[0]?.name || 'Islamic'}
            </span>
            <span className="text-gray-500 text-xs">{formattedDate}</span>
          </div>
          
          <h3 className="text-gray-900 dark:text-white font-bold text-sm leading-tight line-clamp-2 mb-1">
            {title}
          </h3>
        </div>
      </div>
    );
  }

  // ✅ Default Compact Card (Latest Posts)
  return (
    <div 
      className={`relative w-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md transition-all duration-300 ${
        isPressed ? 'scale-95 bg-gray-50 dark:bg-gray-800' : 'scale-100 active:scale-[0.98]'
      }`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleNavigation}
    >
      {/* Image with proper fitting */}
      <div className="relative h-28 w-full bg-white dark:bg-gray-800 flex items-center justify-center">
        {featuredImage?.node?.sourceUrl && !imageError ? (
          <div className="relative w-full h-full flex items-center justify-center p-1">
            <Image
              src={featuredImage.node.sourceUrl}
              alt={title}
              width={240}
              height={140}
              className="object-contain max-w-full max-h-full rounded-lg"
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
              quality={70}
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
        ) : (
          <div className={`flex items-center justify-center h-full w-full bg-linear-to-br ${categoryConfig.gradient}`}>
            <span className="text-xl">{categoryConfig.icon}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2">
        <h3 className="text-gray-900 dark:text-white font-semibold text-xs leading-tight line-clamp-2 mb-1">
          {title}
        </h3>
        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs">
          <span>{formattedDate}</span>
          <span>{readingTime} min</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MobileBlogItem);