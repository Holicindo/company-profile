'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, Clock, Calendar, Sparkles, BookOpen } from 'lucide-react';
import type { BlogPost } from '@/types';
import { INSIGHTS_ARTICLES } from '@/data/insights-articles';
import { useLanguage } from '@/context/LanguageContext';

interface BlogGalleryProps { initialPosts?: BlogPost[]; }

export function BlogGallery({ initialPosts = [] }: BlogGalleryProps) {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('Semua Topik');
  const [searchQuery, setSearchQuery] = useState('');

  const translateCategoryName = (cat: string) => {
    if (lang !== 'EN') return cat;
    if (cat === 'Pencahayaan & Suasana') return 'Lighting & Ambience';
    if (cat === 'Suhu & Kenyamanan Termal') return 'Temperature & Thermal Comfort';
    if (cat === 'Detail Pelayanan & Service') return 'Service & Hospitality Details';
    return cat;
  };

  const allArticles = useMemo(() => {
    const combined = [...initialPosts];
    INSIGHTS_ARTICLES.forEach((draft) => {
      if (!combined.some((p) => p.slug === draft.slug)) combined.push(draft);
    });
    return combined;
  }, [initialPosts]);

  const categories = [
    { id: 'Semua Topik', label: t('Semua Topik', 'All Topics') },
    { id: 'Pencahayaan & Suasana', label: t('Pencahayaan & Suasana', 'Lighting & Ambience') },
    { id: 'Suhu & Kenyamanan Termal', label: t('Suhu & Kenyamanan Termal', 'Temperature & Thermal Comfort') },
    { id: 'Detail Pelayanan & Service', label: t('Detail Pelayanan & Service', 'Service & Hospitality Details') },
  ];

  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesCategory = activeCategory === 'Semua Topik' || (article as any).category === activeCategory ||
        (activeCategory === 'Pencahayaan & Suasana' && (article.title.toLowerCase().includes('cahaya') || article.title.toLowerCase().includes('pencahayaan'))) ||
        (activeCategory === 'Suhu & Kenyamanan Termal' && (article.title.toLowerCase().includes('suhu') || article.title.toLowerCase().includes('suasana'))) ||
        (activeCategory === 'Detail Pelayanan & Service' && (article.title.toLowerCase().includes('pelayanan') || article.title.toLowerCase().includes('layanan')));
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || article.title.toLowerCase().includes(query) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(query)) ||
        (article.content && article.content.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [allArticles, activeCategory, searchQuery]);

  const fmtDate = (d?: string) => {
    if (!d) return 'Holicindo';
    try {
      return new Date(d).toLocaleDateString(lang === 'EN' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch { return d; }
  };

  return (
    <div className="space-y-16">

      {/* HEADER BANNER */}
      <div className="relative bg-[#2C1810] text-white py-16 lg:py-24 overflow-hidden shadow-xl">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="font-black tracking-tighter leading-none text-white/[0.04]" style={{ fontSize: 'clamp(60px, 16vw, 240px)', whiteSpace: 'nowrap' }}>JOURNAL</span>
        </div>
        <div className="relative z-10 container-wide text-center px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-widest text-neutral-200 mb-6">
            <Sparkles size={13} className="text-white/80" /> {t('Pusat Wawasan & Edukasi F&B', 'F&B Insights & Education Hub')}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 via-neutral-400 to-white animate-shimmer-text mb-6 pb-2 leading-tight">Holic Insights</h1>
          <p className="text-neutral-300 font-normal text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('Temukan panduan praktis pencahayaan, standar suhu ruangan, dan strategi pelayanan terbaik untuk tingkatkan kenyamanan serta kepuasan pelanggan F&B Anda.', 'Discover practical guides on lighting, room temperature standards, and service strategies to elevate customer experience & satisfaction in F&B.')}
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search size={18} strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('Cari topik atau nama mesin...', 'Search topics or machinery...')} className="w-full pl-12 pr-4 py-4 bg-white text-[#2C1810] placeholder-neutral-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white border border-transparent shadow-lg transition-all rounded-none" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-black font-bold uppercase">Clear</button>}
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide">

        {/* KOLEKSI ARTIKEL & FILTER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-b border-neutral-200">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C1810] tracking-tight">{t('Koleksi Artikel & Panduan', 'Articles & Guides Collection')}</h2>
            <p className="text-neutral-500 text-sm mt-1">{t('Temukan wawasan praktis untuk meningkatkan standar layanan dan kenyamanan pelanggan Anda.', 'Find practical insights to elevate your service standards and customer comfort.')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={['px-4 py-2.5 text-xs font-bold tracking-wider transition-all rounded-full border', activeCategory === cat.id ? 'bg-[#2C1810] text-white border-[#2C1810] shadow-md' : 'bg-white text-neutral-600 border-neutral-200 hover:border-[#2C1810] hover:text-[#2C1810]'].join(' ')}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* CARDS GRID */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 pb-20">
            {filteredArticles.map((post) => (
              <Link key={post.id} href={'/news/' + post.slug}
                className="group relative h-[340px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-[#1a0f0a]">
                <div className="absolute inset-0 overflow-hidden">
                  {post.featuredImage
                    ? <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-90" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" unoptimized />
                    : <div className="absolute inset-0 bg-gradient-to-br from-[#2C1810] to-[#1a0f0a] flex items-center justify-center"><BookOpen size={48} className="text-white/20" /></div>
                  }
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-[#1a0f0a]/70 to-black/20 group-hover:from-[#1a0f0a]/95 transition-all duration-500" />
                <div className="relative z-10 p-4">
                  <span className="inline-block px-3 py-1 bg-white/95 text-[#2C1810] text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-md">{translateCategoryName((post as any).category || 'INSIGHTS')}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                  <div className="flex items-center gap-2 text-[10px] text-neutral-300 uppercase tracking-wider mb-2">
                    <Calendar size={12} className="text-white/70" /><span>{fmtDate(post.publishedAt)}</span>
                    <span>•</span><Clock size={12} className="text-white/70" /><span>4 min</span>
                  </div>
                  <h3 className="font-bold text-base text-white leading-snug line-clamp-2 mb-2 group-hover:text-amber-300 transition-colors">{post.title}</h3>
                  {post.excerpt && <p className="text-neutral-300 text-xs line-clamp-2 leading-relaxed opacity-85">{post.excerpt.replace(/<[^>]*>/g, '')}</p>}
                  <div className="mt-3 pt-3 border-t border-white/15 flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                    <span>{t('Baca Artikel', 'Read Article')}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-neutral-50 border border-neutral-200 mt-10 rounded-2xl">
            <BookOpen size={40} className="text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-600 font-medium text-base mb-2">{t('Tidak ditemukan artikel yang sesuai.', 'No matching articles found.')}</p>
            <p className="text-neutral-400 text-xs">{t('Coba gunakan kata kunci lain.', 'Try using different keywords.')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
