// app/robots.txt/route.js
export async function GET() {
  const baseUrl = 'https://al-asr.centers.pk'

  const robotsTxt = `
User-agent: *
Allow: /

# 🔒 Block sensitive/admin endpoints
Disallow: /api/
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /wp-json/

# ⚙️ Block framework-internal assets
Disallow: /_next/
Disallow: /_vercel/
Disallow: /private/
Disallow: /tmp/

# 🧭 Optional: avoid tag or test pages
Disallow: /tag/
Disallow: /tags/
Disallow: /test/

# 🗺️ Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`.trim()

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
