import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

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
const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/holicindo', icon: Facebook },
  { name: 'Instagram', href: 'https://instagram.com/holicindo', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com/@holicindodasaanugerah', icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-5">
              <Image src="/logo.png" alt="Holicindo Logo" width={160} height={50} className="object-contain" />
            </div>
            <p className="text-sm leading-relaxed text-neutral-400 mb-6">
              Solusi mesin produksi makanan berkualitas tinggi untuk industri food &amp; beverage Indonesia.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(s => {
                const Icon = s.icon;
                return (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-brand-600 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                    title={s.name}>
                    <Icon size={18} />
                  </a>
                );
              })}
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
                <a href="https://wa.me/6281111825718" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="text-brand-400 flex-shrink-0 w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  +62 811-1182-5718
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
