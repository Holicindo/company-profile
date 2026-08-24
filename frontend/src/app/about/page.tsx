import type { Metadata } from 'next';
import { AboutView } from './AboutView';

export const metadata: Metadata = {
  title: 'Tentang Kami | PT Holicindo Dasa Anugerah',
  description: 'Mengenal PT Holicindo Dasa Anugerah, distributor mesin pengolah makanan dan mitra terpercaya industri kuliner di Indonesia sejak 2001.',
  keywords: ['distributor mesin makanan', 'holicindo', 'mesin pengolah makanan', 'peralatan dapur komersial', 'food machinery indonesia'],
};

export default function AboutPage() {
  return <AboutView />;
}
