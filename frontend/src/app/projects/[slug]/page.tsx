import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPortfolioBySlug } from '@/lib/api';
import { ProjectDetailView } from './ProjectDetailView';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const p = await getPortfolioBySlug(params.slug);
    const desc = `Proyek ${p.title}${p.clientName ? ` untuk ${p.clientName}` : ''}${p.location ? ` di ${p.location}` : ''} — oleh Holicindo.`;
    return {
      title: `${p.title} | Project Experiences | Holicindo`,
      description: desc,
      openGraph: { title: p.title, description: desc, images: p.imageUrl ? [p.imageUrl] : [] },
    };
  } catch { return { title: 'Proyek Tidak Ditemukan | Holicindo' }; }
}

export default async function ProjectDetailPage({ params }: Props) {
  let project: any;
  try { project = await getPortfolioBySlug(params.slug); } catch { notFound(); }

  return <ProjectDetailView project={project} />;
}
