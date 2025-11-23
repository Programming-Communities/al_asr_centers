import BlogList from "@/components/blog/BlogList";
import Layout from "@/components/layout/Layout";
import { getPosts } from '@/lib/wordpress';

// Server component for SSR
export default async function Home() {
  const initialPosts = await getPosts();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center"></h1>
        <BlogList initialPosts={initialPosts} />
      </div>
    </Layout>
  );
}

// Revalidate every 60 seconds for ISR
export const revalidate = 60;