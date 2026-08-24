'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

function ProductCard({ p, t }: { p: Product; t: (idText: string, enText: string) => string }) {
  return (
    <Link href={`/products/${p.slug}`} className="group block border border-neutral-200 hover:border-black transition-colors duration-300 bg-white">
      <div className="relative h-64 bg-white overflow-hidden p-6 border-b border-neutral-100">
        {p.imageUrl
          ? <Image src={p.imageUrl} alt={p.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-700" sizes="25vw" unoptimized />
          : <div className="absolute inset-0 bg-neutral-50 flex items-center justify-center"><span className="text-neutral-300 text-[10px] uppercase tracking-[0.2em] font-bold">No Image</span></div>}
        {p.category && (
          <span className="absolute top-4 left-4 bg-white border border-neutral-200 text-[9px] uppercase tracking-[0.2em] font-medium text-neutral-500 px-3 py-1">
            {p.category.name}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-light text-black text-lg leading-snug line-clamp-2">{p.name}</h3>
        {p.shortDescription && <p className="text-neutral-500 text-sm mt-3 line-clamp-2 font-light leading-relaxed">{p.shortDescription.replace(/<[^>]*>/g, '')}</p>}
        <div className="flex items-center gap-2 text-black text-[10px] font-bold mt-6 uppercase tracking-widest group-hover:gap-3 transition-all">
          {t('Eksplorasi', 'Explore')} <ArrowRight size={14} strokeWidth={1.5} />
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProductsSection({ products }: { products: Product[] }) {
  const { t } = useLanguage();

  if (!products.length) return null;
  return (
    <section className="relative py-16 bg-neutral-50">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 border-b border-neutral-200 pb-8">
          <div>
            <p className="text-neutral-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">{t('Pilihan Kami', 'Our Selection')}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-black">{t('Produk Unggulan', 'Featured Products')}</h2>
          </div>
          <Link href="/products" className="flex items-center gap-3 text-[11px] text-black font-bold uppercase tracking-widest hover:gap-4 transition-all">
            {t('Semua Produk', 'All Products')} <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map(p => <ProductCard key={p.id} p={p} t={t} />)}
        </div>
      </div>
    </section>
  );
}

