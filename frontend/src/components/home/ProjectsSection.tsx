'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2 } from 'lucide-react';
import type { Portfolio } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export function ProjectsSection({ projects }: { projects: Portfolio[] }) {
  const { t } = useLanguage();

  return (
    <section className="py-10 sm:py-16 bg-white relative overflow-hidden border-b border-neutral-200">
      <div className="container-wide relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-16">
          <div>
            <p className="text-neutral-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 sm:mb-4">Portfolio</p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-black tracking-tight mb-2 sm:mb-4">Project Experiences</h2>
            <p className="text-neutral-500 font-light text-sm sm:text-lg">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {projects.slice(0, 6).map(p => (
              <Link key={p.id} href={`/projects/${p.slug}`} className="group block border border-neutral-200 hover:border-black transition-colors duration-300 active:scale-[0.99]">
                <div className="relative h-48 sm:h-64 bg-neutral-100 overflow-hidden">
                  {p.imageUrl
                    ? <Image src={p.imageUrl} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" sizes="(max-width: 640px) 100vw, 33vw" unoptimized />
                    : <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center"><Building2 size={36} strokeWidth={1} className="text-neutral-300" /></div>}
                </div>
                <div className="p-4 sm:p-6 bg-white">
                  <h3 className="font-light text-lg sm:text-xl text-black mb-1.5 sm:mb-2 line-clamp-2 tracking-tight group-hover:text-neutral-600 transition-colors">{p.title}</h3>
                  {p.clientName && <p className="text-neutral-500 font-light text-xs sm:text-sm mb-1 uppercase tracking-widest text-[9px] sm:text-[10px]">{t('Klien:', 'Client:')} {p.clientName}</p>}
                  {p.projectDate && <p className="text-neutral-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neutral-100">{new Date(p.projectDate).getFullYear()}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <Link href="/projects" className="btn-primary inline-flex items-center gap-2">{t('Lihat Semua Proyek', 'View All Projects')} <ArrowRight size={14} strokeWidth={2} /></Link>
          </div>
        )}
      </div>
    </section>
  );
}
