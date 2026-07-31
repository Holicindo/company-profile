import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/types';

function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/products/${p.slug}`} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-neutral-100 group hover:shadow-xl hover:-translate-y-1 hover:border-brand-300 transition-all duration-300">
      <div className="relative h-56 bg-neutral-50 overflow-hidden mix-blend-multiply">
        {p.imageUrl
          ? <Image src={p.imageUrl} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="25vw" unoptimized />
          : <div className="absolute inset-0 bg-neutral-50 flex items-center justify-center"><span className="text-neutral-400 text-xs font-bold">No Image</span></div>}
        {p.category && (
          <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[10px] uppercase tracking-widest font-bold text-brand-600 px-3 py-1.5 rounded-full shadow-sm">
            {p.category.name}
          </span>
        )}
      </div>
      <div className="p-5 border-t border-neutral-50">
        <h3 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">{p.name}</h3>
        {p.shortDescription && <p className="text-slate-500 text-sm mt-2 line-clamp-2 font-medium leading-relaxed">{p.shortDescription.replace(/<[^>]*>/g, '')}</p>}
        <div className="flex items-center gap-1.5 text-brand-600 text-xs font-bold mt-4 uppercase tracking-wider group-hover:gap-2 transition-all">Detail <ArrowRight size={14} /></div>
      </div>
    </Link>
  );
}

export function FeaturedProductsSection({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="relative py-20 pb-32 bg-white overflow-hidden">
      <div className="relative z-10 container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="text-brand-600 font-bold text-sm uppercase tracking-widest mb-3">Pilihan Terbaik</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">Produk Unggulan</h2>
            <p className="text-lg text-slate-500 font-medium max-w-xl">Mesin dan showcase terpopuler dari koleksi kelas atas kami</p>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-brand-700 font-bold hover:text-brand-500 hover:gap-3 transition-all bg-brand-50 hover:bg-brand-100 px-6 py-3 rounded-full">
            Semua Produk <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 8).map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>

      {/* Wavy Divider at bottom to transition to dark section */}
      <div className="absolute -bottom-[2px] left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[90px] fill-slate-900 block">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"></path>
        </svg>
      </div>
    </section>
  );
}
