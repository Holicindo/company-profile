import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, ArrowLeft } from 'lucide-react';
import { getPortfolio } from '@/lib/api';

export const metadata: Metadata = { title: 'Project Experiences', description: 'Portofolio proyek instalasi mesin makanan Holicindo.' };
export const revalidate = 0;

export default async function ProjectsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page ? +searchParams.page : 1;
  const data = await getPortfolio({ page, limit: 12 }).catch(() => ({ items: [], totalPages: 0, total: 0 }));

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Luxury Dark Header */}
      <div className="relative bg-[#0d1013] py-20 overflow-hidden">
        {/* Faded Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none select-none">
          <h1 className="text-[15vw] font-black tracking-tighter leading-none text-white/5" style={{ textShadow: '0 10px 20px rgba(0,0,0,0.5)', transform: 'translateZ(0)' }}>
            PROJECTS
          </h1>
        </div>
        
        <div className="relative z-10 container-wide">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 mb-6 transition-colors font-bold">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">Project Experiences</h1>
          <p className="text-neutral-400 font-medium text-lg">Portofolio proyek yang telah kami kerjakan</p>
        </div>

        {/* Wavy Divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[40px] md:h-[60px] fill-brand-50 block">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"></path>
          </svg>
        </div>
      </div>

      <div className="container-wide py-12">
        {data.items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.items.map((p: any) => (
                <Link key={p.id} href={`/projects/${p.slug}`} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-neutral-100 group hover:shadow-2xl hover:border-brand-300 transition-all duration-300 block">
                  <div className="relative h-64 bg-neutral-100 overflow-hidden">
                    {p.imageUrl
                      ? <Image src={p.imageUrl} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="33vw" unoptimized />
                      : <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center"><Building2 size={48} className="text-white/20" /></div>}
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-extrabold text-slate-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">{p.title}</h2>
                    {p.clientName && <p className="text-sm font-bold text-slate-500 mt-2">Klien: <span className="text-brand-600">{p.clientName}</span></p>}
                    {p.projectDate && <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{new Date(p.projectDate).getFullYear()}</p>}
                  </div>
                </Link>
              ))}
            </div>
            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).filter(p => Math.abs(p - page) <= 2).map(p => (
                  <Link key={p} href={`/projects?page=${p}`}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm transition-colors ${p === page ? 'bg-brand-500 text-slate-900' : 'bg-white border border-neutral-200 text-slate-600 hover:bg-brand-50 hover:text-brand-600'}`}>{p}</Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-neutral-100 shadow-sm"><Building2 size={48} className="text-neutral-200 mx-auto mb-4" /><p className="text-slate-500 font-medium text-lg">Belum ada proyek tersedia</p></div>
        )}
      </div>
    </div>
  );
}

