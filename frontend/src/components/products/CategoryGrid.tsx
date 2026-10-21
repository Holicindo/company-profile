'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Store, Coffee, UtensilsCrossed, ShoppingCart } from 'lucide-react';

const CATEGORY_ICONS: Record<string, any> = {
  'bakery-pastry': Store,
  'cafe-beverage': Coffee,
  'restaurant-hotel': UtensilsCrossed,
  'retail-supermarket': ShoppingCart,
};

export function CategoryGrid({ categories }: { categories: any[] }) {
  const { t, lang } = useLanguage();

  return (
    <div className="py-10 sm:py-16 bg-neutral-50">
      <div className="container-wide">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810] tracking-tight mb-3 sm:mb-4">
            {t('Pilih Kategori Bisnis Anda', 'Choose Your Business Category')}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t(
              'Temukan solusi pendingin yang tepat untuk industri Anda',
              'Find the perfect refrigeration solution for your industry'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.slug] || Store;
            const name = lang === 'EN' && category.nameEn ? category.nameEn : category.name;
            const description = lang === 'EN' && category.descriptionEn ? category.descriptionEn : category.description;

            return (
              <Link
                key={category.id}
                href={`/products/industry/${category.slug}`}
                className="group relative bg-white border-2 border-neutral-200 rounded-xl p-6 hover:border-[#C9A84C] hover:shadow-lg transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#F6F1E6] flex items-center justify-center mb-4 group-hover:bg-[#C9A84C] transition-colors">
                    <Icon className="w-8 h-8 text-[#2C1810] group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#2C1810] mb-2 group-hover:text-[#C9A84C] transition-colors">
                    {name}
                  </h3>
                  
                  {description && (
                    <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
                      {description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-1 text-sm font-bold text-[#C9A84C] group-hover:gap-2 transition-all">
                    {t('Lihat Produk', 'View Products')}
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
