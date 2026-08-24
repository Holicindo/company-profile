import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/api';
import { BlogGallery } from '@/components/blog/BlogGallery';

export const metadata: Metadata = {
  title: 'Holic Insights | Tips, Berita, dan Inspirasi F&B',
  description:
    'Kunjungi Holic Insights untuk membaca artikel terbaru. Temukan tips bisnis kuliner, tren industri F&B, dan panduan memilih mesin pengolah makanan terbaik.',
};
export const revalidate = 0;

export default async function BlogPage() {
  let initialPosts: any[] = [];
  try {
    const data = await getBlogPosts({ page: 1, limit: 20 });
    initialPosts = data?.items || [];
  } catch {}

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900 pb-20">
      <BlogGallery initialPosts={initialPosts} />
    </div>
  );
}
