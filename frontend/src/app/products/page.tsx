import type { Metadata } from 'next';
import { getProductCategories, getProducts } from '@/lib/api';
import { getCategorySeo } from '@/lib/seo-keywords';
import { ProductsView } from './ProductsView';

export async function generateMetadata(props: { searchParams: Promise<{ category?: string }> | { category?: string } }): Promise<Metadata> {
  const resolvedParams = await props.searchParams;
  const category = typeof resolvedParams?.category === 'string' ? resolvedParams.category : undefined;
  const seo = getCategorySeo(category);
  return { title: seo.title, description: seo.description };
}

export const revalidate = 3600; // ISR: revalidate every hour

// Kata kunci nama kategori yang diizinkan (case-insensitive)
const ALLOWED_KEYWORDS = ['showcase', 'refrigerator', 'blast freezer', 'blast-freezer', 'freezer'];

function isCategoryAllowed(cat: any): boolean {
  if (!cat) return false;
  const slug = (cat.slug || '').toLowerCase();
  const name = (cat.name || '').toLowerCase();
  return ALLOWED_KEYWORDS.some(k => slug.includes(k) || name.includes(k));
}

export default async function ProductsPage(props: {
  searchParams: Promise<{ page?: string; search?: string; category?: string }> | { page?: string; search?: string; category?: string };
}) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(String(searchParams.page), 10) || 1 : 1;
  const category = typeof searchParams?.category === 'string' ? searchParams.category : undefined;
  const search = typeof searchParams?.search === 'string' ? searchParams.search : undefined;

  const seoInfo = getCategorySeo(category);
  const limit = 24;

  const [categories, rawData] = await Promise.all([
    getProductCategories().catch(() => []),
    // When no category filter: fetch paginated allowed products directly from API
    getProducts({ page, limit, search, category })
      .catch(() => ({ items: [], total: 0, totalPages: 0 })),
  ]);

  // Sidebar: hanya kategori yang allowed
  const roots: any[] = [];
  const seen = new Set<string>();
  categories.forEach((c: any) => {
    if (isCategoryAllowed(c) && !seen.has(c.slug)) { roots.push(c); seen.add(c.slug); }
    (c.children || []).forEach((child: any) => {
      if (isCategoryAllowed(child) && !seen.has(child.slug)) { roots.push(child); seen.add(child.slug); }
    });
  });

  // When no specific category: client-side filter by allowed categories
  // then re-paginate using the filtered subset
  let data = rawData;
  if (!category) {
    const allAllowed = (rawData.items || []).filter((p: any) => isCategoryAllowed(p.category));
    allAllowed.sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''));
    const total = allAllowed.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const start = (page - 1) * limit;
    // total here is the accurate filtered count — no misleading numbers
    data = { items: allAllowed.slice(start, start + limit), total, totalPages };
  }

  return <ProductsView data={data} roots={roots} category={category} page={page} seoInfo={seoInfo} />;
}
