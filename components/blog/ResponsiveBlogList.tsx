'use client';
import { useMobileDetect } from '@/hooks/useMobileDetect';
import BlogList from './BlogList';
import MobileBlogList from './MobileBlogList';
import { Post } from '@/types/blog';

interface ResponsiveBlogListProps {
  initialPosts?: Post[];
  showTitle?: boolean;
  currentPostSlug?: string | null;
}

const ResponsiveBlogList: React.FC<ResponsiveBlogListProps> = ({
  initialPosts = [],
  showTitle = true,
  currentPostSlug = null
}) => {
  const deviceType = useMobileDetect();

  // Mobile (including tablets for mobile view)
  if (deviceType === 'mobile' || deviceType === 'tablet') {
    return (
      <MobileBlogList 
        initialPosts={initialPosts}
        showTitle={showTitle}
        currentPostSlug={currentPostSlug}
      />
    );
  }

  // Desktop
  return (
    <BlogList 
      initialPosts={initialPosts}
      showTitle={showTitle}
      currentPostSlug={currentPostSlug}
    />
  );
};

export default ResponsiveBlogList;