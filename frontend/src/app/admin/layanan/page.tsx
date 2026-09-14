'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { Toast } from '@/components/admin/Toast';
import { GoogleSearchPreview } from '@/components/admin/GoogleSearchPreview';

export default function EditLayananPage() {
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
    hero: { badge: '', title: '', description: '', slides: [] },
    services: { title: '', description: '', items: [] },
    smartEcosystem: { badge: '', title: '', description: '', showcaseImage: '', features: [], contactLink: '' },
  });

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = async () => {
    try {
      const token = localStorage.getItem('holic_admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/slug/layanan`, {
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
        setToast({ type: 'success', message: 'Halaman Layanan berhasil diperbarui!' });
      } else {
        setToast({ type: 'error', message: 'Gagal menyimpan perubahan' });
      }
    } catch (err: any) {
      setToast({ type: 'error', message: err.message || 'Terjadi kesalahan' });
    } finally {
      setSaving(false);
    }
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
          pageType: 'layanan',
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
      const generatedDescription = sections.hero.description.substring(0, 160);
      const generatedKeywords = 'layanan showcase, custom showcase, instalasi pendingin, maintenance cooler, desain display';

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
            <h1 className="text-3xl font-bold text-[#2C1810]">Edit Halaman Layanan</h1>
            <p className="text-[#2C1810]/60">Kelola informasi layanan</p>
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
            <input type="text" value={sections.hero.badge} onChange={e => setSections({ ...sections, hero: { ...sections.hero, badge: e.target.value } })} placeholder="Badge" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <input type="text" value={sections.hero.title} onChange={e => setSections({ ...sections, hero: { ...sections.hero, title: e.target.value } })} placeholder="Judul" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <textarea value={sections.hero.description} onChange={e => setSections({ ...sections, hero: { ...sections.hero, description: e.target.value } })} rows={3} placeholder="Deskripsi" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Hero Slides</label>
              <div className="space-y-3">
                {sections.hero.slides.map((slide: string, idx: number) => (
                  <ImageUpload
                    key={idx}
                    label={`Slide ${idx + 1}`}
                    value={slide}
                    onChange={url => {
                      const newSlides = [...sections.hero.slides];
                      newSlides[idx] = url;
                      setSections({ ...sections, hero: { ...sections.hero, slides: newSlides } });
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">Layanan</h2>
          <div className="space-y-4">
            <input type="text" value={sections.services.title} onChange={e => setSections({ ...sections, services: { ...sections.services, title: e.target.value } })} placeholder="Judul" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <textarea value={sections.services.description} onChange={e => setSections({ ...sections, services: { ...sections.services, description: e.target.value } })} rows={2} placeholder="Deskripsi" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Item Layanan</label>
              {sections.services.items.map((item: any, idx: number) => (
                <div key={idx} className="p-4 mb-3 bg-[#FAF7F0] rounded-xl border border-[#2C1810]/10">
                  <h4 className="font-bold text-[#2C1810] mb-2">Layanan #{idx + 1}</h4>
                  <input type="text" value={item.title} onChange={e => {
                    const newItems = [...sections.services.items];
                    newItems[idx].title = e.target.value;
                    setSections({ ...sections, services: { ...sections.services, items: newItems } });
                  }} placeholder="Judul layanan" className="w-full px-3 py-2 mb-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm" />
                  <textarea value={item.description} onChange={e => {
                    const newItems = [...sections.services.items];
                    newItems[idx].description = e.target.value;
                    setSections({ ...sections, services: { ...sections.services, items: newItems } });
                  }} rows={2} placeholder="Deskripsi" className="w-full px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Smart Ecosystem */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">Smart Ecosystem</h2>
          <div className="space-y-4">
            <input type="text" value={sections.smartEcosystem.badge} onChange={e => setSections({ ...sections, smartEcosystem: { ...sections.smartEcosystem, badge: e.target.value } })} placeholder="Badge" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <input type="text" value={sections.smartEcosystem.title} onChange={e => setSections({ ...sections, smartEcosystem: { ...sections.smartEcosystem, title: e.target.value } })} placeholder="Judul" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <textarea value={sections.smartEcosystem.description} onChange={e => setSections({ ...sections, smartEcosystem: { ...sections.smartEcosystem, description: e.target.value } })} rows={3} placeholder="Deskripsi" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <ImageUpload
              label="Showcase Image"
              value={sections.smartEcosystem.showcaseImage}
              onChange={url => setSections({ ...sections, smartEcosystem: { ...sections.smartEcosystem, showcaseImage: url } })}
            />
            <input type="text" value={sections.smartEcosystem.contactLink} onChange={e => setSections({ ...sections, smartEcosystem: { ...sections.smartEcosystem, contactLink: e.target.value } })} placeholder="Link WhatsApp" className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl" />
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Fitur</label>
              {sections.smartEcosystem.features.map((feature: any, idx: number) => (
                <div key={idx} className="p-3 mb-2 bg-[#FAF7F0] rounded-xl">
                  <input type="text" value={feature.title} onChange={e => {
                    const newFeatures = [...sections.smartEcosystem.features];
                    newFeatures[idx].title = e.target.value;
                    setSections({ ...sections, smartEcosystem: { ...sections.smartEcosystem, features: newFeatures } });
                  }} placeholder="Judul fitur" className="w-full px-3 py-2 mb-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm" />
                  <textarea value={feature.description} onChange={e => {
                    const newFeatures = [...sections.smartEcosystem.features];
                    newFeatures[idx].description = e.target.value;
                    setSections({ ...sections, smartEcosystem: { ...sections.smartEcosystem, features: newFeatures } });
                  }} rows={2} placeholder="Deskripsi" className="w-full px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm" />
                </div>
              ))}
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
                placeholder="Layanan Showcase & Pendingin Komersial | Holicindo"
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
                placeholder="Desain custom, instalasi, maintenance showcase & pendingin komersial. Solusi lengkap dari Holicindo untuk bisnis F&B, retail, farmasi."
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
                placeholder="layanan showcase, custom showcase, instalasi pendingin, maintenance cooler"
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
                description={metadata.seoDescription || sections.hero.description}
                url="https://holicindo.com/layanan"
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
