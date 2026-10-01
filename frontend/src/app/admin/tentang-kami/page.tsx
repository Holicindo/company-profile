'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { Toast } from '@/components/admin/Toast';
import { BilingualInput } from '@/components/admin/BilingualInput';
import { GoogleSearchPreview } from '@/components/admin/GoogleSearchPreview';
import { fetchAdminPageBySlug, updateAdminPage, generateAdminSeo } from '@/lib/admin-api';

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
      const data = await fetchAdminPageBySlug('tentang-kami');
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
      setToast({ type: 'success', message: 'Halaman Tentang Kami berhasil diperbarui!' });
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
      const generated = await generateAdminSeo({
        content: sections,
        pageType: 'tentang-kami',
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
    <div className="w-full">
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
            <BilingualInput
              label="Judul"
              valueId={sections.hero?.titleId || sections.hero?.title || ''}
              valueEn={sections.hero?.titleEn || ''}
              onChangeId={val => setSections({ ...sections, hero: { ...sections.hero, titleId: val, title: val } })}
              onChangeEn={val => setSections({ ...sections, hero: { ...sections.hero, titleEn: val } })}
              placeholderId="Profil Perusahaan"
            />
            <BilingualInput
              label="Subtitle"
              type="textarea"
              valueId={sections.hero?.subtitleId || sections.hero?.subtitle || ''}
              valueEn={sections.hero?.subtitleEn || ''}
              onChangeId={val => setSections({ ...sections, hero: { ...sections.hero, subtitleId: val, subtitle: val } })}
              onChangeEn={val => setSections({ ...sections, hero: { ...sections.hero, subtitleEn: val } })}
            />
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
            <BilingualInput
              label="Judul"
              valueId={sections.history?.titleId || sections.history?.title || ''}
              valueEn={sections.history?.titleEn || ''}
              onChangeId={val => setSections({ ...sections, history: { ...sections.history, titleId: val, title: val } })}
              onChangeEn={val => setSections({ ...sections, history: { ...sections.history, titleEn: val } })}
              placeholderId="Sejarah Perusahaan"
            />
            <BilingualInput
              label="Paragraf 1"
              type="textarea"
              valueId={sections.history?.paragraph1Id || sections.history?.paragraph1 || ''}
              valueEn={sections.history?.paragraph1En || ''}
              onChangeId={val => setSections({ ...sections, history: { ...sections.history, paragraph1Id: val, paragraph1: val } })}
              onChangeEn={val => setSections({ ...sections, history: { ...sections.history, paragraph1En: val } })}
            />
            <BilingualInput
              label="Paragraf 2"
              type="textarea"
              valueId={sections.history?.paragraph2Id || sections.history?.paragraph2 || ''}
              valueEn={sections.history?.paragraph2En || ''}
              onChangeId={val => setSections({ ...sections, history: { ...sections.history, paragraph2Id: val, paragraph2: val } })}
              onChangeEn={val => setSections({ ...sections, history: { ...sections.history, paragraph2En: val } })}
            />
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
            <BilingualInput
              label="Badge (VISI)"
              valueId={sections.vision?.badgeId || sections.vision?.badge || ''}
              valueEn={sections.vision?.badgeEn || ''}
              onChangeId={val => setSections({ ...sections, vision: { ...sections.vision, badgeId: val, badge: val } })}
              onChangeEn={val => setSections({ ...sections, vision: { ...sections.vision, badgeEn: val } })}
            />
            <BilingualInput
              label="Judul Baris 1"
              valueId={sections.vision?.title?.line1Id || sections.vision?.title?.line1 || ''}
              valueEn={sections.vision?.title?.line1En || ''}
              onChangeId={val => setSections({ ...sections, vision: { ...sections.vision, title: { ...sections.vision.title, line1Id: val, line1: val } } })}
              onChangeEn={val => setSections({ ...sections, vision: { ...sections.vision, title: { ...sections.vision.title, line1En: val } } })}
            />
            <BilingualInput
              label="Judul Baris 2"
              valueId={sections.vision?.title?.line2Id || sections.vision?.title?.line2 || ''}
              valueEn={sections.vision?.title?.line2En || ''}
              onChangeId={val => setSections({ ...sections, vision: { ...sections.vision, title: { ...sections.vision.title, line2Id: val, line2: val } } })}
              onChangeEn={val => setSections({ ...sections, vision: { ...sections.vision, title: { ...sections.vision.title, line2En: val } } })}
            />
            <BilingualInput
              label="Judul Baris 3 (emas)"
              valueId={sections.vision?.title?.line3Id || sections.vision?.title?.line3 || ''}
              valueEn={sections.vision?.title?.line3En || ''}
              onChangeId={val => setSections({ ...sections, vision: { ...sections.vision, title: { ...sections.vision.title, line3Id: val, line3: val } } })}
              onChangeEn={val => setSections({ ...sections, vision: { ...sections.vision, title: { ...sections.vision.title, line3En: val } } })}
            />
            <BilingualInput
              label="Deskripsi 1"
              type="textarea"
              valueId={sections.vision?.description1Id || sections.vision?.description1 || ''}
              valueEn={sections.vision?.description1En || ''}
              onChangeId={val => setSections({ ...sections, vision: { ...sections.vision, description1Id: val, description1: val } })}
              onChangeEn={val => setSections({ ...sections, vision: { ...sections.vision, description1En: val } })}
            />
            <BilingualInput
              label="Deskripsi 2"
              type="textarea"
              valueId={sections.vision?.description2Id || sections.vision?.description2 || ''}
              valueEn={sections.vision?.description2En || ''}
              onChangeId={val => setSections({ ...sections, vision: { ...sections.vision, description2Id: val, description2: val } })}
              onChangeEn={val => setSections({ ...sections, vision: { ...sections.vision, description2En: val } })}
            />
            <BilingualInput
              label="Tagline (italic)"
              valueId={sections.vision?.taglineId || sections.vision?.tagline || ''}
              valueEn={sections.vision?.taglineEn || ''}
              onChangeId={val => setSections({ ...sections, vision: { ...sections.vision, taglineId: val, tagline: val } })}
              onChangeEn={val => setSections({ ...sections, vision: { ...sections.vision, taglineEn: val } })}
            />
          </div>
        </section>

        {/* Customization */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">Kustomisasi</h2>
          <div className="space-y-4">
            <BilingualInput
              label="Badge"
              valueId={sections.customization?.badgeId || sections.customization?.badge || ''}
              valueEn={sections.customization?.badgeEn || ''}
              onChangeId={val => setSections({ ...sections, customization: { ...sections.customization, badgeId: val, badge: val } })}
              onChangeEn={val => setSections({ ...sections, customization: { ...sections.customization, badgeEn: val } })}
            />
            <BilingualInput
              label="Judul"
              valueId={sections.customization?.titleId || sections.customization?.title || ''}
              valueEn={sections.customization?.titleEn || ''}
              onChangeId={val => setSections({ ...sections, customization: { ...sections.customization, titleId: val, title: val } })}
              onChangeEn={val => setSections({ ...sections, customization: { ...sections.customization, titleEn: val } })}
            />
            <BilingualInput
              label="Deskripsi"
              type="textarea"
              valueId={sections.customization?.descriptionId || sections.customization?.description || ''}
              valueEn={sections.customization?.descriptionEn || ''}
              onChangeId={val => setSections({ ...sections, customization: { ...sections.customization, descriptionId: val, description: val } })}
              onChangeEn={val => setSections({ ...sections, customization: { ...sections.customization, descriptionEn: val } })}
            />
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
                <span className="text-xs font-normal text-neutral-500 ml-2">(Max 100 karakter)</span>
              </label>
              <input
                type="text"
                value={metadata.seoTitle}
                onChange={e => setMetadata({ ...metadata, seoTitle: e.target.value })}
                maxLength={100}
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
