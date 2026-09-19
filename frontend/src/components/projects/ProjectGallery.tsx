'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  ExternalLink,
  Calendar,
  User,
  MapPin,
  FileText,
  ArrowRight,
} from 'lucide-react';
import type { Portfolio } from '@/types';
import { sanitizeProjectDescription } from '@/lib/content-parser';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectGalleryProps {
  projects: Portfolio[];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const { t } = useLanguage();

  const featuredProjects = projects.slice(0, 5);

  useEffect(() => {
    if (featuredProjects.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredProjects.length]);

  const nextSlide = () => setActiveSlideIndex((prev) => (prev + 1) % featuredProjects.length);
  const prevSlide = () => setActiveSlideIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);

  const active = featuredProjects[activeSlideIndex];

  return (
    <div className="space-y-12 sm:space-y-20">

      {/* ── 1. SPOTLIGHT CAROUSEL (Side-by-side / Memanjang ke samping di mobile & desktop) ── */}
      {featuredProjects.length > 0 && (
        <div className="bg-[#2C1810] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-12 min-h-0 lg:min-h-[460px]">

            {/* Image Side - 5 cols mobile, 7 cols desktop */}
            <div className="col-span-5 sm:col-span-6 lg:col-span-7 relative min-h-[180px] sm:min-h-[280px] lg:min-h-full bg-neutral-900 overflow-hidden">
              {featuredProjects.map((p, idx) => (
                <div
                  key={p.id}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: idx === activeSlideIndex ? 1 : 0, zIndex: idx === activeSlideIndex ? 1 : 0 }}
                >
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      unoptimized
                      priority={idx === 0}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building2 size={64} className="text-white/10" />
                    </div>
                  )}
                  {/* Mobile bottom subtle gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/70 via-transparent to-transparent lg:hidden" />
                </div>
              ))}

              {/* Counter */}
              <div className="absolute top-2 left-2 sm:top-5 sm:left-5 z-10 px-2 py-1 sm:px-3 sm:py-1.5 bg-black/60 backdrop-blur-sm text-[9px] sm:text-[11px] font-bold tracking-widest text-white border border-white/15">
                0{activeSlideIndex + 1} / 0{featuredProjects.length}
              </div>

              {/* Nav Arrows */}
              <div className="absolute bottom-2 right-2 sm:bottom-5 sm:right-5 z-10 flex gap-1.5 sm:gap-2">
                <button onClick={prevSlide} aria-label="Sebelumnya"
                  className="w-7 h-7 sm:w-9 sm:h-9 bg-black/60 hover:bg-white hover:text-[#2C1810] text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-sm">
                  <ChevronLeft size={13} className="sm:w-4 sm:h-4" />
                </button>
                <button onClick={nextSlide} aria-label="Selanjutnya"
                  className="w-7 h-7 sm:w-9 sm:h-9 bg-black/60 hover:bg-white hover:text-[#2C1810] text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-sm">
                  <ChevronRight size={13} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Info Side - 7 cols mobile, 5 cols desktop */}
            <div className="col-span-7 sm:col-span-6 lg:col-span-5 p-3.5 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between text-white">
              <div>
                <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-white/10 border border-white/15 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/80 mb-2 sm:mb-5">
                  {t('Proyek Unggulan', 'Featured Project')}
                </span>

                <h2 className="text-xs sm:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight text-white mb-1.5 sm:mb-5 leading-tight sm:leading-snug line-clamp-2">
                  {active?.title}
                </h2>

                <div className="space-y-1 sm:space-y-2.5 mb-2 sm:mb-5">
                  {active?.clientName && (
                    <div className="flex items-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-xs text-neutral-300">
                      <User size={11} className="text-white/50 flex-shrink-0 sm:w-[13px] sm:h-[13px]" />
                      <span className="truncate">{active.clientName}</span>
                    </div>
                  )}
                  {active?.location && (
                    <div className="flex items-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-xs text-neutral-300">
                      <MapPin size={11} className="text-white/50 flex-shrink-0 sm:w-[13px] sm:h-[13px]" />
                      <span className="truncate">{active.location}</span>
                    </div>
                  )}
                  {active?.projectDate && (
                    <div className="flex items-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-xs text-neutral-300">
                      <Calendar size={11} className="text-white/50 flex-shrink-0 sm:w-[13px] sm:h-[13px]" />
                      <span>{new Date(active.projectDate).getFullYear()}</span>
                    </div>
                  )}
                </div>

                <div className="hidden sm:block w-8 h-px bg-white/20 mb-4" />

                <p className="hidden sm:block text-neutral-300 text-sm leading-relaxed line-clamp-4 text-justify">
                  {sanitizeProjectDescription(active?.description, active?.title, active?.clientName)}
                </p>
              </div>

              <div className="pt-2 sm:pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                <Link
                  href={`/projects/${active?.slug}`}
                  className="inline-flex items-center gap-1 sm:gap-2 text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-white/80 hover:text-white transition-colors"
                >
                  <span className="truncate">{t('Lihat Proyek', 'View Project')}</span> <ExternalLink size={11} className="sm:w-[13px] sm:h-[13px]" />
                </Link>

                <div className="flex gap-1 sm:gap-1.5">
                  {featuredProjects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlideIndex(i)}
                      aria-label={`Slide ${i + 1}`}
                      className="h-1 sm:h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === activeSlideIndex ? '16px' : '5px',
                        backgroundColor: i === activeSlideIndex ? 'white' : 'rgba(255,255,255,0.3)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── 2. GALLERY GRID ── */}
      <div>
        <div className="mb-6 sm:mb-10 pb-4 sm:pb-5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-3">
          <div>
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1 sm:mb-2">
              {t('Portofolio Lengkap', 'Full Portfolio')}
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2C1810] tracking-tight">
              {t('Galeri Instalasi', 'Installation Gallery')}
            </h2>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-md leading-relaxed">
            {t('Album foto hasil instalasi Holicindo di seluruh Indonesia.', 'Photo albums of Holicindo installation projects across Indonesia.')}
          </p>
        </div>

        {projects.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
              {projects.map((p, idx) => (
                <div
                  key={p.id}
                  className={`group bg-white border border-[#C9A84C] hover:border-[#C9A84C] hover:shadow-lg transition-all duration-300 flex-col overflow-hidden ${
                    idx >= 6 && !showAllMobile ? 'hidden sm:flex' : 'flex'
                  }`}
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/projects/${p.slug}`}
                    className="relative overflow-hidden block h-24 sm:h-[220px]"
                  >
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-103 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
                        <Building2 size={30} className="text-neutral-300" />
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#2C1810]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-5 py-2 bg-white text-[#2C1810] text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                        {t('Lihat Proyek', 'View Project')} <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>

                  {/* Card body */}
                  <div className="p-2 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {p.clientName && (
                        <p className="text-[8px] sm:text-[9px] font-bold text-neutral-400 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-0.5 sm:mb-2 line-clamp-1">
                          {p.clientName}
                        </p>
                      )}
                      <h3 className="font-semibold text-[11px] sm:text-base text-[#2C1810] leading-snug line-clamp-2 mb-1.5 sm:mb-3">
                        {p.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-end pt-1.5 sm:pt-4 border-t border-neutral-100 mt-1 sm:mt-2">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="inline-flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[10px] font-bold text-[#2C1810] hover:text-black uppercase tracking-widest transition-colors"
                      >
                        {t('Detail', 'Details')} <ArrowRight size={10} className="sm:w-3 sm:h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile "Tampilkan Semua Proyek" Button */}
            {projects.length > 6 && !showAllMobile && (
              <div className="mt-4 text-center sm:hidden">
                <button
                  type="button"
                  onClick={() => setShowAllMobile(true)}
                  className="w-full py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-[#2C1810] text-[11px] font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                >
                  {t(`Tampilkan Semua Proyek (${projects.length})`, `Show All Projects (${projects.length})`)}
                  <ChevronRight size={14} className="rotate-90" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-neutral-50 border border-neutral-200">
            <Building2 size={36} className="text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-500 font-light text-base">
              {t('Belum ada proyek yang dapat ditampilkan.', 'No projects available to display.')}
            </p>
          </div>
        )}
      </div>

      {/* ── 3. E-KATALOG BANNER ── */}
      <div className="bg-[#2C1810] p-4 sm:p-8 md:p-12 flex flex-row sm:flex-col md:flex-row items-center justify-between gap-3 sm:gap-8">
        <div className="flex items-center sm:items-start gap-3 sm:gap-5 flex-1 min-w-0">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/10 border border-white/15 text-white flex items-center justify-center flex-shrink-0">
            <FileText size={16} className="sm:w-[22px] sm:h-[22px]" />
          </div>
          <div className="min-w-0">
            <p className="text-[8px] sm:text-[9px] font-bold text-white/60 uppercase tracking-[0.2em] mb-0.5 sm:mb-1">
              {t('Dokumen Resmi', 'Official Document')}
            </p>
            <h3 className="text-xs sm:text-lg md:text-xl font-bold text-white sm:mb-2 tracking-tight leading-tight sm:leading-snug line-clamp-2 sm:line-clamp-none">
              {t('E-Katalog Proyek & Showcase Mesin 2026', '2026 Project E-Catalog & Machine Showcase')}
            </h3>
            <p className="hidden sm:block text-white/60 text-sm max-w-xl leading-relaxed">
              {t(
                'Dokumentasi lengkap spesifikasi unit mesin makanan, peralatan F&B, dan galeri instalasi Holicindo.',
                'Complete documentation of food machine specs, F&B equipment, and Holicindo installation gallery.'
              )}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <a
            href="/catalogue-showcase-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 sm:px-7 sm:py-3 sm:w-auto bg-white text-[#2C1810] hover:bg-white/90 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-colors inline-flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
          >
            <ExternalLink size={11} className="sm:w-[14px] sm:h-[14px]" /> {t('Buka PDF', 'Open PDF')}
          </a>
        </div>
      </div>

    </div>
  );
}
