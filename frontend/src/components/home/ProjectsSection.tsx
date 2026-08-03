import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2 } from 'lucide-react';
import type { Portfolio } from '@/types';

export function ProjectsSection({ projects }: { projects: Portfolio[] }) {
  return (
    <section className="py-16 md:py-24 bg-brand-50 relative overflow-hidden" style={{ marginTop: '-4px' }}>
      {/* Wavy Divider ATAS — putih mengisi dari atas, gelombang mengarah ke bawah */}
      <div className="absolute -top-[2px] left-0 right-0 w-full overflow-hidden leading-none z-20" style={{ transform: 'rotate(180deg)' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[50px] md:h-[70px] fill-white block">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>

      <div className="container-wide relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12">
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-2">Portfolio</p>
            <h2 className="section-title text-slate-900">Project Experiences</h2>
            <p className="section-subtitle text-slate-600">Jejak keberhasilan dan kepercayaan klien industri terhadap mesin kami</p>
          </div>
          <Link href="/projects" className="flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-500 hover:gap-3 transition-all">
            Lihat Semua <ArrowRight size={18} />
          </Link>
        </div>
        {projects.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map(p => (
              <Link key={p.id} href={`/projects/${p.slug}`} className="card group">
                <div className="relative h-52 bg-neutral-100">
                  {p.imageUrl
                    ? <Image src={p.imageUrl} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" unoptimized />
                    : <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center"><Building2 size={40} className="text-brand-300" /></div>}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-neutral-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">{p.title}</h3>
                  {p.clientName && <p className="text-neutral-500 text-sm mt-1">Klien: {p.clientName}</p>}
                  {p.projectDate && <p className="text-neutral-400 text-xs mt-1">{new Date(p.projectDate).getFullYear()}</p>}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Link href="/projects" className="btn-primary">Lihat Semua Proyek <ArrowRight size={18} /></Link>
          </div>
        )}
      </div>

      {/* Wavy Divider BAWAH — dari brand-50 ke white (LatestNews) */}
      <div className="absolute -bottom-[2px] left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[50px] md:h-[70px] fill-white block">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>
    </section>
  );
}
