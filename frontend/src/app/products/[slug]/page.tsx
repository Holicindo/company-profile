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
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      {/* Breadcrumb bar - B2B minimalist */}
      <div className="border-b border-neutral-200">
        <div className="container-wide py-4">
          <nav className="text-[10px] uppercase tracking-widest text-neutral-500 flex flex-wrap gap-3 items-center">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span className="text-neutral-300">/</span>
            <Link href="/products" className="hover:text-black transition-colors">Produk</Link>
            {product.category && (
              <>
                <span className="text-neutral-300">/</span>
                <Link href={`/products/category/${product.category.slug}`} className="hover:text-black transition-colors">
                  {product.category.name}
                </Link>
              </>
            )}
            <span className="text-neutral-300">/</span>
            <span className="text-black font-semibold line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-wide py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* KIRI - Galeri Gambar (Minimalist, White Background) */}
          <div className="w-full lg:w-1/2">
            <div className="relative bg-white w-full aspect-square border border-neutral-200">
              {gallery[0] ? (
                <Image
                  src={gallery[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-neutral-300 text-xs uppercase tracking-[0.2em]">No Image Available</span>
                </div>
              )}
            </div>

            {/* Thumbnail gallery */}
            {gallery.length > 1 && (
              <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
                {gallery.map((url: string, i: number) => (
                  <div key={i} className="relative flex-shrink-0 w-24 h-24 border border-neutral-200 hover:border-black transition-colors cursor-pointer bg-white">
                    <Image src={url} alt={`Gambar ${i + 1}`} fill className="object-contain p-2" sizes="96px" unoptimized />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* KANAN - Tipografi & Spesifikasi */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start">
            
            {product.category && (
              <Link
                href={`/products/category/${product.category.slug}`}
                className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 hover:text-black transition-colors"
              >
                {product.category.name}
              </Link>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-black leading-tight mb-4 tracking-tight">
              {product.name}
            </h1>

            {product.sku && (
              <p className="text-xs uppercase tracking-widest text-neutral-400 mb-8 pb-8 border-b border-neutral-100">
                Ref. <span className="font-medium text-black">{product.sku}</span>
              </p>
            )}

            {product.shortDescription && (
              <div
                className="prose-content text-neutral-600 font-light leading-relaxed mb-10 text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: parseHtmlContent(product.shortDescription) }}
              />
            )}

            {/* CTA Buttons - Sharp & Industrial */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a
                href={`https://wa.me/6281111825718?text=${encodeURIComponent(waText)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors w-full sm:w-auto rounded-none"
              >
                Minta Penawaran
              </a>
              <Link 
                href="/contact" 
                className="flex items-center justify-center gap-3 border border-black text-black bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-50 transition-colors w-full sm:w-auto rounded-none"
              >
                <Mail size={16} strokeWidth={1.5} /> Hubungi Sales
              </Link>
            </div>

            {/* Accordion Specs (Native Details HTML for Server Component) */}
            <div className="border-t border-black divide-y divide-neutral-200">
              
              {product.description && (
                <details className="group" open>
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-6 text-[11px] uppercase tracking-[0.2em] hover:text-neutral-500 transition-colors outline-none">
                    <span>Technical Details</span>
                    <span className="transition duration-300 group-open:rotate-180">
                      <svg fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <div className="text-neutral-600 text-sm font-light leading-relaxed pb-8 prose-content" dangerouslySetInnerHTML={{ __html: parseHtmlContent(product.description) }} />
                </details>
              )}

              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-6 text-[11px] uppercase tracking-[0.2em] hover:text-neutral-500 transition-colors outline-none">
                  <span>Services & Support</span>
                  <span className="transition duration-300 group-open:rotate-180">
                    <svg fill="none" height="20" shape-rendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="text-neutral-600 pb-8 flex flex-col gap-5">
                  <div className="flex items-center gap-4"><ShieldCheck size={20} strokeWidth={1} className="text-neutral-400" /> <span className="uppercase text-[11px] tracking-widest">Garansi Resmi Produk Tersedia</span></div>
                  <div className="flex items-center gap-4"><Truck size={20} strokeWidth={1} className="text-neutral-400" /> <span className="uppercase text-[11px] tracking-widest">Pengiriman Ke Seluruh Indonesia</span></div>
                  <div className="flex items-center gap-4"><Wrench size={20} strokeWidth={1} className="text-neutral-400" /> <span className="uppercase text-[11px] tracking-widest">Instalasi & After-Sales Profesional</span></div>
                </div>
              </details>
              
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
