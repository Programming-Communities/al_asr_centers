import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { PostPageSkeleton } from '@/components/skeleton/PostPageSkeleton';
import PostClient from './PostClient';
import { getPost, getPosts } from '@/lib/wordpress';

// Enhanced RTL detection function
function isRTLText(text: string): boolean {
  if (!text) return false;
  // Arabic, Urdu, Persian, Hebrew characters
  const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0590-\u05FF\uFB50-\uFDFF\uFE70-\uFEFF\u0700-\u074F]/;
  return rtlRegex.test(text);
}

// PostContent component
async function PostContent({ slug }: { slug: string }) {
  const post = await getPost(slug);
  
  if (!post) {
    notFound();
  }

  // Enhanced RTL language detection
  const isTitleRTL = isRTLText(post.title);
  const isContentRTL = isRTLText(post.content);
  const isUrdu = isTitleRTL || isContentRTL;

  return <PostClient post={post} slug={slug} isUrdu={isUrdu} />;
}

// Main page component
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <Suspense fallback={<PostPageSkeleton />}>
      <PostContent slug={slug} />
    </Suspense>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Al-Asr ( Islamic Service )',
      description: 'The requested post was not found.',
    };
  }

  const cleanExcerpt = post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) + '...' ||
                      post.content?.replace(/<[^>]*>/g, '').substring(0, 160) + '...' ||
                      'Islamic services and community programs from Al-Asr ( Islamic Service )';

  const imageUrl = post.featuredImage?.node?.sourceUrl || '/og-image.png';

  return {
    title: `${post.title} | Al-Asr ( Islamic Service )`,
    description: cleanExcerpt,
    openGraph: {
      title: post.title,
      description: cleanExcerpt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.featuredImage?.node?.altText || post.title,
        },
      ],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author?.node?.name || 'Al-Asr ( Islamic Service )'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: cleanExcerpt,
      images: [imageUrl],
    },
  };
}

// Generate static params for SSG
export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Revalidate every 60 seconds
export const revalidate = 60;