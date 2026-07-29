import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductCategoryBySlug, getProducts } from '@/lib/api';

interface Props { params: { slug: string }; searchParams: { page?: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const c = await getProductCategoryBySlug(params.slug);
    return { title: `${c.name} | Products` };
  } catch { return { title: 'Category Not Found' }; }
}
export const revalidate = 3600;

export default async function CategoryPage({ params, searchParams }: Props) {
  const page = searchParams.page ? +searchParams.page : 1;
  let category: any;
  try { category = await getProductCategoryBySlug(params.slug); } catch { notFound(); }
  const data = await getProducts({ category: params.slug, page, limit: 24 }).catch(() => ({ items: [], totalPages: 0, total: 0 }));

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-neutral-50 border-b py-12">
        <div className="container-wide">
          <nav className="text-sm text-neutral-400 mb-3">
            <Link href="/" className="hover:text-brand-600">Home</Link> / <Link href="/products" className="hover:text-brand-600">Products</Link>
            {category.parent && <> / <Link href={`/products/category/${category.parent.slug}`} className="hover:text-brand-600">{category.parent.name}</Link></>}
            {' '}/ <span className="text-neutral-700">{category.name}</span>
          </nav>
          <h1 className="section-title">{category.name}</h1>
          <p className="text-neutral-500 mt-1">{data.total} produk</p>
        </div>
      </div>

      <div className="container-wide py-10">
        {category.children?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {category.children.map((s: any) => (
              <Link key={s.id} href={`/products/category/${s.slug}`}
                className="px-4 py-2 rounded-full text-sm font-medium border border-neutral-200 text-neutral-600 hover:border-brand-400 hover:text-brand-600 transition-colors">
                {s.name}
              </Link>
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
                      ? <Image src={p.imageUrl} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" sizes="20vw" unoptimized />
                      : <div className="absolute inset-0 flex items-center justify-center"><span className="text-neutral-300 text-xs">No Image</span></div>}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-neutral-900 line-clamp-2 group-hover:text-brand-600 transition-colors">{p.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
            {data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).filter(p => Math.abs(p - page) <= 2).map(p => (
                  <Link key={p} href={`/products/category/${params.slug}?page=${p}`}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${p === page ? 'bg-brand-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-brand-50'}`}>{p}</Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20"><p className="text-neutral-400 text-lg">Belum ada produk di kategori ini</p></div>
        )}
      </div>
    </div>
  );
}
