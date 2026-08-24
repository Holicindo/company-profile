'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

import { LanguageProvider } from '@/context/LanguageContext';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
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
