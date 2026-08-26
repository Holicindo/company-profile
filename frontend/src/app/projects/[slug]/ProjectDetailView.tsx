'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Building2, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { sanitizeProjectDescription } from '@/lib/content-parser';
import { useLanguage } from '@/context/LanguageContext';

interface ProjectDetailViewProps {
  project: any;
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const { t } = useLanguage();
  const gallery = project.galleryUrls?.length ? project.galleryUrls : project.imageUrl ? [project.imageUrl] : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#0d1013] border-b border-white/5">
        <div className="container-wide py-3">
          <nav className="text-xs text-neutral-500 flex flex-wrap gap-1 items-center">
            <Link href="/" className="hover:text-brand-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-brand-400 transition-colors">{t('Pengalaman Proyek', 'Project Experiences')}</Link>
            <span>/</span>
            <span className="text-neutral-300 line-clamp-1">{project.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-wide py-12">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-600 mb-8 transition-colors">
          <ArrowLeft size={16} /> {t('Kembali ke Semua Proyek', 'Back to All Projects')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="relative aspect-video bg-neutral-100 rounded-2xl overflow-hidden mb-8 shadow-sm">
              {gallery[0] ? (
                <Image
                  src={gallery[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  unoptimized
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                  <Building2 size={64} className="text-white/20" />
                </div>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 mb-6 leading-tight">
              {project.title}
            </h1>

            <div className="space-y-4 text-neutral-700 leading-relaxed text-base text-justify">
              <p>
                {sanitizeProjectDescription(project.description, project.title, project.clientName)}
              </p>
            </div>

            {/* Additional gallery */}
            {gallery.length > 1 && (
              <div className="mt-10">
                <h2 className="text-lg font-bold text-neutral-900 mb-4">{t('Galeri Proyek', 'Project Gallery')}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.map((url: string, i: number) => (
                    <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100 shadow-sm">
                      <Image src={url} alt={`${t('Foto proyek', 'Project photo')} ${i + 1}`} fill className="object-cover" sizes="33vw" unoptimized />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar detail */}
          <div>
            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 sticky top-28 space-y-5">
              <h3 className="font-bold text-neutral-900 text-base pb-3 border-b border-neutral-200">
                {t('Detail Proyek', 'Project Details')}
              </h3>

              {project.clientName && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Building2 size={15} className="text-brand-600" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 mb-0.5">{t('Klien', 'Client')}</p>
                    <p className="text-sm font-semibold text-neutral-800">{project.clientName}</p>
                  </div>
                </div>
              )}

              {project.projectDate && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Calendar size={15} className="text-brand-600" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 mb-0.5">{t('Tahun Proyek', 'Project Year')}</p>
                    <p className="text-sm font-semibold text-neutral-800">
                      {new Date(project.projectDate).getFullYear()}
                    </p>
                  </div>
                </div>
              )}

              {project.location && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={15} className="text-brand-600" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 mb-0.5">{t('Lokasi', 'Location')}</p>
                    <p className="text-sm font-semibold text-neutral-800">{project.location}</p>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-neutral-200 space-y-2">
                <Link href="/contact" className="btn-primary w-full justify-center text-sm uppercase">
                  {t('Diskusikan Proyek Serupa', 'Discuss Similar Project')}
                </Link>
                <Link href="/projects" className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-neutral-500 hover:text-brand-600 transition-colors">
                  {t('Lihat Semua Proyek', 'View All Projects')} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
