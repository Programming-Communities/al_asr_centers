'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogItem from '@/components/blog/BlogItem';
import { Post } from '@/types/blog';

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to search posts. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900 mb-4">
            Search Posts
          </h1>
          <p className="text-gray-600 dark:text-gray-600">
            Enter a search term to find posts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-900 mb-4">
          Search Results
        </h1>
        <p className="text-gray-600 dark:text-gray-600">
          {loading ? 'Searching...' : `Found ${results.length} results for "${query}"`}
        </p>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-600">Searching posts...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <div className="bg-red-50 dark:bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-red-800 dark:text-red-800">{error}</p>
            <button
              onClick={() => query && performSearch(query)}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {!loading && !error && results.length === 0 && query && (
        <div className="text-center py-8">
          <div className="bg-yellow-50 dark:bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
            <svg className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-800 mb-2">
              No Results Found
            </h3>
            <p className="text-yellow-700 dark:text-yellow-700">
              No posts found matching "{query}". Try different keywords.
            </p>
          </div>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16'>
          {results.map((post, index) => (
            <BlogItem
              key={post.id}
              {...post}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}