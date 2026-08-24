import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Star, MessageSquare } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/api';
import { parseHtmlContent } from '@/lib/content-parser';
import { INSIGHTS_ARTICLES } from '@/data/insights-articles';

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    let p = await getBlogPostBySlug(params.slug).catch(() => null);
    if (!p) {
      p = INSIGHTS_ARTICLES.find((a) => a.slug === params.slug) as any;
    }
    if (!p) return { title: 'Artikel Tidak Ditemukan | Holic Insights' };

    return {
      title: `${p.title} | Holic Insights`,
      description: p.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160),
      openGraph: { title: p.title, images: p.featuredImage ? [p.featuredImage] : [] },
    };
  } catch { return { title: 'Artikel Tidak Ditemukan | Holic Insights' }; }
}

const fmt = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

function extractToc(content: string) {
  if (!content) return [];
  const lines = content.split('\n');
  const headings: { text: string; id: string }[] = [];
  
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ') || trimmed.startsWith('## ')) {
      const text = trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ text, id });
    }
  });

  return headings;
}

export default async function NewsDetailPage({ params }: Props) {
  let post: any;
  try { 
    post = await getBlogPostBySlug(params.slug); 
  } catch { 
    post = INSIGHTS_ARTICLES.find((a) => a.slug === params.slug);
    if (!post) notFound(); 
  }

  const toc = extractToc(post.content || '');

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-white border-b border-neutral-200 py-4">
        <div className="container-wide">
          <nav className="text-xs text-neutral-400 font-medium flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#2D3E50] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/news" className="hover:text-[#2D3E50] transition-colors">Holic Insights</Link>
            <span>/</span>
            <span className="text-[#2D3E50] font-bold line-clamp-1">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="container-wide py-10 lg:py-16">
        <Link href="/news" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-[#2D3E50] mb-8 transition-colors">
          <ArrowLeft size={16} /> Kembali ke Holic Insights
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 lg:p-12 rounded-2xl shadow-sm border border-neutral-200/80">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3.5 py-1 bg-[#2D3E50] text-white text-[10px] font-extrabold uppercase tracking-widest rounded-full">
                {post.category || 'Holic Insights'}
              </span>
              <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">• 5 min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D3E50] leading-tight tracking-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center justify-between border-y border-neutral-100 py-4 mb-8 text-xs text-neutral-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2D3E50] text-white flex items-center justify-center font-bold text-sm">H</div>
                <div>
                  <div className="font-bold text-[#2D3E50]">{post.author || 'Tim Holicindo'}</div>
                  <div className="text-[11px] text-neutral-400">{fmt(post.publishedAt)}</div>
                </div>
              </div>
            </div>

            {post.featuredImage && (
              <div className="relative h-72 sm:h-[420px] rounded-2xl overflow-hidden mb-10 bg-neutral-900 shadow-md">
                <Image src={post.featuredImage} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 800px" unoptimized priority />
              </div>
            )}

            <div className="prose-content max-w-none text-neutral-700 leading-relaxed text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: parseHtmlContent(post.content) }} />

            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-6 border-t border-neutral-100">
                {post.tags.map((tTag: string) => (
                  <span key={tTag} className="px-3 py-1 bg-neutral-100 text-[#2D3E50] text-xs font-semibold rounded-full">#{tTag}</span>
                ))}
              </div>
            )}

            <div className="mt-14 bg-gradient-to-br from-[#F4F8F9] to-slate-100 border border-neutral-200 p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h3 className="font-bold text-[#2D3E50] text-lg mb-1">Bagikan Pengalaman Anda Bersama Holicindo</h3>
                <p className="text-neutral-600 text-xs leading-relaxed max-w-md">
                  Kenyamanan Anda adalah prioritas utama kami. Jika Anda puas dengan panduan & layanan mesin kami, dukung kami lewat Google Review!
                </p>
              </div>
              <a href="https://share.google/jGfkjgTA4pnIYECZu" target="_blank" rel="noopener noreferrer" className="px-6 py-3.5 bg-[#2D3E50] text-white hover:bg-black text-xs font-bold uppercase tracking-widest transition-all shrink-0 inline-flex items-center gap-2 rounded-xl shadow-md hover:shadow-lg">
                <MessageSquare size={16} /> Tulis Google Review
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            {toc.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-sm">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#2D3E50] mb-4 pb-3 border-b border-neutral-100 flex items-center justify-between">
                  <span>Daftar Isi</span>
                  <span className="text-[10px] text-neutral-400 font-normal">{toc.length} Poin</span>
                </h3>
                <ul className="space-y-3 text-xs">
                  {toc.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-neutral-600 hover:text-[#2D3E50] transition-colors leading-snug">
                      <span className="text-[#2D3E50] font-bold text-[10px] mt-0.5">{idx + 1}.</span>
                      <span className="font-medium line-clamp-2">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-[#2D3E50] text-white p-6 rounded-2xl shadow-md relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 mb-2">Holicindo Insights</div>
                <h4 className="font-bold text-base mb-2 leading-snug">Butuh Konsultasi Mesin F&B atau Tata Ruang Komersial?</h4>
                <p className="text-neutral-300 text-xs leading-relaxed mb-5">Tim ahli kami siap membantu memilihkan tipe peralatan terbaik untuk usaha Anda.</p>
                <a href="https://wa.me/6281234567890?text=Halo%20Holicindo,%20saya%20tertarik%20konsultasi%20peralatan%20F%26B" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-white text-[#2D3E50] hover:bg-amber-400 hover:text-black transition-all text-xs font-extrabold uppercase tracking-wider rounded-xl inline-flex items-center justify-center gap-2 shadow">
                  Hubungi Tim Holicindo
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
