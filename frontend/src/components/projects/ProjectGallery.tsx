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
    <div className="space-y-20">

      {/* ── 1. SPOTLIGHT CAROUSEL ── */}
      {featuredProjects.length > 0 && (
        <div className="bg-[#2D3E50] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12" style={{ minHeight: '460px' }}>

            {/* Image Side */}
            <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-full bg-neutral-900 overflow-hidden">
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
                  {/* Mobile bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D3E50] via-transparent to-transparent lg:hidden" />
                </div>
              ))}

              {/* Counter */}
              <div className="absolute top-5 left-5 z-10 px-3 py-1.5 bg-black/50 backdrop-blur-sm text-[11px] font-bold tracking-widest text-white border border-white/15">
                0{activeSlideIndex + 1} / 0{featuredProjects.length}
              </div>

              {/* Nav Arrows */}
              <div className="absolute bottom-5 right-5 z-10 flex gap-2">
                <button onClick={prevSlide} aria-label="Sebelumnya"
                  className="w-9 h-9 bg-black/50 hover:bg-white hover:text-[#2D3E50] text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-sm">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={nextSlide} aria-label="Selanjutnya"
                  className="w-9 h-9 bg-black/50 hover:bg-white hover:text-[#2D3E50] text-white flex items-center justify-center transition-all border border-white/20 backdrop-blur-sm">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Info Side */}
            <div className="lg:col-span-5 p-8 lg:p-10 xl:p-12 flex flex-col justify-between text-white">
              <div>
                <span className="inline-block px-3 py-1 bg-white/10 border border-white/15 text-[9px] font-bold uppercase tracking-[0.2em] text-white/80 mb-5">
                  {t('Proyek Unggulan', 'Featured Project')}
                </span>

                <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight text-white mb-5 leading-snug">
                  {active?.title}
                </h2>

                <div className="space-y-2.5 mb-5">
                  {active?.clientName && (
                    <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                      <User size={13} className="text-white/50 flex-shrink-0" />
                      <span>{t('Klien', 'Client')}: <strong className="text-white">{active.clientName}</strong></span>
                    </div>
                  )}
                  {active?.location && (
                    <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                      <MapPin size={13} className="text-white/50 flex-shrink-0" />
                      <span>{active.location}</span>
                    </div>
                  )}
                  {active?.projectDate && (
                    <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                      <Calendar size={13} className="text-white/50 flex-shrink-0" />
                      <span>{new Date(active.projectDate).getFullYear()}</span>
                    </div>
                  )}
                </div>

                <div className="w-8 h-px bg-white/20 mb-4" />

                <p className="text-neutral-300 text-sm leading-relaxed line-clamp-4 text-justify">
                  {sanitizeProjectDescription(active?.description, active?.title, active?.clientName)}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={`/projects/${active?.slug}`}
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors"
                >
                  {t('Lihat Proyek Lengkap', 'View Full Project')} <ExternalLink size={13} />
                </Link>

                <div className="flex gap-1.5">
                  {featuredProjects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlideIndex(i)}
                      aria-label={`Slide ${i + 1}`}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === activeSlideIndex ? '20px' : '6px',
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
        <div className="mb-10 pb-5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
              {t('Portofolio Lengkap', 'Full Portfolio')}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] tracking-tight">
              {t('Galeri Instalasi', 'Installation Gallery')}
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md leading-relaxed">
            {t('Album foto hasil instalasi Holicindo di seluruh Indonesia.', 'Photo albums of Holicindo installation projects across Indonesia.')}
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group bg-white border border-neutral-200 hover:border-[#2D3E50] hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Thumbnail */}
                <Link
                  href={`/projects/${p.slug}`}
                  className="relative overflow-hidden block"
                  style={{ height: '220px' }}
                >
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
                      <Building2 size={36} className="text-neutral-300" />
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#2D3E50]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-5 py-2 bg-white text-[#2D3E50] text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                      {t('Lihat Proyek', 'View Project')} <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>

                {/* Card body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {p.clientName && (
                      <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2">
                        {p.clientName}
                      </p>
                    )}
                    <h3 className="font-semibold text-base text-[#2D3E50] leading-snug line-clamp-2 mb-3">
                      {p.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100 mt-2">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                      {p.projectDate ? new Date(p.projectDate).getFullYear() : 'Holicindo'}
                    </span>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#2D3E50] hover:text-black uppercase tracking-widest transition-colors"
                    >
                      {t('Detail', 'Details')} <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
      <div className="bg-[#2D3E50] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 bg-white/10 border border-white/15 text-white flex items-center justify-center shrink-0">
            <FileText size={22} />
          </div>
          <div>
            <p className="text-[9px] font-bold text-white/60 uppercase tracking-[0.2em] mb-1">
              {t('Dokumen Resmi', 'Official Document')}
            </p>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-tight leading-snug">
              {t('E-Katalog Proyek & Showcase Mesin 2026', '2026 Project E-Catalog & Machine Showcase')}
            </h3>
            <p className="text-white/60 text-sm max-w-xl leading-relaxed">
              {t(
                'Dokumentasi lengkap spesifikasi unit mesin makanan, peralatan F&B, dan galeri instalasi Holicindo.',
                'Complete documentation of food machine specs, F&B equipment, and Holicindo installation gallery.'
              )}
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <a
            href="/catalogue-showcase-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-7 py-3 bg-white text-[#2D3E50] hover:bg-white/90 text-[10px] font-bold uppercase tracking-widest transition-colors inline-flex items-center justify-center gap-2"
          >
            <ExternalLink size={14} /> {t('Buka PDF', 'Open PDF')}
          </a>
        </div>
      </div>

    </div>
  );
}
