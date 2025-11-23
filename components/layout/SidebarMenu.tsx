'use client';
import React, { useState, useEffect } from 'react';
import { getAllCategories, getAllPosts } from '@/lib/wordpress';
import { Category, Post } from '@/types/blog';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  X, 
  ChevronRight, 
  ChevronDown, 
  Home, 
  FolderOpen, 
  BookOpen,
  Calendar,
  Users,
  Mail,
  Settings,
  Sparkles,
  Heart,
  GraduationCap,
  Search,
  Clock,
  TrendingUp,
  Star,
  Bookmark,
  Share2,
  Download
} from 'lucide-react';

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string; // ✅ Optional id prop add karein
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ 
  isOpen, 
  onClose, 
  id = "sidebar-menu" // ✅ Default value
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'menu' | 'categories' | 'posts'>('menu');
  const pathname = usePathname();

  // Fetch data when sidebar opens
  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoriesData, postsData] = await Promise.all([
        getAllCategories(),
        getAllPosts()
      ]);
      setCategories(categoriesData);
      setRecentPosts(postsData.slice(0, 3));
      setPopularPosts(postsData.slice(0, 3));
    } catch (error) {
      console.error('Error fetching sidebar data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (categorySlug: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categorySlug)) {
        newSet.delete(categorySlug);
      } else {
        newSet.add(categorySlug);
      }
      return newSet;
    });
  };

  const isCategoryActive = (categorySlug: string) => {
    return pathname === `/categories/${categorySlug}`;
  };

  const isLinkActive = (href: string) => {
    return pathname === href;
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.children?.some(child => 
      child.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLinkClick = () => {
    onClose();
  };

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const menuItems = [
    { name: 'Home', href: '/', icon: Home, color: 'text-blue-500', badge: null },
    { name: 'About', href: '/about', icon: Users, color: 'text-green-500', badge: null },
    { name: 'Services', href: '/services', icon: Settings, color: 'text-purple-500', badge: 'New' },
    { name: 'Events', href: '/events', icon: Sparkles, color: 'text-yellow-500', badge: 'Soon' },
    { name: 'Islamic Calendar', href: '/islamic-calendar', icon: Calendar, color: 'text-orange-500', badge: null },
    { name: 'Quran Classes', href: '/quran-classes', icon: BookOpen, color: 'text-cyan-500', badge: null },
    { name: 'Religious Guidance', href: '/religious-guidance', icon: GraduationCap, color: 'text-amber-500', badge: null },
    { name: 'Community Programs', href: '/community-programs', icon: Users, color: 'text-pink-500', badge: 'Hot' },
    { name: 'Funeral Services', href: '/funeral-services', icon: Heart, color: 'text-red-500', badge: null },
    { name: 'Contact', href: '/contact', icon: Mail, color: 'text-indigo-500', badge: null },
  ];

  const quickActions = [
    { name: 'Prayer Times', href: '/prayer-times', icon: '🕋', color: 'from-green-500 to-emerald-500' },
    { name: 'Donate', href: '/donate', icon: '💰', color: 'from-yellow-500 to-amber-500' },
    { name: 'Quran', href: '/quran', icon: '📖', color: 'from-blue-500 to-cyan-500' },
    { name: 'Hadith', href: '/hadith', icon: '📜', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <>
      {/* ✅ COMPLETELY TRANSPARENT BACKDROP - Only for click to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 transition-all duration-300"
          onClick={handleBackdropClick}
        />
      )}

      {/* ✅ COMPLETELY TRANSPARENT SIDEBAR - Website Fully Visible */}
      <div 
        id={id} // ✅ ID prop applied here
        className={`fixed top-0 right-0 h-full w-80 bg-white/10 dark:bg-gray-900/10 backdrop-blur-3xl shadow-2xl transform transition-transform duration-500 z-50 flex flex-col border-l border-white/30 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header - Semi Transparent */}
        <div className="flex items-center justify-between p-6 border-b border-white/30 bg-white/20 dark:bg-gray-900/20 backdrop-blur-2xl text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/40">
              <span className="text-lg">🕌</span>
            </div>
            <div>
              <h2 className="font-bold text-xl text-white drop-shadow-lg">Al-Asr Menu</h2>
              <p className="text-white/80 text-sm drop-shadow">Islamic Service Center</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/30 rounded-xl transition-all duration-200 transform hover:scale-110 backdrop-blur-sm border border-white/30"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Navigation Tabs - Semi Transparent */}
        <div className="flex border-b border-white/30 bg-white/20 dark:bg-gray-900/20 backdrop-blur-2xl">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex-1 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === 'menu'
                ? 'text-white border-b-2 border-white bg-white/30 backdrop-blur-sm'
                : 'text-white/80 hover:text-white hover:bg-white/20'
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex-1 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === 'categories'
                ? 'text-white border-b-2 border-white bg-white/30 backdrop-blur-sm'
                : 'text-white/80 hover:text-white hover:bg-white/20'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === 'posts'
                ? 'text-white border-b-2 border-white bg-white/30 backdrop-blur-sm'
                : 'text-white/80 hover:text-white hover:bg-white/20'
            }`}
          >
            Posts
          </button>
        </div>

        {/* Search Bar - Semi Transparent */}
        <div className="p-4 border-b border-white/30 bg-white/20 dark:bg-gray-900/20 backdrop-blur-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-white/30 rounded-xl bg-white/30 dark:bg-gray-900/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* Quick Actions - Semi Transparent */}
        <div className="p-4 border-b border-white/30 bg-linear-to-b from-white/20 to-white/10 dark:from-gray-900/20 dark:to-gray-900/10 backdrop-blur-2xl">
          <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide drop-shadow">
            Quick Access
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <Link
                key={action.name}
                href={action.href}
                onClick={handleLinkClick}
                className={`p-3 rounded-xl bg-linear-to-br ${action.color} text-white text-center transform transition-all duration-200 hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-white/30 shadow-lg`}
              >
                <div className="text-lg mb-1 drop-shadow">{action.icon}</div>
                <div className="text-xs font-medium opacity-90 drop-shadow">{action.name}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scrollable Content - Semi Transparent */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10">
          
          {/* Menu Tab */}
          {activeTab === 'menu' && (
            <div className="p-4">
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = isLinkActive(item.href);
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 group backdrop-blur-sm border ${
                        isActive
                          ? 'bg-white/40 border-white/50 text-white shadow-lg'
                          : 'bg-white/20 border-white/30 text-white/90 hover:bg-white/30 hover:text-white hover:border-white/40 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-white/30 ${item.color} backdrop-blur-sm`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-sm drop-shadow">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <span className={`text-xs px-2 py-1 rounded-full drop-shadow ${
                            item.badge === 'New' 
                              ? 'bg-green-500/90 text-white' 
                              : item.badge === 'Hot'
                              ? 'bg-orange-500/90 text-white'
                              : 'bg-yellow-500/90 text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white text-sm uppercase tracking-wide drop-shadow">
                  All Categories
                </h3>
                <span className="text-xs bg-white/30 text-white px-2 py-1 rounded-full backdrop-blur-sm drop-shadow">
                  {categories.length}
                </span>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-14 bg-white/20 rounded-xl animate-pulse backdrop-blur-sm border border-white/20"
                    ></div>
                  ))}
                </div>
              ) : filteredCategories.length > 0 ? (
                <div className="space-y-2">
                  {filteredCategories.map((category) => {
                    const hasChildren = category.children && category.children.length > 0;
                    const isExpanded = expandedCategories.has(category.slug);
                    const isActive = isCategoryActive(category.slug);

                    return (
                      <div key={category.id} className="space-y-2">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                          <Link
                            href={`/categories/${category.slug}`}
                            onClick={handleLinkClick}
                            className={`flex-1 flex items-center space-x-3 transition-all duration-200 ${
                              isActive
                                ? 'text-white'
                                : 'text-white/90 hover:text-white'
                            }`}
                          >
                            <FolderOpen className="w-5 h-5 text-white drop-shadow" />
                            <div className="flex-1">
                              <span className="font-medium text-sm drop-shadow">{category.name}</span>
                              {hasChildren && (
                                <span className="text-xs text-white/70 block drop-shadow">
                                  {category.children.length} sub-categories
                                </span>
                              )}
                            </div>
                          </Link>

                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-white/30 text-white px-2 py-1 rounded-full backdrop-blur-sm drop-shadow">
                              {category.count}
                            </span>
                            {hasChildren && (
                              <button
                                onClick={() => toggleCategory(category.slug)}
                                className="p-1 text-white/70 hover:text-white transition-colors"
                              >
                                <ChevronDown 
                                  className={`w-4 h-4 transform transition-transform drop-shadow ${
                                    isExpanded ? 'rotate-180' : ''
                                  }`} 
                                />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Sub-categories */}
                        {hasChildren && isExpanded && (
                          <div className="ml-6 space-y-2 border-l-2 border-white/30 pl-4">
                            {category.children!.map((child) => (
                              <Link
                                key={child.id}
                                href={`/categories/${child.slug}`}
                                onClick={handleLinkClick}
                                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 backdrop-blur-sm border ${
                                  isCategoryActive(child.slug)
                                    ? 'bg-white/40 border-white/50 text-white'
                                    : 'bg-white/20 border-white/30 text-white/80 hover:bg-white/30 hover:text-white hover:border-white/40'
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-green-400 rounded-full drop-shadow"></div>
                                  <span className="text-sm drop-shadow">{child.name}</span>
                                </div>
                                <span className="text-xs bg-white/30 text-white px-2 py-1 rounded backdrop-blur-sm drop-shadow">
                                  {child.count}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-white/70">
                  <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-60 drop-shadow" />
                  <p className="text-sm drop-shadow">No categories found</p>
                  {searchQuery && (
                    <p className="text-xs mt-1 drop-shadow">Try a different search term</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className="p-4">
              {/* Recent Posts */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-4 h-4 text-white drop-shadow" />
                  <h3 className="font-semibold text-white text-sm uppercase tracking-wide drop-shadow">
                    Recent Posts
                  </h3>
                </div>
                <div className="space-y-3">
                  {recentPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.slug}`}
                      onClick={handleLinkClick}
                      className="block p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50 hover:bg-white/30 transition-all duration-200 group"
                    >
                      <h4 className="text-sm font-medium text-white group-hover:text-white line-clamp-2 mb-2 drop-shadow">
                        {post.title}
                      </h4>
                      <p className="text-xs text-white/70 line-clamp-2 mb-2 drop-shadow">
                        {post.excerpt?.replace(/<[^>]*>/g, '') || 'Discover more in this post...'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/60 drop-shadow">
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Bookmark className="w-3 h-3 text-white/60 hover:text-white cursor-pointer drop-shadow" />
                          <Share2 className="w-3 h-3 text-white/60 hover:text-white cursor-pointer drop-shadow" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Posts */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-white drop-shadow" />
                  <h3 className="font-semibold text-white text-sm uppercase tracking-wide drop-shadow">
                    Popular Posts
                  </h3>
                </div>
                <div className="space-y-3">
                  {popularPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.slug}`}
                      onClick={handleLinkClick}
                      className="block p-4 rounded-xl bg-linear-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-sm border border-orange-400/30 hover:border-orange-400/50 transition-all duration-200 group"
                    >
                      <div className="flex items-start space-x-3">
                        <Star className="w-4 h-4 text-orange-300 mt-0.5 shrink-0 drop-shadow" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white group-hover:text-orange-200 line-clamp-2 mb-1 drop-shadow">
                            {post.title}
                          </h4>
                          <p className="text-xs text-white/70 drop-shadow">
                            {new Date(post.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ✅ FIXED: Footer with accessible buttons */}
        <div className="p-4 border-t border-white/30 bg-linear-to-t from-white/20 to-transparent backdrop-blur-2xl">
          <div className="text-center">
            <div className="flex justify-center space-x-3 mb-3">
              <button 
                className="p-2 bg-white/30 rounded-lg text-white hover:bg-white/40 transition-colors backdrop-blur-sm border border-white/30"
                aria-label="Download resources"
              >
                <Download className="w-4 h-4" />
              </button>
              <button 
                className="p-2 bg-white/30 rounded-lg text-white hover:bg-white/40 transition-colors backdrop-blur-sm border border-white/30"
                aria-label="Share this app"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button 
                className="p-2 bg-white/30 rounded-lg text-white hover:bg-white/40 transition-colors backdrop-blur-sm border border-white/30"
                aria-label="Bookmark this page"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-white/80 drop-shadow">
              Al-Asr Islamic Service Center
            </p>
            <p className="text-xs text-white/60 mt-1 drop-shadow">
              Your spiritual journey starts here
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;