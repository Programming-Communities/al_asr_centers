import React from 'react';

export const PostPageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
        {/* Featured Image Skeleton */}
        <div className="h-96 w-full bg-gray-300 dark:bg-gray-700"></div>
        
        {/* Content Skeleton */}
        <div className="p-8">
          {/* Categories Skeleton */}
          <div className="mb-4">
            <div className="w-24 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
          
          {/* Title Skeleton */}
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-3/4"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-6 w-1/2"></div>
          
          {/* Meta Info Skeleton */}
          <div className="flex items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
          
          {/* Content Skeleton */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};