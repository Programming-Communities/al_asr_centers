'use client';
import React, { useState, useEffect, useMemo } from 'react';
import MobileBlogItem from './MobileBlogItem';
import { BlogItemSkeleton } from '../skeleton/BlogItemSkeleton';
import { getPosts, getAllCategories } from '@/lib/wordpress';
import { Post, Category } from '@/types/blog';

interface MobileBlogListProps {
  showTitle?: boolean;
  currentPostSlug?: string | null;
  initialPosts?: Post[];
}

const MobileBlogList: React.FC<MobileBlogListProps> = ({
  showTitle = true,
  currentPostSlug = null,
  initialPosts = []
}) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(!initialPosts.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // ✅ FIXED: Remove argument from getPosts()
      const [postsData, categoriesData] = await Promise.all([
        getPosts(), // ✅ No argument
        getAllCategories()
      ]);

      setPosts(postsData);
      if (categoriesData) {
        setCategories(categoriesData);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto-detect categories from posts
  const detectedCategories = useMemo(() => {
    const categoryMap = new Map();
    
    categories.forEach(cat => {
      categoryMap.set(cat.slug, cat);
    });
    
    posts.forEach(post => {
      post.categories?.nodes?.forEach(cat => {
        if (!categoryMap.has(cat.slug)) {
          categoryMap.set(cat.slug, cat);
        }
      });
    });
    
    return Array.from(categoryMap.values());
  }, [categories, posts]);

  // ✅ Filter posts for active category
  const filteredPosts = useMemo(() => 
    posts
      .filter(post => 
        activeCategory === 'all' || 
        post.categories?.nodes?.some((cat: Category) => cat.slug === activeCategory)
      )
      .filter(post => post.slug !== currentPostSlug),
    [posts, activeCategory, currentPostSlug]
  );

  // ✅ FIXED: Get unique posts for each category (8 posts per category)
  const postsByCategory = useMemo(() => {
    const grouped: {[key: string]: Post[]} = {};
    
    // First, assign posts to their primary categories without duplication
    detectedCategories.forEach(category => {
      // Get ALL posts for this category (without duplication check first)
      const allCategoryPosts = posts.filter(post => 
        post.categories?.nodes?.some(cat => cat.slug === category.slug) &&
        post.slug !== currentPostSlug
      );
      
      // Take up to 8 posts for this category
      grouped[category.slug] = allCategoryPosts.slice(0, 8);
    });

    return grouped;
  }, [posts, detectedCategories, currentPostSlug]);

  // ✅ Get posts for featured and trending sections
  const sectionPosts = useMemo(() => {
    if (activeCategory !== 'all') {
      const categoryPosts = posts.filter(post => 
        post.categories?.nodes?.some(cat => cat.slug === activeCategory) &&
        post.slug !== currentPostSlug
      );
      
      return {
        featured: categoryPosts[0] || null,
        trending: categoryPosts.slice(1, 4),
        categoryPosts: categoryPosts.slice(4),
        hasMore: categoryPosts.length > 8
      };
    }

    const allPosts = posts.filter(post => post.slug !== currentPostSlug);
    
    return {
      featured: allPosts[0] || null,
      trending: allPosts.slice(1, 4),
      categoryPosts: allPosts.slice(4),
      hasMore: allPosts.length > 8
    };
  }, [posts, activeCategory, currentPostSlug]);

  // ✅ Get remaining posts for "More Articles" (posts not shown in any category)
  const getMoreArticlesPosts = useMemo(() => {
    if (activeCategory !== 'all') {
      return [];
    }

    // Get all post IDs already shown in category sections
    const shownPostIds = new Set();
    Object.values(postsByCategory).forEach(categoryPosts => {
      categoryPosts.forEach(post => shownPostIds.add(post.id));
    });

    // Add featured and trending posts
    if (sectionPosts.featured) shownPostIds.add(sectionPosts.featured.id);
    sectionPosts.trending.forEach(post => shownPostIds.add(post.id));

    // Get posts that are not shown in any category section
    const remainingPosts = posts.filter(post => 
      !shownPostIds.has(post.id) && 
      post.slug !== currentPostSlug
    );

    return remainingPosts.slice(0, 8);
  }, [posts, postsByCategory, sectionPosts, activeCategory, currentPostSlug]);

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-4">
        <div className="text-center py-16 px-4">
          <div className="w-20 h-20 bg-linear-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📡</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Connection Issue</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">Please check your internet connection</p>
          <button
            onClick={fetchInitialData}
            className="bg-linear-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-2xl text-sm active:scale-95 transition-transform font-medium shadow-lg"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pb-24">
      {/* Header */}
      {showTitle && (
        <div className="px-5 pt-8 pb-4">
          <h1 className="text-3xl font-bold text-center bg-linear-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Islamic Insights
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-2">
            Easy to understand Islamic guidance for daily life
          </p>
        </div>
      )}

      {/* Category Filters */}
      <div className="px-4 py-4 sticky top-0 bg-linear-to-b from-gray-50 to-gray-50/80 dark:from-gray-900 dark:to-gray-900/80 backdrop-blur-sm z-10">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full transition-all duration-300 text-sm whitespace-nowrap shrink-0 shadow-sm ${
              activeCategory === 'all' 
                ? 'bg-linear-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            🌟 All Topics
          </button>
          {detectedCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
              className={`px-5 py-2.5 rounded-full transition-all duration-300 text-sm whitespace-nowrap shrink-0 shadow-sm ${
                activeCategory === category.slug
                  ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="px-4">
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <BlogItemSkeleton key={item} />
            ))}
          </div>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="space-y-8 px-4">
          {/* Featured Post Section */}
          {sectionPosts.featured && activeCategory === 'all' && (
            <section className="animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="bg-linear-to-r from-red-500 to-pink-500 text-white p-1 rounded-lg">⭐</span>
                Featured Post
              </h2>
              <MobileBlogItem {...sectionPosts.featured} cardType="featured" />
            </section>
          )}

          {/* Trending Posts Section */}
          {sectionPosts.trending.length > 0 && activeCategory === 'all' && (
            <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="bg-linear-to-r from-orange-500 to-amber-500 text-white p-1 rounded-lg">🔥</span>
                Trending Now
              </h2>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
                {sectionPosts.trending.map((post, index) => (
                  <div key={post.id} className="w-80 shrink-0">
                    <MobileBlogItem {...post} cardType="trending" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Category-wise Sections - FIXED: Each category shows its own 8 posts */}
          {activeCategory === 'all' && Object.entries(postsByCategory).map(([categorySlug, categoryPosts], index) => {
            const category = detectedCategories.find(c => c.slug === categorySlug);
            
            // ✅ FIX: Only show categories that have posts
            if (!category || categoryPosts.length === 0) return null;

            // ✅ Get total posts count for this category
            const totalPostsInCategory = posts.filter(post => 
              post.categories?.nodes?.some(cat => cat.slug === category.slug)
            ).length;

            return (
              <section key={categorySlug} className="animate-fade-in" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">
                    {category.name === 'Quran' ? '📖' : 
                     category.name === 'Prayer' ? '🕌' : 
                     category.name === 'Hadith' ? '💬' : 
                     category.name === 'Fiqh' ? '⚖️' : 
                     category.name === 'Spirituality' ? '✨' : 
                     category.name === 'Islamic History' ? '📜' : 
                     category.name.toLowerCase().includes('calendar') ? '📅' :
                     category.name.toLowerCase().includes('daily') ? '🌅' : '📚'}
                  </span>
                  {category.name}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                    ({categoryPosts.length} posts)
                  </span>
                </h2>
                
                {/* Show 8 posts in grid layout */}
                <div className="grid grid-cols-2 gap-3">
                  {categoryPosts.map((post, postIndex) => (
                    <MobileBlogItem 
                      key={`${category.slug}-${post.id}`} 
                      {...post} 
                      cardType={
                        category.name === 'Quran' || category.name === 'Prayer' 
                          ? 'category' 
                          : postIndex < 4 ? 'detailed' : 'compact'
                      }
                      views={Math.floor(Math.random() * 1000) + 100}
                    />
                  ))}
                </div>

                {/* Show message if category has more than 8 posts */}
                {totalPostsInCategory > 8 && (
                  <div className="text-center mt-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Showing 8 of {totalPostsInCategory} posts in {category.name}
                    </p>
                  </div>
                )}
              </section>
            );
          })}

          {/* Specific Category View */}
          {activeCategory !== 'all' && (
            <section className="animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="bg-linear-to-r from-green-500 to-emerald-500 text-white p-1 rounded-lg">📚</span>
                {detectedCategories.find(c => c.slug === activeCategory)?.name}
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                  ({filteredPosts.length} posts)
                </span>
              </h2>
              
              {/* Show featured post for specific category */}
              {sectionPosts.featured && (
                <div className="mb-6">
                  <MobileBlogItem {...sectionPosts.featured} cardType="featured" />
                </div>
              )}

              {/* Show remaining posts in grid */}
              <div className="grid grid-cols-2 gap-3">
                {sectionPosts.categoryPosts.slice(0, 8).map((post, index) => (
                  <MobileBlogItem 
                    key={post.id} 
                    {...post} 
                    cardType={index < 4 ? 'detailed' : 'compact'}
                    views={Math.floor(Math.random() * 500) + 100}
                  />
                ))}
              </div>

              {/* Show message if more posts available */}
              {sectionPosts.hasMore && (
                <div className="text-center mt-4">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Showing 8 of {filteredPosts.length} posts
                  </p>
                </div>
              )}
            </section>
          )}

          {/* More Articles Section */}
          {activeCategory === 'all' && getMoreArticlesPosts.length > 0 && (
            <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="bg-linear-to-r from-purple-500 to-indigo-500 text-white p-1 rounded-lg">📰</span>
                More Articles
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                  ({getMoreArticlesPosts.length} posts)
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {getMoreArticlesPosts.map((post, index) => (
                  <MobileBlogItem 
                    key={post.id} 
                    {...post} 
                    cardType="minimal"
                    views={Math.floor(Math.random() * 300) + 50}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="text-center py-20 px-4">
          <div className="w-24 h-24 bg-linear-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📭</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Posts Found</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
            {activeCategory === 'all' 
              ? 'No content available at the moment.' 
              : `No posts found in "${detectedCategories.find(c => c.slug === activeCategory)?.name || activeCategory}" category.`
            }
          </p>
          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              className="bg-linear-to-r from-gray-500 to-gray-600 text-white px-6 py-2.5 rounded-2xl text-sm active:scale-95 transition-transform font-medium"
            >
              View All Topics
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileBlogList;