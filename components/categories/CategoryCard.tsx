// components/categories/CategoryCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Category } from '@/types/blog';

interface CategoryCardProps {
  category: Category;
  index: number;
  getCategoryColor: (index: number) => string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index, getCategoryColor }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/categories/${category.slug}`);
  };

  const handleSubCategoryClick = (e: React.MouseEvent, subCategorySlug: string) => {
    e.stopPropagation();
    router.push(`/categories/${subCategorySlug}`);
  };

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-linear-to-br ${getCategoryColor(index)} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      {/* Content */}
      <div className="relative p-8">
        {/* Category Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-14 h-14 bg-linear-to-r ${getCategoryColor(index)} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <span className="text-xl text-white font-bold">
                {category.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Islamic Content
              </p>
            </div>
          </div>
          
          {/* Post Count Badge */}
          <div className="bg-linear-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {category.count}
          </div>
        </div>

        {/* Sub-categories */}
        {category.children && category.children.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sub-categories:</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                {category.children.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.children.slice(0, 4).map((child) => (
                <button
                  key={child.id}
                  onClick={(e) => handleSubCategoryClick(e, child.slug)}
                  className="text-xs bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 font-medium"
                >
                  {child.name}
                </button>
              ))}
              {category.children.length > 4 && (
                <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-full">
                  +{category.children.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
          <button 
            className="flex items-center space-x-2 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn cursor-pointer"
            onClick={handleCardClick}
          >
            <span>Explore Category</span>
            <svg 
              className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7-7" />
            </svg>
          </button>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {category.count}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Posts
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-red-500/20 transition-all duration-500"></div>
    </div>
  );
};

export default CategoryCard;