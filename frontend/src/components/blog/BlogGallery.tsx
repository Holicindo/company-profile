'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, Clock, Calendar, Sparkles, BookOpen, Mic, MicOff } from 'lucide-react';
import type { BlogPost } from '@/types';
import { INSIGHTS_ARTICLES } from '@/data/insights-articles';
import { useLanguage } from '@/context/LanguageContext';

interface BlogGalleryProps { initialPosts?: BlogPost[]; }

export function BlogGallery({ initialPosts = [] }: BlogGalleryProps) {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('Semua Topik');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startVoiceSearch = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) { alert('Browser Anda tidak mendukung voice search.'); return; }
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'EN' ? 'en-US' : 'id-ID';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (e: any) => { setSearchQuery(e.results[0][0].transcript); };
    recognitionRef.current = recognition;
    recognition.start();
  }, [isListening, lang]);

  useEffect(() => { return () => { recognitionRef.current?.stop(); }; }, []);

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
    <div className="space-y-8 sm:space-y-16">

      {/* HEADER BANNER */}
      <div className="relative text-white py-8 sm:py-16 lg:py-24 overflow-hidden shadow-xl"
        style={{ background: 'radial-gradient(ellipse at 60% 0%, #5a3a1a 0%, #3b1f0a 35%, #1a0c06 70%)' }}>
        {/* Subtle gold shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 container-wide text-center px-5 sm:px-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3.5 sm:py-1 bg-white/10 border border-white/20 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-neutral-200 mb-3 sm:mb-6 rounded-full">
            <Sparkles size={10} className="text-white/80 sm:w-[13px] sm:h-[13px]" /> {t('Pusat Wawasan & Edukasi F&B', 'F&B Insights & Education Hub')}
          </div>
          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 via-neutral-400 to-white animate-shimmer-text mb-2 sm:mb-6 pb-1 sm:pb-2 leading-tight">
            Holic Insights
          </h1>
          {/* Description — hidden on mobile to save space */}
          <p className="hidden sm:block text-neutral-300 font-normal text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('Temukan panduan praktis pencahayaan, standar suhu ruangan, dan strategi pelayanan terbaik untuk tingkatkan kenyamanan serta kepuasan pelanggan F&B Anda.', 'Discover practical guides on lighting, room temperature standards, and service strategies to elevate customer experience & satisfaction in F&B.')}
          </p>
          {/* Mobile short description */}
          <p className="sm:hidden text-neutral-400 text-[11px] mb-4 leading-relaxed max-w-xs mx-auto">
            {t('Panduan & wawasan seputar industri F&B untuk bisnis Anda.', 'Guides & insights for the F&B industry.')}
          </p>
          {/* Search — Pill shape with mic */}
          <div className="max-w-xs sm:max-w-md mx-auto">
            <div className={`flex items-center bg-white/95 rounded-full shadow-lg border-2 transition-all duration-200 ${
              isListening ? 'border-red-400 ring-2 ring-red-300/50' : 'border-white/60 focus-within:border-white focus-within:ring-2 focus-within:ring-white/30'
            }`}>
              {/* Search icon */}
              <div className="pl-3 sm:pl-4 flex-shrink-0">
                <Search size={14} strokeWidth={2.5} className="text-neutral-400 sm:w-[17px] sm:h-[17px]" />
              </div>
              {/* Divider */}
              <div className="w-px h-4 bg-neutral-300 mx-2 flex-shrink-0" />
              {/* Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isListening ? t('Mendengarkan...', 'Listening...') : t('Cari topik atau nama mesin...', 'Search topics...')}
                className="flex-1 min-w-0 py-2.5 sm:py-3 text-[11px] sm:text-sm text-[#2C1810] placeholder-neutral-400 font-medium bg-transparent focus:outline-none"
              />
              {/* Clear or Mic button */}
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mr-1.5 px-2 py-1 text-[9px] font-bold text-neutral-400 hover:text-neutral-700 uppercase tracking-wider transition-colors"
                >✕</button>
              ) : (
                <button
                  type="button"
                  onClick={startVoiceSearch}
                  title={t('Cari dengan suara', 'Search by voice')}
                  className={`mr-1.5 flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse shadow-md'
                      : 'bg-neutral-100 text-neutral-500 hover:bg-[#2C1810] hover:text-white'
                  }`}
                >
                  {isListening ? <MicOff size={13} className="sm:w-4 sm:h-4" /> : <Mic size={13} className="sm:w-4 sm:h-4" />}
                </button>
              )}
            </div>
            {isListening && (
              <p className="text-center text-[10px] text-red-300 mt-1.5 animate-pulse">
                {t('🎙 Sedang mendengarkan, bicara sekarang...', '🎙 Listening, speak now...')}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container-wide">

        {/* KOLEKSI ARTIKEL & FILTER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-6 py-4 sm:py-6 border-b border-neutral-200">
          <div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#2C1810] tracking-tight">{t('Koleksi Artikel & Panduan', 'Articles & Guides Collection')}</h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-0.5 sm:mt-1">{t('Temukan wawasan praktis untuk meningkatkan standar layanan dan kenyamanan pelanggan Anda.', 'Find practical insights to elevate your service standards and customer comfort.')}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={['px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-[9px] sm:text-xs font-bold tracking-wider transition-all rounded-full border', activeCategory === cat.id ? 'bg-[#2C1810] text-white border-[#2C1810] shadow-md' : 'bg-white text-neutral-600 border-neutral-200 hover:border-[#2C1810] hover:text-[#2C1810]'].join(' ')}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* CARDS GRID — 2 cols on mobile, 2 on sm, 3 on lg */}
        {filteredArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mt-5 sm:mt-10">
              {filteredArticles.map((post, idx) => (
                <Link key={post.id} href={'/news/' + post.slug}
                  className={`group relative h-[220px] sm:h-[340px] rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-[#1a0f0a] ${
                    idx >= 6 && !showAllMobile ? 'hidden sm:block' : 'block'
                  }`}>
                  <div className="absolute inset-0 overflow-hidden">
                    {post.featuredImage
                      ? <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-90" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw" unoptimized />
                      : <div className="absolute inset-0 bg-gradient-to-br from-[#2C1810] to-[#1a0f0a] flex items-center justify-center"><BookOpen size={36} className="text-white/20" /></div>
                    }
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0a] via-[#1a0f0a]/70 to-black/20 group-hover:from-[#1a0f0a]/95 transition-all duration-500" />
                  <div className="relative z-10 p-2.5 sm:p-4">
                    <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-white/95 text-[#2C1810] text-[7px] sm:text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-md">{translateCategoryName((post as any).category || 'INSIGHTS')}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-2.5 sm:p-5">
                    <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] text-neutral-300 uppercase tracking-wider mb-1 sm:mb-2">
                      <Calendar size={9} className="text-white/70 sm:w-3 sm:h-3" /><span>{fmtDate(post.publishedAt)}</span>
                      <span>•</span><Clock size={9} className="text-white/70 sm:w-3 sm:h-3" /><span>4 min</span>
                    </div>
                    <h3 className="font-bold text-[11px] sm:text-base text-white leading-snug line-clamp-2 mb-1 sm:mb-2 group-hover:text-amber-300 transition-colors">{post.title}</h3>
                    {post.excerpt && <p className="hidden sm:block text-neutral-300 text-xs line-clamp-2 leading-relaxed opacity-85">{post.excerpt.replace(/<[^>]*>/g, '')}</p>}
                    <div className="mt-1.5 sm:mt-3 pt-1.5 sm:pt-3 border-t border-white/15 flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      <span>{t('Baca Artikel', 'Read Article')}</span>
                      <ArrowRight size={10} className="sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile "Tampilkan Semua Artikel" button */}
            {filteredArticles.length > 6 && !showAllMobile && (
              <div className="mt-4 sm:hidden">
                <button
                  type="button"
                  onClick={() => setShowAllMobile(true)}
                  className="w-full py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-[#2C1810] text-[11px] font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                >
                  {t(`Tampilkan Semua Artikel (${filteredArticles.length})`, `Show All Articles (${filteredArticles.length})`)} <ArrowRight size={14} className="rotate-90" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 sm:py-24 bg-neutral-50 border border-neutral-200 mt-6 sm:mt-10 rounded-2xl">
            <BookOpen size={36} className="text-neutral-400 mx-auto mb-4 sm:w-10 sm:h-10" />
            <p className="text-neutral-600 font-medium text-sm sm:text-base mb-2">{t('Tidak ditemukan artikel yang sesuai.', 'No matching articles found.')}</p>
            <p className="text-neutral-400 text-xs">{t('Coba gunakan kata kunci lain.', 'Try using different keywords.')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
