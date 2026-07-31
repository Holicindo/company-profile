import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { ProductCategory } from '@/types';

const fallback = [
  {
    id: 1,
    slug: 'machinery',
    name: 'Machinery',
    imageUrl: '/machinery.png',
    description: 'Mesin produksi makanan & minuman industri',
  },
  {
    id: 2,
    slug: 'refrigerator',
    name: 'Refrigerator',
    imageUrl: '/refrigerator.png',
    description: 'Pendingin komersial & blast freezer',
  },
  {
    id: 3,
    slug: 'showcase',
    name: 'Showcase',
    imageUrl: '/showcase.png',
    description: 'Display & showcase produk makanan',
  },
];

export function ProductCategoriesSection({ categories }: { categories: ProductCategory[] }) {
  const displayCats = ['machinery', 'refrigerator', 'showcase'].map(slug => {
    const found = categories.find(c => c.slug === slug);
    const fall = fallback.find(f => f.slug === slug);
    return found ? { ...found, imageUrl: fall?.imageUrl || null, description: fall?.description || '' } : fall;
  }).filter(Boolean);

  const display = displayCats.length === 3 ? displayCats : (categories.filter(c => !c.parentId).slice(0, 3));

  return (
    <section className="relative py-28 pb-36 bg-brand-50 overflow-hidden">
      {/* Wavy Divider ATAS — dari #0d1013 (HeroSection) ke brand-50 */}
      {/* Sudah ditangani oleh wavy bawah HeroSection (fill-brand-50) */}

      <div className="relative z-10 container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-2">Kategori Produk</p>
            <h2 className="section-title text-slate-900">Temukan Unit yang Tepat</h2>
            <p className="section-subtitle text-slate-600">Dari mesin produksi, pendingin komersial, hingga showcase — semua tersedia</p>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-500 hover:gap-3 transition-all">
            Lihat Semua <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {display.map((cat: any) => (
            <Link key={cat.slug} href={`/products/category/${cat.slug}`} className="group relative rounded-2xl overflow-hidden h-72 bg-neutral-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-black/5">
              {cat.imageUrl
                ? <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                : <div className="absolute inset-0 bg-gradient-to-br from-brand-700 to-brand-900" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-2xl font-bold font-display mb-1">{cat.name.replace(/&amp;/g, '&')}</h3>
                {cat.description && <p className="text-neutral-300 text-sm font-medium">{cat.description}</p>}
                <div className="flex items-center gap-1.5 text-brand-400 text-sm font-bold mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                  Lihat Produk <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Wavy Divider at bottom to transition to white section */}
      <div className="absolute -bottom-[2px] left-0 right-0 w-full overflow-hidden leading-none z-20 transform rotate-180 scale-x-[-1]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[90px] fill-white block">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"></path>
        </svg>
      </div>
    </section>
  );
}
