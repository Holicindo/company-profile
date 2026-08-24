'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  ExternalLink, 
  X, 
  Calendar, 
  User, 
  MapPin,
  FileText
} from 'lucide-react';
import type { Portfolio } from '@/types';
import { sanitizeProjectDescription } from '@/lib/content-parser';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectGalleryProps {
  projects: Portfolio[];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [lightboxProject, setLightboxProject] = useState<Portfolio | null>(null);
  const { t } = useLanguage();

  const featuredProjects = projects.slice(0, 5);

  // Auto slide feature
  useEffect(() => {
    if (featuredProjects.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredProjects.length]);

  const nextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  return (
    <div className="space-y-16">
      
      {/* ── 1. SPOTLIGHT ALBUM CAROUSEL ── */}
      {featuredProjects.length > 0 && (
        <div className="relative bg-[#2D3E50] rounded-none overflow-hidden text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] lg:min-h-[480px]">
            
            {/* Image Slider Container (Left/Main) */}
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-full bg-neutral-900 overflow-hidden">
              {featuredProjects.map((p, idx) => (
                <div
                  key={p.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === activeSlideIndex ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      unoptimized
                      priority={idx === 0}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#2D3E50]/80 flex items-center justify-center">
                      <Building2 size={64} className="text-white/20" />
                    </div>
                  )}
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D3E50] via-transparent to-transparent lg:hidden" />
                </div>
              ))}

              {/* Navigation Arrows */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  aria-label="Proyek Sebelumnya"
                  className="w-10 h-10 bg-[#2D3E50]/90 hover:bg-white hover:text-[#2D3E50] text-white flex items-center justify-center transition-colors border border-white/20"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Proyek Selanjutnya"
                  className="w-10 h-10 bg-[#2D3E50]/90 hover:bg-white hover:text-[#2D3E50] text-white flex items-center justify-center transition-colors border border-white/20"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Slide Counter Indicator */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-[#2D3E50]/80 backdrop-blur-sm border border-white/20 text-[11px] font-bold tracking-widest text-white">
                0{activeSlideIndex + 1} / 0{featuredProjects.length}
              </div>
            </div>

            {/* Project Content Info (Right Side) */}
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-[#2D3E50] text-white">
              <div>
                <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-widest text-neutral-200 mb-6">
                  {t('Proyek Unggulan', 'Featured Project')}
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-4 leading-snug">
                  {featuredProjects[activeSlideIndex]?.title}
                </h2>

                <div className="space-y-3 mb-6 text-xs text-neutral-300">
                  {featuredProjects[activeSlideIndex]?.clientName && (
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-white/70" />
                      <span>{t('Klien:', 'Client:')} <strong className="text-white font-bold">{featuredProjects[activeSlideIndex]?.clientName}</strong></span>
                    </div>
                  )}
                  {featuredProjects[activeSlideIndex]?.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-white/70" />
                      <span>{t('Lokasi:', 'Location:')} {featuredProjects[activeSlideIndex]?.location}</span>
                    </div>
                  )}
                  {featuredProjects[activeSlideIndex]?.projectDate && (
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-white/70" />
                      <span>{t('Tahun:', 'Year:')} {new Date(featuredProjects[activeSlideIndex].projectDate!).getFullYear()}</span>
                    </div>
                  )}
                </div>

                <p className="text-neutral-300 text-sm font-normal leading-relaxed line-clamp-3 mb-6">
                  {sanitizeProjectDescription(
                    featuredProjects[activeSlideIndex]?.description,
                    featuredProjects[activeSlideIndex]?.title,
                    featuredProjects[activeSlideIndex]?.clientName
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/15">
                <button
                  onClick={() => setLightboxProject(featuredProjects[activeSlideIndex])}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-neutral-300 transition-colors"
                >
                  {t('Lihat Album Singkat', 'Quick View Album')} <ExternalLink size={14} />
                </button>
                
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {featuredProjects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlideIndex(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={`h-1.5 transition-all ${
                        i === activeSlideIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── 2. ALBUM GALLERY GRID ── */}
      <div>
        <div className="mb-10 pb-6 border-b border-neutral-200">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] tracking-tight">{t('Galeri Portofolio Instalasi', 'Installation Portfolio Gallery')}</h2>
          <p className="text-neutral-500 text-sm mt-1">{t('Jelajahi album foto hasil instalasi dan pengerjaan proyek Holicindo di seluruh Indonesia.', 'Explore photo albums of Holicindo\'s installation projects across Indonesia.')}</p>
        </div>

        {/* Project Card Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-neutral-200 hover:border-[#2D3E50] transition-all duration-300 group flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-64 bg-neutral-100 overflow-hidden cursor-pointer" onClick={() => setLightboxProject(p)}>
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
                        <Building2 size={40} className="text-neutral-300" />
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#2D3E50]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <span className="px-4 py-2 bg-white text-[#2D3E50] text-xs font-bold tracking-wider uppercase">
                        {t('Lihat Album', 'View Album')}
                      </span>
                    </div>
                  </div>

                  {/* Body text */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-[#2D3E50] mb-2 leading-snug line-clamp-2">
                      {p.title}
                    </h3>
                    
                    {p.clientName && (
                      <p className="text-[11px] font-bold text-neutral-500 mt-2 uppercase tracking-widest">
                        {t('Klien:', 'Client:')} <span className="text-[#2D3E50] font-bold">{p.clientName}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer link */}
                <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-bold tracking-widest text-[10px] uppercase">
                    {p.projectDate ? new Date(p.projectDate).getFullYear() : 'Holicindo'}
                  </span>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="font-bold text-[#2D3E50] hover:underline inline-flex items-center gap-1"
                  >
                    {t('Detail Proyek', 'Project Details')} <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#F4F8F9] border border-neutral-200">
            <Building2 size={36} className="text-neutral-400 mx-auto mb-3" />
            <p className="text-neutral-600 font-medium text-base">{t('Belum ada proyek yang dapat ditampilkan.', 'No projects available to display.')}</p>
          </div>
        )}
      </div>

      {/* ── 3. E-KATALOG PDF BANNER ── */}
      <div className="bg-[#F4F8F9] border border-neutral-200 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 bg-[#2D3E50] text-white flex items-center justify-center shrink-0">
            <FileText size={28} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#2D3E50] uppercase tracking-widest block mb-1">
              {t('Dokumen Katalog Resmi', 'Official Catalog Document')}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-[#2D3E50] mb-2 tracking-tight">
              {t('Unduh E-Katalog Proyek & Showcase Mesin 2026 (PDF)', 'Download 2026 Project E-Catalog & Machine Showcase (PDF)')}
            </h3>
            <p className="text-neutral-600 text-sm max-w-2xl font-normal leading-relaxed">
              {t(
                'Dapatkan dokumentasi lengkap seluruh spesifikasi unit mesin makanan, peralatan F&B, serta galeri album pengerjaan proyek instalasi Holicindo.',
                'Get complete documentation of all food machine specifications, F&B equipment, and Holicindo installation project gallery.'
              )}
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <a
            href="/catalogue-showcase-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-8 py-3.5 bg-[#2D3E50] text-white hover:bg-black text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center justify-center gap-2 border border-[#2D3E50]"
          >
            <ExternalLink size={16} /> {t('Buka PDF', 'Open PDF')}
          </a>
        </div>
      </div>

      {/* ── 3. LIGHTBOX ALBUM MODAL ── */}
      {lightboxProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-neutral-300 relative shadow-2xl">
            
            {/* Close button */}
            <button
              onClick={() => setLightboxProject(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#2D3E50] text-white hover:bg-black transition-colors"
              aria-label="Tutup Album"
            >
              <X size={20} />
            </button>

            {/* Modal Content */}
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-7 bg-neutral-900 min-h-[350px] relative">
                {lightboxProject.imageUrl ? (
                  <Image
                    src={lightboxProject.imageUrl}
                    alt={lightboxProject.title}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
                    <Building2 size={48} />
                  </div>
                )}
              </div>

              <div className="md:col-span-5 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#2D3E50] uppercase tracking-widest block mb-2">
                    {t('Detail Album Proyek', 'Project Album Details')}
                  </span>
                  <h3 className="text-2xl font-bold text-[#2D3E50] mb-4 leading-snug">
                    {lightboxProject.title}
                  </h3>

                  <div className="space-y-2 text-xs text-neutral-600 mb-6">
                    {lightboxProject.clientName && (
                      <p><strong className="text-[#2D3E50]">{t('Klien:', 'Client:')}</strong> {lightboxProject.clientName}</p>
                    )}
                    {lightboxProject.location && (
                      <p><strong className="text-[#2D3E50]">{t('Lokasi:', 'Location:')}</strong> {lightboxProject.location}</p>
                    )}
                    {lightboxProject.projectDate && (
                      <p><strong className="text-[#2D3E50]">{t('Tahun:', 'Year:')}</strong> {new Date(lightboxProject.projectDate).getFullYear()}</p>
                    )}
                  </div>

                  <p className="text-neutral-600 text-sm font-normal leading-relaxed mb-6">
                    {sanitizeProjectDescription(
                      lightboxProject.description,
                      lightboxProject.title,
                      lightboxProject.clientName
                    )}
                  </p>
                </div>

                <div className="pt-6 border-t border-neutral-200 flex items-center justify-between">
                  <Link
                    href={`/projects/${lightboxProject.slug}`}
                    className="w-full text-center py-3 bg-[#2D3E50] text-white hover:bg-black font-bold text-xs uppercase tracking-widest transition-colors"
                  >
                    {t('Halaman Lengkap Proyek', 'Full Project Page')}
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
