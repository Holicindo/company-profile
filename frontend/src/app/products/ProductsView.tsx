'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Settings, Grid } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

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
  // Include if slug/name contains refrigerator, showcase, chiller, freezer, cold
  return (
    slug.includes('showcase') ||
    slug.includes('refrigerat') ||
    slug.includes('chiller') ||
    slug.includes('freezer') ||
    slug.includes('cold') ||
    name.includes('showcase') ||
    name.includes('refrigerat') ||
    name.includes('chiller') ||
    name.includes('freezer') ||
    name.includes('cold') ||
    slug.includes('under') ||
    name.includes('under')
  );
}

export function ProductsView({ data, roots, category, page, seoInfo }: any) {
  const { t } = useLanguage();
  const isShowcaseRelated = category === 'showcase' || ['cold-case', 'showcase-undercounter', 'show-case'].includes(category);
  const [showcaseOpen, setShowcaseOpen] = useState(true);

  // Filter roots hanya refrigerator & showcase
  const allowedRoots = (roots || []).filter(isAllowedCategory);

  // Filter data items hanya produk refrigerator & showcase
  const allowedItems = (data?.items || []).filter((p: any) => isAllowedCategory(p.category));

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">

      {/* ── Fokus Industri Kami ── */}
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

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-8 hide-scrollbar">
            {/* Card 1: Bakery */}
            <div className="group relative rounded-xl overflow-hidden bg-[#251009] border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 transition-all flex-shrink-0 w-[78vw] sm:w-auto snap-center h-[200px] sm:h-[350px] md:h-[450px]">
              <div className="absolute inset-0">
                <Image src="/images/products/hero_section_product_(1).png" alt="Bakery" fill className="object-cover opacity-65 group-hover:opacity-80 transition-opacity group-hover:scale-105 duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080401] via-[#080401]/60 to-transparent" />
              </div>
              <div className="absolute inset-0 p-4 sm:p-10 flex flex-col justify-end">
                <div className="mb-2 sm:mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#C9A84C]/10 text-[#C9A84C] text-[8px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full w-fit border border-[#C9A84C]/30 shadow-lg">
                  Bakery & Pastry
                </div>
                <h3 className="text-sm sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-3 leading-snug">Estetika Display & Presisi Suhu</h3>
                <p className="text-neutral-300 text-[11px] sm:text-sm leading-snug sm:leading-relaxed mb-0 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                  {t(
                    'Curved showcase elegan dengan kontrol kelembapan tinggi (high-humidity) menjaga kualitas kue dan roti tetap segar sambil menarik perhatian pelanggan dari pandangan pertama.',
                    'Elegant curved showcases with high-humidity control keep cakes and pastries fresh while captivating customers at first sight.'
                  )}
                </p>
              </div>
            </div>

            {/* Card 2: HORECA */}
            <div className="group relative rounded-xl overflow-hidden bg-[#251009] border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 transition-all flex-shrink-0 w-[78vw] sm:w-auto snap-center h-[200px] sm:h-[350px] md:h-[450px]">
              <div className="absolute inset-0">
                <Image src="/images/products/hero_section_product_(2).png" alt="HORECA" fill className="object-cover opacity-65 group-hover:opacity-80 transition-opacity group-hover:scale-105 duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080401] via-[#080401]/60 to-transparent" />
              </div>
              <div className="absolute inset-0 p-4 sm:p-10 flex flex-col justify-end">
                <div className="mb-2 sm:mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#C9A84C]/10 text-[#C9A84C] text-[8px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full w-fit border border-[#C9A84C]/30 shadow-lg">
                  HORECA (Hotel & Resto)
                </div>
                <h3 className="text-sm sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-3 leading-snug">Ketahanan Dapur Komersial</h3>
                <p className="text-neutral-300 text-[11px] sm:text-sm leading-snug sm:leading-relaxed mb-0 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                  {t(
                    'Mesin Stainless Steel Undercounter & Upright Chiller tugas berat yang didesain tangguh untuk memfasilitasi alur kerja cepat di dapur komersial.',
                    'Heavy-duty Stainless Steel Undercounter & Upright Chillers built tough to facilitate fast-paced workflows in commercial kitchens.'
                  )}
                </p>
              </div>
            </div>

            {/* Card 3: Retail & Supermarket */}
            <div className="group relative rounded-xl overflow-hidden bg-[#251009] border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 transition-all flex-shrink-0 w-[78vw] sm:w-auto snap-center h-[200px] sm:h-[350px] md:h-[450px]">
              <div className="absolute inset-0">
                <Image src="/images/products/hero_section_product_(3).png" alt="Retail" fill className="object-cover opacity-65 group-hover:opacity-80 transition-opacity group-hover:scale-105 duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080401] via-[#080401]/60 to-transparent" />
              </div>
              <div className="absolute inset-0 p-4 sm:p-10 flex flex-col justify-end">
                <div className="mb-2 sm:mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#C9A84C]/10 text-[#C9A84C] text-[8px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full w-fit border border-[#C9A84C]/30 shadow-lg">
                  Retail & Supermarket
                </div>
                <h3 className="text-sm sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-3 leading-snug">Visibilitas & Kapasitas Ekstra</h3>
                <p className="text-neutral-300 text-[11px] sm:text-sm leading-snug sm:leading-relaxed mb-0 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                  {t(
                    'Multideck Open Chiller dan Island Freezer berkapasitas masif yang memaksimalkan area display produk untuk mendorong penjualan seketika.',
                    'Massive capacity Multideck Open Chillers and Island Freezers that maximize product display areas to drive impulse purchases.'
                  )}
                </p>
              </div>
            </div>

            {/* Card 4: Industrial */}
            <div className="group relative rounded-xl overflow-hidden bg-[#251009] border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 transition-all flex-shrink-0 w-[78vw] sm:w-auto snap-center h-[200px] sm:h-[350px] md:h-[450px]">
              <div className="absolute inset-0">
                <Image src="/images/products/hero_section_product_(4).png" alt="Industrial" fill className="object-cover opacity-65 group-hover:opacity-80 transition-opacity group-hover:scale-105 duration-700" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080401] via-[#080401]/60 to-transparent" />
              </div>
              <div className="absolute inset-0 p-4 sm:p-10 flex flex-col justify-end">
                <div className="mb-2 sm:mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#C9A84C]/10 text-[#C9A84C] text-[8px] sm:text-[10px] font-bold uppercase tracking-widest rounded-full w-fit border border-[#C9A84C]/30 shadow-lg">
                  Pengolahan Industri
                </div>
                <h3 className="text-sm sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-3 leading-snug">Kekuatan Produksi Massal</h3>
                <p className="text-neutral-300 text-[11px] sm:text-sm leading-snug sm:leading-relaxed mb-0 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                  {t(
                    'Dari Cold Room hingga Blast Freezer skala pabrik, sistem pendingin kami menjaga integritas bahan baku makanan pada volume produksi raksasa secara stabil.',
                    'From Cold Rooms to factory-scale Blast Freezers, our cooling systems stably maintain the integrity of raw materials at gigantic production volumes.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Grid — Refrigerator & Showcase only ── */}
      <div className="bg-white" id="products">
        <div className="container-wide py-6 sm:py-12 lg:py-16">

          {/* ── Horizontal Category Filter Tabs ── */}
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
                    href="/products#products"
                    prefetch={true}
                    scroll={false}
                    className={`flex-shrink-0 px-4 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all border rounded-full ${
                      !category 
                        ? 'bg-[#C9A84C] text-black border-[#C9A84C] shadow-md' 
                        : 'bg-white border-neutral-200 text-neutral-600 hover:border-[#C9A84C] hover:text-black'
                    }`}
                  >
                    {t('Semua Produk', 'All Products')}
                  </Link>

                  {allowedRoots.map((c: any) => {
                    const isShowcase = (c.slug || '').toLowerCase().includes('showcase');
                    const isRefrig = (c.slug || '').toLowerCase().includes('refrigerat');
                    const hasSub = isShowcase;
                    
                    const subItems = [
                      { name: 'Semua Showcase', slug: 'showcase' },
                      { name: 'Cold Case', slug: 'cold-case' },
                      { name: 'Undercounter', slug: 'showcase-undercounter' },
                      { name: 'Show Case', slug: 'show-case' },
                    ];

                    const isSubSelected = subItems.some(s => s.slug === category && s.slug !== 'showcase');
                    const isShowcaseActive = category === 'showcase' || isSubSelected;
                    const isCatActive = isShowcase ? isShowcaseActive : (category === c.slug || (isRefrig && category === 'blastfreezer'));

                    return (
                      <div key={c.id} className="flex-shrink-0 flex items-center">
                        <Link
                          href={`/products?category=${c.slug}#products`}
                          prefetch={true}
                          scroll={false}
                          className={`px-4 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all border rounded-full ${
                            isCatActive 
                              ? 'bg-[#C9A84C] text-black border-[#C9A84C] shadow-md' 
                              : 'bg-white border-neutral-200 text-neutral-600 hover:border-[#C9A84C] hover:text-black'
                          }`}
                        >
                          {c.name.replace('PLEER &AMP; SLICER', 'PEELER & SLICER').replace(/&AMP;/gi, '&')}
                        </Link>
                        {hasSub && (
                          <button
                            type="button"
                            onClick={() => setShowcaseOpen(prev => !prev)}
                            className={`ml-1 px-3 py-2.5 text-[10px] font-bold border rounded-full transition-all flex items-center justify-center ${
                              isCatActive 
                                ? 'bg-[#C9A84C] text-black border-[#C9A84C]' 
                                : 'bg-white border-neutral-200 text-neutral-600 hover:border-[#C9A84C]'
                            }`}
                            title={showcaseOpen ? 'Tutup pilihan' : 'Buka pilihan'}
                          >
                            <span className={`transition-transform duration-200 inline-block ${showcaseOpen ? 'rotate-180' : ''}`}>
                              ▼
                            </span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Sub-kategori Dropdown / Accordion untuk Showcase di bawah tab */}
                {showcaseOpen && allowedRoots.some(c => (c.slug || '').toLowerCase().includes('showcase')) && (
                  <div className="flex items-center gap-2 overflow-x-auto py-3 px-3 mt-3 bg-[#251009] border border-[#C9A84C]/30 rounded-lg scrollbar-none flex-nowrap animate-fadeIn">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] mr-2 flex-shrink-0">
                      Showcase Sub:
                    </span>
                    {[
                      { name: 'Semua Showcase', slug: 'showcase' },
                      { name: 'Cold Case', slug: 'cold-case' },
                      { name: 'Undercounter', slug: 'showcase-undercounter' },
                      { name: 'Show Case', slug: 'show-case' },
                    ].map(sub => {
                      const isSubActive = category === sub.slug;
                      return (
                        <Link
                          key={sub.slug}
                          href={`/products?category=${sub.slug}#products`}
                          prefetch={true}
                          scroll={false}
                          className={`flex-shrink-0 px-3.5 py-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider transition-all whitespace-nowrap rounded-md ${
                            isSubActive
                              ? 'bg-[#C9A84C] text-black font-bold shadow'
                              : 'bg-[#3b1f0a] text-neutral-300 hover:text-white hover:border-[#C9A84C] border border-[#C9A84C]/20'
                          }`}
                        >
                          • {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-neutral-500">{t('Tidak ada kategori.', 'No categories available.')}</p>
            )}
          </div>

          {/* ── Grid Produk ── */}
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-neutral-200">
              <span className="text-xs sm:text-sm font-light text-neutral-500">
                {t('Menampilkan', 'Showing')} <strong className="font-bold text-black">{data.items.length}</strong> {t('dari', 'of')} <strong className="font-bold text-black">{data.total}</strong> {t('produk', 'products')}
              </span>
            </div>

            {data.items.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
                  {data.items.map((p: any) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      prefetch={true}
                      className="group relative bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-sm transition-all duration-300 flex flex-col h-full rounded-none overflow-hidden active:scale-[0.99]"
                    >
                      <div className="relative h-32 sm:h-48 bg-white overflow-hidden p-1.5 sm:p-4 flex items-center justify-center border-b border-neutral-100">
                        {p.imageUrl
                          ? <Image src={p.imageUrl} alt={p.name} fill className="object-contain p-1.5 sm:p-4 group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 25vw" unoptimized />
                          : <div className="flex flex-col items-center justify-center text-neutral-300 gap-2"><Settings size={20} strokeWidth={1} /><span className="text-[8px] uppercase tracking-widest font-bold">No Image</span></div>
                        }
                      </div>
                      <div className="p-2 sm:p-4 flex flex-col flex-1 justify-between">
                        <div>
                          <p className="text-[8px] sm:text-[9px] text-neutral-400 font-bold mb-0.5 sm:mb-2 uppercase tracking-[0.15em] truncate">{p.category?.name || 'Uncategorized'}</p>
                          <h3 className="text-xs sm:text-sm font-medium text-black line-clamp-2 leading-snug mb-1 sm:mb-2 group-hover:text-neutral-600 transition-colors">{p.name}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-black opacity-0 group-hover:opacity-100 transition-all duration-300 pt-1 border-t border-neutral-100 mt-1">
                          {t('Detail', 'View')} <ArrowRight size={11} strokeWidth={2} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {data.totalPages > 1 && (
                  <div className="flex justify-center gap-1.5 sm:gap-2 mt-10 sm:mt-16">
                    {page > 1 && (
                      <Link href={`/products?page=${page - 1}${category ? `&category=${category}` : ''}#products`} prefetch={true} scroll={false}
                        className="px-4 sm:px-6 h-10 sm:h-12 flex items-center justify-center text-[9px] sm:text-[10px] font-bold uppercase tracking-widest bg-white border border-neutral-200 text-neutral-500 hover:border-black hover:text-black transition-colors active:scale-95">
                        Prev
                      </Link>
                    )}
                    {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                      .filter((p: number) => Math.abs(p - page) <= 2)
                      .map((p: number) => (
                        <Link key={p} href={`/products?page=${p}${category ? `&category=${category}` : ''}#products`} prefetch={true} scroll={false}
                          className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-colors ${p === page ? 'bg-[#C9A84C] text-black border border-[#C9A84C]' : 'bg-white border border-neutral-200 text-neutral-500 hover:border-black hover:text-black'} active:scale-95`}>
                          {p}
                        </Link>
                      ))}
                    {page < data.totalPages && (
                      <Link href={`/products?page=${page + 1}${category ? `&category=${category}` : ''}#products`} prefetch={true} scroll={false}
                        className="px-4 sm:px-6 h-10 sm:h-12 flex items-center justify-center text-[9px] sm:text-[10px] font-bold uppercase tracking-widest bg-white border border-neutral-200 text-neutral-500 hover:border-black hover:text-black transition-colors active:scale-95">
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
