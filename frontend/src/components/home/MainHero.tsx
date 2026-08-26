'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export function MainHero() {
  const { t } = useLanguage();

  const heroSlides = [
    '/images/about/hero-bg-02.jpg',
    '/images/experiences/hero_experiences_(4).png',
    '/images/experiences/hero_experiences_(1).png',
    '/images/experiences/hero_experiences _(7).png',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <section className="relative min-h-[440px] sm:min-h-[520px] md:min-h-[600px] lg:min-h-[680px] py-14 sm:py-20 md:py-28 flex flex-col justify-center overflow-hidden bg-black pt-16 sm:pt-24 pb-16 sm:pb-20">
      
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide}
              alt={`Holicindo Showcase ${index + 1}`}
              fill
              className="object-cover object-center"
              priority={index === 0}
              quality={100}
              sizes="100vw"
              unoptimized
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 md:to-transparent"></div>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="container-wide relative z-10 w-full text-white flex flex-col items-center text-center px-4">
        <div className="max-w-4xl -mt-2 sm:-mt-6 md:-mt-10">
          <span className="inline-block px-3.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mb-4 sm:mb-6 rounded-full">
            {t('Est. 2001', 'Est. 2001')}
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.2] sm:leading-[1.15] tracking-tight mb-4 drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 via-neutral-400 to-white animate-shimmer-text">
            {t('Pusat Mesin & Showcase', 'Trusted F&B Machine &')} <br className="hidden sm:inline" />
            {t('Kustom F&B Terpercaya.', 'Custom Showcase Center.')}
          </h1>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 sm:bottom-10 left-0 right-0 z-10 flex justify-center gap-2 sm:gap-3">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 sm:w-10 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
