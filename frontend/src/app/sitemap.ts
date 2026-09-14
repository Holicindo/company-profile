import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://holicindo.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
  ];

  // Fetch dynamic pages (blog posts, products, etc.)
  try {
    // Fetch published pages from backend
    const pagesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    let dynamicPages: MetadataRoute.Sitemap = [];
    
    if (pagesRes.ok) {
      const pages = await pagesRes.json();
      dynamicPages = pages
        .filter((page: any) => page.status === 'published')
        .map((page: any) => ({
          url: `${baseUrl}/${page.slug}`,
          lastModified: new Date(page.updatedAt),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }));
    }

    // Fetch blog posts
    const blogRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`, {
      next: { revalidate: 3600 },
    });
    
    let blogPages: MetadataRoute.Sitemap = [];
    
    if (blogRes.ok) {
      const blogPosts = await blogRes.json();
      blogPages = blogPosts.map((post: any) => ({
        url: `${baseUrl}/news/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    }

    return [...staticPages, ...dynamicPages, ...blogPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
