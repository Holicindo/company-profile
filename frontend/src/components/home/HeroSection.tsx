'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <section className="relative bg-white min-h-[90vh] lg:min-h-screen flex flex-col justify-center border-b border-neutral-200 overflow-hidden pt-20">
        
        {/* Absolute Right Side Background (Full Bleed) */}
        <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[60%] bg-neutral-100 flex items-center justify-center p-8 lg:p-24 overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-100/50 to-transparent pointer-events-none z-10" />
          <img
            src="/hero_section_1.png"
            alt="Kitchen Equipment Showcase"
            className="relative z-0 w-full h-full object-contain object-right scale-110 md:scale-[1.15] mix-blend-multiply opacity-90 transition-transform duration-1000 hover:scale-[1.2]"
          />
        </div>

        {/* Content Container */}
        <div className="container-wide relative z-20 w-full">
          <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 lg:py-16 bg-white/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 lg:p-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-6 block flex items-center gap-3">
              <span className="w-8 h-px bg-neutral-400"></span> Industrial Equipment
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-black leading-[1.05] mb-8 tracking-tighter">
              {t('Distributor Resmi', 'Official Distributor')} <br />
              <span className="font-bold">Showcase &amp; Machinery.</span>
            </h1>
            <p className="text-base text-neutral-600 font-normal leading-relaxed mb-12 max-w-md">
              {t(
                'Temukan 282+ pilihan mesin produksi makanan dan showcase pendingin untuk bisnis F&B Anda. Peralatan dapur komersial bergaransi resmi, siap kirim ke seluruh Indonesia.',
                'Discover 282+ selections of food processing machinery and commercial showcases for your F&B business. Official warranty commercial kitchen equipment, ready for nationwide delivery.'
              )}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => setIsVideoOpen(true)}
                className="flex items-center justify-center gap-3 bg-[#2D3E50] text-white border border-[#2D3E50] px-8 py-5 text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all w-full sm:w-auto shadow-md group">
                <Play size={14} className="fill-white group-hover:scale-110 transition-transform" />
                {t('Tonton Video', 'Watch Video')}
              </button>
            </div>

            {/* B2B Trust Indicators */}
            <div className="flex items-center gap-8 pt-8 border-t border-neutral-200 max-w-md">
               <div>
                 <div className="text-2xl font-light text-black tracking-tighter">282+</div>
                 <div className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 mt-1">{t('Jenis Produk', 'Product Lines')}</div>
               </div>
               <div className="w-px h-10 bg-neutral-200"></div>
               <div>
                 <div className="text-2xl font-light text-black tracking-tighter">100%</div>
                 <div className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 mt-1">{t('Garansi Resmi', 'Official Warranty')}</div>
               </div>
               <div className="w-px h-10 bg-neutral-200"></div>
               <div>
                 <div className="text-2xl font-light text-black tracking-tighter">24/7</div>
                 <div className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 mt-1">{t('Technical Support', 'Technical Support')}</div>
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
              src="https://www.youtube.com/embed/SWEAJdRmvqk?autoplay=1" 
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



