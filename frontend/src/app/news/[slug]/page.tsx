import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/api';
import { parseHtmlContent } from '@/lib/content-parser';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const p = await getBlogPostBySlug(params.slug);
    return { title: p.title, description: p.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160) };
  } catch { return { title: 'Article Not Found' }; }
}

const fmt = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function NewsDetailPage({ params }: Props) {
  let post: any;
  try { post = await getBlogPostBySlug(params.slug); } catch { notFound(); }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-neutral-50 border-b py-4">
        <div className="container-wide">
          <nav className="text-sm text-neutral-400">
            <Link href="/" className="hover:text-brand-600">Home</Link> / <Link href="/news" className="hover:text-brand-600">News</Link> / <span className="text-neutral-700 line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>
      <article className="container-wide py-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-600 mb-6 transition-colors">
            <ArrowLeft size={16} /> Kembali ke Berita
          </Link>
          <div className="flex items-center gap-4 text-sm text-neutral-400 mb-4">
            <span className="flex items-center gap-1.5"><Calendar size={14} />{fmt(post.publishedAt)}</span>
            {post.author && <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-neutral-900 leading-tight mb-8">{post.title}</h1>
          {post.featuredImage && (
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-10 bg-neutral-100">
              <Image src={post.featuredImage} alt={post.title} fill className="object-cover" sizes="800px" unoptimized />
            </div>
          )}
          <div className="prose-content max-w-none text-neutral-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: parseHtmlContent(post.content) }} />
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-neutral-100">
              {post.tags.map((t: string) => <span key={t} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm rounded-full">#{t}</span>)}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
