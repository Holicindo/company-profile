'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { ProductCategory } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface ProductCategoriesSectionProps {
  categories: ProductCategory[];
  customData?: {
    title?: string;
    titleId?: string;
    titleEn?: string;
    subtitle?: string;
    subtitleId?: string;
    subtitleEn?: string;
    cards?: Array<{ nameId?: string; nameEn?: string; name?: string; slug: string; descriptionId?: string; descriptionEn?: string; description?: string; image: string }>;
  };
}

export function ProductCategoriesSection({ categories, customData }: ProductCategoriesSectionProps) {
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

  // Use customData from admin if available, otherwise use fallback logic
  let display: any[] = [];
  
  if (customData?.cards && customData.cards.length > 0) {
    // Use admin custom data
    display = customData.cards.map(card => ({
      slug: card.slug,
      name: t(card.nameId || card.name || '', card.nameEn || card.name || ''),
      imageUrl: card.image,
      description: t(card.descriptionId || card.description || '', card.descriptionEn || card.description || ''),
    }));
  } else {
    // Fallback to original logic
    const displayCats = ['showcase', 'refrigerator', 'machinery'].map(slug => {
      const found = categories.find(c => c.slug === slug);
      const fall = fallback.find(f => f.slug === slug);
      return found ? { ...found, imageUrl: fall?.imageUrl || null, description: fall?.description || '' } : fall;
    }).filter(Boolean);

    display = displayCats.length === 3 ? displayCats : (categories.filter(c => !c.parentId).slice(0, 3));
  }

  const sectionTitle = t(
    customData?.titleId || customData?.title || 'Display & Pendingin untuk Bisnis Anda',
    customData?.titleEn || 'Display & Cooling for Your Business'
  );
  const sectionSubtitle = t(
    customData?.subtitleId || customData?.subtitle || 'Jika Anda sedang mencari unit showcase untuk kebutuhan restoran, toko roti, hotel, atau pabrik makanan yang memerlukan spesifikasi khusus (bukan ukuran standar rumah tangga), produk dari PT Holicindo bisa menjadi salah satu opsi yang tepat.',
    customData?.subtitleEn || 'If you are looking for showcase units for restaurant, bakery, hotel, or food factory needs that require special specifications (not standard household sizes), PT Holicindo products could be the right choice.'
  );

  return (
    <section className="relative py-8 sm:py-16 bg-white border-b border-neutral-200">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-6 mb-5 sm:mb-16 border-b border-neutral-200 pb-4 sm:pb-8">
          <div>
            <p className="text-[#C9A84C] font-black text-xs sm:text-sm uppercase tracking-[0.25em] mb-1.5 sm:mb-4">{t('Kategori Produk', 'Product Categories')}</p>
            <h2 className="text-xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black">{sectionTitle}</h2>
            <p className="text-xs sm:text-base text-neutral-600 font-light mt-2 sm:mt-4 max-w-2xl leading-relaxed">
              {sectionSubtitle}
            </p>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-black font-bold uppercase tracking-widest hover:gap-4 transition-all self-start md:self-auto pt-1">
            {t('Lihat Semua', 'View All')} <ArrowRight size={14} strokeWidth={1.75} />
          </Link>
        </div>
        <div className={`flex overflow-x-auto hide-scrollbar snap-x snap-mandatory md:grid ${display.length === 4 ? 'md:grid-cols-4' : display.length === 2 ? 'md:grid-cols-2' : display.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-3'} gap-3 sm:gap-6 pb-3 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0`}>
          {display.map((cat: any) => (
            <Link key={cat.slug} href={`/products/category/${cat.slug}`} className="group relative flex-shrink-0 w-[75vw] sm:w-[60vw] md:w-auto snap-center overflow-hidden h-56 sm:h-96 bg-neutral-100 transition-all duration-500 border border-neutral-200 active:scale-[0.99]">
              {cat.imageUrl
                ? <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                : <div className="absolute inset-0 bg-neutral-200" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 transform sm:group-hover:-translate-y-2 transition-transform duration-500">
                <h3 className="text-white text-xl sm:text-3xl font-light mb-1 sm:mb-2 tracking-tight">{cat.name.replace(/&amp;/g, '&')}</h3>
                {cat.description && <p className="text-neutral-200 sm:text-neutral-300 text-xs sm:text-sm font-light line-clamp-2">{cat.description}</p>}
                <div className="flex items-center gap-1.5 sm:gap-2 text-white text-[9px] sm:text-[10px] font-bold mt-3 sm:mt-6 uppercase tracking-widest opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0">
                  {t('Eksplorasi', 'Explore')} <ArrowRight size={13} strokeWidth={1.5} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
