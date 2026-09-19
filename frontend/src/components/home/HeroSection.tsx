'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface HeroSectionProps {
  initialData?: {
    badge?: string;
    title?: string;
    description?: string;
    image?: string;
    stats?: { products?: string; warranty?: string; support?: string };
    videoUrl?: string;
  };
}

export function HeroSection({ initialData }: HeroSectionProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { t } = useLanguage();

  const videoSrc = initialData?.videoUrl
    ? (initialData.videoUrl.includes('autoplay=1') ? initialData.videoUrl : `${initialData.videoUrl}${initialData.videoUrl.includes('?') ? '&' : '?'}autoplay=1`)
    : 'https://www.youtube.com/embed/SWEAJdRmvqk?autoplay=1';

  return (
    <>
      <section id="industrial-equipment" className="relative bg-white min-h-0 lg:min-h-[70vh] flex flex-col justify-center border-b border-neutral-200 overflow-hidden">
        
        {/* Absolute Right Side Background (Full Bleed) - Desktop Only */}
        <div className="hidden lg:flex absolute top-0 right-0 bottom-0 w-full lg:w-[50%] bg-neutral-100 items-center justify-center p-8 lg:p-24 overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-100/50 to-transparent pointer-events-none z-10" />
          <img
            src={initialData?.image || '/hero_section_1.png'}
            alt="Kitchen Equipment Showcase"
            className="relative z-0 w-full h-full object-contain object-right scale-110 md:scale-[1.15] mix-blend-multiply opacity-90 transition-transform duration-1000 hover:scale-[1.2]"
          />
        </div>

        {/* Content Container */}
        <div className="container-wide relative z-20 w-full">
          <div className="w-full lg:w-1/2 flex flex-col justify-center py-6 sm:py-12 lg:py-16 bg-white lg:bg-transparent p-0 lg:pr-8">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2 sm:mb-4 block flex items-center gap-2 sm:gap-3">
              <span className="w-6 sm:w-8 h-px bg-neutral-400"></span> {initialData?.badge || t('SHOWCASE & PENDINGIN KOMERSIAL', 'COMMERCIAL SHOWCASE & REFRIGERATION')}
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-black leading-[1.25] sm:leading-[1.2] mb-3 sm:mb-6 tracking-tight max-w-md">
              {initialData?.title || t('Tingkatkan Daya Jual dengan Showcase & Chiller Premium.', 'Boost Your Sales with Premium Showcase & Commercial Chiller.')}
            </h2>
            <p className="text-xs sm:text-base text-neutral-600 font-normal leading-relaxed mb-5 sm:mb-12 max-w-md">
              {initialData?.description ||
                t(
                  'Dari cake showcase berlampu LED hingga blast freezer industri — Holicindo menghadirkan solusi pendingin dan display spesifikasi HORECA dengan garansi resmi, siap kirim ke seluruh Indonesia.',
                  'From LED-lit cake showcases to industrial blast freezers — Holicindo delivers HORECA-grade refrigeration and display solutions with official warranty, ready for nationwide delivery.'
                )}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5 sm:mb-12">
              <button
                onClick={() => setIsVideoOpen(true)}
                className="flex items-center justify-center gap-2.5 sm:gap-3 bg-[#2C1810] text-white border border-[#2C1810] px-6 sm:px-8 py-3.5 sm:py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all w-full sm:w-auto shadow-md group">
                <Play size={14} className="fill-white group-hover:scale-110 transition-transform" />
                {t('Tonton Video', 'Watch Video')}
              </button>
            </div>

            {/* B2B Trust Indicators */}
            <div className="grid grid-cols-3 divide-x divide-neutral-200 text-center sm:text-left sm:divide-x-0 sm:flex sm:flex-wrap sm:gap-8 pt-4 sm:pt-8 border-t border-neutral-200 max-w-md w-full">
               <div className="px-1 sm:px-0">
                 <div className="text-lg sm:text-2xl font-light text-black tracking-tighter">
                   {initialData?.stats?.products || '282+'}
                 </div>
                 <div className="text-[8px] sm:text-[9px] uppercase tracking-wider sm:tracking-widest font-bold text-neutral-400 mt-0.5 sm:mt-1">{t('Jenis Produk', 'Product Lines')}</div>
               </div>
               <div className="px-1 sm:px-0">
                 <div className="text-lg sm:text-2xl font-light text-black tracking-tighter">
                   {initialData?.stats?.warranty || '100%'}
                 </div>
                 <div className="text-[8px] sm:text-[9px] uppercase tracking-wider sm:tracking-widest font-bold text-neutral-400 mt-0.5 sm:mt-1">{t('Garansi Resmi', 'Official Warranty')}</div>
               </div>
               <div className="px-1 sm:px-0">
                 <div className="text-lg sm:text-2xl font-light text-black tracking-tighter">
                   {initialData?.stats?.support || '24/7'}
                 </div>
                 <div className="text-[8px] sm:text-[9px] uppercase tracking-wider sm:tracking-widest font-bold text-neutral-400 mt-0.5 sm:mt-1">{t('Technical Support', 'Technical Support')}</div>
               </div>
            </div>
          </div>
        </div>

      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-lg">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-none border border-neutral-800 overflow-hidden shadow-2xl">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white hover:bg-neutral-200 rounded-none flex items-center justify-center text-black transition-colors"
            >
              <X size={20} />
            </button>
            <iframe 
              src={videoSrc} 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}



