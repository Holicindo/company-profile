import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getProductCategoryBySlug, getProducts } from '@/lib/api';

interface Props {
  params: { slug: string };
  searchParams: { page?: string; search?: string };
}

import { getCategorySeo } from '@/lib/seo-keywords';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const seo = getCategorySeo(params.slug);
  return {
    title: seo.title,
    description: seo.description,
  };
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
    <div className="min-h-screen bg-white font-sans text-neutral-900">

      {/* ── Minimalist Header ── */}
      <div className="relative border-b border-neutral-200 bg-neutral-50 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span
            className="font-black tracking-tighter leading-none text-black/[0.02] uppercase"
            style={{ fontSize: 'clamp(60px, 14vw, 200px)', whiteSpace: 'nowrap' }}
          >
            {category.name}
          </span>
        </div>

        <div className="relative z-10 container-wide">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span className="text-neutral-300">/</span>
            <Link href="/products" className="hover:text-black transition-colors">Produk</Link>
            {category.parent && (
              <>
                <span className="text-neutral-300">/</span>
                <Link href={`/products/category/${category.parent.slug}`} className="hover:text-black transition-colors">
                  {category.parent.name}
                </Link>
              </>
            )}
            <span className="text-neutral-300">/</span>
            <span className="text-black">{category.name}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-3">
            {getCategorySeo(params.slug).h1}
          </h1>
          <p className="text-neutral-500 font-light">
            {data.total} produk tersedia
          </p>
        </div>
      </div>

      <div className="container-wide py-16">

        {/* Sub-kategori pills - Sharp Minimalist */}
        {category.children?.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href={`/products/category/${params.slug}`}
              className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest border transition-colors ${!searchParams.search ? 'bg-black text-white border-black' : 'bg-white border-neutral-200 text-neutral-500 hover:border-black hover:text-black'}`}
            >
              Semua {category.name}
            </Link>
            {category.children.map((sub: any) => (
              <Link
                key={sub.id}
                href={`/products/category/${sub.slug}`}
                className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest border border-neutral-200 bg-white text-neutral-500 hover:border-black hover:text-black transition-colors"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        )}

        {/* Produk grid - Sharp Minimalist */}
        {data.items.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 border-t border-l border-neutral-200">
              {data.items.map((p: any) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="bg-white border-b border-r border-neutral-200 group hover:border-black hover:shadow-lg transition-all duration-300 relative z-0 hover:z-10 block"
                >
                  <div className="relative h-56 bg-white overflow-hidden p-6">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-neutral-300 text-[10px] font-bold uppercase tracking-[0.2em]">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 border-t border-neutral-100 bg-neutral-50/50">
                    {p.category && p.category.slug !== params.slug && (
                      <p className="text-[9px] text-neutral-400 font-bold mb-2 uppercase tracking-[0.2em]">{p.category.name}</p>
                    )}
                    <h3 className="text-sm font-light text-black group-hover:text-neutral-500 transition-colors leading-relaxed line-clamp-2">
                      {p.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination - Minimalist */}
            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-16">
                {page > 1 && (
                  <Link
                    href={`/products/category/${params.slug}?page=${page - 1}`}
                    className="px-6 h-12 flex items-center text-[10px] font-bold uppercase tracking-widest bg-white border border-neutral-200 text-neutral-500 hover:border-black hover:text-black transition-colors"
                  >Prev</Link>
                )}
                {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                  .filter(p => Math.abs(p - page) <= 2)
                  .map(p => (
                    <Link
                      key={p}
                      href={`/products/category/${params.slug}?page=${p}`}
                      className={`w-12 h-12 flex items-center justify-center text-[11px] font-bold uppercase tracking-widest transition-colors ${p === page ? 'bg-black text-white border border-black' : 'bg-white border border-neutral-200 text-neutral-500 hover:border-black hover:text-black'}`}
                    >{p}</Link>
                  ))}
                {page < data.totalPages && (
                  <Link
                    href={`/products/category/${params.slug}?page=${page + 1}`}
                    className="px-6 h-12 flex items-center text-[10px] font-bold uppercase tracking-widest bg-white border border-neutral-200 text-neutral-500 hover:border-black hover:text-black transition-colors"
                  >Next</Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-32 bg-neutral-50 border border-neutral-200">
            <p className="text-neutral-500 text-lg font-light mb-6">Belum ada produk di kategori ini</p>
            <Link href="/products" className="btn-primary">
              Lihat Semua Produk
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
