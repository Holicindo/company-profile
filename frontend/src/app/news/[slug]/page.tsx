import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/api';
import { INSIGHTS_ARTICLES } from '@/data/insights-articles';
import { NewsDetailView } from './NewsDetailView';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    let p = await getBlogPostBySlug(params.slug).catch(() => null);
    if (!p) {
      p = INSIGHTS_ARTICLES.find((a) => a.slug === params.slug) as any;
    }
    if (!p) return { title: 'Artikel Tidak Ditemukan | Holic Insights' };

    return {
      title: `${p.title} | Holic Insights`,
      description: p.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160),
      openGraph: { title: p.title, images: p.featuredImage ? [p.featuredImage] : [] },
    };
  } catch { return { title: 'Artikel Tidak Ditemukan | Holic Insights' }; }
}

function extractToc(content: string) {
  if (!content) return [];
  const lines = content.split('\n');
  const headings: { text: string; id: string }[] = [];
  
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
      const text = trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ text, id });
    }
  });

  return headings;
}

export default async function NewsDetailPage({ params }: Props) {
  let post: any;
  try { 
    post = await getBlogPostBySlug(params.slug); 
  } catch { 
    post = INSIGHTS_ARTICLES.find((a) => a.slug === params.slug);
    if (!post) notFound(); 
  }

  const toc = extractToc(post.content || '');

  return <NewsDetailView post={post} toc={toc} />;
}
