'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Eye,
  ExternalLink,
  Save,
  CheckCircle2,
  Sparkles,
  Info,
  Loader2,
  SlidersHorizontal,
  ChevronRight,
  Store,
  Coffee,
  ShoppingBag,
  Zap,
  Wine,
  Archive,
  ThermometerSnowflake,
  Upload,
} from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

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

interface KatalogSections {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  sectors: Array<{ id: string; label: string; sub: string }>;
  priorities: Array<{ id: string; label: string; desc: string; cat: string }>;
  scales: Array<{ id: string; label: string; desc: string }>;
  recommendations: Record<string, RecommendedCard>;
}

const defaultSections: KatalogSections = {
  hero: {
    badge: 'KATALOG & ADVISOR PERALATAN 2026',
    title: 'Temukan Unit Pendingin Tepat untuk Kebutuhan Bisnis Anda.',
    description:
      'Pilih sektor usaha, prioritas operasional, dan kapasitas outlet Anda. Sistem rekomendasi kami akan menampilkan pilihan unit commercial display & refrigeration paling ideal.',
  },
  sectors: [
    { id: 'bakery', label: 'Bakery & Pastry', sub: 'Cake, roti & artisan pastry' },
    { id: 'cafe', label: 'Coffee Shop & Beverage', sub: 'Specialty cafe, bar & lounge' },
    { id: 'supermarket', label: 'Supermarket & Food Service', sub: 'Retail swalayan, resto & hotel' },
  ],
  priorities: [
    { id: 'display', label: 'Display & Estetika Visual', desc: 'Showcase kaca bening anti-embun untuk display produk', cat: 'Showcase' },
    { id: 'storage', label: 'Penyimpanan Dapur (Storage)', desc: 'Chiller / freezer SUS304 tangguh untuk stok bahan baku', cat: 'Refrigerator' },
    { id: 'ice', label: 'Produksi Es Otomatis', desc: 'Mesin es higienis kristal kubus / flake continue', cat: 'Ice Maker' },
    { id: 'bar', label: 'Bar Counter & Station', desc: 'Undercounter modular untuk workstation barista/bartender', cat: 'Bar System' },
  ],
  scales: [
    { id: 'compact', label: 'Outlet Compact', desc: '1 - 2 Meter Counter' },
    { id: 'medium', label: 'Kapasitas Sedang', desc: 'Operasional Harian Aktif' },
    { id: 'high', label: 'Kapasitas Besar / Chain', desc: 'High Volume Continuous' },
  ],
  recommendations: {},
};

export default function AdminKatalogPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [pageId, setPageId] = useState<number | null>(null);
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [sections, setSections] = useState<KatalogSections>(defaultSections);

  // Active Simulator/Editor Selector State
  const [selectedSector, setSelectedSector] = useState<Sector>('cafe');
  const [selectedPriority, setSelectedPriority] = useState<Priority>('display');
  const [selectedScale, setSelectedScale] = useState<Scale>('medium');

  // Active tab in edit form
  const [activeTab, setActiveTab] = useState<'advisor' | 'hero' | 'sectors' | 'priorities'>('advisor');

  // Fetch Page Data from Backend
  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/pages/slug/katalog');
      if (res.ok) {
        const data = await res.json();
        setPageId(data.id);
        setStatus(data.status || 'published');
        if (data.sections) {
          setSections({
            hero: { ...defaultSections.hero, ...(data.sections.hero || {}) },
            sectors: data.sections.sectors || defaultSections.sectors,
            priorities: data.sections.priorities || defaultSections.priorities,
            scales: data.sections.scales || defaultSections.scales,
            recommendations: data.sections.recommendations || {},
          });
        }
      }
    } catch (err) {
      console.error('Failed to load katalog page data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Recommendation lookup helper
  const recKey = `${selectedPriority}-${selectedScale}`;
  const recKeyWithSector = `${selectedPriority}-${selectedSector}-${selectedScale}`;
  const currentKey = sections.recommendations?.[recKeyWithSector] ? recKeyWithSector : recKey;

  const currentRec: RecommendedCard = sections.recommendations?.[currentKey] ||
    sections.recommendations?.[recKeyWithSector] ||
    sections.recommendations?.[recKey] || {
      categoryTitle: 'Commercial Equipment',
      categorySlug: 'showcase',
      unitName: 'Unit Komersial Holicindo',
      unitModel: 'Model Standar',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/cake-showcase-curved.png',
      tag: 'Kapasitas Sedang',
      temp: '+2°C ~ +8°C',
      highlightSpecs: ['Pendinginan cepat & merata', 'Material food-grade SUS304', 'Garansi resmi 1 tahun'],
      description: 'Unit pendingin komersial standar dengan efisiensi tinggi untuk kebutuhan outlet Anda.',
      sampleProductsCount: '50+ Unit Model Tersedia',
    };

  const handleUpdateCurrentRec = (fields: Partial<RecommendedCard>) => {
    const targetKey =
      selectedPriority === 'ice' || selectedPriority === 'bar'
        ? `${selectedPriority}-${selectedScale}`
        : `${selectedPriority}-${selectedSector}-${selectedScale}`;

    setSections((prev) => ({
      ...prev,
      recommendations: {
        ...prev.recommendations,
        [targetKey]: {
          ...currentRec,
          ...fields,
        },
      },
    }));
  };

  const handleHighlightSpecChange = (index: number, val: string) => {
    const newSpecs = [...(currentRec.highlightSpecs || ['', '', ''])];
    newSpecs[index] = val;
    handleUpdateCurrentRec({ highlightSpecs: newSpecs });
  };

  // Save changes to backend
  const handleSave = async () => {
    if (!pageId) {
      alert('Halaman katalog belum terinisialisasi. Silakan refresh halaman.');
      return;
    }

    try {
      setSaving(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('holic_admin_token') : '';
      const res = await fetch(`/api/pages/${pageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sections,
          status,
        }),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        const err = await res.json();
        alert(`Gagal menyimpan: ${err.message || 'Unknown error'}`);
      }
    } catch (err: any) {
      alert(`Error saat menyimpan: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="animate-spin text-[#C9A84C]" size={36} />
        <p className="text-sm text-neutral-500 font-medium">Memuat data editor katalog...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* ── Top Header & Action Bar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-semibold text-amber-800 mb-2">
            <BookOpen size={13} />
            <span>Katalog & Equipment Advisor CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2C1810]">Editor Konten Katalog</h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Ubah teks hero, opsi rekomendasi, dan detail spesifikasi unit yang muncul di Equipment Advisor secara langsung.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/catalog"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-xl hover:bg-neutral-50 hover:border-neutral-400 transition"
          >
            <Eye size={14} />
            <span>Lihat Publik</span>
            <ExternalLink size={12} className="text-neutral-400" />
          </Link>

          <button
            onClick={handleSave}
            disabled={saving}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 ${
              saveSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-[#C9A84C] to-[#A88728] hover:from-[#d8b555] hover:to-[#b89530] text-[#1E0E07]'
            }`}
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 size={16} />
                <span>Tersimpan!</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Status Bar Notification ── */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-900 text-sm animate-in fade-in">
          <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
          <p className="font-medium">
            Perubahan konten katalog berhasil disimpan ke database dan langsung aktif di halaman publik!
          </p>
        </div>
      )}

      {/* ── Navigation Tabs ── */}
      <div className="flex items-center gap-2 border-b border-neutral-200 overflow-x-auto pb-1">
        {[
          { id: 'advisor' as const, label: '🎯 Unit Rekomendasi (Advisor Matrix)' },
          { id: 'hero' as const, label: '✨ Hero Section & Header' },
          { id: 'sectors' as const, label: '🏢 Label Sektor Usaha' },
          { id: 'priorities' as const, label: '⚡ Label Prioritas Kebutuhan' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#2C1810] text-[#C9A84C] shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* TAB 1: ADVISOR MATRIX (EDIT REKOMENDASI PER KOMBINASI)                   */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'advisor' && (
        <div className="space-y-6">
          {/* Combinations Selector (Interactive Bar) */}
          <div className="p-5 bg-gradient-to-r from-[#2C1810] to-[#1A0B06] rounded-2xl text-white shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-[#C9A84C]" />
                <span className="text-xs sm:text-sm font-bold tracking-wide">
                  PILIH KOMBINASI UNTUK DIEDIT
                </span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#C9A84C]/20 text-[#C9A84C] font-mono font-bold">
                Key: {currentKey}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sektor Selector */}
              <div>
                <label className="text-[11px] font-semibold text-neutral-300 block mb-1.5 uppercase">
                  1. Sektor Usaha:
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-black/30 p-1.5 rounded-xl border border-white/10">
                  {sections.sectors.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSector(s.id as Sector)}
                      className={`py-2 px-1 rounded-lg text-[11px] font-bold transition text-center ${
                        selectedSector === s.id
                          ? 'bg-[#C9A84C] text-[#1E0E07] shadow'
                          : 'text-neutral-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {s.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prioritas Selector */}
              <div>
                <label className="text-[11px] font-semibold text-neutral-300 block mb-1.5 uppercase">
                  2. Prioritas Kebutuhan:
                </label>
                <div className="grid grid-cols-4 gap-1 bg-black/30 p-1.5 rounded-xl border border-white/10">
                  {sections.priorities.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPriority(p.id as Priority)}
                      className={`py-2 px-1 rounded-lg text-[10px] font-bold transition text-center truncate ${
                        selectedPriority === p.id
                          ? 'bg-[#C9A84C] text-[#1E0E07] shadow'
                          : 'text-neutral-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {p.cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skala Selector */}
              <div>
                <label className="text-[11px] font-semibold text-neutral-300 block mb-1.5 uppercase">
                  3. Skala Kapasitas:
                </label>
                <div className="grid grid-cols-3 gap-1.5 bg-black/30 p-1.5 rounded-xl border border-white/10">
                  {sections.scales.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedScale(s.id as Scale)}
                      className={`py-2 px-1 rounded-lg text-[11px] font-bold transition text-center capitalize ${
                        selectedScale === s.id
                          ? 'bg-[#C9A84C] text-[#1E0E07] shadow'
                          : 'text-neutral-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {s.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Edit Card Rekomendasi & Live Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Input Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h3 className="text-base font-bold text-[#2C1810] flex items-center gap-2">
                  <span>Edit Data Unit Rekomendasi</span>
                </h3>
                <span className="text-xs text-neutral-500">
                  Sedang mengedit unit untuk kombinasi aktif
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Nama Unit Rekomendasi *
                  </label>
                  <input
                    type="text"
                    value={currentRec.unitName || ''}
                    onChange={(e) => handleUpdateCurrentRec({ unitName: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent outline-none"
                    placeholder="Contoh: Commercial Compact Ice Maker 35-50 kg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Model / Kode Unit *
                  </label>
                  <input
                    type="text"
                    value={currentRec.unitModel || ''}
                    onChange={(e) => handleUpdateCurrentRec({ unitModel: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent outline-none"
                    placeholder="Contoh: Model: AC-80X Series"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Tag / Label Highlight
                  </label>
                  <input
                    type="text"
                    value={currentRec.tag || ''}
                    onChange={(e) => handleUpdateCurrentRec({ tag: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent outline-none"
                    placeholder="Contoh: Kapasitas Compact (Outlet Kecil)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Rentang Suhu Operasional
                  </label>
                  <input
                    type="text"
                    value={currentRec.temp || ''}
                    onChange={(e) => handleUpdateCurrentRec({ temp: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent outline-none"
                    placeholder="Contoh: +2°C ~ +8°C"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Kategori Terkait (Judul)
                  </label>
                  <input
                    type="text"
                    value={currentRec.categoryTitle || ''}
                    onChange={(e) => handleUpdateCurrentRec({ categoryTitle: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent outline-none"
                    placeholder="Contoh: Ice Maker Series"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Slug Kategori (Link Produk)
                  </label>
                  <input
                    type="text"
                    value={currentRec.categorySlug || ''}
                    onChange={(e) => handleUpdateCurrentRec({ categorySlug: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent outline-none font-mono"
                    placeholder="showcase / refrigerator / icemaker / machinery"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Deskripsi / Nilai Rekomendasi
                </label>
                <textarea
                  rows={2}
                  value={currentRec.description || ''}
                  onChange={(e) => handleUpdateCurrentRec({ description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent outline-none"
                  placeholder="Jelaskan mengapa unit ini paling tepat untuk sektor dan skala ini..."
                />
              </div>

              {/* Image Upload Component */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Foto Unit Mesin
                </label>
                <ImageUpload
                  value={currentRec.unitImage || ''}
                  onChange={(url) => handleUpdateCurrentRec({ unitImage: url })}
                  label="Upload / Masukkan URL Foto Unit"
                  hint="Gunakan foto transparan PNG atau foto unit berkualitas tinggi"
                />
              </div>

              {/* 3 Highlight Specs */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-neutral-700 mb-2">
                  3 Poin Spesifikasi Unggulan
                </label>
                <div className="space-y-2">
                  {[0, 1, 2].map((idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-5 text-center text-xs font-bold text-[#C9A84C]">{idx + 1}.</span>
                      <input
                        type="text"
                        value={currentRec.highlightSpecs?.[idx] || ''}
                        onChange={(e) => handleHighlightSpecChange(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] outline-none"
                        placeholder={`Spesifikasi poin ${idx + 1}...`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Text Info Ketersediaan Unit
                </label>
                <input
                  type="text"
                  value={currentRec.sampleProductsCount || ''}
                  onChange={(e) => handleUpdateCurrentRec({ sampleProductsCount: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#C9A84C] outline-none"
                  placeholder="Contoh: 37+ Unit Model Tersedia"
                />
              </div>
            </div>

            {/* Right: Live Preview Card (5 cols) */}
            <div className="lg:col-span-5 bg-neutral-900 rounded-2xl p-5 border border-neutral-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={14} />
                  <span>Live Preview Card</span>
                </div>
                <span className="text-[10px] text-neutral-400">Tampilan Publik</span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/40 bg-gradient-to-b from-[#2A150C] to-[#160A05] p-5 shadow-2xl">
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#C9A84C] text-[#1E0E07]">
                    {currentRec.tag || 'Rekomendasi Utama'}
                  </span>
                  <span className="text-[11px] font-mono text-[#C9A84C] font-semibold">
                    {currentRec.temp || '+2°C ~ +8°C'}
                  </span>
                </div>

                {/* Unit Titles */}
                <h4 className="text-base font-extrabold text-white leading-snug">
                  {currentRec.unitName || 'Nama Unit'}
                </h4>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  {currentRec.unitModel || 'Model Unit'}
                </p>

                {/* Image Preview */}
                <div className="my-4 h-44 rounded-xl bg-black/40 border border-white/5 relative flex items-center justify-center overflow-hidden">
                  {currentRec.unitImage ? (
                    <Image
                      src={currentRec.unitImage}
                      alt={currentRec.unitName || 'Unit Image'}
                      fill
                      className="object-contain p-3 drop-shadow-lg"
                      unoptimized
                    />
                  ) : (
                    <div className="text-center text-neutral-500 text-xs">
                      <Upload size={24} className="mx-auto mb-1 opacity-50" />
                      <span>Belum ada foto</span>
                    </div>
                  )}
                </div>

                {/* Specs Bullets */}
                <div className="space-y-1.5 mb-4">
                  {(currentRec.highlightSpecs || []).map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle2 size={13} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{spec || `Poin spesifikasi ${i + 1}`}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-neutral-400 italic mb-4 border-t border-white/10 pt-3">
                  "{currentRec.description || 'Deskripsi rekomendasi unit...'}"
                </p>

                {/* Action CTA */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-neutral-400">
                    {currentRec.sampleProductsCount || 'Tersedia'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C9A84C]">
                    <span>Lihat di Katalog</span>
                    <ChevronRight size={13} />
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] text-neutral-400">
                💡 Perubahan pada form langsung tampil di preview ini. Tekan tombol{' '}
                <strong className="text-white">Simpan Perubahan</strong> di atas untuk mempublikasikannya.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* TAB 2: HERO SECTION                                                      */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'hero' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-4 max-w-3xl">
          <h3 className="text-base font-bold text-[#2C1810] border-b border-neutral-100 pb-3">
            Teks Bagian Header (Hero) Halaman Katalog
          </h3>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Badge Tag Atas</label>
            <input
              type="text"
              value={sections.hero?.badge || ''}
              onChange={(e) =>
                setSections((prev) => ({
                  ...prev,
                  hero: { ...prev.hero, badge: e.target.value },
                }))
              }
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#C9A84C] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Judul Utama (H1)</label>
            <input
              type="text"
              value={sections.hero?.title || ''}
              onChange={(e) =>
                setSections((prev) => ({
                  ...prev,
                  hero: { ...prev.hero, title: e.target.value },
                }))
              }
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#C9A84C] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Deskripsi Pengantar
            </label>
            <textarea
              rows={3}
              value={sections.hero?.description || ''}
              onChange={(e) =>
                setSections((prev) => ({
                  ...prev,
                  hero: { ...prev.hero, description: e.target.value },
                }))
              }
              className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-[#C9A84C] outline-none"
            />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* TAB 3: SECTORS CONFIGURATION                                             */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'sectors' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-4 max-w-3xl">
          <h3 className="text-base font-bold text-[#2C1810] border-b border-neutral-100 pb-3">
            Opsi Pilihan Sektor Usaha
          </h3>

          <div className="space-y-4">
            {sections.sectors.map((s, idx) => (
              <div key={s.id} className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-neutral-500">ID: {s.id}</span>
                  <span className="text-xs font-semibold text-[#C9A84C]">Sektor #{idx + 1}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 mb-1">Label</label>
                    <input
                      type="text"
                      value={s.label}
                      onChange={(e) => {
                        const updated = [...sections.sectors];
                        updated[idx].label = e.target.value;
                        setSections((prev) => ({ ...prev, sectors: updated }));
                      }}
                      className="w-full px-3 py-1.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 mb-1">Sub Label</label>
                    <input
                      type="text"
                      value={s.sub}
                      onChange={(e) => {
                        const updated = [...sections.sectors];
                        updated[idx].sub = e.target.value;
                        setSections((prev) => ({ ...prev, sectors: updated }));
                      }}
                      className="w-full px-3 py-1.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* TAB 4: PRIORITIES CONFIGURATION                                          */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'priorities' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-4 max-w-3xl">
          <h3 className="text-base font-bold text-[#2C1810] border-b border-neutral-100 pb-3">
            Opsi Pilihan Prioritas Kebutuhan
          </h3>

          <div className="space-y-4">
            {sections.priorities.map((p, idx) => (
              <div key={p.id} className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-neutral-500">ID: {p.id}</span>
                  <span className="text-xs font-semibold text-[#C9A84C]">Kategori: {p.cat}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 mb-1">Label</label>
                    <input
                      type="text"
                      value={p.label}
                      onChange={(e) => {
                        const updated = [...sections.priorities];
                        updated[idx].label = e.target.value;
                        setSections((prev) => ({ ...prev, priorities: updated }));
                      }}
                      className="w-full px-3 py-1.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 mb-1">Badge Kategori</label>
                    <input
                      type="text"
                      value={p.cat}
                      onChange={(e) => {
                        const updated = [...sections.priorities];
                        updated[idx].cat = e.target.value;
                        setSections((prev) => ({ ...prev, priorities: updated }));
                      }}
                      className="w-full px-3 py-1.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">Deskripsi Singkat</label>
                  <input
                    type="text"
                    value={p.desc}
                    onChange={(e) => {
                      const updated = [...sections.priorities];
                      updated[idx].desc = e.target.value;
                      setSections((prev) => ({ ...prev, priorities: updated }));
                    }}
                    className="w-full px-3 py-1.5 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
