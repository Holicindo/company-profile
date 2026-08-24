'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, Settings, Grid } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function ProductsView({ data, roots, category, page, seoInfo }: any) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      {/* â”€â”€ B2B Industrial Header â”€â”€ */}
      <div className="relative bg-[#C4C4C4] py-10 md:py-14 border-b border-neutral-300 overflow-hidden">
        {/* Background watermark text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="font-black tracking-tighter leading-none text-black/[0.06]" style={{ fontSize: 'clamp(60px, 14vw, 200px)', whiteSpace: 'nowrap' }}>
            PRODUCT
          </span>
        </div>
        <div className="container-wide relative z-10 flex flex-col items-start">
          {/* Breadcrumb style */}
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-6">
            <Link href="/" className="hover:text-[#333333] transition-colors">Home</Link>
            <ChevronRight size={12} strokeWidth={2} />
            <Link href="/products" className="hover:text-[#333333] transition-colors">{t('Katalog Produk', 'Product Catalog')}</Link>
            {category && (
              <>
                <ChevronRight size={12} strokeWidth={2} />
                <span className="text-[#333333] uppercase">{category}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-8">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#333333] mb-4">
                {seoInfo.h1}
              </h1>
              <p className="text-[#4A4A4A] font-normal text-base max-w-2xl mb-6 leading-relaxed">
                {category 
                  ? seoInfo.description 
                  : t(
                      `Temukan lebih dari ${data.total} mesin industrial dan peralatan komersial untuk mendukung operasional bisnis Food & Beverage Anda.`,
                      `Discover over ${data.total} industrial machines and commercial equipment to support your Food & Beverage business operations.`
                    )
                }
              </p>
              <a href="/catalogue-showcase-2026.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#333333] text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#4A4A4A] transition-colors w-full sm:w-auto">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                {t('Download E-Katalog (PDF)', 'Download E-Catalog (PDF)')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* â”€â”€ Sidebar Filter (B2B Style) â”€â”€ */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-28 border border-neutral-200 bg-neutral-50 p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-200">
                <Grid size={16} strokeWidth={1.5} className="text-black" />
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-black">{t('Filter Kategori', 'Category Filter')}</h2>
              </div>
              
              {roots.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <Link 
                    href="/products" 
                    prefetch={true}
                    className={`flex items-center justify-between p-3 text-[10px] font-bold uppercase tracking-widest transition-colors border ${!category ? 'bg-black text-white border-black' : 'bg-white border-neutral-200 text-neutral-600 hover:border-black hover:text-black'}`}
                  >
                    <span>{t('Semua Produk', 'All Products')}</span>
                  </Link>
                  {roots.map((c: any) => (
                    <Link 
                      key={c.id} 
                      href={`/products?category=${c.slug}`} 
                      prefetch={true}
                      className={`flex items-center justify-between p-3 text-[10px] font-bold uppercase tracking-widest transition-colors border ${category === c.slug ? 'bg-black text-white border-black' : 'bg-white border-neutral-200 text-neutral-600 hover:border-black hover:text-black'}`}
                    >
                      <span>{c.name.replace('PLEER &AMP; SLICER', 'PEELER & SLICER').replace(/&AMP;/gi, '&')}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500">{t('Tidak ada kategori.', 'No categories available.')}</p>
              )}
            </div>
          </div>

          {/* â”€â”€ Grid Produk â”€â”€ */}
          <div className="flex-1">
            {/* Header List */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
              <span className="text-sm font-light text-neutral-500">
                {t('Menampilkan', 'Showing')} <strong className="font-bold text-black">{data.items.length}</strong> {t('dari', 'of')} <strong className="font-bold text-black">{data.total}</strong> {t('produk', 'products')}
              </span>
            </div>

            {data.items.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data.items.map((p: any) => (
                    <Link key={p.id} href={`/products/${p.slug}`} prefetch={true} className="group relative bg-white border border-neutral-200 hover:border-transparent hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 z-0 hover:z-10 flex flex-col h-full rounded-sm overflow-hidden">
                      <div className="relative h-64 bg-white overflow-hidden p-6 flex items-center justify-center border-b border-neutral-100">
                        {p.imageUrl
                          ? <Image src={p.imageUrl} alt={p.name} fill className="object-contain p-6 group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" unoptimized />
                          : <div className="flex flex-col items-center justify-center text-neutral-300 gap-2"><Settings size={24} strokeWidth={1} /><span className="text-[9px] uppercase tracking-widest font-bold">No Image</span></div>}
                      </div>
                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <p className="text-[9px] text-neutral-400 font-bold mb-3 uppercase tracking-[0.2em]">{p.category?.name || 'Uncategorized'}</p>
                          <h3 className="text-base font-light text-black line-clamp-2 leading-relaxed mb-4 group-hover:text-neutral-500 transition-colors">{p.name}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                          {t('Detail Spesifikasi', 'View Details')} <ArrowRight size={14} strokeWidth={2} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {data.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-16">
                    {page > 1 && (
                      <Link href={`/products?page=${page - 1}${category ? `&category=${category}` : ''}`}
                        prefetch={true}
                        className="px-6 h-12 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest bg-white border border-neutral-200 text-neutral-500 hover:border-black hover:text-black transition-colors">
                        Prev
                      </Link>
                    )}
                    {Array.from({ length: data.totalPages }, (_, i) => i + 1).filter((p: number) => Math.abs(p - page) <= 2).map((p: number) => (
                      <Link key={p} href={`/products?page=${p}${category ? `&category=${category}` : ''}`}
                        prefetch={true}
                        className={`w-12 h-12 flex items-center justify-center text-[11px] font-bold uppercase tracking-widest transition-colors ${p === page ? 'bg-black text-white border border-black' : 'bg-white border border-neutral-200 text-neutral-500 hover:border-black hover:text-black'}`}>
                        {p}
                      </Link>
                    ))}
                    {page < data.totalPages && (
                      <Link href={`/products?page=${page + 1}${category ? `&category=${category}` : ''}`}
                        prefetch={true}
                        className="px-6 h-12 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest bg-white border border-neutral-200 text-neutral-500 hover:border-black hover:text-black transition-colors">
                        Next
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 bg-neutral-50 border border-neutral-200">
                <Settings size={48} strokeWidth={1} className="text-neutral-300 mb-6" />
                <p className="text-neutral-500 font-light text-lg">{t('Belum ada produk tersedia di kategori ini.', 'No products available in this category yet.')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



