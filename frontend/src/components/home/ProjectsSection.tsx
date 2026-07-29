import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2 } from 'lucide-react';
import type { Portfolio } from '@/types';

export function ProjectsSection({ projects }: { projects: Portfolio[] }) {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-2">Portfolio</p>
            <h2 className="section-title">Project Experiences</h2>
            <p className="section-subtitle">Kepercayaan klien adalah kebanggaan kami</p>
          </div>
          <Link href="/projects" className="flex items-center gap-2 text-brand-600 font-semibold hover:gap-3 transition-all">
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
    </section>
  );
}
