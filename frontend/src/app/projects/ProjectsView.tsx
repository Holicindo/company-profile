'use client';

import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { useLanguage } from '@/context/LanguageContext';

export function ProjectsView({ data, page }: { data: any; page: number }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      
      {/* ── Header Charcoal Blue (Matches About Us Header) ── */}
      <div className="relative border-b border-neutral-200 bg-[#2D3E50] text-white py-12 lg:py-16 overflow-hidden">
        {/* Faded Background Text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0">
          <span
            className="font-black tracking-tighter leading-none text-white/[0.04]"
            style={{ fontSize: 'clamp(60px, 14vw, 220px)', whiteSpace: 'nowrap' }}
          >
            EXPERIENCES
          </span>
        </div>
        
        <div className="relative z-10 container-wide">
          <p className="text-neutral-300 font-bold text-[10px] uppercase tracking-widest mb-3">Project Experiences</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3 leading-tight">
            {t('Portofolio Instalasi Mesin', 'Machine Installation Portfolio')}
          </h1>
          <p className="text-neutral-200 font-medium text-sm md:text-base max-w-2xl leading-relaxed">
            {t(
              'Jejak keberhasilan instalasi mesin kami yang telah dipercaya oleh ratusan pelaku industri F&B dan HORECA di Indonesia.',
              'The track record of our successful machine installations, trusted by hundreds of F&B and HORECA industry players in Indonesia.'
            )}
          </p>
        </div>
      </div>

      {/* ── Album Showcase & Gallery Section ── */}
      <div className="container-wide py-12 md:py-16">
        {data.items.length > 0 ? (
          <>
            <ProjectGallery projects={data.items} />

            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-16 border-t border-neutral-200 pt-8">
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).filter((p: number) => Math.abs(p - page) <= 2).map((p: number) => (
                  <Link 
                    key={p} 
                    href={`/projects?page=${p}`}
                    className={`w-10 h-10 flex items-center justify-center text-xs font-bold transition-colors ${
                      p === page 
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
            <p className="text-neutral-600 font-medium text-lg">{t('Belum ada portofolio proyek yang ditampilkan.', 'No project portfolio displayed yet.')}</p>
          </div>
        )}
      </div>

    </div>
  );
}
