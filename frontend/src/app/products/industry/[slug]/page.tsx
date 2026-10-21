import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductCategoryView from './ProductCategoryView';
import { getIndustryCategoryBySlug } from '@/lib/api';

interface Props {
  params: { slug: string };
  searchParams: { page?: string; search?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const category = await getIndustryCategoryBySlug(params.slug);
    const title = `${category.name} | Katalog Produk Holicindo`;
    const description = category.description || `Produk ${category.name} - Distributor mesin makanan & minuman terpercaya di Indonesia`;
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: category.image ? [category.image] : [],
      },
    };
  } catch {
    return {
      title: 'Kategori Tidak Ditemukan | Holicindo',
      description: 'Kategori produk tidak ditemukan',
    };
  }
}

export const revalidate = 3600; // Cache for 1 hour

export default async function IndustryCategoryPage({ params, searchParams }: Props) {
  let category: any;
  
  try {
    category = await getIndustryCategoryBySlug(params.slug);
  } catch {
    notFound();
  }

  return <ProductCategoryView category={category} searchParams={searchParams} />;
}
