'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, Clock, Calendar, Sparkles, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/types';
import { INSIGHTS_ARTICLES } from '@/data/insights-articles';
import { useLanguage } from '@/context/LanguageContext';

interface BlogGalleryProps { initialPosts?: BlogPost[]; }

export function BlogGallery({ initialPosts = [] }: BlogGalleryProps) {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('Semua Topik');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const latestArticles = useMemo(() => filteredArticles.slice(0, 5), [filteredArticles]);
  const gridArticles = filteredArticles.slice(5);

  useEffect(() => {
    if (latestArticles.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % latestArticles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [latestArticles.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % latestArticles.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + latestArticles.length) % latestArticles.length);

  const fmtDate = (d?: string) => {
    if (!d) return 'Holicindo';
    try {
      return new Date(d).toLocaleDateString(lang === 'EN' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch { return d; }
  };

  return (
    <div className="space-y-16">

      {/* HEADER BANNER */}
      <div className="relative bg-[#2D3E50] text-white py-16 lg:py-24 overflow-hidden shadow-xl">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="font-black tracking-tighter leading-none text-white/[0.04]" style={{ fontSize: 'clamp(60px, 16vw, 240px)', whiteSpace: 'nowrap' }}>JOURNAL</span>
        </div>
        <div className="relative z-10 container-wide text-center px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-widest text-neutral-200 mb-6">
            <Sparkles size={13} className="text-white/80" /> {t('Pusat Wawasan & Edukasi F&B', 'F&B Insights & Education Hub')}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">Holic Insights</h1>
          <p className="text-neutral-300 font-normal text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('Temukan panduan praktis pencahayaan, standar suhu ruangan, dan strategi pelayanan terbaik untuk tingkatkan kenyamanan serta kepuasan pelanggan F&B Anda.', 'Discover practical guides on lighting, room temperature standards, and service strategies to elevate customer experience & satisfaction in F&B.')}
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search size={18} strokeWidth={2} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t('Cari topik atau nama mesin...', 'Search topics or machinery...')} className="w-full pl-12 pr-4 py-4 bg-white text-[#2D3E50] placeholder-neutral-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white border border-transparent shadow-lg transition-all rounded-none" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-black font-bold uppercase">Clear</button>}
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide">

        {/* SLIDESHOW BLOG TERBARU */}
        {latestArticles.length > 0 && !searchQuery && activeCategory === 'Semua Topik' && (
          <div className="mt-10 mb-16">
            <div className="relative h-[440px] sm:h-[480px] lg:h-[500px] rounded-3xl overflow-hidden shadow-xl bg-slate-900">
              {latestArticles.map((article, index) => (
                <Link key={article.id} href={'/news/' + article.slug}
                  className={['group absolute inset-0 transition-opacity duration-1000', index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'].join(' ')}>
                  <div className="absolute inset-0 overflow-hidden">
                    {article.featuredImage
                      ? <Image src={article.featuredImage} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95" sizes="100vw" unoptimized priority={index === 0} />
                      : <div className="absolute inset-0 bg-gradient-to-br from-[#2D3E50] to-slate-900 flex items-center justify-center"><BookOpen size={64} className="text-white/20" /></div>
                    }
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-black/20" />
                  <div className="relative z-10 p-6 sm:p-8 flex items-center gap-3">
                    <span className="px-4 py-1.5 bg-white/95 text-[#2D3E50] text-xs font-extrabold uppercase tracking-widest rounded-full shadow-md">★ FEATURED INSIGHT</span>
                    <span className="px-3.5 py-1.5 bg-black/40 text-white/90 text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">{(article as any).category || 'Insights'}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-10 lg:p-12">
                    <div className="flex items-center gap-3 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-3">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {fmtDate(article.publishedAt)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} /> 5 min read</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4 group-hover:text-amber-300 transition-colors max-w-4xl">{article.title}</h2>
                    {article.excerpt && <p className="text-neutral-200 text-sm sm:text-base line-clamp-2 leading-relaxed max-w-3xl mb-6 opacity-90">{article.excerpt.replace(/<[^>]*>/g, '')}</p>}
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-white group-hover:text-amber-300 transition-all">
                      <span>{t('Baca Artikel Lengkap', 'Read Full Article')}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
              {latestArticles.length > 1 && (
                <>
                  <button onClick={(e) => { e.preventDefault(); prevSlide(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all" aria-label="Prev"><ChevronLeft size={24} /></button>
                  <button onClick={(e) => { e.preventDefault(); nextSlide(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all" aria-label="Next"><ChevronRight size={24} /></button>
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {latestArticles.map((_, i) => (
                      <button key={i} onClick={(e) => { e.preventDefault(); setCurrentSlide(i); }}
                        className={['h-2 rounded-full transition-all', i === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/75'].join(' ')} aria-label={'Slide ' + (i + 1)} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* KOLEKSI ARTIKEL & FILTER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-b border-neutral-200">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] tracking-tight">{t('Koleksi Artikel & Panduan', 'Articles & Guides Collection')}</h2>
            <p className="text-neutral-500 text-sm mt-1">{t('Temukan wawasan praktis untuk meningkatkan standar layanan dan kenyamanan pelanggan Anda.', 'Find practical insights to elevate your service standards and customer comfort.')}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={['px-4 py-2.5 text-xs font-bold tracking-wider transition-all rounded-full border', activeCategory === cat.id ? 'bg-[#2D3E50] text-white border-[#2D3E50] shadow-md' : 'bg-white text-neutral-600 border-neutral-200 hover:border-[#2D3E50] hover:text-[#2D3E50]'].join(' ')}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* CARDS GRID */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 pb-20">
            {(searchQuery || activeCategory !== 'Semua Topik' ? filteredArticles : gridArticles).map((post) => (
              <Link key={post.id} href={'/news/' + post.slug}
                className="group relative h-[430px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-slate-900">
                <div className="absolute inset-0 overflow-hidden">
                  {post.featuredImage
                    ? <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-90" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" unoptimized />
                    : <div className="absolute inset-0 bg-gradient-to-br from-[#2D3E50] to-slate-900 flex items-center justify-center"><BookOpen size={48} className="text-white/20" /></div>
                  }
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-black/20 group-hover:from-slate-950/95 transition-all duration-500" />
                <div className="relative z-10 p-5">
                  <span className="inline-block px-3 py-1 bg-white/95 text-[#2D3E50] text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-md">{(post as any).category || 'INSIGHTS'}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                  <div className="flex items-center gap-2 text-[10px] text-neutral-300 uppercase tracking-wider mb-2">
                    <Calendar size={12} className="text-white/70" /><span>{fmtDate(post.publishedAt)}</span>
                    <span>•</span><Clock size={12} className="text-white/70" /><span>4 min</span>
                  </div>
                  <h3 className="font-bold text-lg text-white leading-snug line-clamp-3 mb-2 group-hover:text-amber-300 transition-colors">{post.title}</h3>
                  {post.excerpt && <p className="text-neutral-300 text-xs line-clamp-2 leading-relaxed opacity-85">{post.excerpt.replace(/<[^>]*>/g, '')}</p>}
                  <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
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
