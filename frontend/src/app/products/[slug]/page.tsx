import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/api';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const p = await getProductBySlug(params.slug);
    return { title: p.name, description: p.shortDescription?.replace(/<[^>]*>/g, '').slice(0, 160) };
  } catch { return { title: 'Product Not Found' }; }
}

export default async function ProductDetailPage({ params }: Props) {
  let product: any;
  try { product = await getProductBySlug(params.slug); } catch { notFound(); }

  const gallery = product.galleryUrls?.length ? product.galleryUrls : product.imageUrl ? [product.imageUrl] : [];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-neutral-50 border-b py-4">
        <div className="container-wide">
          <nav className="text-sm text-neutral-400 flex flex-wrap gap-1 items-center">
            <Link href="/" className="hover:text-brand-600">Home</Link><span>/</span>
            <Link href="/products" className="hover:text-brand-600">Products</Link>
            {product.category && <><span>/</span><Link href={`/products/category/${product.category.slug}`} className="hover:text-brand-600">{product.category.name}</Link></>}
            <span>/</span><span className="text-neutral-700">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-wide py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="relative h-96 bg-neutral-100 rounded-2xl overflow-hidden">
              {gallery[0]
                ? <Image src={gallery[0]} alt={product.name} fill className="object-contain" sizes="50vw" unoptimized />
                : <div className="absolute inset-0 flex items-center justify-center"><span className="text-neutral-300">No Image</span></div>}
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {gallery.map((url: string, i: number) => (
                  <div key={i} className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-neutral-200">
                    <Image src={url} alt={`img ${i + 1}`} fill className="object-cover" sizes="80px" unoptimized />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {product.category && (
              <Link href={`/products/category/${product.category.slug}`} className="text-brand-600 text-sm font-semibold hover:underline">
                {product.category.name}
              </Link>
            )}
            <h1 className="text-2xl md:text-3xl font-bold font-display text-neutral-900 mt-2 mb-4">{product.name}</h1>
            {product.shortDescription && (
              <div className="text-neutral-600 leading-relaxed mb-6 prose-content" dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
            )}
            {product.sku && <p className="text-sm text-neutral-400 mb-6">SKU: <span className="font-medium text-neutral-600">{product.sku}</span></p>}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-primary">Minta Penawaran</Link>
              <a href={`https://wa.me/622120832035?text=Halo, saya tertarik dengan ${encodeURIComponent(product.name)}`}
                target="_blank" rel="noreferrer" className="btn-secondary">WhatsApp</a>
            </div>
          </div>
        </div>

        {product.description && (
          <div className="mt-14">
            <h2 className="text-xl font-bold font-display text-neutral-900 mb-6">Deskripsi Produk</h2>
            <div className="prose-content max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}
      </div>
    </div>
  );
}
