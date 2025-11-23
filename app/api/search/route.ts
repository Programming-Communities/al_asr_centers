import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/lib/wordpress';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const posts = await getPosts();
    
    // Filter posts based on search query
    const filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(query.toLowerCase())) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );

    // Return complete post data to match BlogItem requirements
    const searchResults = filteredPosts.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      slug: post.slug,
      date: post.date,
      categories: post.categories,
      featuredImage: post.featuredImage,
      author: post.author
    }));

    return NextResponse.json(searchResults);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}