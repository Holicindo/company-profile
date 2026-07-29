import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const products = [
  { label: 'Machinery', href: '/products/category/machinery' },
  { label: 'Mixer', href: '/products/category/mixer' },
  { label: 'Refrigerator', href: '/products/category/refrigerator' },
  { label: 'Blast Freezer', href: '/products/category/blastfreezer' },
  { label: 'Showcase', href: '/products/category/showcase' },
  { label: 'Ice Maker', href: '/products/category/icemaker' },
];
const company = [
  { label: 'About Us', href: '/about' },
  { label: 'Project Experiences', href: '/projects' },
  { label: 'News & Blog', href: '/news' },
  { label: 'Contact Us', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-white font-display font-bold text-xl">HOLIC</span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400 mb-6">
              Solusi mesin produksi makanan berkualitas tinggi untuk industri food &amp; beverage Indonesia.
            </p>
            <div className="flex gap-3">
              {['FB', 'IG', 'YT'].map(s => (
                <a key={s} href="#"
                  className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-brand-600 flex items-center justify-center text-xs font-bold transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 font-display">Products</h4>
            <ul className="space-y-3">
              {products.map(i => (
                <li key={i.href}>
                  <Link href={i.href} className="text-sm text-neutral-400 hover:text-white transition-colors">{i.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 font-display">Company</h4>
            <ul className="space-y-3">
              {company.map(i => (
                <li key={i.href}>
                  <Link href={i.href} className="text-sm text-neutral-400 hover:text-white transition-colors">{i.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5 font-display">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-neutral-400">Jakarta, Indonesia</span>
              </li>
              <li>
                <a href="tel:+622120832035" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white transition-colors">
                  <Phone size={16} className="text-brand-400 flex-shrink-0" /> +6221-20832035
                </a>
              </li>
              <li>
                <a href="mailto:info@holicindo.com" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white transition-colors">
                  <Mail size={16} className="text-brand-400 flex-shrink-0" /> info@holicindo.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-800">
        <div className="container-wide py-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-neutral-500">© {new Date().getFullYear()} Holicindo. All rights reserved.</p>
          <p className="text-xs text-neutral-500">Food Machinery, Refrigerator &amp; Showcase</p>
        </div>
      </div>
    </footer>
  );
}
