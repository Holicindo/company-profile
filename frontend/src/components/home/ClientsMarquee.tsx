'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const ROW_1 = [
  { name: 'Gelael Signature', logo: '/clients/gelael.svg' },
  { name: 'LuLu Hypermarket', logo: '/clients/lulu.svg' },
  { name: 'Cinema XXI', logo: '/clients/xxi.svg' },
  { name: 'Holland Bakery', logo: '/clients/holland.svg' },
  { name: 'Flix Cinema', logo: '/clients/flix.svg' },
  { name: 'BreadTalk', logo: '/clients/breadtalk.svg' },
  { name: 'J.CO Donuts', logo: '/clients/jco.svg' },
  { name: 'Starbucks Indonesia', logo: '/clients/starbucks.svg' },
];

const ROW_2 = [
  { name: 'Roti O', logo: '/clients/rotio.svg' },
  { name: 'Mayora Group', logo: '/clients/mayora.svg' },
  { name: 'Indomaret', logo: '/clients/indomaret.svg' },
  { name: 'Alfamart', logo: '/clients/alfamart.svg' },
  { name: 'Transmart Carrefour', logo: '/clients/transmart.svg' },
  { name: 'Giant Hypermart', logo: '/clients/giant.svg' },
  { name: 'Hero Supermarket', logo: '/clients/hero.svg' },
  { name: 'Ranch Market', logo: '/clients/ranch.svg' },
  { name: 'Food Hall', logo: '/clients/foodhall.svg' },
];

export function ClientsMarquee() {
  const { t } = useLanguage();
  const row1 = [...ROW_1, ...ROW_1, ...ROW_1];
  const row2 = [...ROW_2, ...ROW_2, ...ROW_2];

  return (
    <section className="relative py-6 sm:py-8 md:py-10 bg-white overflow-hidden border-t border-neutral-200">
      
      {/* Heading */}
      <div className="relative z-10 container-wide mb-6 sm:mb-8 text-center px-4">
        <p className="text-neutral-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-2 sm:mb-4">
          {t('Dipercaya Oleh', 'Trusted By')}
        </p>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black tracking-tight mb-2 sm:mb-4">
          {t('Klien & Mitra Kami', 'Our Clients & Partners')}
        </h2>
        <p className="text-neutral-600 font-normal mt-2 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-base md:text-lg leading-relaxed">
          {t(
            'Ratusan bisnis kuliner dan HORECA terkemuka di Indonesia telah mempercayakan kebutuhan mesin dan peralatan operasional mereka kepada Holicindo.',
            'Hundreds of leading F&B and HORECA businesses in Indonesia have trusted their operational machinery and equipment needs to Holicindo.'
          )}
        </p>
      </div>

      {/* Row 1 — bergerak ke kiri */}
      <div className="relative mb-3 sm:mb-4 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-3 sm:gap-6 animate-marquee-left whitespace-nowrap">
          {row1.map((item, idx) => (
            <div
              key={`r1-${idx}`}
              className="flex-shrink-0 flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 border border-neutral-200 bg-white shadow-xs rounded-none min-w-[130px] sm:min-w-[180px] md:min-w-[200px]"
            >
              <span className="font-bold text-[#2D3E50] text-xs sm:text-sm md:text-base tracking-tight select-none">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — bergerak ke kanan */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-3 sm:gap-6 animate-marquee-right whitespace-nowrap">
          {row2.map((item, idx) => (
            <div
              key={`r2-${idx}`}
              className="flex-shrink-0 flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 border border-neutral-200 bg-white shadow-xs rounded-none min-w-[130px] sm:min-w-[180px] md:min-w-[200px]"
            >
              <span className="font-bold text-[#2D3E50] text-xs sm:text-sm md:text-base tracking-tight select-none">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
