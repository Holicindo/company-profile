'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

import { LanguageProvider } from '@/context/LanguageContext';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNoPublicLayout = pathname?.startsWith('/admin') || pathname?.includes('login');

  if (isNoPublicLayout) {
    return <>{children}</>;
  }

  return (
    <LanguageProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
