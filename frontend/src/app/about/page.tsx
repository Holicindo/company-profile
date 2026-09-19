import type { Metadata } from 'next';
import { AboutView } from './AboutView';
import { generatePageMetadata } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

import { getPageBySlug } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('tentang-kami', {
    title: 'Tentang Kami | PT Holicindo Dasa Anugerah',
    description: 'Mengenal PT Holicindo Dasa Anugerah, distributor mesin pengolah makanan dan mitra terpercaya industri kuliner di Indonesia sejak 2001.',
    keywords: 'distributor mesin makanan, holicindo, mesin pengolah makanan, peralatan dapur komersial, food machinery indonesia',
  });
}

// Force dynamic and disable cache so admin updates appear instantly
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AboutPage() {
  const pageData = await getPageBySlug('tentang-kami');

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Beranda', url: 'https://holicindo.com' },
          { name: 'Tentang Kami', url: 'https://holicindo.com/about' },
        ]}
      />
      <AboutView initialData={pageData?.sections} />
    </>
  );
}
