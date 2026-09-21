'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface LayananSections {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  intro: {
    title: string;
    description: string;
  };
  services: {
    title: string;
    items: Array<{
      icon: string;
      name: string;
      description: string;
      features: string[];
      image: string;
    }>;
  };
  process: {
    title: string;
    description: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}

export default function EditLayananPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageId, setPageId] = useState<number | null>(null);
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  
  const [sections, setSections] = useState<LayananSections>({
    hero: {
      title: 'Layanan Kami',
      subtitle: '',
      backgroundImage: '',
    },
    intro: {
      title: 'Solusi Lengkap untuk Kebutuhan Anda',
      description: '',
    },
    services: {
      title: 'Layanan yang Kami Tawarkan',
      items: [],
    },
    process: {
      title: 'Proses Kerja Kami',
      description: '',
      steps: [
        { number: '01', title: '', description: '' },
        { number: '02', title: '', description: '' },
        { number: '03', title: '', description: '' },
        { number: '04', title: '', description: '' },
      ],
    },
    cta: {
      title: 'Butuh Layanan Kami?',
      description: '',
      buttonText: 'Konsultasi Gratis',
      buttonLink: '/contact',
    },
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
      }
    } catch (err) {
      console.error('Failed to fetch page:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!pageId) {
      alert('Halaman belum dibuat. Jalankan seeder terlebih dahulu.');
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem('holic_admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/${pageId}`, {
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
        alert('✅ Halaman Layanan berhasil diperbarui!');
        router.push('/admin/pages');
      } else {
        const error = await res.json();
        alert(`❌ Gagal menyimpan: ${error.message}`);
      }
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const addService = () => {
    setSections({
      ...sections,
      services: {
        ...sections.services,
        items: [
          ...sections.services.items,
          { icon: '⚙️', name: '', description: '', features: ['', '', ''], image: '' },
        ],
      },
    });
  };

  const removeService = (index: number) => {
    setSections({
      ...sections,
      services: {
        ...sections.services,
        items: sections.services.items.filter((_, i) => i !== index),
      },
    });
  };

  const addFeatureToService = (serviceIndex: number) => {
    const newItems = [...sections.services.items];
    newItems[serviceIndex].features.push('');
    setSections({
      ...sections,
      services: { ...sections.services, items: newItems },
    });
  };

  const removeFeatureFromService = (serviceIndex: number, featureIndex: number) => {
    const newItems = [...sections.services.items];
    newItems[serviceIndex].features = newItems[serviceIndex].features.filter((_, i) => i !== featureIndex);
    setSections({
      ...sections,
      services: { ...sections.services, items: newItems },
    });
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
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/pages')}
            className="p-2 hover:bg-[#F5F1E8] rounded-lg transition"
          >
            <ArrowLeft size={24} className="text-[#2C1810]" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[#2C1810]">⚙️ Edit Halaman Layanan</h1>
            <p className="text-[#2C1810]/60">Kelola informasi layanan perusahaan</p>
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
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            📸 Hero Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul</label>
              <input
                type="text"
                value={sections.hero.title}
                onChange={e => setSections({ ...sections, hero: { ...sections.hero, title: e.target.value } })}
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Subtitle</label>
              <input
                type="text"
                value={sections.hero.subtitle}
                onChange={e => setSections({ ...sections, hero: { ...sections.hero, subtitle: e.target.value } })}
                placeholder="Contoh: Solusi Terpadu untuk Kebutuhan Manufaktur Anda"
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <ImageUpload
              label="Gambar Background"
              value={sections.hero.backgroundImage}
              onChange={url => setSections({ ...sections, hero: { ...sections.hero, backgroundImage: url } })}
              hint="Resolusi optimal: 1920x600px"
            />
          </div>
        </section>

        {/* Intro Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            📝 Pengantar
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul</label>
              <input
                type="text"
                value={sections.intro.title}
                onChange={e => setSections({ ...sections, intro: { ...sections.intro, title: e.target.value } })}
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Deskripsi</label>
              <textarea
                value={sections.intro.description}
                onChange={e => setSections({ ...sections, intro: { ...sections.intro, description: e.target.value } })}
                rows={4}
                placeholder="Deskripsi singkat tentang layanan yang ditawarkan..."
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
          </div>
        </section>

        {/* Services List Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            <h2 className="text-xl font-bold text-[#2C1810]">🛠️ Daftar Layanan</h2>
            <button
              onClick={addService}
              className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl border-2 border-green-300 text-sm font-bold hover:bg-green-200 transition"
            >
              <Plus size={16} /> Tambah Layanan
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul Section</label>
            <input
              type="text"
              value={sections.services.title}
              onChange={e => setSections({ ...sections, services: { ...sections.services, title: e.target.value } })}
              className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
            />
          </div>

          <div className="space-y-6">
            {sections.services.items.map((service, idx) => (
              <div key={idx} className="p-5 bg-[#FAF7F0] rounded-2xl border-2 border-[#2C1810]/10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-[#2C1810]">Layanan #{idx + 1}</h3>
                  <button
                    onClick={() => removeService(idx)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-2">
                      <label className="block text-xs font-semibold text-[#2C1810] mb-2">Icon</label>
                      <input
                        type="text"
                        value={service.icon}
                        onChange={e => {
                          const newItems = [...sections.services.items];
                          newItems[idx].icon = e.target.value;
                          setSections({ ...sections, services: { ...sections.services, items: newItems } });
                        }}
                        placeholder="⚙️"
                        className="w-full px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-2xl text-center"
                      />
                    </div>
                    <div className="col-span-10">
                      <label className="block text-xs font-semibold text-[#2C1810] mb-2">Nama Layanan</label>
                      <input
                        type="text"
                        value={service.name}
                        onChange={e => {
                          const newItems = [...sections.services.items];
                          newItems[idx].name = e.target.value;
                          setSections({ ...sections, services: { ...sections.services, items: newItems } });
                        }}
                        placeholder="Contoh: Custom Manufacturing"
                        className="w-full px-4 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm font-semibold text-[#2C1810]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2C1810] mb-2">Deskripsi</label>
                    <textarea
                      value={service.description}
                      onChange={e => {
                        const newItems = [...sections.services.items];
                        newItems[idx].description = e.target.value;
                        setSections({ ...sections, services: { ...sections.services, items: newItems } });
                      }}
                      rows={3}
                      placeholder="Deskripsi layanan..."
                      className="w-full px-4 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm text-[#2C1810]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-semibold text-[#2C1810]">Fitur/Keunggulan</label>
                      <button
                        onClick={() => addFeatureToService(idx)}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded border border-blue-300 hover:bg-blue-200 transition"
                      >
                        + Fitur
                      </button>
                    </div>
                    <div className="space-y-2">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex gap-2 items-center">
                          <span className="text-[#2C1810] font-bold text-sm">•</span>
                          <input
                            type="text"
                            value={feature}
                            onChange={e => {
                              const newItems = [...sections.services.items];
                              newItems[idx].features[fIdx] = e.target.value;
                              setSections({ ...sections, services: { ...sections.services, items: newItems } });
                            }}
                            placeholder="Fitur layanan"
                            className="flex-1 px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm text-[#2C1810]"
                          />
                          <button
                            onClick={() => removeFeatureFromService(idx, fIdx)}
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <ImageUpload
                    label="Gambar Layanan"
                    value={service.image}
                    onChange={url => {
                      const newItems = [...sections.services.items];
                      newItems[idx].image = url;
                      setSections({ ...sections, services: { ...sections.services, items: newItems } });
                    }}
                  />
                </div>
              </div>
            ))}
            {sections.services.items.length === 0 && (
              <p className="text-center text-[#2C1810]/50 py-8">Belum ada layanan. Klik "Tambah Layanan" untuk menambahkan.</p>
            )}
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            🔄 Proses Kerja
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul</label>
              <input
                type="text"
                value={sections.process.title}
                onChange={e => setSections({ ...sections, process: { ...sections.process, title: e.target.value } })}
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Deskripsi</label>
              <textarea
                value={sections.process.description}
                onChange={e => setSections({ ...sections, process: { ...sections.process, description: e.target.value } })}
                rows={2}
                placeholder="Deskripsi singkat tentang proses kerja..."
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-3">Tahapan Proses</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sections.process.steps.map((step, idx) => (
                  <div key={idx} className="p-4 bg-[#FAF7F0] rounded-xl border border-[#2C1810]/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#2C1810] to-[#1a0f0a] text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.number}
                      </div>
                      <input
                        type="text"
                        value={step.title}
                        onChange={e => {
                          const newSteps = [...sections.process.steps];
                          newSteps[idx].title = e.target.value;
                          setSections({ ...sections, process: { ...sections.process, steps: newSteps } });
                        }}
                        placeholder="Judul tahap"
                        className="flex-1 px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm font-semibold text-[#2C1810]"
                      />
                    </div>
                    <textarea
                      value={step.description}
                      onChange={e => {
                        const newSteps = [...sections.process.steps];
                        newSteps[idx].description = e.target.value;
                        setSections({ ...sections, process: { ...sections.process, steps: newSteps } });
                      }}
                      rows={2}
                      placeholder="Deskripsi tahap"
                      className="w-full px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm text-[#2C1810]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            🚀 Call to Action
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul</label>
              <input
                type="text"
                value={sections.cta.title}
                onChange={e => setSections({ ...sections, cta: { ...sections.cta, title: e.target.value } })}
                placeholder="Contoh: Butuh Layanan Kami?"
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Deskripsi</label>
              <textarea
                value={sections.cta.description}
                onChange={e => setSections({ ...sections, cta: { ...sections.cta, description: e.target.value } })}
                rows={2}
                placeholder="Ajakan untuk menghubungi..."
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2C1810] mb-2">Teks Tombol</label>
                <input
                  type="text"
                  value={sections.cta.buttonText}
                  onChange={e => setSections({ ...sections, cta: { ...sections.cta, buttonText: e.target.value } })}
                  className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2C1810] mb-2">Link Tombol</label>
                <input
                  type="text"
                  value={sections.cta.buttonLink}
                  onChange={e => setSections({ ...sections, cta: { ...sections.cta, buttonLink: e.target.value } })}
                  className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Save Button (Bottom) */}
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
