import React from 'react';
import Layout from '@/components/layout/Layout';
import BlogList from '@/components/blog/BlogList';
import { getAllPosts, getAllCategories } from '@/lib/wordpress';
import { Metadata } from 'next';
import Link from 'next/link';
import { Category } from '@/types/blog';

export const metadata: Metadata = {
  title: 'Islamic Categories | Al-Asr Islamic Service',
  description: 'Explore comprehensive Islamic content organized into meaningful categories for spiritual growth and learning',
};

// Modern 2026 Color Palette
const categoryGradients = [
  'from-red-600 via-red-500 to-orange-500',
  'from-blue-600 via-blue-500 to-cyan-500', 
  'from-emerald-600 via-emerald-500 to-green-500',
  'from-purple-600 via-purple-500 to-pink-500',
  'from-amber-600 via-amber-500 to-yellow-500',
  'from-indigo-600 via-indigo-500 to-blue-500',
  'from-teal-600 via-teal-500 to-emerald-500',
  'from-rose-600 via-rose-500 to-pink-500',
  'from-cyan-600 via-cyan-500 to-blue-500',
  'from-violet-600 via-violet-500 to-purple-500'
];

const getCategoryGradient = (index: number) => categoryGradients[index % categoryGradients.length];

export default async function CategoriesPage() {
  const [allPosts, allCategories] = await Promise.all([
    getAllPosts(),
    getAllCategories()
  ]);

  // Calculate statistics
  const totalPosts = allPosts.length;
  const totalCategories = allCategories.length;
  const parentCategories = allCategories.filter(cat => cat.children && cat.children.length > 0).length;
  const totalSubCategories = allCategories.reduce((acc, cat) => acc + (cat.children?.length || 0), 0);

  return (
    <Layout>
      {/* Premium Background with Gradient */}
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
        
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-16">
          
          {/* Premium Hero Section */}
          <section className="text-center mb-20 relative">
            {/* Decorative Elements */}
            <div className="absolute top-10 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-1/3 w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-300"></div>
            
            <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-r from-red-600 to-red-700 rounded-3xl shadow-2xl mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <span className="text-3xl text-white relative z-10">📚</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black bg-linear-to-r from-gray-900 via-red-700 to-red-600 dark:from-white dark:via-red-400 dark:to-red-500 bg-clip-text text-transparent mb-6 leading-tight">
              Islamic Library
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Journey through comprehensive Islamic knowledge, meticulously organized for your spiritual growth
            </p>
            
            {/* Stats Bar */}
            <div className="inline-flex items-center justify-center space-x-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              {[
                { value: totalCategories, label: 'Categories', color: 'text-red-600' },
                { value: totalPosts, label: 'Articles', color: 'text-blue-600' },
                { value: parentCategories, label: 'Main Topics', color: 'text-emerald-600' },
                { value: totalSubCategories, label: 'Sub-topics', color: 'text-purple-600' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Premium Categories Grid */}
          <section className="mb-24">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Explore Categories
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                  Dive deep into specialized Islamic topics with our carefully curated categories
                </p>
              </div>
              
              <div className="hidden lg:flex items-center space-x-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {totalCategories} Categories
                </span>
              </div>
            </div>
            
            {/* Enhanced Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {allCategories.map((category, index) => {
                const gradient = getCategoryGradient(index);
                
                return (
                  <div
                    key={category.id}
                    className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden cursor-pointer"
                  >
                    {/* Animated Gradient Background */}
                    <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}></div>
                    
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-1000`}></div>
                    
                    {/* Content */}
                    <div className="relative p-8 z-10">
                      
                      {/* Category Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`relative w-16 h-16 bg-linear-to-r ${gradient} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 overflow-hidden`}>
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                            <span className="text-2xl text-white font-bold relative z-10">
                              {category.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <Link href={`/categories/${category.slug}`}>
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-500 cursor-pointer line-clamp-2">
                                {category.name}
                              </h3>
                            </Link>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-medium">
                              Islamic Knowledge
                            </p>
                          </div>
                        </div>
                        
                        {/* Enhanced Post Count */}
                        <Link href={`/categories/${category.slug}`}>
                          <div className={`bg-linear-to-r ${gradient} text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
                            {category.count}
                          </div>
                        </Link>
                      </div>

                      {/* Sub-categories with Enhanced Design */}
                      {category.children && category.children.length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sub-topics</span>
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full font-medium">
                              {category.children.length}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {category.children.slice(0, 3).map((child) => (
                              <Link
                                key={child.id}
                                href={`/categories/${child.slug}`}
                                className="text-sm bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg border border-gray-300/50 dark:border-gray-600/50 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 font-medium backdrop-blur-sm"
                              >
                                {child.name}
                              </Link>
                            ))}
                            {category.children.length > 3 && (
                              <span className="text-sm bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-3 py-2 rounded-lg">
                                +{category.children.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Enhanced Action Section */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                        <Link
                          href={`/categories/${category.slug}`}
                          className={`flex items-center space-x-3 bg-linear-to-r ${gradient} hover:shadow-2xl text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-500 transform hover:scale-105 group/btn cursor-pointer`}
                        >
                          <span>Explore</span>
                          <svg 
                            className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7-7" />
                          </svg>
                        </Link>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {category.count}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-semibold">
                            Articles
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Hover Border */}
                    <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-linear-to-r ${gradient} group-hover:border-opacity-30 transition-all duration-700`}></div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Premium Featured Posts Section */}
          <section className="mb-20">
            <div className="bg-linear-to-r from-gray-900 via-red-900 to-red-800 dark:from-gray-800 dark:via-red-900 dark:to-red-800 rounded-3xl p-1 shadow-2xl">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full -translate-y-32 translate-x-32"></div>
                
                <div className="text-center mb-16 relative z-10">
                  <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
                    Latest Insights
                  </h2>
                  <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
                    Discover fresh perspectives and timeless wisdom from our latest publications
                  </p>
                </div>
                
                <BlogList 
                  showTitle={false}
                  initialPosts={allPosts.slice(0, 12)}
                />
                
                {allPosts.length > 12 && (
                  <div className="text-center mt-16">
                    <Link
                      href="/"
                      className="inline-flex items-center bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
                    >
                      <span>Explore All Articles</span>
                      <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Premium Call to Action */}
          <section className="text-center">
            <div className="bg-linear-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-3xl p-12 border border-red-200 dark:border-red-800 relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/10 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full translate-x-16 translate-y-16"></div>
              
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                  Continue Your Journey
                </h3>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-light">
                  Beyond categories, explore our comprehensive Islamic services and spiritual resources
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <Link
                    href="/services"
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-300 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-700 hover:scale-105"
                  >
                    Our Services
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
                  >
                    Get Guidance
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export const revalidate = 60;