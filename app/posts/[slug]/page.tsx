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

// ✅ FIXED: Generate dynamic metadata for each post with proper OG images
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Al-Asr ( Islamic Service )',
      description: 'The requested post was not found.',
    };
  }

  const SITE_URL = "https://al-asr.centers.pk";
  
  const cleanExcerpt = post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) + '...' ||
                      post.content?.replace(/<[^>]*>/g, '').substring(0, 160) + '...' ||
                      'Islamic services and community programs from Al-Asr ( Islamic Service )';

  // ✅ FIXED: Use absolute URL for post-specific images
  const imageUrl = post.featuredImage?.node?.sourceUrl 
    ? post.featuredImage.node.sourceUrl
    : `${SITE_URL}/og-image.png`;

  const postUrl = `${SITE_URL}/posts/${slug}`;

  const metadata = {
    title: `${post.title} | Al-Asr ( Islamic Service )`,
    description: cleanExcerpt,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: cleanExcerpt,
      url: postUrl,
      siteName: "Al-Asr Islamic Service",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.featuredImage?.node?.altText || post.title,
          type: 'image/jpeg',
        },
      ],
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author?.node?.name || 'Al-Asr ( Islamic Service )'],
      locale: 'ur_PK',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: cleanExcerpt,
      images: [imageUrl],
      creator: '@al-asr',
      site: '@al-asr',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // ✅ ADDED: Additional meta tags for better social media sharing
    other: {
      'og:image:secure_url': imageUrl,
      'og:image:width': '1200',
      'og:image:height': '630',
      'twitter:image:alt': post.featuredImage?.node?.altText || post.title,
    }
  };

  return metadata;
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