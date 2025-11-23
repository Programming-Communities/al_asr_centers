import { Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import SearchContent from './SearchContent';

export default function SearchPage() {
  return (
    <Layout>
      <Suspense fallback={<SearchSkeleton />}>
        <SearchContent />
      </Suspense>
    </Layout>
  );
}

function SearchSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-200 dark:bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-300 rounded w-48 mx-auto animate-pulse"></div>
      </div>
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-600">Loading search...</p>
      </div>
    </div>
  );
}