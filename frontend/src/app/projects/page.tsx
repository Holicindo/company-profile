import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Building2 } from 'lucide-react';
import { getPortfolio } from '@/lib/api';

export const metadata: Metadata = { title: 'Project Experiences', description: 'Portofolio proyek instalasi mesin makanan Holicindo.' };
export const revalidate = 3600;

export default async function ProjectsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page ? +searchParams.page : 1;
  const data = await getPortfolio({ page, limit: 12 }).catch(() => ({ items: [], totalPages: 0, total: 0 }));

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-neutral-900 to-brand-800 py-16">
        <div className="container-wide">
          <nav className="text-sm text-neutral-400 mb-4"><Link href="/" className="hover:text-white">Home</Link> / <span className="text-white">Projects</span></nav>
          <h1 className="text-4xl font-bold font-display text-white mb-3">Project Experiences</h1>
          <p className="text-brand-200">Portofolio proyek yang telah kami kerjakan</p>
        </div>
      </div>

      <div className="container-wide py-12">
        {data.items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.items.map((p: any) => (
                <Link key={p.id} href={`/projects/${p.slug}`} className="card group">
                  <div className="relative h-56 bg-neutral-100">
                    {p.imageUrl
                      ? <Image src={p.imageUrl} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" unoptimized />
                      : <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center"><Building2 size={48} className="text-brand-300" /></div>}
                  </div>
                  <div className="p-5">
                    <h2 className="font-semibold text-neutral-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">{p.title}</h2>
                    {p.clientName && <p className="text-sm text-neutral-500 mt-1.5">Klien: {p.clientName}</p>}
                    {p.projectDate && <p className="text-xs text-neutral-400 mt-1">{new Date(p.projectDate).getFullYear()}</p>}
                  </div>
                </Link>
              ))}
            </div>
            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).filter(p => Math.abs(p - page) <= 2).map(p => (
                  <Link key={p} href={`/projects?page=${p}`}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${p === page ? 'bg-brand-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-brand-50'}`}>{p}</Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20"><Building2 size={48} className="text-neutral-200 mx-auto mb-4" /><p className="text-neutral-400">Belum ada proyek tersedia</p></div>
        )}
      </div>
    </div>
  );
}
