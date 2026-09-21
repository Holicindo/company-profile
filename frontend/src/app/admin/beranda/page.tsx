'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { Toast } from '@/components/admin/Toast';
import { GoogleSearchPreview } from '@/components/admin/GoogleSearchPreview';
import { fetchAdminPageBySlug, updateAdminPage, generateAdminSeo } from '@/lib/admin-api';

export default function EditBerandaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [pageId, setPageId] = useState<number | null>(null);
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [metadata, setMetadata] = useState({
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    ogImage: '',
  });
  const [sections, setSections] = useState<any>({
    mainHero: {
      subtitle: '',
      title: { line1: '', line2: '' },
      slides: [],
    },
    heroSection: {
      badge: '',
      title: '',
      description: '',
      image: '',
      stats: { products: '', warranty: '', support: '' },
      videoUrl: '',
    },
    whyChooseUs: {
      title: '',
      subtitle: '',
      features: [],
    },
  });

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = async () => {
    try {
      const data = await fetchAdminPageBySlug('beranda');
      if (data) {
        setPageId(data.id);
        setStatus(data.status);
        setSections(data.sections);
        if (data.metadata) {
          setMetadata({
            seoTitle: data.metadata.seoTitle || '',
            seoDescription: data.metadata.seoDescription || '',
            seoKeywords: data.metadata.seoKeywords || '',
            ogImage: data.metadata.ogImage || '',
          });
        }
      }
    } catch (err) {
      console.error('Failed to fetch page:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!pageId) {
      setToast({ type: 'error', message: 'Halaman belum dibuat. Jalankan seeder terlebih dahulu.' });
      return;
    }
    try {
      setSaving(true);
      await updateAdminPage(pageId, { sections, status, metadata });
      setToast({ type: 'success', message: 'Halaman Beranda berhasil diperbarui!' });
    } catch (err: any) {
      setToast({ type: 'error', message: err.message || 'Terjadi kesalahan' });
    } finally {
      setSaving(false);
    }
  };

  const addSlide = () => {
    setSections({
      ...sections,
      mainHero: {
        ...sections.mainHero,
        slides: [...sections.mainHero.slides, ''],
      },
    });
  };

  const removeSlide = (index: number) => {
    setSections({
      ...sections,
      mainHero: {
        ...sections.mainHero,
        slides: sections.mainHero.slides.filter((_: any, i: number) => i !== index),
      },
    });
  };

  const addFeature = () => {
    setSections({
      ...sections,
      whyChooseUs: {
        ...sections.whyChooseUs,
        features: [...sections.whyChooseUs.features, { title: '', description: '' }],
      },
    });
  };

  const removeFeature = (index: number) => {
    setSections({
      ...sections,
      whyChooseUs: {
        ...sections.whyChooseUs,
        features: sections.whyChooseUs.features.filter((_: any, i: number) => i !== index),
      },
    });
  };

  const autoGenerateSEO = async () => {
    try {
      setGenerating(true);
      const generated = await generateAdminSeo({
        content: sections,
        pageType: 'beranda',
      });

      if (generated) {
        setMetadata({
          ...metadata,
          seoTitle: generated.title,
          seoDescription: generated.description,
          seoKeywords: generated.keywords,
        });
        setToast({ type: 'success', message: 'SEO berhasil di-generate dengan AI! Silakan review dan edit jika perlu.' });
      } else {
        throw new Error('Failed to generate SEO');
      }
    } catch (error) {
      console.error('SEO generation error:', error);
      // Fallback to simple generation
      const generatedTitle = `${sections.mainHero.title.line1} ${sections.mainHero.title.line2} | Holicindo`;
      const generatedDescription = sections.heroSection.description.substring(0, 160);
      const generatedKeywords = 'showcase komersial, kulkas display, pendingin komersial, display cooler, holicindo';

      setMetadata({
        ...metadata,
        seoTitle: generatedTitle.substring(0, 60),
        seoDescription: generatedDescription,
        seoKeywords: generatedKeywords,
      });
      setToast({ type: 'success', message: 'SEO berhasil di-generate dari konten halaman!' });
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 size={48} className="animate-spin text-[#B8941E]" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin')} className="p-2 hover:bg-[#F5F1E8] rounded-lg transition">
            <ArrowLeft size={24} className="text-[#2C1810]" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#2C1810]">Edit Halaman Beranda</h1>
            <p className="text-[#2C1810]/60">Kelola konten halaman utama website</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStatus(status === 'published' ? 'draft' : 'published')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-bold transition ${
              status === 'published'
                ? 'bg-green-100 text-green-700 border-green-300'
                : 'bg-yellow-100 text-yellow-700 border-yellow-300'
            }`}
          >
            {status === 'published' ? <Eye size={18} /> : <EyeOff size={18} />}
            {status === 'published' ? 'Published' : 'Draft'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] text-[#2C1810] rounded-xl border-2 border-[#2C1810]/20 font-bold hover:shadow-lg transition disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Main Hero Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            Hero Utama (Slideshow)
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Subtitle (Badge)</label>
              <input
                type="text"
                value={sections.mainHero.subtitle}
                onChange={e => setSections({ ...sections, mainHero: { ...sections.mainHero, subtitle: e.target.value } })}
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul Baris 1</label>
                <input
                  type="text"
                  value={sections.mainHero.title.line1}
                  onChange={e => setSections({ ...sections, mainHero: { ...sections.mainHero, title: { ...sections.mainHero.title, line1: e.target.value } } })}
                  className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul Baris 2</label>
                <input
                  type="text"
                  value={sections.mainHero.title.line2}
                  onChange={e => setSections({ ...sections, mainHero: { ...sections.mainHero, title: { ...sections.mainHero.title, line2: e.target.value } } })}
                  className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-[#2C1810]">Gambar Slides</label>
                <button onClick={addSlide} className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg border border-green-300 text-sm font-semibold hover:bg-green-200 transition">
                  <Plus size={14} /> Tambah Slide
                </button>
              </div>
              <div className="space-y-3">
                {sections.mainHero.slides.map((slide: string, idx: number) => (
                  <div key={idx} className="p-4 bg-[#FAF7F0] rounded-xl border border-[#2C1810]/10">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-[#2C1810]">Slide #{idx + 1}</span>
                      <button onClick={() => removeSlide(idx)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <ImageUpload
                      label="Gambar Slide"
                      value={slide}
                      onChange={url => {
                        const newSlides = [...sections.mainHero.slides];
                        newSlides[idx] = url;
                        setSections({ ...sections, mainHero: { ...sections.mainHero, slides: newSlides } });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section (dengan gambar produk) */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            Hero Section (Produk)
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Badge</label>
              <input
                type="text"
                value={sections.heroSection.badge}
                onChange={e => setSections({ ...sections, heroSection: { ...sections.heroSection, badge: e.target.value } })}
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul</label>
              <input
                type="text"
                value={sections.heroSection.title}
                onChange={e => setSections({ ...sections, heroSection: { ...sections.heroSection, title: e.target.value } })}
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Deskripsi</label>
              <textarea
                value={sections.heroSection.description}
                onChange={e => setSections({ ...sections, heroSection: { ...sections.heroSection, description: e.target.value } })}
                rows={3}
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <ImageUpload
              label="Gambar Produk"
              value={sections.heroSection.image}
              onChange={url => setSections({ ...sections, heroSection: { ...sections.heroSection, image: url } })}
            />
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2C1810] mb-2">Stat: Produk</label>
                <input
                  type="text"
                  value={sections.heroSection.stats.products}
                  onChange={e => setSections({ ...sections, heroSection: { ...sections.heroSection, stats: { ...sections.heroSection.stats, products: e.target.value } } })}
                  className="w-full px-4 py-2 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2C1810] mb-2">Stat: Garansi</label>
                <input
                  type="text"
                  value={sections.heroSection.stats.warranty}
                  onChange={e => setSections({ ...sections, heroSection: { ...sections.heroSection, stats: { ...sections.heroSection.stats, warranty: e.target.value } } })}
                  className="w-full px-4 py-2 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2C1810] mb-2">Stat: Support</label>
                <input
                  type="text"
                  value={sections.heroSection.stats.support}
                  onChange={e => setSections({ ...sections, heroSection: { ...sections.heroSection, stats: { ...sections.heroSection.stats, support: e.target.value } } })}
                  className="w-full px-4 py-2 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">URL Video YouTube</label>
              <input
                type="text"
                value={sections.heroSection.videoUrl}
                onChange={e => setSections({ ...sections, heroSection: { ...sections.heroSection, videoUrl: e.target.value } })}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            Mengapa Memilih Kami
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul</label>
              <input
                type="text"
                value={sections.whyChooseUs.title}
                onChange={e => setSections({ ...sections, whyChooseUs: { ...sections.whyChooseUs, title: e.target.value } })}
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Subtitle</label>
              <textarea
                value={sections.whyChooseUs.subtitle}
                onChange={e => setSections({ ...sections, whyChooseUs: { ...sections.whyChooseUs, subtitle: e.target.value } })}
                rows={2}
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-[#2C1810]">Fitur</label>
                <button onClick={addFeature} className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg border border-green-300 text-sm font-semibold hover:bg-green-200 transition">
                  <Plus size={14} /> Tambah Fitur
                </button>
              </div>
              <div className="space-y-3">
                {sections.whyChooseUs.features.map((feature: any, idx: number) => (
                  <div key={idx} className="p-4 bg-[#FAF7F0] rounded-xl border border-[#2C1810]/10">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-[#2C1810]">Fitur #{idx + 1}</h4>
                      <button onClick={() => removeFeature(idx)} className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={feature.title}
                        onChange={e => {
                          const newFeatures = [...sections.whyChooseUs.features];
                          newFeatures[idx].title = e.target.value;
                          setSections({ ...sections, whyChooseUs: { ...sections.whyChooseUs, features: newFeatures } });
                        }}
                        placeholder="Judul fitur"
                        className="w-full px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm font-semibold text-[#2C1810]"
                      />
                      <textarea
                        value={feature.description}
                        onChange={e => {
                          const newFeatures = [...sections.whyChooseUs.features];
                          newFeatures[idx].description = e.target.value;
                          setSections({ ...sections, whyChooseUs: { ...sections.whyChooseUs, features: newFeatures } });
                        }}
                        rows={2}
                        placeholder="Deskripsi fitur"
                        className="w-full px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm text-[#2C1810]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEO Settings Section */}
        <section className="bg-gradient-to-br from-[#FAF7F0] to-[#F5F1E8] p-6 rounded-2xl border-2 border-[#C9A84C]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#C9A84C]/30">
            <h2 className="text-xl font-bold text-[#2C1810]">
              🔍 Pengaturan SEO
            </h2>
            <button
              onClick={autoGenerateSEO}
              disabled={generating}
              className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-white rounded-lg font-semibold hover:bg-[#B8941E] transition text-sm disabled:opacity-50 disabled:cursor-not-wait"
            >
              {generating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  ✨ Generate dengan AI
                </>
              )}
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">
                SEO Title
                <span className="text-xs font-normal text-neutral-500 ml-2">(Max 60 karakter)</span>
              </label>
              <input
                type="text"
                value={metadata.seoTitle}
                onChange={e => setMetadata({ ...metadata, seoTitle: e.target.value })}
                maxLength={60}
                placeholder="Showcase Komersial Terbaik Indonesia | Holicindo"
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50"
              />
              <div className="text-xs text-right mt-1">
                <span className={metadata.seoTitle.length > 60 ? 'text-red-600 font-bold' : 'text-neutral-500'}>
                  {metadata.seoTitle.length}/60
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">
                SEO Description
                <span className="text-xs font-normal text-neutral-500 ml-2">(Max 160 karakter)</span>
              </label>
              <textarea
                value={metadata.seoDescription}
                onChange={e => setMetadata({ ...metadata, seoDescription: e.target.value })}
                maxLength={160}
                rows={3}
                placeholder="Spesialis showcase & pendingin komersial sejak 2001. Solusi display berkualitas premium untuk bisnis F&B, retail, dan farmasi di seluruh Indonesia."
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50"
              />
              <div className="text-xs text-right mt-1">
                <span className={metadata.seoDescription.length > 160 ? 'text-red-600 font-bold' : 'text-neutral-500'}>
                  {metadata.seoDescription.length}/160
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">
                SEO Keywords
                <span className="text-xs font-normal text-neutral-500 ml-2">(Pisahkan dengan koma)</span>
              </label>
              <input
                type="text"
                value={metadata.seoKeywords}
                onChange={e => setMetadata({ ...metadata, seoKeywords: e.target.value })}
                placeholder="showcase komersial, kulkas display, pendingin komersial, display cooler"
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50"
              />
            </div>

            <ImageUpload
              label="OG Image (Gambar Preview untuk Social Media)"
              value={metadata.ogImage}
              onChange={url => setMetadata({ ...metadata, ogImage: url })}
            />

            {/* Google Search Preview */}
            <div className="mt-6">
              <GoogleSearchPreview
                title={metadata.seoTitle || sections.mainHero.title.line1 + ' ' + sections.mainHero.title.line2}
                description={metadata.seoDescription || sections.heroSection.description}
                url="https://holicindo.com"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Save Button Bottom */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] text-[#2C1810] rounded-xl border-2 border-[#2C1810]/20 font-bold text-lg hover:shadow-lg transition disabled:opacity-50"
        >
          {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  );
}
