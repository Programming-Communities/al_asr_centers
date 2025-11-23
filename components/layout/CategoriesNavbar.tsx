'use client';
import React, { useState, useEffect, useRef } from 'react';
import { getAllCategories } from '@/lib/wordpress';
import { Category } from '@/types/blog';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronUp, Home, X } from 'lucide-react';

const CategoriesNavbar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const navbarRef = useRef<HTMLDivElement>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const isCategoryActive = (categorySlug: string) => {
    return pathname === `/categories/${categorySlug}`;
  };

  const isHomeActive = pathname === '/';

  // Toggle category menu - ONLY FOR DROPDOWN ARROW
  const toggleCategoryMenu = (categorySlug: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Prevent event bubbling
    }
    setOpenCategory(openCategory === categorySlug ? null : categorySlug);
  };

  // Close menu only when clicking outside or on close button
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setOpenCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setOpenCategory(null);
  }, [pathname]);

  // Recursive function to render categories with PERSISTENT menus
  const renderCategoryItem = (category: Category, level: number = 0) => {
    const isActive = isCategoryActive(category.slug);
    const isOpen = openCategory === category.slug;
    const hasChildren = category.children && category.children.length > 0;

    return (
      <div
        key={category.id}
        className="relative"
      >
        {/* Category Button - SEPARATE LINK AND DROPDOWN */}
        <div className="flex items-center">
          {/* Category Link - ALWAYS NAVIGATES TO CATEGORY PAGE */}
          <Link
            href={`/categories/${category.slug}`}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap min-h-11 ${
              isActive
                ? 'text-white bg-white/30 backdrop-blur-sm shadow-lg'
                : 'text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm'
            } ${level > 0 ? 'pr-8' : ''}`}
            onClick={() => {
              // Close menu when category link is clicked
              setOpenCategory(null);
            }}
            aria-label={`Browse ${category.name} category`}
          >
            <span className="flex items-center space-x-2">
              <span className="font-medium">{category.name}</span>
              {level > 0 && (
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              )}
            </span>
          </Link>

          {/* Toggle Button for categories with children - ONLY THIS OPENS DROPDOWN */}
          {hasChildren && (
            <button
              onClick={(e) => toggleCategoryMenu(category.slug, e)}
              className={`p-3 rounded-lg transition-all duration-200 backdrop-blur-sm mx-1 min-h-11 min-w-11 ${
                isOpen
                  ? 'bg-white/30 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/20'
              }`}
              aria-label={`${isOpen ? 'Close' : 'Open'} ${category.name} submenu`}
              aria-expanded={isOpen}
              aria-controls={`submenu-${category.slug}`}
            >
              {isOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* PERSISTENT Sub-categories DROPUP - Only closes on outside click or X button */}
        {hasChildren && isOpen && (
          <div 
            id={`submenu-${category.slug}`}
            className={`absolute ${
              level === 0 ? 'bottom-full mb-1' : 'bottom-full mb-1'
            } left-0 bg-white/10 backdrop-blur-2xl rounded-lg border border-white/30 z-50 min-w-48 max-w-64 max-h-80 overflow-hidden shadow-2xl`}
            role="navigation"
            aria-label={`${category.name} submenu`}
          >
            {/* Close Button for persistent menu */}
            <div className="flex justify-between items-center p-2 border-b border-white/20 bg-white/5">
              <span className="text-white text-sm font-semibold">{category.name}</span>
              <button
                onClick={() => setOpenCategory(null)}
                className="p-2 hover:bg-white/20 rounded transition-colors min-h-10 min-w-10 flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className={`p-1 ${
              category.children!.length > 6 
                ? 'max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/40 scrollbar-track-transparent' 
                : ''
            }`}>
              <div className="space-y-0.5" role="list">
                {category.children!.map((child) => (
                  <div key={child.id} role="listitem">
                    {renderCategoryItem(child, level + 1)}
                  </div>
                ))}
              </div>
            </div>

            {/* View All Link */}
            <div className="p-1 border-t border-white/30">
              <Link
                href={`/categories/${category.slug}`}
                className="flex items-center justify-center text-center text-xs font-semibold text-white hover:text-white py-3 rounded-md bg-white/15 hover:bg-white/25 border border-white/30 hover:border-white/40 transition-all duration-200 min-h-10"
                onClick={() => setOpenCategory(null)}
                aria-label={`View all posts in ${category.name}`}
              >
                View All {category.name}
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      ref={navbarRef}
      className="categories-navbar hidden md:flex items-center justify-center space-x-0"
      role="navigation"
      aria-label="Main categories"
    >
      {/* Home Button - First Position */}
      <Link
        href="/"
        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 mx-1 min-h-11 ${
          isHomeActive
            ? 'text-white bg-white/30 backdrop-blur-sm shadow-lg'
            : 'text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm'
        }`}
        onClick={() => setOpenCategory(null)}
        aria-label="Home page"
        aria-current={isHomeActive ? 'page' : undefined}
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>

      {categoriesLoading ? (
        // Loading Skeleton for main categories
        Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-24 h-11 bg-white/20 rounded-lg animate-pulse backdrop-blur-sm mx-1"
            aria-label="Loading categories"
          ></div>
        ))
      ) : categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.id} className="relative">
            {renderCategoryItem(category)}
          </div>
        ))
      ) : (
        <div className="text-white/70 text-sm px-3 py-2 backdrop-blur-sm min-h-11 flex items-center">
          No categories found
        </div>
      )}
    </div>
  );
};

export default CategoriesNavbar;