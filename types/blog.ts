// types/blog.ts

export interface Category {
  id: string;
  slug: string;
  name: string;
  count: number;
  description?: string;
  parentId: string | null;
  children: Category[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified?: string; // <-- ADD THIS LINE
  slug: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails?: {
        width: number;
        height: number;
      };
    };
  };
  categories?: {
    nodes: Array<{
      slug: string;
      name: string;
      description?: string;
    }>;
  };
  author?: {
    node: {
      name: string;
    };
  };
}

export interface BlogListResponse {
  posts: {
    nodes: Post[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface SearchFilters {
  category?: string;
  tag?: string;
  author?: string;
  date?: string;
  sortBy?: 'date' | 'title' | 'modified';
  sortOrder?: 'ASC' | 'DESC';
}