import { gql } from '@apollo/client';
import { Post, Category } from '@/types/blog';

// Server-side fetch function with better error handling
async function fetchGraphQL(query: string, variables?: any) {
  const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  
  if (!WORDPRESS_API_URL) {
    throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL environment variable is not set');
  }

  console.log('🔍 Fetching from WordPress:', WORDPRESS_API_URL);
  
  try {
    const response = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 }
    });

    console.log('📊 Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ WordPress Error Response:', errorText);
      throw new Error(`WordPress GraphQL Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.errors) {
      console.error('❌ GraphQL Query Errors:', result.errors);
      throw new Error('GraphQL query failed: ' + JSON.stringify(result.errors));
    }

    console.log('✅ GraphQL Query Successful');
    return result.data;
  } catch (error) {
    console.error('💥 Fetch error:', error);
    throw error;
  }
}

// ✅ GET ALL POSTS FUNCTION - CLEAN GRAPHQL QUERY
export async function getPosts(): Promise<Post[]> {
  try {
    console.log('📝 Fetching posts from WordPress...');
    
    const data = await fetchGraphQL(`
      query GetPosts {
        posts(first: 100) {
          nodes {
            id
            title
            content
            excerpt
            date
            slug
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            categories {
              nodes {
                slug
                name
              }
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    `);

    const posts = data?.posts?.nodes || [];
    console.log(`✅ Retrieved ${posts.length} posts from WordPress`);
    
    return posts;
  } catch (error) {
    console.error('❌ Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const data = await fetchGraphQL(`
      query GetPost($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          id
          title
          content
          excerpt
          date
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              slug
              name
            }
          }
          author {
            node {
              name
            }
          }
        }
      }
    `, { slug });

    return data?.post || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// ✅ GET ALL CATEGORIES FUNCTION - CLEAN GRAPHQL QUERY
export async function getAllCategories(): Promise<Category[]> {
  try {
    console.log('📂 Fetching categories from WordPress...');
    
    const data = await fetchGraphQL(`
      query GetAllCategories {
        categories(first: 50, where: {hideEmpty: true}) {
          nodes {
            id
            slug
            name
            count
            description
            parent {
              node {
                id
                slug
                name
              }
            }
          }
        }
      }
    `);

    const categories = data?.categories?.nodes || [];
    console.log(`✅ Retrieved ${categories.length} categories from WordPress`);
    
    return organizeCategoriesHierarchy(categories);
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    return [];
  }
}

// Helper function to organize categories hierarchically
function organizeCategoriesHierarchy(categories: any[]): Category[] {
  const categoryMap = new Map();
  const rootCategories: Category[] = [];

  categories.forEach(category => {
    const categoryData: Category = {
      id: category.id,
      slug: category.slug,
      name: category.name,
      count: category.count || 0,
      description: category.description || '',
      parentId: category.parent?.node?.id || null,
      children: []
    };

    categoryMap.set(category.id, categoryData);
  });

  categories.forEach(category => {
    const categoryData = categoryMap.get(category.id);
    
    if (category.parent?.node) {
      const parentCategory = categoryMap.get(category.parent.node.id);
      if (parentCategory) {
        parentCategory.children = parentCategory.children || [];
        parentCategory.children.push(categoryData);
      }
    } else {
      rootCategories.push(categoryData);
    }
  });

  return rootCategories;
}

// ✅ GET POSTS BY CATEGORY
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    const allPosts = await getPosts();
    const filteredPosts = allPosts.filter(post => 
      post.categories?.nodes?.some((cat: any) => cat.slug === categorySlug)
    );

    console.log(`✅ Found ${filteredPosts.length} posts for category: ${categorySlug}`);
    return filteredPosts;
  } catch (error) {
    console.error('Error in getPostsByCategory:', error);
    return [];
  }
}

// ✅ GET ALL POSTS (alias for getPosts)
export async function getAllPosts(): Promise<Post[]> {
  return await getPosts();
}