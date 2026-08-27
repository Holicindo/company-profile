'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Building2, ChevronRight } from 'lucide-react';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { useLanguage } from '@/context/LanguageContext';



export function ProjectsView({ data, page }: { data: any; page: number }) {
  const { t } = useLanguage();

  const heroSlides = [
    '/images/experiences/hero_experiences_(1).png',
    '/images/experiences/hero_experiences_(2).png',
    '/images/experiences/hero_experiences_(3).png',
    '/images/experiences/hero_experiences_(4).png',
    '/images/experiences/hero_experiences_(5).png',
    '/images/experiences/hero_experiences_(6).png',
    '/images/experiences/hero_experiences_(7).png',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">

      {/* ── Hero Slideshow — min-h on mobile, natural on desktop ── */}
      <div className="relative text-white overflow-hidden min-h-[360px] sm:min-h-0 bg-neutral-900">

        {/* Ghost spacer: hidden on mobile, normal flow on desktop to give natural height */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSlides[0]}
          alt=""
          aria-hidden
          className="hidden sm:block"
          style={{ width: '100%', visibility: 'hidden' }}
        />

        {/* Slides — absolutely fill the container */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: index === currentSlide ? 1 : 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide}
                alt={`Pengalaman Proyek Holicindo ${index + 1}`}
                decoding="async"
                loading={index === 0 ? 'eager' : 'lazy'}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  objectFit: 'cover',
                  imageRendering: 'auto',
                }}
              />
            </div>
          ))}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/20" />

          {/* Centered content */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center px-6 max-w-3xl">
              <p className="text-white/70 font-bold text-[10px] uppercase tracking-[0.25em] mb-4 drop-shadow">
                Project Experiences
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1] drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 via-neutral-400 to-white animate-shimmer-text">
                {t('Portofolio Instalasi Mesin', 'Machine Installation Portfolio')}
              </h1>
              <p className="text-white/90 text-base md:text-lg font-normal leading-relaxed drop-shadow-md max-w-2xl mx-auto">
                {t(
                  'Jejak keberhasilan instalasi mesin kami yang telah dipercaya oleh ratusan pelaku industri F&B dan HORECA di Indonesia.',
                  'The track record of our successful machine installations, trusted by hundreds of F&B and HORECA industry players in Indonesia.'
                )}
              </p>
            </div>
          </div>


          {/* Slide dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="h-[5px] rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: index === currentSlide ? '24px' : '6px',
                  backgroundColor: index === currentSlide ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.45)',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Album Showcase & Gallery Section ── */}
      <div className="container-wide py-12 md:py-16">
        {data.items.length > 0 ? (
          <>
            <ProjectGallery projects={data.items} />

            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-16 border-t border-neutral-200 pt-8">
                {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                  .filter((p: number) => Math.abs(p - page) <= 2)
                  .map((p: number) => (
                    <Link
                      key={p}
                      href={`/projects?page=${p}`}
                      className={`w-10 h-10 flex items-center justify-center text-xs font-bold transition-colors ${p === page
                        ? 'bg-[#2D3E50] text-white border border-[#2D3E50]'
                        : 'bg-white border border-neutral-200 text-neutral-600 hover:border-[#2D3E50] hover:text-[#2D3E50]'
                        }`}
                    >
                      {p}
                    </Link>
                  ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 bg-[#F4F8F9] border border-neutral-200">
            <Building2 size={40} className="text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 font-medium text-lg">
              {t('Belum ada portofolio proyek yang ditampilkan.', 'No project portfolio displayed yet.')}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
