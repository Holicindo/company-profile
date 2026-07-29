import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Building2, Calendar, User } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getPortfolioBySlug } from '@/lib/api';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const p = await getPortfolioBySlug(params.slug);
    return { title: p.title, description: `Proyek ${p.title}${p.clientName ? ` – ${p.clientName}` : ''}` };
  } catch { return { title: 'Project Not Found' }; }
}

export default async function ProjectDetailPage({ params }: Props) {
  let project: any;
  try { project = await getPortfolioBySlug(params.slug); } catch { notFound(); }
  const gallery = project.galleryUrls?.length ? project.galleryUrls : project.imageUrl ? [project.imageUrl] : [];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-neutral-50 border-b py-4">
        <div className="container-wide">
          <nav className="text-sm text-neutral-400">
            <Link href="/" className="hover:text-brand-600">Home</Link> / <Link href="/projects" className="hover:text-brand-600">Projects</Link> / <span className="text-neutral-700">{project.title}</span>
          </nav>
        </div>
      </div>
      <div className="container-wide py-12">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-600 mb-8 transition-colors">
          <ArrowLeft size={16} /> Kembali ke Projects
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="relative h-72 md:h-96 bg-neutral-100 rounded-2xl overflow-hidden mb-8">
              {gallery[0]
                ? <Image src={gallery[0]} alt={project.title} fill className="object-cover" sizes="66vw" unoptimized />
                : <div className="absolute inset-0 flex items-center justify-center"><Building2 size={64} className="text-neutral-300" /></div>}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-neutral-900 mb-5">{project.title}</h1>
            {project.description && <div className="prose-content" dangerouslySetInnerHTML={{ __html: project.description }} />}
            {gallery.length > 1 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold font-display text-neutral-900 mb-4">Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {gallery.map((url: string, i: number) => (
                    <div key={i} className="relative h-36 rounded-lg overflow-hidden bg-neutral-100">
                      <Image src={url} alt={`img ${i + 1}`} fill className="object-cover" sizes="33vw" unoptimized />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="bg-neutral-50 rounded-2xl p-6 space-y-5 sticky top-28">
              <h3 className="font-bold font-display text-neutral-900">Detail Proyek</h3>
              {project.clientName && <div className="flex items-start gap-3"><User size={16} className="text-brand-600 mt-0.5" /><div><p className="text-xs text-neutral-400 mb-0.5">Klien</p><p className="text-sm font-medium text-neutral-700">{project.clientName}</p></div></div>}
              {project.projectDate && <div className="flex items-start gap-3"><Calendar size={16} className="text-brand-600 mt-0.5" /><div><p className="text-xs text-neutral-400 mb-0.5">Tahun</p><p className="text-sm font-medium text-neutral-700">{new Date(project.projectDate).getFullYear()}</p></div></div>}
              {project.location && <div className="flex items-start gap-3"><Building2 size={16} className="text-brand-600 mt-0.5" /><div><p className="text-xs text-neutral-400 mb-0.5">Lokasi</p><p className="text-sm font-medium text-neutral-700">{project.location}</p></div></div>}
              <Link href="/contact" className="btn-primary w-full justify-center mt-4">Diskusikan Proyek Serupa</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
