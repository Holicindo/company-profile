'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface BerandaSections {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    ctaText: string;
    ctaLink: string;
  };
  about: {
    title: string;
    description: string;
    image: string;
  };
  whyUs: {
    title: string;
    items: Array<{
      icon: string;
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

export default function EditBerandaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageId, setPageId] = useState<number | null>(null);
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  
  const [sections, setSections] = useState<BerandaSections>({
    hero: {
      title: '',
      subtitle: '',
      description: '',
      backgroundImage: '',
      ctaText: 'Hubungi Kami',
      ctaLink: '/contact',
    },
    about: {
      title: '',
      description: '',
      image: '',
    },
    whyUs: {
      title: 'Mengapa Memilih Kami?',
      items: [
        { icon: '⚡', title: '', description: '' },
        { icon: '🎯', title: '', description: '' },
        { icon: '🏆', title: '', description: '' },
        { icon: '💼', title: '', description: '' },
      ],
    },
    cta: {
      title: '',
      description: '',
      buttonText: 'Mulai Proyek Anda',
      buttonLink: '/contact',
    },
  });

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = async () => {
    try {
      const token = localStorage.getItem('holic_admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/slug/beranda`, {
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
        alert('✅ Halaman Beranda berhasil diperbarui!');
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 size={48} className="animate-spin text-[#B8941E]" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
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
            <h1 className="text-3xl font-bold text-[#2C1810]">🏠 Edit Halaman Beranda</h1>
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
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            📸 Hero Section (Banner Utama)
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Subtitle</label>
              <input
                type="text"
                value={sections.hero.subtitle}
                onChange={e => setSections({ ...sections, hero: { ...sections.hero, subtitle: e.target.value } })}
                placeholder="Contoh: Manufaktur Berpengalaman Lebih dari 20 Tahun"
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul Utama</label>
              <input
                type="text"
                value={sections.hero.title}
                onChange={e => setSections({ ...sections, hero: { ...sections.hero, title: e.target.value } })}
                placeholder="Contoh: Solusi Terpadu untuk Kebutuhan Manufaktur Anda"
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Deskripsi</label>
              <textarea
                value={sections.hero.description}
                onChange={e => setSections({ ...sections, hero: { ...sections.hero, description: e.target.value } })}
                rows={3}
                placeholder="Deskripsi singkat tentang perusahaan..."
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <ImageUpload
              label="Gambar Background Hero"
              value={sections.hero.backgroundImage}
              onChange={url => setSections({ ...sections, hero: { ...sections.hero, backgroundImage: url } })}
              hint="Resolusi optimal: 1920x1080px"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#2C1810] mb-2">Teks Tombol CTA</label>
                <input
                  type="text"
                  value={sections.hero.ctaText}
                  onChange={e => setSections({ ...sections, hero: { ...sections.hero, ctaText: e.target.value } })}
                  className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2C1810] mb-2">Link Tombol CTA</label>
                <input
                  type="text"
                  value={sections.hero.ctaLink}
                  onChange={e => setSections({ ...sections, hero: { ...sections.hero, ctaLink: e.target.value } })}
                  className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Preview Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            👥 Preview Tentang Kami
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul</label>
              <input
                type="text"
                value={sections.about.title}
                onChange={e => setSections({ ...sections, about: { ...sections.about, title: e.target.value } })}
                placeholder="Contoh: Tentang Holicindo"
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Deskripsi Singkat</label>
              <textarea
                value={sections.about.description}
                onChange={e => setSections({ ...sections, about: { ...sections.about, description: e.target.value } })}
                rows={4}
                placeholder="Deskripsi singkat tentang perusahaan untuk ditampilkan di homepage..."
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <ImageUpload
              label="Gambar"
              value={sections.about.image}
              onChange={url => setSections({ ...sections, about: { ...sections.about, image: url } })}
            />
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            ⭐ Mengapa Memilih Kami?
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul Section</label>
            <input
              type="text"
              value={sections.whyUs.title}
              onChange={e => setSections({ ...sections, whyUs: { ...sections.whyUs, title: e.target.value } })}
              className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.whyUs.items.map((item, idx) => (
              <div key={idx} className="p-4 bg-[#FAF7F0] rounded-xl border border-[#2C1810]/10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{item.icon}</span>
                  <input
                    type="text"
                    value={item.title}
                    onChange={e => {
                      const newItems = [...sections.whyUs.items];
                      newItems[idx].title = e.target.value;
                      setSections({ ...sections, whyUs: { ...sections.whyUs, items: newItems } });
                    }}
                    placeholder="Judul keunggulan"
                    className="flex-1 px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm font-semibold text-[#2C1810]"
                  />
                </div>
                <textarea
                  value={item.description}
                  onChange={e => {
                    const newItems = [...sections.whyUs.items];
                    newItems[idx].description = e.target.value;
                    setSections({ ...sections, whyUs: { ...sections.whyUs, items: newItems } });
                  }}
                  rows={2}
                  placeholder="Deskripsi keunggulan"
                  className="w-full px-3 py-2 bg-white border border-[#2C1810]/20 rounded-lg text-sm text-[#2C1810]"
                />
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white p-6 rounded-2xl border-2 border-[#2C1810]/20 shadow-sm">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4 pb-3 border-b-2 border-[#2C1810]/10">
            🚀 Call to Action (Ajakan)
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Judul</label>
              <input
                type="text"
                value={sections.cta.title}
                onChange={e => setSections({ ...sections, cta: { ...sections.cta, title: e.target.value } })}
                placeholder="Contoh: Siap Memulai Proyek Anda?"
                className="w-full px-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">Deskripsi</label>
              <textarea
                value={sections.cta.description}
                onChange={e => setSections({ ...sections, cta: { ...sections.cta, description: e.target.value } })}
                rows={2}
                placeholder="Deskripsi ajakan..."
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
