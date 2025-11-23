import React from 'react';

export const BlogItemSkeleton: React.FC = () => {
  return (
    <div className='max-w-[330px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 mx-auto animate-pulse'>
      {/* Image Skeleton */}
      <div className='h-48 w-full bg-gray-300 dark:bg-gray-700'></div>
    
      {/* Category Skeleton */}
      <div className='px-5 pt-5'>
        <div className="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
      
      {/* Content Skeleton */}
      <div className='p-5'>
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4 w-3/4"></div>
      
        <div className='flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700'>
          <div className="w-16 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
};