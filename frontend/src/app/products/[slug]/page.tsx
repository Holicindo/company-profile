import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Phone, Mail, ShieldCheck, Truck, Wrench } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/api';
import { parseHtmlContent } from '@/lib/content-parser';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const p = await getProductBySlug(params.slug);
    const desc = p.shortDescription?.replace(/<[^>]*>/g, '').slice(0, 160)
      || `${p.name} — tersedia di Holicindo, distributor mesin makanan terpercaya Indonesia.`;
    return {
      title: `${p.name} | Holicindo`,
      description: desc,
      openGraph: { title: p.name, description: desc, images: p.imageUrl ? [p.imageUrl] : [] },
    };
  } catch { return { title: 'Produk Tidak Ditemukan | Holicindo' }; }
}

export default async function ProductDetailPage({ params }: Props) {
  let product: any;
  try { product = await getProductBySlug(params.slug); } catch { notFound(); }

  const gallery = product.galleryUrls?.length ? product.galleryUrls : product.imageUrl ? [product.imageUrl] : [];
  const waText = `Halo Holicindo, saya tertarik dengan produk *${product.name}*. Boleh minta informasi lebih lanjut?`;

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb bar */}
      <div className="bg-[#0d1013] border-b border-white/5">
        <div className="container-wide py-3">
          <nav className="text-xs text-neutral-500 flex flex-wrap gap-1 items-center">
            <Link href="/" className="hover:text-brand-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-brand-400 transition-colors">Produk</Link>
            {product.category && (
              <>
                <span>/</span>
                <Link href={`/products/category/${product.category.slug}`} className="hover:text-brand-400 transition-colors">
                  {product.category.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-neutral-300 line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-wide py-12">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-brand-600 mb-8 transition-colors">
          <ArrowLeft size={16} /> Kembali ke Produk
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Galeri gambar */}
          <div>
            <div className="relative bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 aspect-square">
              {gallery[0] ? (
                <Image
                  src={gallery[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-neutral-300 text-sm">Belum ada gambar</span>
                </div>
              )}
            </div>

            {/* Thumbnail gallery */}
            {gallery.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {gallery.map((url: string, i: number) => (
                  <div key={i} className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 border-neutral-200 hover:border-brand-400 transition-colors cursor-pointer">
                    <Image src={url} alt={`Gambar ${i + 1}`} fill className="object-cover" sizes="80px" unoptimized />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detail produk */}
          <div>
            {product.category && (
              <Link
                href={`/products/category/${product.category.slug}`}
                className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1.5 rounded-full mb-4 hover:bg-brand-100 transition-colors"
              >
                {product.category.name}
              </Link>
            )}

            <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 leading-tight mb-4">
              {product.name}
            </h1>

            {product.sku && (
              <p className="text-xs text-neutral-400 mb-4">
                SKU: <span className="font-medium text-neutral-600 font-mono">{product.sku}</span>
              </p>
            )}

            {product.shortDescription && (
              <div
                className="prose-content text-neutral-600 leading-relaxed mb-6 text-sm border-l-4 border-brand-500/30 pl-4"
                dangerouslySetInnerHTML={{ __html: parseHtmlContent(product.shortDescription) }}
              />
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href="/contact" className="btn-primary flex-1 justify-center">
                <Phone size={16} /> Minta Penawaran
              </Link>
              <a
                href={`https://wa.me/6281111825718?text=${encodeURIComponent(waText)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary flex-1 justify-center"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Value props */}
            <div className="border border-neutral-100 rounded-xl divide-y divide-neutral-100">
              {[
                { icon: ShieldCheck, text: 'Garansi resmi produk tersedia' },
                { icon: Truck, text: 'Pengiriman ke seluruh Indonesia' },
                { icon: Wrench, text: 'Instalasi & after-sales oleh teknisi kami' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 px-4 py-3">
                  <Icon size={16} className="text-brand-500 flex-shrink-0" />
                  <span className="text-sm text-neutral-600">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deskripsi lengkap */}
        {product.description && (
          <div className="border-t border-neutral-100 pt-12">
            <h2 className="text-2xl font-extrabold text-neutral-900 mb-6">Deskripsi Produk</h2>
            <div className="prose-content max-w-3xl" dangerouslySetInnerHTML={{ __html: parseHtmlContent(product.description) }} />
          </div>
        )}
      </div>
    </div>
  );
}
