import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { getBlogPosts } from '@/lib/api';

export const metadata: Metadata = { title: 'News & Blog', description: 'Berita terbaru seputar industri mesin makanan dari Holicindo.' };
export const revalidate = 0;

const fmt = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function NewsPage({ searchParams }: { searchParams: { page?: string; search?: string } }) {
  const page = searchParams.page ? +searchParams.page : 1;
  let data = { items: [], totalPages: 0, total: 0 };
  let errorMsg = null;
  try {
    data = await getBlogPosts({ page, limit: 12, search: searchParams.search });
  } catch (e: any) {
    errorMsg = e.message || 'Unknown error';
  }

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Luxury Dark Header */}
      <div className="relative bg-[#0d1013] py-20 overflow-hidden">
        {/* Faded Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none select-none">
          <h1 className="text-[15vw] font-black tracking-tighter leading-none text-white/5" style={{ textShadow: '0 10px 20px rgba(0,0,0,0.5)', transform: 'translateZ(0)' }}>
            INSIGHTS
          </h1>
        </div>
        
        <div className="relative z-10 container-wide">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 mb-6 transition-colors font-bold">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">Berita & Artikel</h1>
          <p className="text-neutral-400 font-medium text-lg">Update terkini seputar industri mesin makanan</p>
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
            {errorMsg && <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 font-medium">Error loading data: {errorMsg}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.items.map((post: any) => (
                <Link key={post.id} href={`/news/${post.slug}`} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-neutral-100 group hover:shadow-2xl hover:border-brand-300 transition-all duration-300 block">
                  <div className="relative h-64 bg-neutral-100 overflow-hidden">
                    {post.featuredImage
                      ? <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="33vw" unoptimized />
                      : <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-neutral-100" />}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Calendar size={14} />{fmt(post.publishedAt)}</span>
                      {post.author && <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>}
                    </div>
                    <h2 className="text-xl font-extrabold text-slate-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors mb-3">{post.title}</h2>
                    {post.excerpt && <p className="text-slate-500 text-sm line-clamp-3 font-medium leading-relaxed">{post.excerpt.replace(/<[^>]*>/g, '')}</p>}
                  </div>
                </Link>
              ))}
            </div>
            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).filter(p => Math.abs(p - page) <= 2).map(p => (
                  <Link key={p} href={`/news?page=${p}`}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm transition-colors ${p === page ? 'bg-brand-500 text-slate-900' : 'bg-white border border-neutral-200 text-slate-600 hover:bg-brand-50 hover:text-brand-600'}`}>{p}</Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-neutral-100 shadow-sm">
            {errorMsg ? (
              <p className="text-red-500 font-bold">Error: {errorMsg}</p>
            ) : (
              <p className="text-slate-500 font-medium text-lg">Belum ada artikel tersedia</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

