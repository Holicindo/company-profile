'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Mail, ChevronDown, Facebook, Instagram, Youtube } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { label: 'About Us', href: '/about' },
  {
    label: 'Products', href: '/products',
    children: [
      { label: 'Semua Produk', href: '/products' },
      { label: 'Machinery', href: '/products/category/machinery' },
      { label: 'Mixer', href: '/products/category/mixer' },
      { label: 'Refrigerator', href: '/products/category/refrigerator' },
      { label: 'Blast Freezer', href: '/products/category/blastfreezer' },
      { label: 'Showcase', href: '/products/category/showcase' },
      { label: 'Ice Maker', href: '/products/category/icemaker' },
    ],
  },
  { label: 'Project Experiences', href: '/projects' },
  { label: 'Holic Insights', href: '/news' },
];

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/holicindo', icon: Facebook },
  { name: 'Instagram', href: 'https://instagram.com/holicindo', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com/@holicindodasaanugerah', icon: Youtube },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <nav className={clsx("border-b transition-all duration-300", scrolled ? "bg-slate-950/95 backdrop-blur-md shadow-lg py-3 border-white/10" : "bg-slate-950 py-4 border-transparent")}>
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Holicindo Logo" width={160} height={50} className="object-contain brightness-0 invert" priority />
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <div key={link.href} className="relative"
                  onMouseEnter={() => link.children && setDropdown(link.href)}
                  onMouseLeave={() => setDropdown(null)}>
                  <Link href={link.href}
                    className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-brand-400 flex items-center gap-1 transition-colors">
                    {link.label} {link.children && <ChevronDown size={14} />}
                  </Link>
                  {link.children && dropdown === link.href && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-slate-900 border border-slate-700/50 rounded-xl shadow-xl py-2 z-50">
                      {link.children.map(child => (
                        <Link key={child.href} href={child.href}

                          className="block px-4 py-2.5 text-sm text-neutral-300 hover:bg-slate-800 hover:text-brand-400 transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/contact" className="btn-primary hidden md:inline-flex text-sm">Hubungi Kami</Link>
              <button className="md:hidden p-2 text-white hover:text-brand-400" onClick={() => setOpen(!open)} aria-label="Menu">
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950 border-b border-slate-800 shadow-xl py-4 flex flex-col z-50">
            {navLinks.map(link => (
              <div key={link.href}>
                {link.children ? (
                  <div className="px-4 py-2">
                    <div className="text-sm font-medium text-brand-400 mb-2">{link.label}</div>
                    <div className="pl-4 border-l border-slate-800 flex flex-col gap-2">
                      {link.children.map(c => (
                        <Link key={c.href} href={c.href} onClick={() => setOpen(false)}
                          className="text-sm text-neutral-400 hover:text-brand-400">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link href={link.href} onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-neutral-300 hover:text-brand-400">
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="px-4 pt-4 mt-2 border-t border-slate-800">
              <Link href="/contact" onClick={() => setOpen(false)}
                className="btn-primary w-full justify-center">
                Hubungi Kami
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
