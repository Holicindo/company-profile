'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

function ProductCard({ p, t }: { p: Product; t: (idText: string, enText: string) => string }) {
  return (
    <Link href={`/products/${p.slug}`} className="group block border border-neutral-200 hover:border-black transition-colors duration-300 bg-white active:scale-[0.99] flex flex-col h-full">
      <div className="relative h-44 sm:h-64 bg-white overflow-hidden p-3 sm:p-6 border-b border-neutral-100 flex items-center justify-center">
        {p.imageUrl
          ? <Image src={p.imageUrl} alt={p.name} fill className="object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" unoptimized />
          : <div className="absolute inset-0 bg-neutral-50 flex items-center justify-center"><span className="text-neutral-300 text-[9px] uppercase tracking-[0.2em] font-bold">No Image</span></div>}
        {p.category && (
          <span className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-xs border border-neutral-200 text-[8px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold text-neutral-600 px-2 sm:px-3 py-0.5 sm:py-1 truncate max-w-[80%]">
            {p.category.name}
          </span>
        )}
      </div>
      <div className="p-3.5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-light text-black text-xs sm:text-base md:text-lg leading-snug line-clamp-2">{p.name}</h3>
          {p.shortDescription && <p className="text-neutral-500 text-xs sm:text-sm mt-1.5 sm:mt-3 line-clamp-2 font-light leading-relaxed hidden sm:block">{p.shortDescription.replace(/<[^>]*>/g, '')}</p>}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-black text-[9px] sm:text-[10px] font-bold mt-3 sm:mt-6 uppercase tracking-widest sm:opacity-0 sm:group-hover:opacity-100 transition-all">
          {t('Eksplorasi', 'Explore')} <ArrowRight size={12} strokeWidth={1.75} />
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProductsSection({ products }: { products: Product[] }) {
  const { t } = useLanguage();

  if (!products.length) return null;
  return (
    <section className="relative py-10 sm:py-16 bg-neutral-50 border-b border-neutral-200">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-16 border-b border-neutral-200 pb-6 sm:pb-8">
          <div>
            <p className="text-neutral-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 sm:mb-4">{t('Pilihan Kami', 'Our Selection')}</p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black">{t('Produk Unggulan', 'Featured Products')}</h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-black font-bold uppercase tracking-widest hover:gap-4 transition-all self-start md:self-auto pt-1">
            {t('Semua Produk', 'All Products')} <ArrowRight size={14} strokeWidth={1.75} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.slice(0, 8).map(p => <ProductCard key={p.id} p={p} t={t} />)}
        </div>
      </div>
    </section>
  );
}
