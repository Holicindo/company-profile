import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types';

function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.slug}`} className="card group">
      <div className="relative h-52 bg-neutral-100">
        {p.imageUrl
          ? <Image src={p.imageUrl} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="25vw" unoptimized />
          : <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center"><span className="text-neutral-400 text-xs">No Image</span></div>}
        {p.category && (
          <span className="absolute top-3 left-3 bg-white/90 text-xs font-semibold text-brand-700 px-2.5 py-1 rounded-full">
            {p.category.name}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-neutral-900 text-sm leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">{p.name}</h3>
        {p.shortDescription && <p className="text-neutral-500 text-xs mt-1.5 line-clamp-2">{p.shortDescription.replace(/<[^>]*>/g, '')}</p>}
        <div className="flex items-center gap-1 text-brand-600 text-xs font-medium mt-3">Detail <ArrowRight size={12} /></div>
      </div>
    </Link>
  );
}

export function FeaturedProductsSection({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="py-20 bg-white">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-2">Featured</p>
            <h2 className="section-title">Produk Unggulan</h2>
            <p className="section-subtitle">Pilihan terbaik dari koleksi mesin produksi makanan kami</p>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-brand-600 font-semibold hover:gap-3 transition-all">
            Semua Produk <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.slice(0, 8).map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}
