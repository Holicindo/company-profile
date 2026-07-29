import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: { default: 'Holic | Food Machinery, Refrigerator & Showcase', template: '%s | Holic' },
  description: 'Holicindo – solusi mesin produksi makanan berkualitas tinggi. Food Machinery, Refrigerator, Showcase, Blast Freezer, Ice Maker.',
  keywords: ['food machinery', 'mesin makanan', 'refrigerator industri', 'showcase', 'holicindo', 'blast freezer'],
  metadataBase: new URL('https://holicindo.com'),
  openGraph: { type: 'website', locale: 'id_ID', url: 'https://holicindo.com', siteName: 'Holicindo' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
