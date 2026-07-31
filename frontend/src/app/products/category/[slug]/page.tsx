import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import { getProductCategoryBySlug, getProducts } from '@/lib/api';

interface Props {
  params: { slug: string };
  searchParams: { page?: string; search?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const c = await getProductCategoryBySlug(params.slug);
    return {
      title: `${c.name} | Katalog Produk Holicindo`,
      description: `Temukan produk ${c.name} dari Holicindo — distributor mesin makanan terpercaya di Indonesia.`,
    };
  } catch { return { title: 'Kategori Produk | Holicindo' }; }
}

export const revalidate = 3600;

export default async function CategoryPage({ params, searchParams }: Props) {
  const page = searchParams.page ? +searchParams.page : 1;

  let category: any;
  try { category = await getProductCategoryBySlug(params.slug); } catch { notFound(); }

  const data = await getProducts({
    category: params.slug,
    page,
    limit: 24,
    search: searchParams.search,
  }).catch(() => ({ items: [], totalPages: 0, total: 0 }));

  return (
    <div className="min-h-screen bg-brand-50">

      {/* ── Luxury Dark Header ── */}
      <div className="relative bg-[#0d1013] py-20 overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span
            className="font-black tracking-tighter leading-none text-white/[0.04] uppercase"
            style={{ fontSize: 'clamp(60px, 14vw, 200px)', whiteSpace: 'nowrap' }}
          >
            {category.name}
          </span>
        </div>

        <div className="relative z-10 container-wide">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-neutral-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-brand-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-brand-400 transition-colors">Produk</Link>
            {category.parent && (
              <>
                <span>/</span>
                <Link href={`/products/category/${category.parent.slug}`} className="hover:text-brand-400 transition-colors">
                  {category.parent.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-neutral-300">{category.name}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            {category.name}
          </h1>
          <p className="text-neutral-400 font-medium">
            {data.total} produk tersedia
          </p>
        </div>

        {/* Wavy divider */}
        <div className="absolute -bottom-[2px] left-0 right-0 w-full overflow-hidden leading-none z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[40px] md:h-[60px] fill-brand-50 block">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" />
          </svg>
        </div>
      </div>

      <div className="container-wide py-12">

        {/* Sub-kategori pills */}
        {category.children?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href={`/products/category/${params.slug}`}
              className={`px-5 py-2 rounded-full text-sm font-bold border transition-colors shadow-sm ${!searchParams.search ? 'bg-brand-500 text-slate-900 border-brand-500' : 'bg-white border-neutral-200 text-slate-600 hover:border-brand-400 hover:text-brand-600'}`}
            >
              Semua {category.name}
            </Link>
            {category.children.map((sub: any) => (
              <Link
                key={sub.id}
                href={`/products/category/${sub.slug}`}
                className="px-5 py-2 rounded-full text-sm font-bold border bg-white border-neutral-200 text-slate-600 hover:border-brand-400 hover:text-brand-600 transition-colors shadow-sm"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}

        {/* Produk grid */}
        {data.items.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {data.items.map((p: any) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 group hover:shadow-xl hover:border-brand-300 transition-all duration-300"
                >
                  <div className="relative h-48 bg-neutral-50 overflow-hidden">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        sizes="20vw"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-neutral-300 text-xs font-bold">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-neutral-50">
                    {p.category && p.category.slug !== params.slug && (
                      <p className="text-[10px] text-brand-600 font-bold mb-1 uppercase tracking-wide">{p.category.name}</p>
                    )}
                    <h3 className="text-sm font-extrabold text-slate-900 line-clamp-2 group-hover:text-brand-600 transition-colors leading-snug">
                      {p.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {page > 1 && (
                  <Link
                    href={`/products/category/${params.slug}?page=${page - 1}`}
                    className="px-4 h-10 rounded-xl flex items-center text-sm font-bold bg-white border border-neutral-200 text-slate-600 hover:bg-brand-50 hover:text-brand-600 shadow-sm transition"
                  >← Prev</Link>
                )}
                {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                  .filter(p => Math.abs(p - page) <= 2)
                  .map(p => (
                    <Link
                      key={p}
                      href={`/products/category/${params.slug}?page=${p}`}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-sm transition ${p === page ? 'bg-brand-500 text-slate-900' : 'bg-white border border-neutral-200 text-slate-600 hover:bg-brand-50 hover:text-brand-600'}`}
                    >{p}</Link>
                  ))}
                {page < data.totalPages && (
                  <Link
                    href={`/products/category/${params.slug}?page=${page + 1}`}
                    className="px-4 h-10 rounded-xl flex items-center text-sm font-bold bg-white border border-neutral-200 text-slate-600 hover:bg-brand-50 hover:text-brand-600 shadow-sm transition"
                  >Next →</Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-neutral-100 shadow-sm">
            <p className="text-slate-400 text-lg font-medium">Belum ada produk di kategori ini</p>
            <Link href="/products" className="mt-4 inline-flex btn-primary text-sm">
              Lihat Semua Produk
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
