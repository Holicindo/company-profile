import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { getBlogPosts } from '@/lib/api';

export const metadata: Metadata = { title: 'News & Blog', description: 'Berita terbaru seputar industri mesin makanan dari Holicindo.' };
export const revalidate = 3600;

const fmt = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function NewsPage({ searchParams }: { searchParams: { page?: string; search?: string } }) {
  const page = searchParams.page ? +searchParams.page : 1;
  const data = await getBlogPosts({ page, limit: 12, search: searchParams.search }).catch(() => ({ items: [], totalPages: 0, total: 0 }));

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-neutral-900 to-brand-800 py-16">
        <div className="container-wide">
          <nav className="text-sm text-neutral-400 mb-4"><Link href="/" className="hover:text-white">Home</Link> / <span className="text-white">News</span></nav>
          <h1 className="text-4xl font-bold font-display text-white mb-3">Berita & Artikel</h1>
          <p className="text-brand-200">Update terkini seputar industri mesin makanan</p>
        </div>
      </div>
      <div className="container-wide py-12">
        {data.items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.items.map((post: any) => (
                <Link key={post.id} href={`/news/${post.slug}`} className="card group">
                  <div className="relative h-52 bg-neutral-100">
                    {post.featuredImage
                      ? <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" unoptimized />
                      : <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-neutral-100" />}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                      <span className="flex items-center gap-1"><Calendar size={12} />{fmt(post.publishedAt)}</span>
                      {post.author && <span className="flex items-center gap-1"><User size={12} />{post.author}</span>}
                    </div>
                    <h2 className="font-semibold text-neutral-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors mb-2">{post.title}</h2>
                    {post.excerpt && <p className="text-neutral-500 text-sm line-clamp-3">{post.excerpt.replace(/<[^>]*>/g, '')}</p>}
                  </div>
                </Link>
              ))}
            </div>
            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).filter(p => Math.abs(p - page) <= 2).map(p => (
                  <Link key={p} href={`/news?page=${p}`}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${p === page ? 'bg-brand-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-brand-50'}`}>{p}</Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20"><p className="text-neutral-400 text-lg">Belum ada artikel tersedia</p></div>
        )}
      </div>
    </div>
  );
}
