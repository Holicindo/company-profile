import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { getBlogPosts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Holic Insights | Tips, Berita, dan Inspirasi F&B',
  description:
    'Baca artikel terbaru dari Holicindo seputar mesin makanan, refrigerasi komersial, tips dapur profesional, dan berita industri food & beverage Indonesia.',
};
export const revalidate = 0;

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const page = searchParams.page ? +searchParams.page : 1;
  let data: { items: any[]; totalPages: number; total: number } = {
    items: [],
    totalPages: 0,
    total: 0,
  };
  try {
    data = await getBlogPosts({ page, limit: 12, search: searchParams.search });
  } catch {}

  const [hero, ...rest] = data.items;

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero editorial header ── */}
      <div className="relative bg-[#0d1013] pt-20 pb-32 overflow-hidden">
        {/* Watermark — pakai clamp agar tidak overflow saat zoom */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-black tracking-tighter leading-none text-white/[0.04]"
            style={{ fontSize: 'clamp(60px, 14vw, 200px)', whiteSpace: 'nowrap' }}
          >
            JOURNAL
          </span>
        </div>

        {/* Konten hero — responsive tanpa nowrap */}
        <div className="relative z-10 container-wide text-center px-6">
          <p className="text-brand-400 font-bold text-xs md:text-sm uppercase tracking-widest mb-4">
            Holicindo Insights
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight">
            Holic Insights
          </h1>
          <p className="text-neutral-400 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Tips dapur komersial, berita industri, dan update produk terbaru untuk bisnis food &amp; beverage Anda.
          </p>

          {/* Search */}
          <form method="GET" action="/news" className="max-w-sm mx-auto">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                name="search"
                defaultValue={searchParams.search || ''}
                placeholder="Cari artikel..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-brand-400 focus:bg-white/15 transition-all"
              />
            </div>
          </form>
        </div>

        <div className="absolute -bottom-[2px] left-0 right-0 w-full overflow-hidden leading-none z-20">
        {/* Wavy divider bottom */}
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[50px] md:h-[70px] fill-white block">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" />
          </svg>
        </div>
      </div>

      <div className="container-wide py-14">
        {data.items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-neutral-400 text-lg">Belum ada artikel tersedia.</p>
          </div>
        ) : (
          <>
            {/* ── Featured Article ── */}
            {hero && page === 1 && !searchParams.search && (
              <section className="mb-14">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-8 h-[3px] bg-brand-500 rounded-full" />
                  <p className="text-brand-600 font-bold text-sm uppercase tracking-widest">Artikel Terbaru</p>
                </div>
                <Link
                  href={`/news/${hero.slug}`}
                  className="group grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-neutral-100 shadow-md hover:shadow-xl transition-all duration-300 bg-white"
                >
                  <div className="relative h-72 lg:h-full min-h-[320px] bg-neutral-100 overflow-hidden">
                    {hero.featuredImage ? (
                      <Image
                        src={hero.featuredImage}
                        alt={hero.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        unoptimized
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-brand-200" />
                    )}
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 font-semibold uppercase tracking-widest mb-5">
                      <span className="bg-brand-50 text-brand-600 px-3 py-1 rounded-full">Featured</span>
                      <span className="flex items-center gap-1"><Calendar size={12} />{fmt(hero.publishedAt)}</span>
                      {hero.author && <span className="flex items-center gap-1"><User size={12} />{hero.author}</span>}
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight mb-4 group-hover:text-brand-600 transition-colors">
                      {hero.title}
                    </h2>
                    {hero.excerpt && (
                      <p className="text-neutral-500 leading-relaxed mb-6 line-clamp-3 text-sm">
                        {hero.excerpt.replace(/<[^>]*>/g, '')}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-2 text-brand-600 font-bold text-sm group-hover:gap-3 transition-all">
                      Baca Selengkapnya <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </section>
            )}

            {/* ── Grid Artikel — card style Abby&Gail: gambar penuh, blur overlay bawah ── */}
            {(page > 1 || searchParams.search ? data.items : rest).length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-8 h-[3px] bg-brand-500 rounded-full" />
                  <p className="text-brand-600 font-bold text-sm uppercase tracking-widest">
                    {searchParams.search ? `Hasil: "${searchParams.search}"` : 'Semua Artikel'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {(page > 1 || searchParams.search ? data.items : rest).map((post: any) => (
                    <Link
                      key={post.id}
                      href={`/news/${post.slug}`}
                      className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-neutral-900 aspect-[4/3] block"
                    >
                      {/* Gambar background penuh */}
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                      )}

                      {/* Blur gradient overlay dari bawah — gaya Abby&Gail */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                      {/* Konten di atas blur */}
                      <div className="absolute inset-0 flex flex-col justify-end p-5">
                        {/* Meta */}
                        <div className="flex items-center gap-3 text-[10px] text-white/60 font-semibold uppercase tracking-widest mb-2">
                          <span className="flex items-center gap-1"><Calendar size={10} />{fmt(post.publishedAt)}</span>
                          {post.author && <span className="flex items-center gap-1"><User size={10} />{post.author}</span>}
                        </div>
                        {/* Judul */}
                        <h3 className="font-extrabold text-white text-base leading-snug line-clamp-2 group-hover:text-brand-300 transition-colors mb-1">
                          {post.title}
                        </h3>
                        {/* Excerpt singkat */}
                        {post.excerpt && (
                          <p className="text-white/60 text-xs line-clamp-2 leading-relaxed">
                            {post.excerpt.replace(/<[^>]*>/g, '')}
                          </p>
                        )}
                        {/* CTA link */}
                        <div className="flex items-center gap-1 text-brand-400 text-xs font-bold mt-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                          Baca Artikel <ArrowRight size={11} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-14">
                {page > 1 && (
                  <Link href={`/news?page=${page - 1}${searchParams.search ? `&search=${searchParams.search}` : ''}`}
                    className="px-4 h-10 rounded-xl flex items-center justify-center text-sm font-bold bg-white border border-neutral-200 text-slate-600 hover:bg-brand-50 hover:text-brand-600 shadow-sm transition-colors">
                    ← Prev
                  </Link>
                )}
                {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                  .filter((p) => Math.abs(p - page) <= 2)
                  .map((p) => (
                    <Link key={p}
                      href={`/news?page=${p}${searchParams.search ? `&search=${searchParams.search}` : ''}`}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm transition-colors ${p === page ? 'bg-brand-500 text-slate-900' : 'bg-white border border-neutral-200 text-slate-600 hover:bg-brand-50 hover:text-brand-600'}`}>
                      {p}
                    </Link>
                  ))}
                {page < data.totalPages && (
                  <Link href={`/news?page=${page + 1}${searchParams.search ? `&search=${searchParams.search}` : ''}`}
                    className="px-4 h-10 rounded-xl flex items-center justify-center text-sm font-bold bg-white border border-neutral-200 text-slate-600 hover:bg-brand-50 hover:text-brand-600 shadow-sm transition-colors">
                    Next →
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
