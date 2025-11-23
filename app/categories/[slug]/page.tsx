import React from 'react';
import Layout from '@/components/layout/Layout';
import BlogList from '@/components/blog/BlogList';
import { getPosts, getAllCategories } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  
  return {
    title: `${formattedTitle} - Islamic Category | Al-Asr`,
    description: `Explore comprehensive Islamic content in ${formattedTitle} category - spiritual insights and knowledge`,
  };
}

export async function generateStaticParams() {
  return [
    { slug: 'calendar' },
    { slug: 'daily-post' },
    { slug: 'uncategorized' }
  ];
}

export const dynamicParams = true;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  try {
    const allPosts = await getPosts();
    const allCategories = await getAllCategories();
    
    const categoryPosts = allPosts.filter(post => 
      post.categories?.nodes?.some((cat: any) => cat.slug === slug)
    );

    const findCategory = (cats: any[], categorySlug: string): any => {
      for (const cat of cats) {
        if (cat.slug === categorySlug) return cat;
        if (cat.children && cat.children.length > 0) {
          const found = findCategory(cat.children, categorySlug);
          if (found) return found;
        }
      }
      return null;
    };

    const category = findCategory(allCategories, slug);

    if (!category) {
      notFound();
    }

    return (
      <Layout>
        {/* Premium Background */}
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
          <div className="relative container mx-auto px-4 py-16">
            
            {/* Enhanced Breadcrumb */}
            <nav className="flex items-center space-x-3 text-sm mb-12">
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 font-medium">
                Home
              </Link>
              <span className="text-gray-300 dark:text-gray-600">›</span>
              <Link href="/categories" className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 font-medium">
                Categories
              </Link>
              <span className="text-gray-300 dark:text-gray-600">›</span>
              <span className="text-red-600 dark:text-red-400 font-bold">
                {category.name}
              </span>
            </nav>

            {/* Premium Category Header */}
            <section className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-red-600 to-red-700 rounded-2xl shadow-2xl mb-6">
                <span className="text-2xl text-white font-bold">
                  {category.name.charAt(0)}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black bg-linear-to-r from-gray-900 to-red-700 dark:from-white dark:to-red-400 bg-clip-text text-transparent mb-6">
                {category.name}
              </h1>
              
              <p className="text-2xl text-gray-600 dark:text-gray-300 mb-6 font-light">
                {categoryPosts.length} {categoryPosts.length === 1 ? 'insightful article' : 'comprehensive articles'} for spiritual growth
              </p>
              
              <div className="inline-flex items-center bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-6 py-3 rounded-2xl text-lg font-bold shadow-lg border border-red-200 dark:border-red-800">
                📚 {category.count} Total Articles
              </div>
            </section>

            {/* Enhanced Posts Section */}
            <section>
              {categoryPosts.length > 0 ? (
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
                  <BlogList 
                    showTitle={false}
                    initialPosts={categoryPosts}
                  />
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-3xl p-12 max-w-2xl mx-auto shadow-2xl">
                    <div className="w-20 h-20 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">
                      Content Coming Soon
                    </h3>
                    <p className="text-yellow-700 dark:text-yellow-300 mb-6 text-lg">
                      We're preparing insightful content for the "{category.name}" category.
                    </p>
                    <Link
                      href="/categories"
                      className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
                    >
                      Explore Other Categories
                    </Link>
                  </div>
                </div>
              )}
            </section>

            {/* Back to Categories */}
            <section className="text-center mt-16">
              <Link
                href="/categories"
                className="inline-flex items-center bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Categories
              </Link>
            </section>
          </div>
        </div>
      </Layout>
    );
  } catch (error) {
    console.error(`Error loading category page for ${slug}:`, error);
    notFound();
  }
}

export const revalidate = 60;