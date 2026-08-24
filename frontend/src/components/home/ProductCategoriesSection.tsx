'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { ProductCategory } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export function ProductCategoriesSection({ categories }: { categories: ProductCategory[] }) {
  const { t } = useLanguage();

  const fallback = [
    {
      id: 1,
      slug: 'machinery',
      name: 'Machinery',
      imageUrl: '/machinery.png',
      description: t('Mesin produksi makanan & minuman industri', 'Industrial food & beverage production machines'),
    },
    {
      id: 2,
      slug: 'refrigerator',
      name: 'Refrigerator',
      imageUrl: '/refrigerator.png',
      description: t('Pendingin komersial & blast freezer', 'Commercial refrigeration & blast freezers'),
    },
    {
      id: 3,
      slug: 'showcase',
      name: 'Showcase',
      imageUrl: '/showcase.png',
      description: t('Display & showcase produk makanan', 'Food product display & showcase'),
    },
  ];

  const displayCats = ['machinery', 'refrigerator', 'showcase'].map(slug => {
    const found = categories.find(c => c.slug === slug);
    const fall = fallback.find(f => f.slug === slug);
    return found ? { ...found, imageUrl: fall?.imageUrl || null, description: fall?.description || '' } : fall;
  }).filter(Boolean);

  const display = displayCats.length === 3 ? displayCats : (categories.filter(c => !c.parentId).slice(0, 3));

  return (
    <section className="relative py-16 bg-white border-b border-neutral-200">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 border-b border-neutral-200 pb-8">
          <div>
            <p className="text-neutral-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">{t('Kategori Produk', 'Product Categories')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-black">{t('Temukan Mesin yang Tepat', 'Find the Right Machine')}</h2>
            <p className="text-sm md:text-base text-neutral-600 font-light mt-4 max-w-2xl leading-relaxed">
              {t(
                'Jelajahi berbagai pilihan produk unggulan kami, mulai dari mesin produksi, mesin pendingin, hingga showcase untuk bisnis kuliner Anda.',
                'Explore our selection of featured products, from production machines to refrigeration and showcases for your culinary business.'
              )}
            </p>
          </div>
          <Link href="/products" className="flex items-center gap-3 text-[11px] text-black font-bold uppercase tracking-widest hover:gap-4 transition-all">
            {t('Lihat Semua', 'View All')} <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {display.map((cat: any) => (
            <Link key={cat.slug} href={`/products/category/${cat.slug}`} className="group relative overflow-hidden h-96 bg-neutral-100 transition-all duration-500 border border-neutral-200">
              {cat.imageUrl
                ? <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                : <div className="absolute inset-0 bg-neutral-200" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 transform group-hover:-translate-y-2 transition-transform duration-500">
                <h3 className="text-white text-3xl font-light mb-2 tracking-tight">{cat.name.replace(/&amp;/g, '&')}</h3>
                {cat.description && <p className="text-neutral-300 text-sm font-light">{cat.description}</p>}
                <div className="flex items-center gap-2 text-white text-[10px] font-bold mt-6 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  {t('Eksplorasi', 'Explore')} <ArrowRight size={14} strokeWidth={1.5} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

