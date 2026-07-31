import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import type { BlogPost } from '@/types';

const fmt = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

export function LatestNewsSection({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;
  return (
    <section className="py-20 bg-white">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-2">Blog & News</p>
            <h2 className="section-title text-slate-900">Berita Terbaru</h2>
            <p className="section-subtitle text-slate-600">Update terkini dan wawasan seputar industri mesin makanan</p>
          </div>
          <Link href="/news" className="flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-500 hover:gap-3 transition-all">
            Semua Berita <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link key={post.id} href={`/news/${post.slug}`} className="card group">
              <div className="relative h-48 bg-neutral-100">
                {post.featuredImage
                  ? <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="33vw" unoptimized />
                  : <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-neutral-100" />}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-3">
                  <Calendar size={13} />{fmt(post.publishedAt)}
                </div>
                <h3 className="font-semibold text-neutral-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors mb-2">{post.title}</h3>
                {post.excerpt && <p className="text-neutral-500 text-sm line-clamp-2">{post.excerpt.replace(/<[^>]*>/g, '')}</p>}
                <div className="flex items-center gap-1 text-brand-600 text-sm font-medium mt-4">Baca Selengkapnya <ArrowRight size={14} /></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
