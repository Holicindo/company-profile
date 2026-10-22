'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Settings, Grid } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { CategoryGrid } from '@/components/products/CategoryGrid';

import { useState } from 'react';

// Slugs kategori refrigerator & showcase yang mau ditampilkan
const ALLOWED_CATEGORY_SLUGS = [
  'showcase',
  'refrigerator',
  'refrigerators',
  'showcase-refrigerator',
  'chiller',
  'freezer',
  'display-chiller',
  'upright-chiller',
  'chest-freezer',
  'island-freezer',
  'multideck',
  'cold-room',
];

function isAllowedCategory(cat: any): boolean {
  if (!cat) return false;
  const slug = (cat.slug || '').toLowerCase();
  const name = (cat.name || '').toLowerCase();
  // Include if slug/name contains refrigerator, showcase, chiller, freezer, cold, ice, bar
  return (
    slug.includes('showcase') ||
    slug.includes('refrigerat') ||
    slug.includes('chiller') ||
    slug.includes('freezer') ||
    slug.includes('cold') ||
    slug.includes('ice') ||
    slug.includes('bar') ||
    name.includes('showcase') ||
    name.includes('refrigerat') ||
    name.includes('chiller') ||
    name.includes('freezer') ||
    name.includes('cold') ||
    name.includes('ice') ||
    name.includes('bar') ||
    slug.includes('under') ||
    name.includes('under')
  );
}

export function ProductsView({ data, roots, category, page, seoInfo, industryCategories, solution, isCatalogPage }: any) {
  const { t } = useLanguage();
  const basePath = isCatalogPage ? '/catalog' : '/products';
  const isShowcaseRelated = category === 'showcase' || ['cold-case', 'showcase-undercounter', 'show-case'].includes(category);
  const [showcaseOpen, setShowcaseOpen] = useState(true);

  // Filter roots hanya refrigerator & showcase
  const allowedRoots = (roots || []).filter(isAllowedCategory);

  // Filter data items hanya produk refrigerator & showcase
  const allowedItems = (data?.items || []).filter((p: any) => isAllowedCategory(p.category));

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">

      {/* ── Fokus Industri Kami (hanya tampil di /products jika tanpa kategori) ── */}
      {!isCatalogPage && !category && (
        <div id="industri" className="bg-dark-metallic border-b border-[#C9A84C]/20 py-8 sm:py-24">
        <div className="container-wide">
          <div className="text-center mb-5 sm:mb-20">
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-2 sm:mb-4">
              {t('Solusi Industri', 'Our Industry Solution')}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-xs sm:text-base md:text-lg leading-relaxed">
              {t(
                'Inovasi teknologi pendingin komersial kami dirancang untuk mendukung berbagai skala industri dengan standar efisiensi, durabilitas, dan estetika tanpa kompromi.',
                'Our commercial refrigeration technology innovations are designed to support various industrial scales with uncompromising efficiency, durability, and aesthetics.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {/* Card 1: Bakery and Pastry Brands */}
            <Link href="/products/industry/bakery-pastry" className="group relative rounded-xl overflow-hidden bg-[#251009] border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 transition-all h-[260px] sm:h-[380px] md:h-[450px]">
              <div className="absolute inset-0">
                <Image src="/images/products/hero_section_product_(1).png" alt="Bakery and Pastry Brands" fill className="object-cover opacity-65 group-hover:opacity-80 transition-opacity group-hover:scale-105 duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080401] via-[#080401]/60 to-transparent" />
              </div>
              <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-end">
                <div className="mb-2 sm:mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#C9A84C]/10 text-[#C9A84C] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full w-fit border border-[#C9A84C]/30 shadow-lg">
                  {t('Solusi 01', 'Solution 01')}
                </div>
                <h3 className="text-base sm:text-2xl font-bold text-white mb-1 sm:mb-3 leading-snug">{t('Bakery and Pastry Brands', 'Bakery and Pastry Brands')}</h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-0 sm:mb-4 line-clamp-3">
                  {t(
                    'Curved showcase elegan dan display case presisi tinggi menjaga kelembapan serta mutu cake & bakery tetap sempurna.',
                    'Elegant curved showcases and precision display cases keep pastries fresh and visually captivating.'
                  )}
                </p>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#C9A84C] group-hover:gap-2 transition-all">
                  <span>{t('Lihat Produk', 'View Products')}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>

            {/* Card 2: Coffee Chains & Dessert Boutique */}
            <Link href="/products/industry/coffee-dessert" className="group relative rounded-xl overflow-hidden bg-[#251009] border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 transition-all h-[260px] sm:h-[380px] md:h-[450px]">
              <div className="absolute inset-0">
                <Image src="/images/products/hero_section_product_(2).png" alt="Coffee Chains & Dessert Boutique" fill className="object-cover opacity-65 group-hover:opacity-80 transition-opacity group-hover:scale-105 duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080401] via-[#080401]/60 to-transparent" />
              </div>
              <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-end">
                <div className="mb-2 sm:mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#C9A84C]/10 text-[#C9A84C] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full w-fit border border-[#C9A84C]/30 shadow-lg">
                  {t('Solusi 02', 'Solution 02')}
                </div>
                <h3 className="text-base sm:text-2xl font-bold text-white mb-1 sm:mb-3 leading-snug">{t('Coffee Chains & Dessert Boutique', 'Coffee Chains & Dessert Boutique')}</h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-0 sm:mb-4 line-clamp-3">
                  {t(
                    'Undercounter compact, gelato showcase, mesin ice maker komersial, dan bar station pendukung gerai minuman modern.',
                    'Compact undercounters, gelato showcases, commercial ice makers, and bar systems for modern beverage chains.'
                  )}
                </p>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#C9A84C] group-hover:gap-2 transition-all">
                  <span>{t('Lihat Produk', 'View Products')}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>

            {/* Card 3: Retail Supermarket & Food Service */}
            <Link href="/products/industry/retail-supermarket" className="group relative rounded-xl overflow-hidden bg-[#251009] border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 transition-all h-[260px] sm:h-[380px] md:h-[450px]">
              <div className="absolute inset-0">
                <Image src="/images/products/hero_section_product_(3).png" alt="Retail Supermarket & Food Service" fill className="object-cover opacity-65 group-hover:opacity-80 transition-opacity group-hover:scale-105 duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080401] via-[#080401]/60 to-transparent" />
              </div>
              <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-end">
                <div className="mb-2 sm:mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#C9A84C]/10 text-[#C9A84C] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full w-fit border border-[#C9A84C]/30 shadow-lg">
                  {t('Solusi 03', 'Solution 03')}
                </div>
                <h3 className="text-base sm:text-2xl font-bold text-white mb-1 sm:mb-3 leading-snug">{t('Retail Supermarket & Food Service', 'Retail Supermarket & Food Service')}</h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-0 sm:mb-4 line-clamp-3">
                  {t(
                    'Multideck open chiller, island freezer berkapasitas masif, dan cold storage untuk jaringan ritel & food service.',
                    'Massive capacity multideck open chillers, island freezers, and cold rooms for retail supermarkets & food service.'
                  )}
                </p>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#C9A84C] group-hover:gap-2 transition-all">
                  <span>{t('Lihat Produk', 'View Products')}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      )}

      {/* ── Product Grid — Refrigerator & Showcase only ── */}
      <div className="bg-white" id="products">
        <div className="container-wide py-6 sm:py-12 lg:py-16">

          {/* ── Horizontal Category Filter Tabs ── */}
          {/* Logic:
              - No category selected → tampilkan full filter tabs
              - category = showcase/cold-case/showcase-undercounter → hanya tampilkan showcase sub-bar
              - category = refrigerator/icemaker/bar-system → sembunyikan filter sepenuhnya
          */}
          {(() => {
            const isShowcaseCategory = category === 'showcase' || category === 'cold-case' || category === 'showcase-undercounter';
            const isNonShowcaseSpecific = category && !isShowcaseCategory;

            // Jika kategori spesifik non-showcase (refrigerator, icemaker, bar-system) → tidak tampilkan filter apapun
            if (isNonShowcaseSpecific) {
              return null;
            }

            // Jika kategori showcase/sub-showcase → hanya tampilkan showcase sub-bar
            if (isShowcaseCategory) {
              return (
                <div className="mb-8 sm:mb-10">
                  <div className="flex items-center gap-2 overflow-x-auto py-3 px-4 bg-[#1C0E07] border border-[#C9A84C]/40 rounded-xl shadow-inner scrollbar-none flex-nowrap">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] mr-2 flex-shrink-0">
                      Showcase Sub:
                    </span>
                    {[
                      { name: 'Semua Showcase', slug: 'showcase' },
                      { name: 'Cold Case', slug: 'cold-case' },
                      { name: 'Undercounter', slug: 'showcase-undercounter' },
                    ].map(sub => {
                      const isSubActive = category === sub.slug;
                      return (
                        <Link
                          key={sub.slug}
                          href={`${basePath}?category=${sub.slug}#products`}
                          prefetch={true}
                          scroll={false}
                          className={`flex-shrink-0 px-4 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap rounded-lg ${
                            isSubActive
                              ? 'bg-[#C9A84C] text-black shadow-md'
                              : 'bg-[#2D160C] text-neutral-300 hover:text-white hover:border-[#C9A84C] border border-[#C9A84C]/20'
                          }`}
                        >
                          • {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // Tidak ada category → tampilkan full filter tabs dengan semua kategori
            return (
              <div className="mb-8 sm:mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Grid size={16} strokeWidth={1.75} className="text-[#C9A84C]" />
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-black">
                    {t('Filter Kategori', 'Category Filter')}
                  </h2>
                </div>

                {allowedRoots.length > 0 ? (
                  <div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none flex-nowrap border-b border-neutral-200">
                      <Link
                        href={`${basePath}#products`}
                        prefetch={true}
                        scroll={false}
                        className={`flex-shrink-0 px-5 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all border rounded-full ${
                          !category 
                            ? 'bg-[#C9A84C] text-black border-[#C9A84C] shadow-md ring-2 ring-[#C9A84C]/30' 
                            : 'bg-white border-neutral-200 text-neutral-600 hover:border-[#C9A84C] hover:text-black'
                        }`}
                      >
                        {t('Semua Produk', 'All Products')}
                      </Link>

                      {allowedRoots.map((c: any) => {
                        const isShowcase = (c.slug || '').toLowerCase().includes('showcase');
                        const isRefrig = (c.slug || '').toLowerCase().includes('refrigerat');
                        const isIceMaker = (c.slug || '').includes('ice');
                        const isIceActive = category === 'icemaker' || category === 'ice-maker';
                        const isCatActive = isShowcase 
                          ? (category === 'showcase' || category === 'cold-case' || category === 'showcase-undercounter')
                          : isIceMaker 
                            ? isIceActive 
                            : (category === c.slug || (isRefrig && category === 'blastfreezer'));

                        return (
                          <Link
                            key={c.id}
                            href={`${basePath}?category=${c.slug}#products`}
                            prefetch={true}
                            scroll={false}
                            className={`flex-shrink-0 px-5 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all border rounded-full ${
                              isCatActive 
                                ? 'bg-[#C9A84C] text-black border-[#C9A84C] shadow-md ring-2 ring-[#C9A84C]/30' 
                                : 'bg-white border-neutral-200 text-neutral-600 hover:border-[#C9A84C] hover:text-black'
                            }`}
                          >
                            {c.slug === 'icemaker' ? 'ICE MAKER' : c.slug === 'bar-system' ? 'BAR SYSTEM' : c.name.replace('PLEER &AMP; SLICER', 'PEELER & SLICER').replace(/&AMP;/gi, '&')}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500">{t('Tidak ada kategori.', 'No categories available.')}</p>
                )}
              </div>
            );
          })()}

          {/* ── Grid Produk ── */}
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-neutral-200">
              <span className="text-xs sm:text-sm font-light text-neutral-500">
                {t('Menampilkan', 'Showing')} <strong className="font-bold text-black">{data.items.length}</strong> {t('dari', 'of')} <strong className="font-bold text-black">{data.total}</strong> {t('produk', 'products')}
              </span>
            </div>

            {data.items.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {data.items.map((p: any) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      prefetch={true}
                      className="group relative bg-white border border-neutral-200 hover:border-[#C9A84C]/80 hover:shadow-xl transition-all duration-300 flex flex-col h-full rounded-2xl overflow-hidden active:scale-[0.99]"
                    >
                      {/* Product Image Area */}
                      <div className="relative h-44 sm:h-56 bg-gradient-to-b from-[#FAF8F5] to-white overflow-hidden p-4 flex items-center justify-center border-b border-neutral-100">
                        {p.imageUrl
                          ? <Image src={p.imageUrl} alt={p.name} fill className="object-contain p-3 group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" unoptimized />
                          : <div className="flex flex-col items-center justify-center text-neutral-300 gap-2"><Settings size={20} strokeWidth={1} /><span className="text-[8px] uppercase tracking-widest font-bold">No Image</span></div>
                        }
                        
                        {/* Hover accent badge */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="p-1.5 rounded-full bg-[#C9A84C] text-black shadow-md flex items-center justify-center">
                            <ArrowRight size={12} strokeWidth={2.5} />
                          </span>
                        </div>
                      </div>

                      {/* Product Info Area */}
                      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FAF4E6] text-[#A67C1E] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-2">
                            {p.category?.name || 'Commercial'}
                          </span>
                          <h3 className="text-xs sm:text-sm font-semibold text-neutral-900 line-clamp-2 leading-snug group-hover:text-[#A67C1E] transition-colors">
                            {p.name}
                          </h3>
                        </div>

                        <div className="pt-3 border-t border-neutral-100 mt-3 flex items-center justify-between text-[10px] sm:text-xs font-bold text-neutral-700">
                          <span className="text-neutral-400 font-normal">Spesifikasi Unit</span>
                          <span className="text-[#A67C1E] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            {t('Lihat Detail', 'View Details')}
                            <ArrowRight size={12} strokeWidth={2} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {data.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-12 sm:mt-16">
                    {page > 1 && (
                      <Link href={`${basePath}?page=${page - 1}${category ? `&category=${category}` : ''}#products`} prefetch={true} scroll={false}
                        className="px-5 h-11 flex items-center justify-center text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white border border-neutral-200 text-neutral-600 rounded-xl hover:border-black hover:text-black transition-all active:scale-95 shadow-sm">
                        Prev
                      </Link>
                    )}
                    {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                      .filter((p: number) => Math.abs(p - page) <= 2)
                      .map((p: number) => (
                        <Link key={p} href={`${basePath}?page=${p}${category ? `&category=${category}` : ''}#products`} prefetch={true} scroll={false}
                          className={`w-11 h-11 flex items-center justify-center text-xs font-bold transition-all rounded-xl ${
                            p === page 
                              ? 'bg-[#C9A84C] text-black border border-[#C9A84C] shadow-md ring-2 ring-[#C9A84C]/30' 
                              : 'bg-white border border-neutral-200 text-neutral-600 hover:border-[#C9A84C] hover:text-black shadow-sm'
                          } active:scale-95`}>
                          {p}
                        </Link>
                      ))}
                    {page < data.totalPages && (
                      <Link href={`${basePath}?page=${page + 1}${category ? `&category=${category}` : ''}#products`} prefetch={true} scroll={false}
                        className="px-5 h-11 flex items-center justify-center text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white border border-neutral-200 text-neutral-600 rounded-xl hover:border-black hover:text-black transition-all active:scale-95 shadow-sm">
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
