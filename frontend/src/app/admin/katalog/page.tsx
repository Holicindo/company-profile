'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Eye,
  ExternalLink,
  RefreshCw,
  Store,
  Coffee,
  ShoppingBag,
  Archive,
  Zap,
  Wine,
  ThermometerSnowflake,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Info,
  Layers,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

type Sector = 'bakery' | 'cafe' | 'supermarket';
type Priority = 'display' | 'storage' | 'ice' | 'bar';
type Scale = 'compact' | 'medium' | 'high';

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

// ── Static Data (mirrors CatalogView.tsx) ─────────────────────────────────────

const sectors = [
  { id: 'bakery' as Sector, label: 'Bakery & Pastry', sub: 'Cake, roti & artisan pastry', icon: Store },
  { id: 'cafe' as Sector, label: 'Coffee Shop & Beverage', sub: 'Specialty cafe, bar & lounge', icon: Coffee },
  { id: 'supermarket' as Sector, label: 'Supermarket & Food Service', sub: 'Retail swalayan, resto & hotel', icon: ShoppingBag },
];

const priorities = [
  { id: 'display' as Priority, label: 'Display & Estetika Visual', desc: 'Showcase kaca bening anti-embun untuk display produk', icon: Eye, cat: 'Showcase' },
  { id: 'storage' as Priority, label: 'Penyimpanan Dapur (Storage)', desc: 'Chiller / freezer SUS304 tangguh untuk stok bahan baku', icon: Archive, cat: 'Refrigerator' },
  { id: 'ice' as Priority, label: 'Produksi Es Otomatis', desc: 'Mesin es higienis kristal kubus / flake continue', icon: Zap, cat: 'Ice Maker' },
  { id: 'bar' as Priority, label: 'Bar Counter & Station', desc: 'Undercounter modular untuk workstation barista/bartender', icon: Wine, cat: 'Bar System' },
];

const scales = [
  { id: 'compact' as Scale, label: 'Outlet Compact', desc: '1 - 2 Meter Counter' },
  { id: 'medium' as Scale, label: 'Kapasitas Sedang', desc: 'Operasional Harian Aktif' },
  { id: 'high' as Scale, label: 'Kapasitas Besar / Chain', desc: 'High Volume Continuous' },
];

// ── Recommendation Matrix (matches CatalogView.tsx exactly) ───────────────────

function getRecommendation(priority: Priority, sector: Sector, scale: Scale): RecommendedCard {
  if (priority === 'ice') {
    if (scale === 'compact') return {
      categoryTitle: 'Ice Maker Series', categorySlug: 'icemaker',
      unitName: 'Commercial Compact Ice Maker 35-50 kg', unitModel: 'Model: AC-80X Compact Series',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/AC80X.png',
      tag: 'Kapasitas Compact (Outlet Kecil)', temp: '-2°C ~ 0°C Output Es',
      highlightSpecs: ['Produksi harian 35 - 50 kg/24 jam, hemat daya & space', 'Bin penyimpanan es terintegrasi (kapasitas 15-20 kg)', 'Siklus pembekuan cepat & auto-cleaning higienis'],
      description: 'Sangat ideal untuk coffee shop compact, booth minuman, dan cafe dengan kebutuhan es harian ringan.',
      sampleProductsCount: '37+ Unit Model Tersedia',
    };
    if (scale === 'medium') return {
      categoryTitle: 'Ice Maker Series', categorySlug: 'icemaker',
      unitName: 'Commercial Modular Ice Maker 80-120 kg', unitModel: 'Model: AP-0.6 Ice Maker Series',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/12/Ap-0.6-Ice-maker.png',
      tag: 'Kapasitas Sedang (Resto & Coffee Shop)', temp: '-2°C ~ 0°C Output Es Kristal',
      highlightSpecs: ['Produksi es 80 - 120 kg/24 jam untuk pesanan tinggi', 'Evaporator Food-Grade SUS304 anti-karat & higienis', 'Alarm sensor otomatis bila air habis atau bin penuh'],
      description: 'Pilihan standar untuk restoran, cafe aktif, dan bar dengan aliran pesanan minuman dingin terus-menerus.',
      sampleProductsCount: '37+ Unit Model Tersedia',
    };
    return {
      categoryTitle: 'Ice Maker Series', categorySlug: 'icemaker',
      unitName: 'Industrial Scale / Flake Ice Machine 600 kg', unitModel: 'Model: Industrial Ice Flake SUS304 (600kg/24h)',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/12/Ap-0.6-Ice-maker.png',
      tag: 'Kapasitas Besar / Chain (Heavy Duty)', temp: '-3°C ~ 0°C High Output',
      highlightSpecs: ['Kapasitas masif 600 kg / 24 jam produksi non-stop', 'Heavy-duty kompresor industri untuk operasional 24 jam', 'Cocok untuk central kitchen, supermarket segar, & hotel'],
      description: 'Mesin es kapasitas ekstra besar untuk menyuplai cabang usaha, display seafood supermarket, atau hotel.',
      sampleProductsCount: '37+ Unit Model Tersedia',
    };
  }

  if (priority === 'bar') {
    if (scale === 'compact') return {
      categoryTitle: 'Bar System & Station', categorySlug: 'bar-system',
      unitName: 'Bar Undercounter Chiller 1 Door (150 L)', unitModel: 'Model: Bar Refrigerator CA-50 Compact',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/Bar-Refrigerator-CA-50-e1640740274919.png',
      tag: 'Kapasitas Compact (Barista Station 1-2m)', temp: '+2°C ~ +8°C Chiller Section',
      highlightSpecs: ['Dimensi ramping 900mm menghemat area counter bar', 'Drainage otomatis dengan frost auto-evaporation tanpa buang air', 'Pintu solid atau kaca display dengan interior LED'],
      description: 'Dirancang pas untuk bar counter kecil, coffee booth, dan lounge dengan area terbatas.',
      sampleProductsCount: 'Pilihan Modular Compact',
    };
    if (scale === 'medium') return {
      categoryTitle: 'Bar System & Station', categorySlug: 'bar-system',
      unitName: 'Bar Undercounter Chiller 2 Door (220 L)', unitModel: 'Model: Bar Refrigerator CA-90 Standard',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/Bar-Refrigerator-CA-90.png',
      tag: 'Kapasitas Sedang (Alur Kerja Barista Efisien)', temp: '+2°C ~ +8°C Chiller Section',
      highlightSpecs: ['Kapasitas 220 Liter dengan 2 pintu modular SUS304', 'Worktop stainless datar dapat difungsikan meja prep & grinder', 'Sistem hembusan dingin merata menjaga susu & garnish segar'],
      description: 'Konfigurasi terfavorit untuk coffee shop dan bar komersial dengan alur kerja dua barista.',
      sampleProductsCount: '3 Unit Model Bar System',
    };
    return {
      categoryTitle: 'Bar System & Station', categorySlug: 'bar-system',
      unitName: 'Custom Ergonomic High-Capacity Bar Station 3 Door', unitModel: 'Model: Multi-Station Integrated Bar System SUS304',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/Bar-Refrigerator-CA-90.png',
      tag: 'Kapasitas Besar / Chain (Multi-Barista Station)', temp: '+2°C ~ +8°C (Multi-Compartment)',
      highlightSpecs: ['Panjang counter 1.8m - 2.4m dengan 3 kompartemen pendingin', 'Dapat diintegrasikan dengan sink, ice well, blender station, & speed rail', 'Material Full SUS304 tebal tahan benturan jam kerja sibuk'],
      description: 'Stasiun bar komplit untuk gerai minuman high-volume chain, beach club, atau hotel lounge.',
      sampleProductsCount: 'Kustom Modular Sesuai Layout',
    };
  }

  if (priority === 'display' || sector === 'bakery') {
    if (scale === 'compact') return {
      categoryTitle: 'Showcase Series', categorySlug: 'showcase',
      unitName: 'Arc Display Case 3 Layer (900mm Compact)', unitModel: 'Model: Arc Display Case 3 Layer',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/1791187983563-618972.png',
      tag: 'Kapasitas Compact (Panjang 90cm)', temp: '+2°C ~ +6°C (Cake) / +16°C ~ +18°C (Chocolate)',
      highlightSpecs: ['Dimensi kompak lebar 900mm dengan 3 tingkat rak display', 'Kaca lengkung berpemanas (anti-fog) jernih dari segala sudut', 'Sirkulasi lembut anti-kering untuk menjaga kelembutan cake'],
      description: 'Sangat cocok untuk outlet pastry minimalis, dessert boutique, atau counter kasir cafe.',
      sampleProductsCount: '57+ Unit Model Showcase',
    };
    if (scale === 'medium') return {
      categoryTitle: 'Showcase Series', categorySlug: 'showcase',
      unitName: 'OI Standalone Curved Glass Display Case (1200-1500mm)', unitModel: 'Model: OI Curved Double Glass 1200mm',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/1790837974818-591994.png',
      tag: 'Kapasitas Sedang (Panjang 1.2 - 1.5 Meter)', temp: '+2°C ~ +8°C Presisi Kelembapan Tinggi',
      highlightSpecs: ['Kapasitas pajang luas 1200mm - 1500mm dengan 3-4 layer rak', 'Pencahayaan LED warm premium memikat mata pelanggan', 'Double-glazed heated glass tahan kondensasi iklim tropis'],
      description: 'Standar pilihan bakery dan coffee shop modern untuk memajang puluhan varian cake & pastry.',
      sampleProductsCount: '57+ Unit Model Showcase',
    };
    return {
      categoryTitle: 'Showcase Series', categorySlug: 'showcase',
      unitName: 'M5 Standalone Rectangular Display Case [Front Door]', unitModel: 'Model: M5 High-Capacity Front-Door Heavy Duty',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/1790839236901-852207.png',
      tag: 'Kapasitas Besar / Chain (Panjang 1.8 Meter)', temp: '+2°C ~ +8°C (Display Komersial)',
      highlightSpecs: ['Panjang 1800mm dengan volume pajang masif untuk ratusan produk', 'Sistem bukaan pintu depan/belakang mempermudah refill staf', 'Struktur stainless steel SUS304 kokoh berstandar supermarket & chain'],
      description: 'Dirancang untuk bakery ternama, supermarket modern, dan gerai pastry dengan varian menu berlimpah.',
      sampleProductsCount: '57+ Unit Model Showcase',
    };
  }

  // Refrigerator / Storage
  if (scale === 'compact') return {
    categoryTitle: 'Commercial Refrigerator', categorySlug: 'refrigerator',
    unitName: 'Under Counter Chiller 2 Door 320/230 Liter', unitModel: 'Model: LREP-120 Undercounter SUS304',
    unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/LREP-120-1.png',
    tag: 'Kapasitas Compact (Undercounter Dapur 2 Pintu)', temp: '-2°C ~ +8°C (Chiller Penyimpanan)',
    highlightSpecs: ['Hemat tempat dengan fungsi ganda meja persiapan bahan baku', 'Konstruksi full Stainless Steel SUS304 luar-dalam', 'Digital controller presisi dengan sistem defrost otomatis'],
    description: 'Solusi penyimpanan dapur kompak untuk menyimpan dairy, saus, dan sayuran tepat di bawah meja masak.',
    sampleProductsCount: '56+ Unit Model Refrigerator',
  };
  if (scale === 'medium') return {
    categoryTitle: 'Commercial Refrigerator', categorySlug: 'refrigerator',
    unitName: 'Upright Chiller / Freezer 2 Door (600 L)', unitModel: 'Model: SRWP-70 Upright Commercial',
    unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/SRWP-70.png',
    tag: 'Kapasitas Sedang (Upright 2 Pintu 600 Liter)', temp: '-2°C ~ +8°C (Chiller) / -18°C ~ -22°C (Freezer)',
    highlightSpecs: ['Kapasitas 600 Liter dengan rak kawat heavy-duty berlapis PE', 'Kompresor tropikalisasi handal di suhu dapur panas hingga +43°C', 'Pintu self-closing dengan gasket magnetik kedap suhu'],
    description: 'Standar utama dapur restoran dan kafe untuk stok harian bahan baku daging, unggas, dan bahan segar.',
    sampleProductsCount: '56+ Unit Model Refrigerator',
  };
  return {
    categoryTitle: 'Commercial Refrigerator', categorySlug: 'refrigerator',
    unitName: 'Upright Chiller / Freezer 4 Door (1050 - 1350 L)', unitModel: 'Model: SRWP-140 / CT-SEP-120 4-Doors',
    unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/SRWP-140.png',
    tag: 'Kapasitas Besar / Chain (Upright 4 Pintu 1050+ Liter)', temp: '-18°C ~ -22°C (Freezer) / -2°C ~ +8°C (Chiller)',
    highlightSpecs: ['Kapasitas masif 1050 - 1350 Liter dengan 4 pintu terpisah hemat energi', 'Dual-zone kompartemen independen untuk chiller dan freezer', 'Sistem pendingin sirkulasi paksa (ventilated cooling) super cepat'],
    description: 'Pendingin kapasitas masif untuk central kitchen, hotel berbintang, dan restoran berkapasitas ratusan porsi per hari.',
    sampleProductsCount: '56+ Unit Model Refrigerator',
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AdminKatalogPage() {
  const [sector, setSector] = useState<Sector>('cafe');
  const [priority, setPriority] = useState<Priority>('display');
  const [scale, setScale] = useState<Scale>('medium');
  const [expandedSection, setExpandedSection] = useState<string | null>('hero');

  const recommendation = getRecommendation(priority, sector, scale);

  const toggleSection = (key: string) =>
    setExpandedSection(prev => (prev === key ? null : key));

  const SectionHeader = ({ id, title, icon: Icon, badge }: { id: string; title: string; icon: any; badge?: string }) => (
    <button
      type="button"
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between p-4 text-left hover:bg-[#3d2817]/20 transition-colors rounded-xl"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#C9A84C]/10 rounded-lg">
          <Icon size={16} className="text-[#C9A84C]" />
        </div>
        <div>
          <p className="font-semibold text-[#2C1810] text-sm">{title}</p>
          {badge && <p className="text-xs text-neutral-500 mt-0.5">{badge}</p>}
        </div>
      </div>
      <ChevronDown
        size={16}
        className={`text-neutral-400 transition-transform duration-200 ${expandedSection === id ? 'rotate-180' : ''}`}
      />
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={20} className="text-[#C9A84C]" />
            <h1 className="text-xl font-bold text-[#2C1810]">Halaman Katalog</h1>
          </div>
          <p className="text-sm text-neutral-500">
            Preview & monitoring konten Equipment Advisor pada halaman <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-xs font-mono">/catalog</code>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/catalog"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-neutral-200 text-sm font-medium text-neutral-700 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all shadow-sm"
          >
            <Eye size={14} />
            Preview
            <ExternalLink size={12} className="opacity-60" />
          </Link>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2C1810] text-sm font-semibold text-white hover:bg-[#3d2817] transition-all shadow-sm"
          >
            <Layers size={14} />
            Kelola Produk
          </Link>
        </div>
      </div>

      {/* ── Info Banner ── */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl text-sm">
        <Info size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
        <div className="text-blue-700">
          <p className="font-semibold mb-0.5">Halaman ini bersifat read-only / preview</p>
          <p className="text-xs leading-relaxed">
            Konten Equipment Advisor (sektor, prioritas, rekomendasi unit) saat ini di-hardcode di <code className="bg-blue-100 px-1 rounded font-mono">CatalogView.tsx</code>.
            Untuk mengubah produk yang muncul, kelola data di menu <strong>Produk</strong>. 
            Gunakan simulator di bawah untuk memverifikasi hasil rekomendasi sebelum update ke live.
          </p>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Sektor Usaha', value: '3', sub: 'Bakery, Cafe, Supermarket', color: 'bg-amber-50 border-amber-200' },
          { label: 'Prioritas Kebutuhan', value: '4', sub: 'Display, Storage, Ice, Bar', color: 'bg-emerald-50 border-emerald-200' },
          { label: 'Skala Kapasitas', value: '3', sub: 'Compact, Medium, High', color: 'bg-sky-50 border-sky-200' },
          { label: 'Total Kombinasi', value: '36', sub: '3 × 4 × 3 variasi', color: 'bg-purple-50 border-purple-200' },
        ].map(stat => (
          <div key={stat.label} className={`${stat.color} border rounded-2xl p-3 sm:p-4`}>
            <p className="text-2xl font-bold text-[#2C1810]">{stat.value}</p>
            <p className="text-xs font-semibold text-neutral-600 mt-0.5">{stat.label}</p>
            <p className="text-[10px] text-neutral-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Simulator & Preview ── */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#C9A84C]" />
            <h2 className="font-bold text-[#2C1810]">Simulator Equipment Advisor</h2>
          </div>
          <button
            type="button"
            onClick={() => { setSector('cafe'); setPriority('display'); setScale('medium'); }}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-[#C9A84C] transition-colors px-2.5 py-1.5 rounded-lg border border-neutral-200 hover:border-[#C9A84C]/50"
          >
            <RefreshCw size={11} />
            Reset
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

            {/* Left: Selectors */}
            <div className="space-y-4">

              {/* 1. Sector */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#C9A84C] mb-2">
                  1. Jenis Usaha / Sektor
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {sectors.map((s) => {
                    const Icon = s.icon;
                    const active = sector === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSector(s.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          active
                            ? 'bg-[#2C1810] border-[#C9A84C] text-white ring-2 ring-[#C9A84C]/30'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-[#C9A84C]/50'
                        }`}
                      >
                        <Icon size={14} className={active ? 'text-[#C9A84C] mb-1.5' : 'text-neutral-400 mb-1.5'} />
                        <p className="text-[10px] font-bold leading-tight">{s.label}</p>
                        {active && <CheckCircle2 size={11} className="text-[#C9A84C] mt-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Priority */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#C9A84C] mb-2">
                  2. Fokus Kebutuhan Pendingin
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {priorities.map((p) => {
                    const Icon = p.icon;
                    const active = priority === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPriority(p.id)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                          active
                            ? 'bg-[#2C1810] border-[#C9A84C] text-white ring-2 ring-[#C9A84C]/30'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-[#C9A84C]/50'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg flex-shrink-0 ${active ? 'bg-[#C9A84C]/20 text-[#C9A84C]' : 'bg-neutral-200 text-neutral-500'}`}>
                          <Icon size={13} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold leading-tight truncate">{p.label}</p>
                          <p className="text-[9px] text-neutral-400 mt-0.5 leading-tight line-clamp-2">{p.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Scale */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#C9A84C] mb-2">
                  3. Kapasitas / Skala Operasional
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {scales.map((sc) => {
                    const active = scale === sc.id;
                    return (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => setScale(sc.id)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          active
                            ? 'bg-[#C9A84C] text-[#2C1810] border-[#C9A84C] font-bold'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-[#C9A84C]/50'
                        }`}
                      >
                        <p className="text-[10px] font-bold leading-tight">{sc.label}</p>
                        <p className={`text-[9px] mt-0.5 ${active ? 'text-[#2C1810]/70' : 'text-neutral-400'}`}>{sc.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Recommendation Preview */}
            <div className="bg-gradient-to-b from-[#241108] to-[#120603] rounded-2xl p-5 border-2 border-[#C9A84C]/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

              {/* Badge row */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-[10px] font-bold tracking-wider uppercase">
                  <Sparkles size={10} /> Rekomendasi
                </span>
                <span className="text-[10px] font-bold text-[#E3C368] px-2 py-0.5 rounded-md bg-black/40 border border-[#C9A84C]/20 uppercase tracking-wide">
                  {recommendation.categoryTitle}
                </span>
              </div>

              {/* Product Image */}
              <div className="relative h-36 w-full bg-white/95 rounded-xl flex items-center justify-center mb-3 overflow-hidden">
                <Image
                  src={recommendation.unitImage}
                  alt={recommendation.unitName}
                  fill
                  className="object-contain p-3"
                  unoptimized
                />
                <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/80 text-[9px] text-neutral-300 font-medium">
                  {recommendation.unitModel}
                </div>
              </div>

              {/* Unit name */}
              <h3 className="text-sm font-bold text-white mb-1 leading-snug">{recommendation.unitName}</h3>
              <p className="text-[11px] text-neutral-400 mb-3 leading-relaxed">{recommendation.description}</p>

              {/* Temp & specs */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-3 mb-3 space-y-2">
                <div className="flex items-center gap-2">
                  <ThermometerSnowflake size={13} className="text-[#C9A84C] flex-shrink-0" />
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-neutral-500">Temperatur</p>
                    <p className="text-[10px] font-bold text-[#F5D580]">{recommendation.temp}</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {recommendation.highlightSpecs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[10px] text-neutral-300">
                      <span className="text-[#C9A84C] mt-0.5 flex-shrink-0">✓</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Link
                href={`/products?category=${recommendation.categorySlug}`}
                target="_blank"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#C9A84C] to-[#E3C368] text-[#120603] font-bold text-xs uppercase tracking-wide rounded-xl transition-all flex items-center justify-center gap-2 hover:opacity-90"
              >
                Buka Katalog {recommendation.categoryTitle}
                <ChevronRight size={13} />
              </Link>
              <p className="text-center text-[10px] text-neutral-500 mt-2">{recommendation.sampleProductsCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content Structure Overview ── */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-[#C9A84C]" />
            <h2 className="font-bold text-[#2C1810]">Struktur Konten Halaman Katalog</h2>
          </div>
        </div>

        <div className="divide-y divide-neutral-100">

          {/* Section: Hero */}
          <div>
            <SectionHeader id="hero" title="Hero Section" icon={Sparkles} badge="Judul utama & deskripsi halaman" />
            {expandedSection === 'hero' && (
              <div className="px-5 pb-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Judul (ID)</p>
                    <p className="text-sm font-bold text-[#2C1810]">Solusi Pendingin Tepat</p>
                    <p className="text-sm font-bold text-[#C9A84C]">Untuk Usaha Anda</p>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Judul (EN)</p>
                    <p className="text-sm font-bold text-[#2C1810]">The Right Refrigeration Solution</p>
                    <p className="text-sm font-bold text-[#C9A84C]">For Your Operation</p>
                  </div>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Deskripsi</p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Temukan pilihan mesin pendingin standar komersial dari Holic yang dirancang tangguh untuk dapur dan gerai usaha Anda. Akses unit spesifik lewat menu navigasi Katalog di atas, atau cocokkan konfigurasi unit secara interaktif di bawah ini.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section: Sectors */}
          <div>
            <SectionHeader id="sectors" title="Sektor Usaha" icon={Store} badge="3 pilihan sektor (Bakery, Cafe, Supermarket)" />
            {expandedSection === 'sectors' && (
              <div className="px-5 pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {sectors.map(s => {
                    const Icon = s.icon;
                    return (
                      <div key={s.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                        <Icon size={14} className="text-[#C9A84C] mb-1.5" />
                        <p className="text-xs font-bold text-[#2C1810]">{s.label}</p>
                        <p className="text-[10px] text-neutral-500 mt-0.5">{s.sub}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Section: Priorities */}
          <div>
            <SectionHeader id="priorities" title="Prioritas Kebutuhan" icon={Zap} badge="4 jenis kebutuhan pendingin" />
            {expandedSection === 'priorities' && (
              <div className="px-5 pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {priorities.map(p => {
                    const Icon = p.icon;
                    return (
                      <div key={p.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-start gap-3">
                        <div className="p-1.5 bg-[#C9A84C]/10 rounded-lg flex-shrink-0">
                          <Icon size={14} className="text-[#C9A84C]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#2C1810]">{p.label}</p>
                          <p className="text-[10px] text-neutral-500 mt-0.5">{p.desc}</p>
                          <span className="inline-block mt-1.5 px-2 py-0.5 bg-[#2C1810] text-white text-[9px] font-bold rounded-md">{p.cat}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Section: Scales */}
          <div>
            <SectionHeader id="scales" title="Skala Kapasitas" icon={ThermometerSnowflake} badge="3 tingkat volume operasional" />
            {expandedSection === 'scales' && (
              <div className="px-5 pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {scales.map(s => (
                    <div key={s.id} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                      <p className="text-xs font-bold text-[#2C1810]">{s.label}</p>
                      <p className="text-[10px] text-neutral-500 mt-0.5">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Quick Links ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { href: '/admin/products?category=showcase', label: 'Kelola Produk Showcase', sub: '57+ unit tersedia', color: 'hover:border-amber-400' },
          { href: '/admin/products?category=refrigerator', label: 'Kelola Refrigerator', sub: '56+ unit tersedia', color: 'hover:border-sky-400' },
          { href: '/admin/products?category=icemaker', label: 'Kelola Ice Maker', sub: '37+ unit tersedia', color: 'hover:border-emerald-400' },
        ].map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`p-4 bg-white border border-neutral-200 rounded-2xl ${link.color} hover:shadow-md transition-all group`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#2C1810] group-hover:text-[#C9A84C] transition-colors">{link.label}</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">{link.sub}</p>
              </div>
              <ChevronRight size={16} className="text-neutral-300 group-hover:text-[#C9A84C] transition-colors" />
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
