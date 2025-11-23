// app/sitemap.js
import { GraphQLClient } from 'graphql-request';

const baseUrl = 'https://al-asr.centers.pk';
const client = new GraphQLClient('https://admin-al-asr.centers.pk/graphql');

export default async function sitemap() {
  try {
    console.log('🔄 Generating sitemap...');

    const [posts, pages, categories] = await Promise.all([
      fetchPosts(),
      fetchPages(),
      fetchCategories(),
    ]);

    // ✅ Convert each type into sitemap entries
    const postUrls = posts.map((p) => ({
      url: `${baseUrl}/posts/${p.slug}`,
      lastModified: new Date(p.modified || p.date),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const pageUrls = pages.map((p) => ({
      url: `${baseUrl}/${p.slug}`,
      lastModified: new Date(p.modified || p.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    const categoryUrls = categories.map((c) => ({
      url: `${baseUrl}/category/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // ✅ Combine everything
    const sitemapData = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      ...postUrls,
      ...pageUrls,
      ...categoryUrls,
    ];

    console.log(`✅ Sitemap generated with ${sitemapData.length} URLs`);
    return sitemapData;
  } catch (error) {
    console.error('❌ Sitemap generation error:', error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}

// 🧩 Fetch published posts
async function fetchPosts() {
  try {
    const query = `
      {
        posts(first: 100, where: {status: PUBLISH}) {
          nodes {
            slug
            date
            modified
          }
        }
      }
    `;
    const data = await client.request(query);
    return data.posts.nodes || [];
  } catch {
    return [];
  }
}

// 🧩 Fetch published pages (no drafts/trash)
async function fetchPages() {
  try {
    const query = `
      {
        pages(first: 100, where: {status: PUBLISH}) {
          nodes {
            slug
            date
            modified
          }
        }
      }
    `;
    const data = await client.request(query);
    // 🔒 Filter out unwanted system pages if any
    return (data.pages.nodes || []).filter(
      (p) =>
        !['tag', 'author', 'feed', 'search'].includes(p.slug.toLowerCase())
    );
  } catch {
    return [];
  }
}

// 🧩 Fetch categories (exclude tags)
async function fetchCategories() {
  try {
    const query = `
      {
        categories(first: 50) {
          nodes {
            slug
          }
        }
      }
    `;
    const data = await client.request(query);
    return data.categories.nodes || [];
  } catch {
    return [];
  }
}
