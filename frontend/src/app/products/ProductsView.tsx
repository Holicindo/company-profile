'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Settings, Grid } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function ProductsView({ data, roots, category, page, seoInfo }: any) {
  const { t } = useLanguage();

  const heroSlides = [
    '/images/products/hero_product_(1).png',
    '/images/products/hero_product_(2).png',
    '/images/products/hero_product_(3).png',
    '/images/products/hero_product_(4).png',
    '/images/products/hero_product_(5).png',
    '/images/products/hero_product_(6).png',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const leftIndex  = (currentSlide + 2) % heroSlides.length;
  const rightIndex = (currentSlide + 4) % heroSlides.length;

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">

      {/* ── Hero Collage Slideshow ── */}
      <div className="relative text-white overflow-hidden h-[320px] sm:h-[420px]">


        {/* ── 3-Panel Collage (Full-width Center Panel on Mobile) ── */}
        <div className="absolute inset-0 flex gap-0 sm:gap-[2px]">

          {/* LEFT PANEL — Hidden on Mobile */}
          <div className="hidden sm:block relative flex-shrink-0 overflow-hidden" style={{ width: '18%' }}>
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{ opacity: index === leftIndex ? 1 : 0 }}
              >
                <Image
                  src={slide}
                  alt={`Produk ${index + 1}`}
                  fill
                  className="object-cover"
                  quality={100}
                  unoptimized
                  sizes="18vw"
                />
              </div>
            ))}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)'
            }} />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* CENTER PANEL — 100% width on Mobile, flex-1 on Desktop */}
          <div className="relative w-full sm:flex-1 overflow-hidden">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{ opacity: index === currentSlide ? 1 : 0 }}
              >
                <Image
                  src={slide}
                  alt={`Katalog Produk Holicindo ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={100}
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 64vw"
                />
              </div>
            ))}

            {/* Gradient overlay */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.50) 45%, rgba(0,0,0,0.20) 100%)'
            }} />

            {/* Centered Text Content */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pt-6 sm:pt-0">
              <div className="text-center px-4 sm:px-6 max-w-xl">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2 sm:mb-4 leading-[1.15] drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 via-neutral-400 to-white animate-shimmer-text">
                  {t('Katalog Produk', 'Product Catalog')}
                </h1>
                <p className="text-white/90 text-xs sm:text-sm md:text-base font-normal leading-relaxed drop-shadow-md mb-4 sm:mb-7 mx-auto line-clamp-2 sm:line-clamp-none">
                  {category
                    ? seoInfo.description
                    : t(
                        `Temukan lebih dari ${data.total} mesin industrial dan peralatan komersial untuk mendukung operasional bisnis Food & Beverage Anda.`,
                        `Discover over ${data.total} industrial machines and commercial equipment to support your Food & Beverage business operations.`
                      )
                  }
                </p>
                <a
                  href="/catalogue-showcase-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#2D3E50] px-5 sm:px-7 py-2.5 sm:py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest hover:bg-white/90 transition-colors shadow-lg active:scale-95 rounded-sm"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  {t('Download E-Katalog (PDF)', 'Download E-Catalog (PDF)')}
                </a>
              </div>
            </div>

            {/* Slide dots */}
            <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="h-[4px] sm:h-[5px] rounded-full transition-all duration-400 cursor-pointer"
                  style={{
                    width: index === currentSlide ? '20px' : '5px',
                    backgroundColor: index === currentSlide ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.45)',
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT PANEL — Hidden on Mobile */}
          <div className="hidden sm:block relative flex-shrink-0 overflow-hidden" style={{ width: '18%' }}>
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{ opacity: index === rightIndex ? 1 : 0 }}
              >
                <Image
                  src={slide}
                  alt={`Produk ${index + 1}`}
                  fill
                  className="object-cover"
                  quality={100}
                  unoptimized
                  sizes="18vw"
                />
              </div>
            ))}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to left, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)'
            }} />
            <div className="absolute inset-0 bg-black/20" />
          </div>

        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container-wide py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-12">

          {/* ── Category Filter (Horizontal Scroll Bar on Mobile, Vertical Sidebar on Desktop) ── */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-28 border border-neutral-200 bg-neutral-50 p-4 sm:p-6 rounded-sm">
              <div className="flex items-center gap-2.5 mb-3 sm:mb-6 pb-2.5 sm:pb-4 border-b border-neutral-200">
                <Grid size={15} strokeWidth={1.75} className="text-black" />
                <h2 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-black">
                  {t('Filter Kategori', 'Category Filter')}
                </h2>
              </div>

              {roots.length > 0 ? (
                <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none flex-nowrap">
                  <Link
                    href="/products"
                    prefetch={true}
                    className={`flex-shrink-0 flex items-center justify-between px-3.5 py-2.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-colors border whitespace-nowrap ${!category ? 'bg-black text-white border-black' : 'bg-white border-neutral-200 text-neutral-600 hover:border-black hover:text-black'}`}
                  >
                    <span>{t('Semua Produk', 'All Products')}</span>
                  </Link>
                  {roots.map((c: any) => (
                    <Link
                      key={c.id}
                      href={`/products?category=${c.slug}`}
                      prefetch={true}
                      className={`flex-shrink-0 flex items-center justify-between px-3.5 py-2.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-colors border whitespace-nowrap ${category === c.slug ? 'bg-black text-white border-black' : 'bg-white border-neutral-200 text-neutral-600 hover:border-black hover:text-black'}`}
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

          {/* ── Grid Produk ── */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-neutral-200">
              <span className="text-xs sm:text-sm font-light text-neutral-500">
                {t('Menampilkan', 'Showing')} <strong className="font-bold text-black">{data.items.length}</strong> {t('dari', 'of')} <strong className="font-bold text-black">{data.total}</strong> {t('produk', 'products')}
              </span>
            </div>

            {data.items.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                  {data.items.map((p: any) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      prefetch={true}
                      className="group relative bg-white border border-neutral-200 hover:border-black hover:shadow-md transition-all duration-300 flex flex-col h-full rounded-none overflow-hidden active:scale-[0.99]"
                    >
                      <div className="relative h-44 sm:h-64 bg-white overflow-hidden p-3 sm:p-6 flex items-center justify-center border-b border-neutral-100">
                        {p.imageUrl
                          ? <Image src={p.imageUrl} alt={p.name} fill className="object-contain p-3 sm:p-6 group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" unoptimized />
                          : <div className="flex flex-col items-center justify-center text-neutral-300 gap-2"><Settings size={20} strokeWidth={1} /><span className="text-[8px] uppercase tracking-widest font-bold">No Image</span></div>
                        }
                      </div>
                      <div className="p-3.5 sm:p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <p className="text-[8px] sm:text-[9px] text-neutral-400 font-bold mb-1.5 sm:mb-3 uppercase tracking-[0.15em] sm:tracking-[0.2em] truncate">{p.category?.name || 'Uncategorized'}</p>
                          <h3 className="text-xs sm:text-base font-light text-black line-clamp-2 leading-snug sm:leading-relaxed mb-2 sm:mb-4 group-hover:text-neutral-600 transition-colors">{p.name}</h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-black sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 pt-1">
                          {t('Detail', 'View')} <ArrowRight size={12} strokeWidth={2} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {data.totalPages > 1 && (
                  <div className="flex justify-center gap-1.5 sm:gap-2 mt-10 sm:mt-16">
                    {page > 1 && (
                      <Link
                        href={`/products?page=${page - 1}${category ? `&category=${category}` : ''}`}
                        prefetch={true}
                        className="px-4 sm:px-6 h-10 sm:h-12 flex items-center justify-center text-[9px] sm:text-[10px] font-bold uppercase tracking-widest bg-white border border-neutral-200 text-neutral-500 hover:border-black hover:text-black transition-colors active:scale-95"
                      >
                        Prev
                      </Link>
                    )}
                    {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                      .filter((p: number) => Math.abs(p - page) <= 2)
                      .map((p: number) => (
                        <Link
                          key={p}
                          href={`/products?page=${p}${category ? `&category=${category}` : ''}`}
                          prefetch={true}
                          className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-colors ${p === page ? 'bg-black text-white border border-black' : 'bg-white border border-neutral-200 text-neutral-500 hover:border-black hover:text-black'} active:scale-95`}
                        >
                          {p}
                        </Link>
                      ))}
                    {page < data.totalPages && (
                      <Link
                        href={`/products?page=${page + 1}${category ? `&category=${category}` : ''}`}
                        prefetch={true}
                        className="px-4 sm:px-6 h-10 sm:h-12 flex items-center justify-center text-[9px] sm:text-[10px] font-bold uppercase tracking-widest bg-white border border-neutral-200 text-neutral-500 hover:border-black hover:text-black transition-colors active:scale-95"
                      >
                        Next
                      </Link>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 sm:py-32 bg-neutral-50 border border-neutral-200 px-4 text-center">
                <Settings size={40} strokeWidth={1} className="text-neutral-300 mb-4" />
                <p className="text-neutral-500 font-light text-sm sm:text-lg">
                  {t('Belum ada produk tersedia di kategori ini.', 'No products available in this category yet.')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
