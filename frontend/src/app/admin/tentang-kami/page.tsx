'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { Toast } from '@/components/admin/Toast';
import { GoogleSearchPreview } from '@/components/admin/GoogleSearchPreview';

export default function EditTentangKamiPage() {
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
    hero: { title: '', subtitle: '', backgroundImage: '' },
    history: { title: '', paragraph1: '', paragraph2: '', warehouseSlides: [] },
    vision: { badge: '', title: { line1: '', line2: '', line3: '' }, description1: '', description2: '', tagline: '' },
    customization: { badge: '', title: '', description: '', showcaseImage: '', features: [] },
  });

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = async () => {
    try {
      const token = localStorage.getItem('holic_admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/slug/tentang-kami`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
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
      const token = localStorage.getItem('holic_admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ sections, status, metadata }),
      });
      if (res.ok) {
        setToast({ type: 'success', message: 'Halaman Tentang Kami berhasil diperbarui!' });
      } else {
        setToast({ type: 'error', message: 'Gagal menyimpan perubahan' });
      }
    } catch (err: any) {
      setToast({ type: 'error', message: err.message || 'Terjadi kesalahan' });
    } finally {
      setSaving(false);
    }
  };

  // Add/Remove functions for dynamic arrays
  const addWarehouseSlide = () => {
    setSections({
      ...sections,
      history: {
        ...sections.history,
        warehouseSlides: [...sections.history.warehouseSlides, ''],
      },
    });
  };

  const removeWarehouseSlide = (index: number) => {
    setSections({
      ...sections,
      history: {
        ...sections.history,
        warehouseSlides: sections.history.warehouseSlides.filter((_: any, i: number) => i !== index),
      },
    });
  };

  const addCustomFeature = () => {
    setSections({
      ...sections,
      customization: {
        ...sections.customization,
        features: [...sections.customization.features, { title: '', description: '' }],
      },
    });
  };

  const removeCustomFeature = (index: number) => {
    setSections({
      ...sections,
      customization: {
        ...sections.customization,
        features: sections.customization.features.filter((_: any, i: number) => i !== index),
      },
    });
  };

  const autoGenerateSEO = async () => {
    try {
      setGenerating(true);
      const token = localStorage.getItem('holic_admin_token');
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/generate-seo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: sections,
          pageType: 'tentang-kami',
        }),
      });

      if (res.ok) {
        const generated = await res.json();
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
      const generatedTitle = `${sections.hero.title} | Holicindo`;
      const generatedDescription = sections.history.paragraph1.substring(0, 160);
      const generatedKeywords = 'tentang holicindo, sejarah perusahaan, visi misi, showcase manufacturer, profil perusahaan';

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
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin')} className="p-2 hover:bg-[#F5F1E8] rounded-lg transition">
            <ArrowLeft size={24} className="text-[#2C1810]" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#2C1810]">Edit Halaman Tentang Kami</h1>
            <p className="text-[#2C1810]/60">Kelola informasi perusahaan</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStatus(status === 'published' ? 'draft' : 'published')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-bold transition ${
              status === 'published' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-yellow-100 text-yellow-700 border-yellow-300'
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
        {/* Hero */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">Hero Section</h2>
          <div className="space-y-4">
            <input type="text" value={sections.hero.title} onChange={e => setSections({ ...sections, hero: { ...sections.hero, title: e.target.value } })} placeholder="Judul" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <textarea value={sections.hero.subtitle} onChange={e => setSections({ ...sections, hero: { ...sections.hero, subtitle: e.target.value } })} rows={2} placeholder="Subtitle" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <ImageUpload
              label="Background Image"
              value={sections.hero.backgroundImage}
              onChange={url => setSections({ ...sections, hero: { ...sections.hero, backgroundImage: url } })}
            />
          </div>
        </section>

        {/* History */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">Sejarah Perusahaan</h2>
          <div className="space-y-4">
            <input type="text" value={sections.history.title} onChange={e => setSections({ ...sections, history: { ...sections.history, title: e.target.value } })} placeholder="Judul" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <textarea value={sections.history.paragraph1} onChange={e => setSections({ ...sections, history: { ...sections.history, paragraph1: e.target.value } })} rows={3} placeholder="Paragraf 1" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <textarea value={sections.history.paragraph2} onChange={e => setSections({ ...sections, history: { ...sections.history, paragraph2: e.target.value } })} rows={3} placeholder="Paragraf 2" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-[#2C1810]">Warehouse Slides</label>
                <button onClick={addWarehouseSlide} className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg border border-green-300 text-sm font-semibold hover:bg-green-200 transition">
                  <Plus size={14} /> Tambah Slide
                </button>
              </div>
              <div className="space-y-3">
                {sections.history.warehouseSlides.map((slide: string, idx: number) => (
                  <div key={idx} className="p-4 bg-[#FAF7F0] rounded-xl border border-[#2C1810]/10">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-[#2C1810]">Slide #{idx + 1}</span>
                      <button onClick={() => removeWarehouseSlide(idx)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <ImageUpload
                      label={`Slide Warehouse ${idx + 1}`}
                      value={slide}
                      onChange={url => {
                        const newSlides = [...sections.history.warehouseSlides];
                        newSlides[idx] = url;
                        setSections({ ...sections, history: { ...sections.history, warehouseSlides: newSlides } });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">Visi</h2>
          <div className="space-y-4">
            <input type="text" value={sections.vision.badge} onChange={e => setSections({ ...sections, vision: { ...sections.vision, badge: e.target.value } })} placeholder="Badge (VISI)" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <input type="text" value={sections.vision.title.line1} onChange={e => setSections({ ...sections, vision: { ...sections.vision, title: { ...sections.vision.title, line1: e.target.value } } })} placeholder="Judul Baris 1" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <input type="text" value={sections.vision.title.line2} onChange={e => setSections({ ...sections, vision: { ...sections.vision, title: { ...sections.vision.title, line2: e.target.value } } })} placeholder="Judul Baris 2" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <input type="text" value={sections.vision.title.line3} onChange={e => setSections({ ...sections, vision: { ...sections.vision, title: { ...sections.vision.title, line3: e.target.value } } })} placeholder="Judul Baris 3 (emas)" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <textarea value={sections.vision.description1} onChange={e => setSections({ ...sections, vision: { ...sections.vision, description1: e.target.value } })} rows={2} placeholder="Deskripsi 1" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <textarea value={sections.vision.description2} onChange={e => setSections({ ...sections, vision: { ...sections.vision, description2: e.target.value } })} rows={2} placeholder="Deskripsi 2" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <input type="text" value={sections.vision.tagline} onChange={e => setSections({ ...sections, vision: { ...sections.vision, tagline: e.target.value } })} placeholder="Tagline (italic)" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
          </div>
        </section>

        {/* Customization */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">Kustomisasi</h2>
          <div className="space-y-4">
            <input type="text" value={sections.customization.badge} onChange={e => setSections({ ...sections, customization: { ...sections.customization, badge: e.target.value } })} placeholder="Badge" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <input type="text" value={sections.customization.title} onChange={e => setSections({ ...sections, customization: { ...sections.customization, title: e.target.value } })} placeholder="Judul" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <textarea value={sections.customization.description} onChange={e => setSections({ ...sections, customization: { ...sections.customization, description: e.target.value } })} rows={2} placeholder="Deskripsi" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <ImageUpload
              label="Showcase Image"
              value={sections.customization.showcaseImage}
              onChange={url => setSections({ ...sections, customization: { ...sections.customization, showcaseImage: url } })}
            />
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-[#2C1810]">Fitur Kustomisasi</label>
                <button onClick={addCustomFeature} className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg border border-green-300 text-sm font-semibold hover:bg-green-200 transition">
                  <Plus size={14} /> Tambah Fitur
                </button>
              </div>
              <div className="space-y-3">
                {sections.customization.features.map((feature: any, idx: number) => (
                  <div key={idx} className="p-4 bg-[#FAF7F0] rounded-xl border border-[#2C1810]/10">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-[#2C1810]">Fitur #{idx + 1}</h4>
                      <button onClick={() => removeCustomFeature(idx)} className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input type="text" value={feature.title} onChange={e => {
                        const newFeatures = [...sections.customization.features];
                        newFeatures[idx].title = e.target.value;
                        setSections({ ...sections, customization: { ...sections.customization, features: newFeatures } });
                      }} placeholder="Judul fitur" className="w-full px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm font-semibold" />
                      <textarea value={feature.description} onChange={e => {
                        const newFeatures = [...sections.customization.features];
                        newFeatures[idx].description = e.target.value;
                        setSections({ ...sections, customization: { ...sections.customization, features: newFeatures } });
                      }} rows={2} placeholder="Deskripsi" className="w-full px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm" />
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
              className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-white rounded-lg font-semibold hover:bg-[#B8941E] transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
                placeholder="Tentang Kami - Holicindo | Est. 2001"
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
                placeholder="Kenali lebih dekat Holicindo, spesialis showcase & pendingin komersial sejak 2001. Visi, misi, dan komitmen kami untuk industri Indonesia."
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
                placeholder="tentang holicindo, sejarah perusahaan, visi misi, showcase manufacturer"
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
                title={metadata.seoTitle || sections.hero.title}
                description={metadata.seoDescription || sections.history.paragraph1}
                url="https://holicindo.com/tentang-kami"
              />
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] text-[#2C1810] rounded-xl border-2 border-[#2C1810]/20 font-bold text-lg hover:shadow-lg transition disabled:opacity-50">
          {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  );
}
