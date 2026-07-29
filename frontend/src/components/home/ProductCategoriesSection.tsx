import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { ProductCategory } from '@/types';

const fallback = [
  { id: 1, slug: 'machinery', name: 'Machinery', imageUrl: 'https://holicindo.com/wp-content/uploads/2021/01/machinery-cat.jpg', description: '273+ produk mesin produksi' },
  { id: 2, slug: 'refrigerator', name: 'Refrigerator', imageUrl: 'https://holicindo.com/wp-content/uploads/2021/01/refrigerator-cat.jpg', description: '126+ produk pendingin' },
  { id: 3, slug: 'showcase', name: 'Showcase', imageUrl: null, description: '18+ produk display' },
];

export function ProductCategoriesSection({ categories }: { categories: ProductCategory[] }) {
  const cats = categories.filter(c => !c.parentId).slice(0, 3);
  const display: any[] = cats.length ? cats : fallback;

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-2">Kategori Produk</p>
            <h2 className="section-title">Jelajahi Produk Kami</h2>
            <p className="section-subtitle">Lebih dari 400 produk untuk mendukung industri makanan Anda</p>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-brand-600 font-semibold hover:gap-3 transition-all">
            Lihat Semua <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {display.map((cat: any) => (
            <Link key={cat.slug} href={`/products/category/${cat.slug}`} className="group relative rounded-2xl overflow-hidden h-72 bg-neutral-200">
              {cat.imageUrl
                ? <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                : <div className="absolute inset-0 bg-gradient-to-br from-brand-700 to-brand-900" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-2xl font-bold font-display mb-1">{cat.name}</h3>
                {cat.description && <p className="text-neutral-300 text-sm">{cat.description}</p>}
                <div className="flex items-center gap-1 text-brand-300 text-sm font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Lihat Produk <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
