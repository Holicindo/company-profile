import type { Metadata } from 'next';
import { ServicesView } from './ServicesView';
import { generatePageMetadata } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('layanan', {
    title: 'Layanan & Purna Jual | PT Holicindo Dasa Anugerah',
    description: 'Holicindo menyediakan layanan purna jual dan dukungan teknis profesional untuk mesin F&B komersial. Jamin kelancaran aset operasional bisnis Anda bersama kami.',
    keywords: 'layanan holicindo, servis mesin makanan, after sales holicindo, unit passport portal, perbaikan mesin F&B',
  });
}

// Disable caching for this page - always fetch fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Beranda', url: 'https://holicindo.com' },
          { name: 'Layanan', url: 'https://holicindo.com/services' },
        ]}
      />
      <ServicesView />
    </>
  );
}
