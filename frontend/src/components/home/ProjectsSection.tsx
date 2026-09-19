'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2 } from 'lucide-react';
import type { Portfolio } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export function ProjectsSection({ projects }: { projects: Portfolio[] }) {
  const { t } = useLanguage();

  return (
    <section className="py-8 sm:py-16 bg-white relative overflow-hidden border-b border-neutral-200">
      <div className="container-wide relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-6 mb-5 sm:mb-16">
          <div>
            <p className="text-[#C9A84C] font-black text-xs sm:text-sm uppercase tracking-[0.25em] mb-1.5 sm:mb-4">Portfolio</p>
            <h2 className="text-xl sm:text-4xl md:text-5xl font-light text-black tracking-tight mb-1.5 sm:mb-4">Project Experiences</h2>
            <p className="text-neutral-500 font-light text-xs sm:text-lg">
              {t(
                'Jejak keberhasilan instalasi mesin kami yang telah dipercaya oleh ratusan pelaku industri F&B dan HORECA di Indonesia.',
                'The track record of our successful machine installations, trusted by hundreds of F&B and HORECA industry players in Indonesia.'
              )}
            </p>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors self-start md:self-auto pt-1">
            {t('Lihat Semua', 'View All')} <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
        
        {projects.length ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
              {projects.slice(0, 6).map((p, idx) => (
                <div key={p.id} className={`group bg-white border border-[#C9A84C] sm:border-2 flex flex-col overflow-hidden ${idx >= 4 ? 'hidden sm:flex' : 'flex'}`}>
                  {/* Thumbnail */}
                  <Link href={`/projects/${p.slug}`} className="relative overflow-hidden block h-28 sm:h-[220px]">
                    {p.imageUrl
                      ? <Image src={p.imageUrl} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 33vw" unoptimized />
                      : <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center"><Building2 size={24} strokeWidth={1} className="text-neutral-300" /></div>
                    }
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#2C1810]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-1.5 sm:px-5 sm:py-2 bg-white text-[#2C1810] text-[9px] sm:text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                        {t('Lihat Proyek', 'View Project')} <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>

                  {/* Card body */}
                  <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                    <h3 className="font-medium sm:font-light text-xs sm:text-xl text-black mb-1 line-clamp-2 tracking-tight group-hover:text-neutral-600 transition-colors leading-snug">{p.title}</h3>
                    <div className="flex items-center justify-end pt-1.5 sm:pt-4 border-t border-neutral-100 mt-1 sm:mt-2">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="inline-flex items-center gap-1 text-[8px] sm:text-[10px] font-bold text-[#2C1810] hover:text-black uppercase tracking-widest transition-colors"
                      >
                        {t('Detail', 'Details')} <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {projects.length > 4 && (
              <div className="mt-5 text-center sm:hidden">
                <Link 
                  href="/projects" 
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 border-2 border-black text-black text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  {t('Lihat Semua Proyek', 'View All Projects')} <ArrowRight size={13} strokeWidth={1.75} />
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6 sm:py-12">
            <Link href="/projects" className="btn-primary inline-flex items-center gap-2">{t('Lihat Semua Proyek', 'View All Projects')} <ArrowRight size={14} strokeWidth={2} /></Link>
          </div>
        )}
      </div>
    </section>
  );
}
