'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { clsx } from 'clsx';
import { useLanguage } from '@/context/LanguageContext';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const { lang, setLang, t } = useLanguage();
  const pathname = usePathname();

  const navLinks = [
    { label: t('Beranda', 'Home'), href: '/' },
    { label: t('Tentang Kami', 'About Us'), href: '/about' },
    { label: t('Produk', 'Products'), href: '/products' },
    { label: t('Pengalaman Proyek', 'Project Experiences'), href: '/projects' },
    { label: t('Holic Insights', 'Holic Insights'), href: '/news' },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <nav className={clsx("relative transition-all duration-300 border-b border-white/10 bg-[#404F68]", scrolled ? "shadow-md py-2" : "py-2.5")}>
        <div className="container-wide">
          <div className="flex items-center justify-between h-14 md:h-16">
            
            {/* Logo - Left */}
            <Link href="/" className="flex items-center active:scale-95 transition-transform">
              <Image src="/logo.png" alt="Holicindo Logo" width={135} height={40} className="object-contain brightness-0 invert" priority />
            </Link>

            {/* Navigation & Language Switcher - Right (Desktop) */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map(link => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <div key={link.href} className="relative"
                    onMouseEnter={() => (link as any).children && setDropdown(link.href)}
                    onMouseLeave={() => setDropdown(null)}>
                    <Link href={link.href}
                      className={clsx(
                        "text-xs sm:text-[13px] md:text-sm font-bold uppercase tracking-wider transition-colors py-1.5 flex items-center gap-1 relative",
                        isActive ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white" : "text-neutral-200 hover:text-white"
                      )}>
                      {link.label} {(link as any).children && <ChevronDown size={14} strokeWidth={2} />}
                    </Link>
                  </div>
                );
              })}

              {/* Language Switcher Pill (ID | EN) */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs text-white shadow-inner ml-2">
                <Globe size={13} className="text-white/80" />
                <button
                  onClick={() => setLang('ID')}
                  className={clsx("px-2 py-0.5 rounded-full font-extrabold text-[10px] transition-all", lang === 'ID' ? "bg-white text-[#2D3E50] shadow" : "text-neutral-300 hover:text-white")}
                >
                  ID
                </button>
                <span className="text-white/30 text-[10px]">|</span>
                <button
                  onClick={() => setLang('EN')}
                  className={clsx("px-2 py-0.5 rounded-full font-extrabold text-[10px] transition-all", lang === 'EN' ? "bg-white text-[#2D3E50] shadow" : "text-neutral-300 hover:text-white")}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle + Lang Switcher (Mobile) */}
            <div className="flex items-center gap-2.5 md:hidden">
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-1 px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white">
                <button
                  onClick={() => setLang('ID')}
                  className={clsx("px-2 py-1 rounded-full font-extrabold text-[10px] min-w-[28px] text-center transition-all", lang === 'ID' ? "bg-white text-[#2D3E50]" : "text-neutral-300")}
                >
                  ID
                </button>
                <span className="text-white/30 text-[10px]">|</span>
                <button
                  onClick={() => setLang('EN')}
                  className={clsx("px-2 py-1 rounded-full font-extrabold text-[10px] min-w-[28px] text-center transition-all", lang === 'EN' ? "bg-white text-[#2D3E50]" : "text-neutral-300")}
                >
                  EN
                </button>
              </div>

              <button 
                className="p-2.5 text-white hover:text-neutral-200 active:scale-95 transition-all rounded-lg focus:outline-none" 
                onClick={() => setOpen(!open)} 
                aria-label="Toggle Menu"
              >
                {open ? <X size={26} strokeWidth={1.75} /> : <Menu size={26} strokeWidth={1.75} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 w-full bg-[#404F68] border-t border-white/10 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-60px)]">
            <div className="py-2 flex flex-col divide-y divide-white/10">
              {navLinks.map(link => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "px-6 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-between transition-all active:bg-white/10",
                      isActive ? "text-white bg-white/15 border-l-4 border-white pl-5" : "text-neutral-200 hover:text-white"
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </Link>
                );
              })}
            </div>

            {/* Quick Contact Bar in Mobile Drawer Footer */}
            <div className="p-6 border-t border-white/10 bg-black/20 text-center">
              <p className="text-[10px] uppercase tracking-widest text-neutral-300 font-bold mb-3">{t('Pusat Layanan Pelanggan', 'Customer Service Center')}</p>
              <a 
                href="https://wa.me/6281111825718" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#128C7E] text-white py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm active:scale-[0.98] transition-transform"
              >
                Chat WhatsApp (+62 811-1182-5718)
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
