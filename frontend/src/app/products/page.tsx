import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, Settings, Grid } from 'lucide-react';
import { getProductCategories, getProducts } from '@/lib/api';

import { getCategorySeo } from '@/lib/seo-keywords';
import { ProductsView } from './ProductsView';

export async function generateMetadata(props: { searchParams: Promise<{ category?: string }> | { category?: string } }): Promise<Metadata> {
  const resolvedParams = await props.searchParams;
  const category = typeof resolvedParams?.category === 'string' ? resolvedParams.category : undefined;
  const seo = getCategorySeo(category);
  return {
    title: seo.title,
    description: seo.description,
  };
}

export const revalidate = 0;

export default async function ProductsPage(props: { searchParams: Promise<{ page?: string; search?: string; category?: string }> | { page?: string; search?: string; category?: string } }) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(String(searchParams.page), 10) || 1 : 1;
  const category = typeof searchParams?.category === 'string' ? searchParams.category : undefined;
  const search = typeof searchParams?.search === 'string' ? searchParams.search : undefined;

  const seoInfo = getCategorySeo(category);
  const limit = 24;
  const [categories, data] = await Promise.all([
    getProductCategories().catch(() => []),
    getProducts({ page, limit, search, category }).catch(() => ({ items: [], total: 0, totalPages: 0 })),
  ]);
  const emptySlugs = ['pleer-slicer', 'pleer-amp-slicer', 'sanitary-equipment', 'uncategorized', 'dividerrounder', 'formingmachine', 'fryer', 'mouldersheeter', 'oven', 'packaging', 'steamer', 'undercounter', 'upright'];
  
  const allCategoryItems: any[] = [];
  categories.forEach((c: any) => {
    if (!emptySlugs.includes(c.slug)) allCategoryItems.push(c);
    if (c.children && Array.isArray(c.children)) {
      c.children.forEach((child: any) => {
        if (!emptySlugs.includes(child.slug)) allCategoryItems.push(child);
      });
    }
  });

  const roots = Array.from(new Map(allCategoryItems.map((item: any) => [item.slug, item])).values());

  return <ProductsView data={data} roots={roots} category={category} page={page} seoInfo={seoInfo} />;
}

