import type { Metadata } from 'next';
import { CatalogView } from './CatalogView';

export const metadata: Metadata = {
  title: 'Katalog Pendingin Komersial & Solusi Industri - Holic',
  description: 'Temukan unit pendingin komersial Holic yang sesuai dengan kebutuhan gerai dan dapur usaha Anda.',
};

export const revalidate = 3600;

export default function CatalogPage() {
  return <CatalogView />;
}
