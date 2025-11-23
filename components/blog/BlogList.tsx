'use client';
import React, { useState, useEffect, useCallback } from 'react';
import BlogItem from './BlogItem';
import { BlogItemSkeleton } from '../skeleton/BlogItemSkeleton';
import { getPosts, getAllCategories } from '@/lib/wordpress';
import { Post, Category } from '@/types/blog';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

interface BlogListProps {
  showTitle?: boolean;
  currentPostSlug?: string | null;
  initialPosts?: Post[];
}

const BlogList: React.FC<BlogListProps> = ({
  showTitle = true,
  currentPostSlug = null,
  initialPosts = []
}) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>(initialPosts.slice(0, 12)); // Start with 12 posts
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(!initialPosts.length);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [page, setPage] = useState(1);
  const postsPerPage = 12;

  // Fix hydration by tracking client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (initialPosts.length === 0) {
      fetchInitialData();
    } else {
      setPosts(initialPosts);
      setDisplayedPosts(initialPosts.slice(0, postsPerPage));
      setLoading(false);
      fetchCategories();
    }
  }, [initialPosts]);

  useEffect(() => {
    let filtered = posts;
    
    if (activeCategory === 'all') {
      filtered = posts;
    } else {
      filtered = posts.filter(post =>
        post.categories?.nodes?.some((cat: Category) => cat.slug === activeCategory)
      );
    }

    if (currentPostSlug) {
      filtered = filtered.filter(post => post.slug !== currentPostSlug);
    }

    setDisplayedPosts(filtered.slice(0, postsPerPage));
    setPage(1);
  }, [activeCategory, posts, currentPostSlug]);

  // Infinite Scroll Load More
  const loadMorePosts = useCallback(async () => {
    if (loading) return;

    const startIndex = page * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    
    let filtered = posts;
    if (activeCategory !== 'all') {
      filtered = posts.filter(post =>
        post.categories?.nodes?.some((cat: Category) => cat.slug === activeCategory)
      );
    }

    const newPosts = filtered.slice(startIndex, endIndex);
    
    if (newPosts.length > 0) {
      setDisplayedPosts(prev => [...prev, ...newPosts]);
      setPage(prev => prev + 1);
    }
  }, [page, posts, activeCategory, loading]);

  const { isLoading: loadingMore } = useInfiniteScroll(loadMorePosts, displayedPosts.length < posts.length);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      if (categoriesData && categoriesData.length > 0) {
        setCategories(categoriesData);
      } else {
        extractCategoriesFromPosts();
      }
    } catch (err) {
      extractCategoriesFromPosts();
    }
  };

  const extractCategoriesFromPosts = () => {
    const categoryMap = new Map();
    
    posts.forEach(post => {
      post.categories?.nodes?.forEach(cat => {
        if (!categoryMap.has(cat.slug)) {
          categoryMap.set(cat.slug, {
            id: cat.slug,
            slug: cat.slug,
            name: cat.name,
            count: 1,
            children: []
          });
        }
      });
    });

    const extractedCategories = Array.from(categoryMap.values());
    if (extractedCategories.length > 0) {
      setCategories(extractedCategories);
    }
  };

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [postsData, categoriesData] = await Promise.all([
        getPosts(),
        getAllCategories()
      ]);

      setPosts(postsData);
      setDisplayedPosts(postsData.slice(0, postsPerPage));

      if (categoriesData && categoriesData.length > 0) {
        setCategories(categoriesData);
      } else {
        extractCategoriesFromPosts();
      }
    } catch (err) {
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  // Auto-update categories when new posts arrive
  useEffect(() => {
    if (posts.length > 0 && categories.length === 0) {
      extractCategoriesFromPosts();
    }
  }, [posts, categories]);

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">Connection Error</h3>
          <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={fetchInitialData}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Latest Posts
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Discover more Islamic content and events
          </p>
        </div>
      )}

      {/* Category Filters */}
      {isClient && (
        <div className="flex justify-start gap-2 my-8 overflow-x-auto pb-2 scrollbar-hide">
          {/* All Posts Button */}
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full transition-all text-sm whitespace-nowrap ${
              activeCategory === 'all' 
                ? 'bg-red-600 text-white shadow-lg' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All Posts
          </button>
          
          {/* Dynamic Category Buttons */}
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
              className={`px-4 py-2 rounded-full transition-all text-sm whitespace-nowrap ${
                activeCategory === category.slug
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {/* Active Category Info */}
      {isClient && activeCategory !== 'all' && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 px-4 py-2 rounded-full">
            <span>📁</span>
            <span className="font-medium">
              {categories.find(c => c.slug === activeCategory)?.name}
            </span>
            <button
              onClick={() => setActiveCategory('all')}
              className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      {loading ? (
        <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-16'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <BlogItemSkeleton key={item} />
          ))}
        </div>
      ) : displayedPosts.length > 0 ? (
        <>
          {/* Results count */}
          {isClient && (
            <div className="text-center mb-6 text-gray-600 dark:text-gray-400">
              Showing {displayedPosts.length} of {posts.length} posts
              {activeCategory !== 'all' && (
                <span> in {categories.find(c => c.slug === activeCategory)?.name}</span>
              )}
            </div>
          )}
          
          <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-8'>
            {displayedPosts.map((post, index) => (
              <BlogItem
                key={`${post.id}-${index}`}
                {...post}
                index={index}
              />
            ))}
          </div>

          {/* Loading More Indicator */}
          {loadingMore && (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <div className="w-5 h-5 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
                Loading more posts...
              </div>
            </div>
          )}

          {/* End of Results */}
          {displayedPosts.length >= posts.length && posts.length > 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              🎉 You've seen all posts!
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">No Posts Found</h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            {activeCategory === 'all'
              ? 'No content available yet. Please check back later.'
              : `No posts found in "${categories.find(c => c.slug === activeCategory)?.name}" category.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogList;