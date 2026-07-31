import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { getProductCategories, getProducts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Katalog lengkap produk Holicindo: Food Machinery, Refrigerator, Showcase dan 400+ produk lainnya.',
};
export const revalidate = 0;

export default async function ProductsPage({ searchParams }: { searchParams: { page?: string; search?: string; category?: string } }) {
  const page = searchParams.page ? +searchParams.page : 1;
  const [categories, data] = await Promise.all([
    getProductCategories().catch(() => []),
    getProducts({ page, limit: 24, search: searchParams.search, category: searchParams.category }).catch(() => ({ items: [], total: 0, totalPages: 0 })),
  ]);
  const roots = categories.filter((c: any) => !c.parentId);

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Luxury Dark Header */}
      <div className="relative bg-[#0d1013] py-20 overflow-hidden">
        {/* Faded Background Text — diposisikan di atas */}
        <div className="absolute inset-0 flex items-start justify-center pt-0 overflow-hidden pointer-events-none select-none z-0">
          <span
            className="font-black tracking-tighter leading-none text-white/[0.05]"
            style={{ fontSize: 'clamp(80px, 18vw, 280px)', whiteSpace: 'nowrap', textShadow: '0 10px 20px rgba(0,0,0,0.5)', transform: 'translateZ(0)', marginTop: '-0.05em' }}
          >
            KATALOG
          </span>
        </div>
        
        <div className="relative z-10 container-wide">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 mb-6 transition-colors font-bold">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">Katalog Produk</h1>
          <p className="text-neutral-400 font-medium text-lg">{data.total}+ produk kelas dunia tersedia untuk Anda</p>
        </div>

        {/* Wavy Divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[40px] md:h-[60px] fill-brand-50 block">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"></path>
          </svg>
        </div>
      </div>

      <div className="container-wide py-12">
        {roots.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <Link href="/products" className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-colors shadow-sm ${!searchParams.category ? 'bg-brand-500 text-slate-900 border-brand-500' : 'bg-white border-neutral-200 text-slate-600 hover:border-brand-400 hover:text-brand-600'}`}>Semua</Link>
            {roots.map((c: any) => (
              <Link key={c.id} href={`/products?category=${c.slug}`} className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-colors shadow-sm ${searchParams.category === c.slug ? 'bg-brand-500 text-slate-900 border-brand-500' : 'bg-white border-neutral-200 text-slate-600 hover:border-brand-400 hover:text-brand-600'}`}>{c.name}</Link>
            ))}
          </div>
        )}

        {data.items.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {data.items.map((p: any) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 group hover:shadow-xl hover:border-brand-300 transition-all duration-300">
                  <div className="relative h-48 bg-neutral-50 overflow-hidden mix-blend-multiply">
                    {p.imageUrl
                      ? <Image src={p.imageUrl} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="20vw" unoptimized />
                      : <div className="absolute inset-0 flex items-center justify-center"><span className="text-neutral-300 text-xs font-bold">No Image</span></div>}
                  </div>
                  <div className="p-4 border-t border-neutral-50">
                    <p className="text-xs text-brand-600 font-bold mb-1.5 uppercase tracking-wide">{p.category?.name}</p>
                    <h3 className="text-sm font-extrabold text-slate-900 line-clamp-2 group-hover:text-brand-600 transition-colors leading-snug">{p.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).filter(p => Math.abs(p - page) <= 2).map(p => (
                  <Link key={p} href={`/products?page=${p}${searchParams.category ? `&category=${searchParams.category}` : ''}`}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm transition-colors ${p === page ? 'bg-brand-500 text-slate-900' : 'bg-white border border-neutral-200 text-slate-600 hover:bg-brand-50 hover:text-brand-600'}`}>{p}</Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-neutral-100 shadow-sm"><p className="text-slate-500 font-medium text-lg">Belum ada produk tersedia</p></div>
        )}
      </div>
    </div>
  );
}

