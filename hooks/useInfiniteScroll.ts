import { useState, useEffect, useCallback } from 'react';

export const useInfiniteScroll = (loadMore: () => Promise<void>, hasMore: boolean) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = useCallback(async () => {
    if (isLoading || !hasMore) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    // Load more when 80% scrolled
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      setIsLoading(true);
      await loadMore();
      setIsLoading(false);
    }
  }, [isLoading, hasMore, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { isLoading };
};