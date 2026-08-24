import type { Metadata } from 'next';
import { getPortfolio } from '@/lib/api';
import { ProjectsView } from './ProjectsView';

export const metadata: Metadata = { 
  title: 'Project Experiences | PT Holicindo Dasa Anugerah', 
  description: 'Portofolio proyek instalasi mesin makanan Holicindo untuk industri F&B dan HORECA.' 
};
export const revalidate = 0;

export default async function ProjectsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page ? +searchParams.page : 1;
  const data = await getPortfolio({ page, limit: 12 }).catch(() => ({ items: [], totalPages: 0, total: 0 }));

  return <ProjectsView data={data} page={page} />;
}

