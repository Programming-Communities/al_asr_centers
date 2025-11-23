'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Category } from '@/types/blog';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CategoryDropdownProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setExpandedCategories(new Set()); // Reset expanded state
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Separate main and sub categories
  const mainCategories = categories.filter(cat => !cat.parentId || cat.parentId === null);
  const subCategories = categories.filter(cat => cat.parentId && cat.parentId !== null);

  // Group subcategories by parent
  const categoriesWithChildren = mainCategories.map(mainCat => ({
    ...mainCat,
    children: subCategories.filter(subCat => subCat.parentId === mainCat.id)
  }));

  const getCategoryName = (slug: string) => {
    if (slug === 'all') return '🌟 All Posts';
    const category = categories.find(cat => cat.slug === slug);
    return category?.name || 'All Posts';
  };

  const getCategoryIcon = (categoryName: string) => {
    const icons: {[key: string]: string} = {
      'Quran': '📖',
      'Prayer': '🕌',
      'Hadith': '💬',
      'Islamic History': '📜',
      'Daily Post': '📅',
      'Calendar': '📆',
      'Fiqh': '⚖️',
      'Farameen-E-Masoomeen A.S': '📿',
      'Prophet Muhammad PBUH': '☪️',
      'Hazrat Fatima Zahra S.A': '🌹',
      'Imam Ali ibn Abi Talib A.S': '⚔️',
      'Imam Hasan al-Mujtaba A.S': '🕊️',
      'Imam Husayn ibn Ali A.S': '🩸',
      'Imam Zain al-Abidin A.S': '📖',
      'Imam Muhammad al-Baqir A.S': '🎓',
      'Imam Ja\'far al-Sadiq A.S': '⚗️',
      'Imam Musa al-Kazim A.S': '🔒',
      'Imam Ali al-Ridha A.S': '👑',
      'Imam Muhammad al-Taqi A.S': '🎯',
      'Imam Ali al-Naqi A.S': '🛡️',
      'Imam Hasan al-Askari A.S': '⚡',
      'Imam Muhammad al-Mahdi A.S': '🌟',
      'News': '📰',
      'Quran Pak': '📘',
      'Prayer recitation': '🎵',
      'Tafseer': '🔍'
    };
    return icons[categoryName] || '📚';
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleCategorySelect = (slug: string) => {
    onCategoryChange(slug);
    setIsOpen(false);
    setExpandedCategories(new Set()); // Reset expanded state
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg hover:bg-red-700 transition-all duration-300 border border-red-500 min-w-[200px] justify-between"
      >
        <span className="truncate">{getCategoryName(activeCategory)}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
          {/* All Posts */}
          <button
            onClick={() => handleCategorySelect('all')}
            className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
              activeCategory === 'all' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className="text-lg">🌟</span>
            <div>
              <div className="font-semibold">All Posts</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Browse all categories</div>
            </div>
          </button>

          <div className="border-t border-gray-200 dark:border-gray-600 my-2" />

          {/* Main Categories with Expandable Subcategories */}
          {categoriesWithChildren.map((mainCategory) => (
            <div key={mainCategory.id} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              {/* Main Category - Click to expand/collapse */}
              <button
                onClick={() => toggleCategoryExpansion(mainCategory.id)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between ${
                  activeCategory === mainCategory.slug ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-lg">{getCategoryIcon(mainCategory.name)}</span>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-sm">{mainCategory.name}</div>
                    {mainCategory.children.length > 0 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {mainCategory.children.length} sub-categories
                      </div>
                    )}
                  </div>
                </div>
                {mainCategory.children.length > 0 && (
                  <ChevronRight 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expandedCategories.has(mainCategory.id) ? 'rotate-90' : ''
                    }`} 
                  />
                )}
              </button>

              {/* Subcategories - Show when expanded */}
              {expandedCategories.has(mainCategory.id) && mainCategory.children.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                  {mainCategory.children.map((subCategory) => (
                    <button
                      key={subCategory.id}
                      onClick={() => handleCategorySelect(subCategory.slug)}
                      className={`w-full text-left px-8 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                        activeCategory === subCategory.slug ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span className="flex items-center gap-2">
                        <span className="text-xs">{getCategoryIcon(subCategory.name)}</span>
                        {subCategory.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Main Category Click Action - Only if no subcategories */}
              {mainCategory.children.length === 0 && (
                <button
                  onClick={() => handleCategorySelect(mainCategory.slug)}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                    activeCategory === mainCategory.slug ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-lg">{getCategoryIcon(mainCategory.name)}</span>
                  <div className="font-semibold text-sm">{mainCategory.name}</div>
                </button>
              )}
            </div>
          ))}

          {/* Categories without children (standalone categories) */}
          {mainCategories
            .filter(mainCat => !categoriesWithChildren.some(c => c.id === mainCat.id))
            .map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.slug)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                  activeCategory === category.slug ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg">{getCategoryIcon(category.name)}</span>
                <div className="font-semibold text-sm">{category.name}</div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;