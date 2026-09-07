import type { Metadata } from 'next';
import { ServicesView } from './ServicesView';

export const metadata: Metadata = {
  title: 'Layanan & Purna Jual | PT Holicindo Dasa Anugerah',
  description: 'Holicindo menyediakan layanan purna jual dan dukungan teknis profesional untuk mesin F&B komersial. Jamin kelancaran aset operasional bisnis Anda bersama kami.',
  keywords: ['layanan holicindo', 'servis mesin makanan', 'after sales holicindo', 'unit passport portal', 'perbaikan mesin F&B'],
};

export default function ServicesPage() {
  return <ServicesView />;
}
