import React from 'react';
import { BlogItemSkeleton } from './BlogItemSkeleton'; // Fixed import

export const HomePageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Skeleton */}
      <div className="py-5 px-5 md:px-12 lg:px-28 bg-linear-to-b from-white to-red-50 dark:from-gray-800 dark:to-gray-700">
        <div className="flex justify-between items-center">
          <div className="w-[130px] sm:w-40 h-[60px] bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      
        <div className="text-center my-12">
          <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-4 mx-auto max-w-md"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mt-6 mx-auto max-w-2xl"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mt-4 mx-auto max-w-xl w-3/4"></div>
          <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mt-8 mx-auto max-w-sm"></div>
        </div>
      </div>

      {/* Blog List Skeleton */}
      <div className="container mx-auto px-4">
        <div className='flex justify-center gap-3 my-10 flex-wrap'>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="py-2 px-5 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse w-20 h-9"></div>
          ))}
        </div>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <BlogItemSkeleton key={item} />
          ))}
        </div>
      </div>
    </div>
  );
};