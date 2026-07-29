import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getProductCategories, getProducts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Katalog lengkap produk Holicindo: Food Machinery, Refrigerator, Showcase dan 400+ produk lainnya.',
};
export const revalidate = 3600;

export default async function ProductsPage({ searchParams }: { searchParams: { page?: string; search?: string; category?: string } }) {
  const page = searchParams.page ? +searchParams.page : 1;
  const [categories, data] = await Promise.all([
    getProductCategories().catch(() => []),
    getProducts({ page, limit: 24, search: searchParams.search, category: searchParams.category }).catch(() => ({ items: [], total: 0, totalPages: 0 })),
  ]);
  const roots = categories.filter((c: any) => !c.parentId);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-neutral-50 border-b py-12">
        <div className="container-wide">
          <nav className="text-sm text-neutral-400 mb-3">
            <Link href="/" className="hover:text-brand-600">Home</Link> <span>/</span> <span className="text-neutral-700 ml-1">Products</span>
          </nav>
          <h1 className="section-title">Katalog Produk</h1>
          <p className="text-neutral-500 mt-1">{data.total}+ produk tersedia</p>
        </div>
      </div>

      <div className="container-wide py-10">
        {roots.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link href="/products" className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${!searchParams.category ? 'bg-brand-600 text-white border-brand-600' : 'border-neutral-200 text-neutral-600 hover:border-brand-400 hover:text-brand-600'}`}>Semua</Link>
            {roots.map((c: any) => (
              <Link key={c.id} href={`/products?category=${c.slug}`} className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${searchParams.category === c.slug ? 'bg-brand-600 text-white border-brand-600' : 'border-neutral-200 text-neutral-600 hover:border-brand-400 hover:text-brand-600'}`}>{c.name}</Link>
            ))}
          </div>
        )}

        {data.items.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {data.items.map((p: any) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="card group">
                  <div className="relative h-44 bg-neutral-100">
                    {p.imageUrl
                      ? <Image src={p.imageUrl} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="20vw" unoptimized />
                      : <div className="absolute inset-0 flex items-center justify-center"><span className="text-neutral-300 text-xs">No Image</span></div>}
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-brand-600 font-medium mb-1">{p.category?.name}</p>
                    <h3 className="text-sm font-semibold text-neutral-900 line-clamp-2 group-hover:text-brand-600 transition-colors">{p.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).filter(p => Math.abs(p - page) <= 2).map(p => (
                  <Link key={p} href={`/products?page=${p}${searchParams.category ? `&category=${searchParams.category}` : ''}`}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${p === page ? 'bg-brand-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-brand-50'}`}>{p}</Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20"><p className="text-neutral-400 text-lg">Belum ada produk tersedia</p></div>
        )}
      </div>
    </div>
  );
}
