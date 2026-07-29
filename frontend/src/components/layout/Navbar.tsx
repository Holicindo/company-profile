'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
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
  { label: 'News', href: '/news' },
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
      {/* Top bar */}
      <div className="bg-neutral-800 text-neutral-300 text-sm hidden md:block">
        <div className="container-wide flex justify-between items-center py-2">
          <div className="flex items-center gap-6">
            <a href="tel:+622120832035" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={13} /> +6221-20832035
            </a>
            <a href="mailto:info@holicindo.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={13} /> info@holicindo.com
            </a>
          </div>
          <div className="flex gap-4">
            {['FB', 'IG', 'YT'].map(s => (
              <a key={s} href="#" className="hover:text-white transition-colors text-xs font-bold">{s}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={clsx('bg-white transition-shadow duration-200', scrolled ? 'shadow-md' : 'shadow-sm')}>
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-display">H</span>
              </div>
              <span className="font-display font-bold text-xl text-neutral-900 tracking-tight">HOLIC</span>
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <div key={link.href} className="relative"
                  onMouseEnter={() => link.children && setDropdown(link.href)}
                  onMouseLeave={() => setDropdown(null)}>
                  <Link href={link.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors">
                    {link.label}
                    {link.children && <ChevronDown size={14} />}
                  </Link>
                  {link.children && dropdown === link.href && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-neutral-100 py-2 z-50">
                      {link.children.map(c => (
                        <Link key={c.href} href={c.href}
                          className="block px-4 py-2 text-sm text-neutral-600 hover:text-brand-600 hover:bg-brand-50 transition-colors">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/contact" className="btn-primary hidden md:inline-flex text-sm">Contact Us</Link>
              <button className="md:hidden p-2 text-neutral-600" onClick={() => setOpen(!open)} aria-label="Menu">
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile */}
        {open && (
          <div className="md:hidden border-t border-neutral-100">
            <div className="container-wide py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <div key={link.href}>
                  <Link href={link.href} onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-neutral-700 hover:text-brand-600 rounded-lg">
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-4">
                      {link.children.slice(1).map(c => (
                        <Link key={c.href} href={c.href} onClick={() => setOpen(false)}
                          className="block px-3 py-2 text-sm text-neutral-500 hover:text-brand-600">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/contact" className="btn-primary mt-3 justify-center text-sm" onClick={() => setOpen(false)}>
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
