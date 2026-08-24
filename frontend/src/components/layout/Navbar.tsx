'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { clsx } from 'clsx';
import { useLanguage } from '@/context/LanguageContext';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const { lang, setLang, t } = useLanguage();

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

  return (
    <header className="sticky top-0 z-50">
      <nav className={clsx("transition-all duration-300 border-b border-white/10", scrolled ? "bg-[#404F68]/90 backdrop-blur-md shadow-md py-3" : "bg-[#404F68] py-4")}>
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo - Left */}
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Holicindo Logo" width={160} height={50} className="object-contain brightness-0 invert" priority />
            </Link>

            {/* Navigation & Language Switcher - Right (Desktop) */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <div key={link.href} className="relative"
                  onMouseEnter={() => (link as any).children && setDropdown(link.href)}
                  onMouseLeave={() => setDropdown(null)}>
                  <Link href={link.href}
                    className="text-xs font-bold uppercase tracking-widest text-neutral-100 hover:text-white flex items-center gap-1 transition-colors py-2">
                    {link.label} {(link as any).children && <ChevronDown size={14} strokeWidth={2} />}
                  </Link>
                </div>
              ))}

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
            <div className="flex items-center gap-3 md:hidden">
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-1 px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white">
                <button
                  onClick={() => setLang('ID')}
                  className={clsx("px-1.5 py-0.5 rounded-full font-extrabold text-[9px]", lang === 'ID' ? "bg-white text-[#2D3E50]" : "text-neutral-300")}
                >
                  ID
                </button>
                <span className="text-white/30 text-[9px]">|</span>
                <button
                  onClick={() => setLang('EN')}
                  className={clsx("px-1.5 py-0.5 rounded-full font-extrabold text-[9px]", lang === 'EN' ? "bg-white text-[#2D3E50]" : "text-neutral-300")}
                >
                  EN
                </button>
              </div>

              <button className="p-2 text-white hover:text-neutral-300" onClick={() => setOpen(!open)} aria-label="Menu">
                {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#404F68] border-b border-white/10 shadow-lg py-4 flex flex-col z-50">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                className="block px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-100 hover:text-white border-b border-white/5">
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
