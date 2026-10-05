import type { Metadata } from 'next';

interface PageSEO {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
}

export async function generatePageMetadata(
  slug: string,
  fallback?: Metadata
): Promise<Metadata> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/slug/${slug}`, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return fallback || {};

    const page = await res.json();
    const seo: PageSEO = page.metadata || {};

    return {
      title: seo.seoTitle || fallback?.title || 'Holicindo',
      description: seo.seoDescription || fallback?.description || '',
      keywords: seo.seoKeywords || fallback?.keywords || '',
      openGraph: {
        title: seo.seoTitle || fallback?.title || 'Holicindo',
        description: seo.seoDescription || fallback?.description || '',
        images: seo.ogImage ? [{ url: seo.ogImage }] : [],
        type: 'website',
        locale: 'id_ID',
        siteName: 'Holicindo',
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.seoTitle || fallback?.title || 'Holicindo',
        description: seo.seoDescription || fallback?.description || '',
        images: seo.ogImage ? [seo.ogImage] : [],
      },
    };
  } catch (error: any) {
    // Sembunyikan error saat backend tidak berjalan (dev mode)
    const isConnRefused = error?.cause?.code === 'ECONNREFUSED' || error?.name === 'AbortError';
    if (!isConnRefused) {
      console.error('Failed to fetch page metadata:', error);
    }
    return fallback || {};
  }
}

