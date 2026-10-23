'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ArrowRight, 
  Sparkles, 
  SlidersHorizontal,
  ThermometerSnowflake,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Store,
  Coffee,
  ShoppingBag,
  Eye,
  Archive,
  Zap,
  Wine
} from 'lucide-react';

interface RecommendedCard {
  categoryTitle: string;
  categorySlug: string;
  unitName: string;
  unitModel: string;
  unitImage: string;
  tag: string;
  temp: string;
  highlightSpecs: string[];
  description: string;
  sampleProductsCount: string;
}

export function CatalogView() {
  const { t } = useLanguage();

  // Interactive Quiz / Advisor States
  const [sector, setSector] = useState<'bakery' | 'cafe' | 'supermarket'>('cafe');
  const [priority, setPriority] = useState<'display' | 'storage' | 'ice' | 'bar'>('display');
  const [scale, setScale] = useState<'compact' | 'medium' | 'high'>('medium');

  // CMS dynamic data loaded from database
  const [cmsData, setCmsData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/pages/slug/katalog')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.sections) {
          setCmsData(data.sections);
        }
      })
      .catch((e) => console.error('Failed to load CMS catalog data:', e));
  }, []);

  // Sector list with icons
  const sectors = [
    {
      id: 'bakery' as const,
      label: 'Bakery & Pastry',
      sub: 'Cake, roti & artisan pastry',
      icon: Store,
    },
    {
      id: 'cafe' as const,
      label: 'Coffee Shop & Beverage',
      sub: 'Specialty cafe, bar & lounge',
      icon: Coffee,
    },
    {
      id: 'supermarket' as const,
      label: 'Supermarket & Food Service',
      sub: 'Retail swalayan, resto & hotel',
      icon: ShoppingBag,
    },
  ];

  // Priorities with icons
  const priorities = [
    {
      id: 'display' as const,
      label: 'Display & Estetika Visual',
      desc: 'Showcase kaca bening anti-embun untuk display produk',
      icon: Eye,
      cat: 'Showcase',
    },
    {
      id: 'storage' as const,
      label: 'Penyimpanan Dapur (Storage)',
      desc: 'Chiller / freezer SUS304 tangguh untuk stok bahan baku',
      icon: Archive,
      cat: 'Refrigerator',
    },
    {
      id: 'ice' as const,
      label: 'Produksi Es Otomatis',
      desc: 'Mesin es higienis kristal kubus / flake continue',
      icon: Zap,
      cat: 'Ice Maker',
    },
    {
      id: 'bar' as const,
      label: 'Bar Counter & Station',
      desc: 'Undercounter modular untuk workstation barista/bartender',
      icon: Wine,
      cat: 'Bar System',
    },
  ];

  // Scale options
  const scales = [
    { id: 'compact' as const, label: 'Outlet Compact', desc: '1 - 2 Meter Counter' },
    { id: 'medium' as const, label: 'Kapasitas Sedang', desc: 'Operasional Harian Aktif' },
    { id: 'high' as const, label: 'Kapasitas Besar / Chain', desc: 'High Volume Continuous' },
  ];

  // Dynamic recommendation based on selection with REAL unit models & images
  const recommendation = useMemo<RecommendedCard>(() => {
    // Check if customized in CMS first
    if (cmsData?.recommendations) {
      const recKeyWithSector = `${priority}-${sector}-${scale}`;
      const recKey = `${priority}-${scale}`;
      const found = cmsData.recommendations[recKeyWithSector] || cmsData.recommendations[recKey];
      if (found && found.unitName) {
        return found;
      }
    }

    // 1. ICE MAKER
    if (priority === 'ice') {
      if (scale === 'compact') {
        return {
          categoryTitle: 'Ice Maker Series',
          categorySlug: 'icemaker',
          unitName: 'Commercial Compact Ice Maker 35-50 kg',
          unitModel: 'Model: AC-80X Compact Series',
          unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/AC80X.png',
          tag: 'Kapasitas Compact (Outlet Kecil)',
          temp: '-2°C ~ 0°C Output Es',
          highlightSpecs: [
            'Produksi harian 35 - 50 kg/24 jam, hemat daya & space',
            'Bin penyimpanan es terintegrasi (kapasitas 15-20 kg)',
            'Siklus pembekuan cepat & auto-cleaning higienis'
          ],
          description: 'Sangat ideal untuk coffee shop compact, booth minuman, dan cafe dengan kebutuhan es harian ringan.',
          sampleProductsCount: '37+ Unit Model Tersedia'
        };
      }
      if (scale === 'medium') {
        return {
          categoryTitle: 'Ice Maker Series',
          categorySlug: 'icemaker',
          unitName: 'Commercial Modular Ice Maker 80-120 kg',
          unitModel: 'Model: AP-0.6 Ice Maker Series',
          unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/12/Ap-0.6-Ice-maker.png',
          tag: 'Kapasitas Sedang (Resto & Coffee Shop)',
          temp: '-2°C ~ 0°C Output Es Kristal',
          highlightSpecs: [
            'Produksi es 80 - 120 kg/24 jam untuk pesanan tinggi',
            'Evaporator Food-Grade SUS304 anti-karat & higienis',
            'Alarm sensor otomatis bila air habis atau bin penuh'
          ],
          description: 'Pilihan standar untuk restoran, cafe aktif, dan bar dengan aliran pesanan minuman dingin terus-menerus.',
          sampleProductsCount: '37+ Unit Model Tersedia'
        };
      }
      // scale === 'high'
      return {
        categoryTitle: 'Ice Maker Series',
        categorySlug: 'icemaker',
        unitName: 'Industrial Scale / Flake Ice Machine 600 kg',
        unitModel: 'Model: Industrial Ice Flake SUS304 (600kg/24h)',
        unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/12/Ap-0.6-Ice-maker.png',
        tag: 'Kapasitas Besar / Chain (Heavy Duty)',
        temp: '-3°C ~ 0°C High Output',
        highlightSpecs: [
          'Kapasitas masif 600 kg / 24 jam produksi non-stop',
          'Heavy-duty kompresor industri untuk operasional 24 jam',
          'Cocok untuk central kitchen, supermarket segar, & hotel'
        ],
        description: 'Mesin es kapasitas ekstra besar untuk menyuplai cabang usaha, display seafood supermarket, atau hotel.',
        sampleProductsCount: '37+ Unit Model Tersedia'
      };
    }

    // 2. BAR SYSTEM & COUNTER
    if (priority === 'bar') {
      if (scale === 'compact') {
        return {
          categoryTitle: 'Bar System & Station',
          categorySlug: 'bar-system',
          unitName: 'Bar Undercounter Chiller 1 Door (150 L)',
          unitModel: 'Model: Bar Refrigerator CA-50 Compact',
          unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/Bar-Refrigerator-CA-50-e1640740274919.png',
          tag: 'Kapasitas Compact (Barista Station 1-2m)',
          temp: '+2°C ~ +8°C Chiller Section',
          highlightSpecs: [
            'Dimensi ramping 900mm menghemat area counter bar',
            'Drainage otomatis dengan frost auto-evaporation tanpa buang air',
            'Pintu solid atau kaca display dengan interior LED'
          ],
          description: 'Dirancang pas untuk bar counter kecil, coffee booth, dan lounge dengan area terbatas.',
          sampleProductsCount: 'Pilihan Modular Compact'
        };
      }
      if (scale === 'medium') {
        return {
          categoryTitle: 'Bar System & Station',
          categorySlug: 'bar-system',
          unitName: 'Bar Undercounter Chiller 2 Door (220 L)',
          unitModel: 'Model: Bar Refrigerator CA-90 Standard',
          unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/Bar-Refrigerator-CA-90.png',
          tag: 'Kapasitas Sedang (Alur Kerja Barista Efisien)',
          temp: '+2°C ~ +8°C Chiller Section',
          highlightSpecs: [
            'Kapasitas 220 Liter dengan 2 pintu modular SUS304',
            'Worktop stainless datar dapat difungsikan meja prep & grinder',
            'Sistem hembusan dingin merata menjaga susu & garnish segar'
          ],
          description: 'Konfigurasi terfavorit untuk coffee shop dan bar komersial dengan alur kerja dua barista.',
          sampleProductsCount: '3 Unit Model Bar System'
        };
      }
      // scale === 'high'
      return {
        categoryTitle: 'Bar System & Station',
        categorySlug: 'bar-system',
        unitName: 'Custom Ergonomic High-Capacity Bar Station 3 Door',
        unitModel: 'Model: Multi-Station Integrated Bar System SUS304',
        unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/Bar-Refrigerator-CA-90.png',
        tag: 'Kapasitas Besar / Chain (Multi-Barista Station)',
        temp: '+2°C ~ +8°C (Multi-Compartment)',
        highlightSpecs: [
          'Panjang counter 1.8m - 2.4m dengan 3 kompartemen pendingin',
          'Dapat diintegrasikan dengan sink, ice well, blender station, & speed rail',
          'Material Full SUS304 tebal tahan benturan jam kerja sibuk'
        ],
        description: 'Stasiun bar komplit untuk gerai minuman high-volume chain, beach club, atau hotel lounge.',
        sampleProductsCount: 'Kustom Modular Sesuai Layout'
      };
    }

    // 3. SHOWCASE DISPLAY
    if (priority === 'display' || sector === 'bakery') {
      if (scale === 'compact') {
        return {
          categoryTitle: 'Showcase Series',
          categorySlug: 'showcase',
          unitName: 'Arc Display Case 3 Layer (900mm Compact)',
          unitModel: 'Model: Arc Display Case 3 Layer',
          unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/1791187983563-618972.png',
          tag: 'Kapasitas Compact (Panjang 90cm)',
          temp: '+2°C ~ +6°C (Cake) / +16°C ~ +18°C (Chocolate)',
          highlightSpecs: [
            'Dimensi kompak lebar 900mm dengan 3 tingkat rak display',
            'Kaca lengkung berpemanas (anti-fog) jernih dari segala sudut',
            'Sirkulasi lembut anti-kering untuk menjaga kelembutan cake'
          ],
          description: 'Sangat cocok untuk outlet pastry minimalis, dessert boutique, atau counter kasir cafe.',
          sampleProductsCount: '57+ Unit Model Showcase'
        };
      }
      if (scale === 'medium') {
        return {
          categoryTitle: 'Showcase Series',
          categorySlug: 'showcase',
          unitName: 'OI Standalone Curved Glass Display Case (1200-1500mm)',
          unitModel: 'Model: OI Curved Double Glass 1200mm',
          unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/1790837974818-591994.png',
          tag: 'Kapasitas Sedang (Panjang 1.2 - 1.5 Meter)',
          temp: '+2°C ~ +8°C Presisi Kelembapan Tinggi',
          highlightSpecs: [
            'Kapasitas pajang luas 1200mm - 1500mm dengan 3-4 layer rak',
            'Pencahayaan LED warm premium memikat mata pelanggan',
            'Double-glazed heated glass tahan kondensasi iklim tropis'
          ],
          description: 'Standar pilihan bakery dan coffee shop modern untuk memajang puluhan varian cake & pastry.',
          sampleProductsCount: '57+ Unit Model Showcase'
        };
      }
      // scale === 'high'
      return {
        categoryTitle: 'Showcase Series',
        categorySlug: 'showcase',
        unitName: 'M5 Standalone Rectangular Display Case [Front Door]',
        unitModel: 'Model: M5 High-Capacity Front-Door Heavy Duty',
        unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/1790839236901-852207.png',
        tag: 'Kapasitas Besar / Chain (Panjang 1.8 Meter)',
        temp: '+2°C ~ +8°C (Display Komersial)',
        highlightSpecs: [
          'Panjang 1800mm dengan volume pajang masif untuk ratusan produk',
          'Sistem bukaan pintu depan/belakang mempermudah refill staf',
          'Struktur stainless steel SUS304 kokoh berstandar supermarket & chain'
        ],
        description: 'Dirancang untuk bakery ternama, supermarket modern, dan gerai pastry dengan varian menu berlimpah.',
        sampleProductsCount: '57+ Unit Model Showcase'
      };
    }

    // 4. REFRIGERATOR / STORAGE
    if (scale === 'compact') {
      return {
        categoryTitle: 'Commercial Refrigerator',
        categorySlug: 'refrigerator',
        unitName: 'Under Counter Chiller 2 Door 320/230 Liter',
        unitModel: 'Model: LREP-120 Undercounter SUS304',
        unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/LREP-120-1.png',
        tag: 'Kapasitas Compact (Undercounter Dapur 2 Pintu)',
        temp: '-2°C ~ +8°C (Chiller Penyimpanan)',
        highlightSpecs: [
          'Hemat tempat dengan fungsi ganda meja persiapan bahan baku',
          'Konstruksi full Stainless Steel SUS304 luar-dalam',
          'Digital controller presisi dengan sistem defrost otomatis'
        ],
        description: 'Solusi penyimpanan dapur kompak untuk menyimpan dairy, saus, dan sayuran tepat di bawah meja masak.',
        sampleProductsCount: '56+ Unit Model Refrigerator'
      };
    }
    if (scale === 'medium') {
      return {
        categoryTitle: 'Commercial Refrigerator',
        categorySlug: 'refrigerator',
        unitName: 'Upright Chiller / Freezer 2 Door (600 L)',
        unitModel: 'Model: SRWP-70 Upright Commercial',
        unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/SRWP-70.png',
        tag: 'Kapasitas Sedang (Upright 2 Pintu 600 Liter)',
        temp: '-2°C ~ +8°C (Chiller) / -18°C ~ -22°C (Freezer)',
        highlightSpecs: [
          'Kapasitas 600 Liter dengan rak kawat heavy-duty berlapis PE',
          'Kompresor tropikalisasi handal di suhu dapur panas hingga +43°C',
          'Pintu self-closing dengan gasket magnetik kedap suhu'
        ],
        description: 'Standar utama dapur restoran dan kafe untuk stok harian bahan baku daging, unggas, dan bahan segar.',
        sampleProductsCount: '56+ Unit Model Refrigerator'
      };
    }
    // scale === 'high'
    return {
      categoryTitle: 'Commercial Refrigerator',
      categorySlug: 'refrigerator',
      unitName: 'Upright Chiller / Freezer 4 Door (1050 - 1350 L)',
      unitModel: 'Model: SRWP-140 / CT-SEP-120 4-Doors',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/SRWP-140.png',
      tag: 'Kapasitas Besar / Chain (Upright 4 Pintu 1050+ Liter)',
      temp: '-18°C ~ -22°C (Freezer) / -2°C ~ +8°C (Chiller)',
      highlightSpecs: [
        'Kapasitas masif 1050 - 1350 Liter dengan 4 pintu terpisah hemat energi',
        'Dual-zone kompartemen independen untuk chiller dan freezer',
        'Sistem pendingin sirkulasi paksa (ventilated cooling) super cepat'
      ],
      description: 'Pendingin kapasitas masif untuk central kitchen, hotel berbintang, dan restoran berkapasitas ratusan porsi per hari.',
      sampleProductsCount: '56+ Unit Model Refrigerator'
    };
  }, [priority, sector, scale]);

  return (
    <div className="min-h-screen bg-[#0E0704] text-white selection:bg-[#C9A84C] selection:text-black">
      
      {/* ── HERO EXPERIENCE SECTION (Ringkas & Langsung) ── */}
      <section className="relative overflow-hidden pt-8 pb-5 sm:pt-20 sm:pb-8 bg-gradient-to-b from-[#1E0E07] via-[#0E0704] to-[#0E0704]">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] bg-[#C9A84C]/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 backdrop-blur-sm">
              <Sparkles size={11} className="text-[#C9A84C]" />
              <span>{cmsData?.hero?.badge || t('Katalog Pendingin Komersial', 'Commercial Refrigeration Catalog')}</span>
            </div>

            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3 sm:mb-4 font-display leading-[1.15]">
              {cmsData?.hero?.title ? (
                cmsData.hero.title
              ) : (
                <>
                  {t('Solusi Pendingin Tepat', 'The Right Refrigeration Solution')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5D580] via-[#C9A84C] to-[#99772B]">
                    {t('Untuk Usaha Anda', 'For Your Operation')}
                  </span>
                </>
              )}
            </h1>

            <p className="text-neutral-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-6 font-light px-2 sm:px-0">
              {cmsData?.hero?.description ||
                t(
                  'Temukan pilihan mesin pendingin standar komersial dari Holic yang dirancang tangguh untuk dapur dan gerai usaha Anda. Akses unit spesifik lewat menu navigasi Katalog di atas, atau cocokkan konfigurasi unit secara interaktif di bawah ini.',
                  'Discover Holic commercial-grade refrigeration built tough for busy kitchens and retail stores. Select a category directly from the Catalog menu above, or interactively configure your unit below.'
                )}
            </p>

            {/* Quick Direction Helper */}
            <div className="inline-flex items-start sm:items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-xl bg-[#1A0B06]/90 border border-[#C9A84C]/30 backdrop-blur-md text-[10px] sm:text-xs text-neutral-300 shadow-md max-w-sm sm:max-w-none mx-auto">
              <span className="text-[#C9A84C] font-bold text-sm flex-shrink-0">💡</span>
              <span className="text-left">
                {t(
                  'Buka menu "Produk" di atas untuk langsung melihat unit Showcase, Refrigerator, Ice Maker, atau Bar System.',
                  'Use the "Products" menu above to directly view Showcase, Refrigerator, Ice Maker, or Bar System.'
                )}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION: INTERACTIVE SMART EQUIPMENT ADVISOR (Desain Rapi & Elegan) ── */}
      <section className="pt-2 pb-12 sm:pb-20 relative overflow-hidden bg-gradient-to-b from-[#0E0704] to-[#140804]">
        <div className="container-wide">
          
          <div className="max-w-6xl mx-auto">
            
            {/* Header Tool */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#C9A84C]/25 mb-5 sm:mb-8 gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C9A84C] mb-1">
                  <SlidersHorizontal size={12} />
                  <span>Interactive Equipment Advisor</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  {t('Panduan Penentuan Unit Yang Tepat', 'Find The Right Commercial Unit')}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSector('cafe');
                  setPriority('display');
                  setScale('medium');
                }}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#C9A84C] transition-colors py-1.5 px-3 rounded-xl border border-white/10 hover:border-[#C9A84C]/40 bg-white/5 active:scale-95"
              >
                <RotateCcw size={12} />
                <span>Reset Parameter</span>
              </button>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
              
              {/* Left Column: Interactive Selectors (7 Cols) */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* 1. SECTOR SELECTOR */}
                <div className="bg-[#180A05]/90 border border-[#C9A84C]/25 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C9A84C]">
                      1. Jenis Usaha / Sektor Anda
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-neutral-400">Pilih sektor usaha</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                    {sectors.map((s) => {
                      const Icon = s.icon;
                      const active = sector === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSector(s.id)}
                          className={`p-2.5 sm:p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[76px] sm:min-h-[92px] active:scale-95 ${
                            active
                              ? 'bg-gradient-to-br from-[#30160B] to-[#1E0D06] border-[#C9A84C] ring-2 ring-[#C9A84C]/40 shadow-lg'
                              : 'bg-[#120603] border-white/5 text-neutral-400 hover:border-[#C9A84C]/40 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                            <Icon size={15} className={active ? 'text-[#C9A84C]' : 'text-neutral-500'} />
                            {active && <CheckCircle2 size={13} className="text-[#C9A84C]" />}
                          </div>
                          <div>
                            <p className={`text-[10px] sm:text-xs font-bold leading-tight ${active ? 'text-white' : 'text-neutral-300'}`}>
                              {s.label}
                            </p>
                            <p className="text-[9px] sm:text-[10px] text-neutral-400 mt-0.5 line-clamp-1 hidden sm:block">
                              {s.sub}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. COOLING FOCUS */}
                <div className="bg-[#180A05]/90 border border-[#C9A84C]/25 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C9A84C]">
                      2. Fokus Kebutuhan Pendingin
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-neutral-400">Pilih fungsi utama</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {priorities.map((p) => {
                      const Icon = p.icon;
                      const active = priority === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPriority(p.id)}
                          className={`p-2.5 sm:p-3.5 rounded-xl border text-left transition-all flex items-start gap-2 sm:gap-3 active:scale-95 ${
                            active
                              ? 'bg-gradient-to-br from-[#30160B] to-[#1E0D06] border-[#C9A84C] ring-2 ring-[#C9A84C]/40 shadow-lg'
                              : 'bg-[#120603] border-white/5 text-neutral-400 hover:border-[#C9A84C]/40 hover:text-white'
                          }`}
                        >
                          <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 mt-0.5 ${active ? 'bg-[#C9A84C]/20 text-[#C9A84C]' : 'bg-white/5 text-neutral-500'}`}>
                            <Icon size={13} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <p className={`text-[10px] sm:text-xs font-bold leading-snug ${active ? 'text-white' : 'text-neutral-300'}`}>
                                {p.label}
                              </p>
                              {active && <CheckCircle2 size={12} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />}
                            </div>
                            <p className="text-[9px] sm:text-[11px] text-neutral-400 mt-0.5 leading-snug hidden sm:block">
                              {p.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. OUTLET SCALE */}
                <div className="bg-[#180A05]/90 border border-[#C9A84C]/25 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C9A84C]">
                      3. Kapasitas / Skala Operasional
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-neutral-400">Volume beban kerja</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                    {scales.map((sc) => {
                      const active = scale === sc.id;
                      return (
                        <button
                          key={sc.id}
                          type="button"
                          onClick={() => setScale(sc.id)}
                          className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all active:scale-95 ${
                            active
                              ? 'bg-[#C9A84C] text-[#120603] border-[#C9A84C] font-bold shadow-md'
                              : 'bg-[#120603] border-white/5 text-neutral-300 hover:border-[#C9A84C]/30'
                          }`}
                        >
                          <p className="text-[10px] sm:text-xs font-bold leading-tight">{sc.label}</p>
                          <p className={`text-[9px] sm:text-[10px] mt-0.5 ${active ? 'text-[#120603]/80 font-medium' : 'text-neutral-400'} hidden sm:block`}>
                            {sc.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic Visual Unit Recommendation (5 Cols) */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="bg-gradient-to-b from-[#241108] via-[#1B0C06] to-[#120603] border-2 border-[#C9A84C]/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                  
                  {/* Subtle top indicator */}
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

                  {/* Header Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/50 text-[#C9A84C] text-[10px] font-bold tracking-widest uppercase">
                      <Sparkles size={11} />
                      Rekomendasi Unit Holic
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#E3C368] px-2.5 py-0.5 rounded-md bg-black/40 border border-[#C9A84C]/20">
                      {recommendation.categoryTitle}
                    </span>
                  </div>

                  {/* REAL Product Preview Image Card */}
                  <div className="relative h-48 w-full bg-gradient-to-b from-white/95 to-white/90 rounded-2xl p-3 flex items-center justify-center mb-4 shadow-inner overflow-hidden border border-white/10 group">
                    <Image
                      src={recommendation.unitImage}
                      alt={recommendation.unitName}
                      fill
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] text-neutral-300 font-semibold border border-white/10">
                      {recommendation.unitModel}
                    </div>
                  </div>

                  {/* Unit Title & Specs */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-snug">
                    {recommendation.unitName}
                  </h3>
                  <p className="text-xs text-neutral-300 mb-4 leading-relaxed font-light">
                    {recommendation.description}
                  </p>

                  {/* Specs & Temp Matrix */}
                  <div className="space-y-3 mb-5 bg-black/50 border border-white/5 rounded-2xl p-4">
                    <div className="flex items-center gap-2 pb-2.5 border-b border-white/5">
                      <ThermometerSnowflake size={16} className="text-[#C9A84C] flex-shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-neutral-400">Rentang Temperatur</p>
                        <p className="text-xs font-bold text-[#F5D580]">{recommendation.temp}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1.5">Fitur & Standar</p>
                      <ul className="space-y-1.5">
                        {recommendation.highlightSpecs.map((spec, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-neutral-200">
                            <ShieldCheck size={13} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Direct Link to Category Filtered Products */}
                  <Link
                    href={`/products?category=${recommendation.categorySlug}`}
                    className="w-full py-3.5 px-5 bg-gradient-to-r from-[#C9A84C] to-[#E3C368] hover:from-[#DEB853] hover:to-[#F5D580] text-[#120603] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 group active:scale-[0.98]"
                  >
                    <span>Buka Katalog {recommendation.categoryTitle}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-3 px-1">
                    <span>{recommendation.sampleProductsCount}</span>
                    <span className="flex items-center gap-0.5 text-[#C9A84C]">
                      Lihat Semua Unit <ChevronRight size={11} />
                    </span>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
