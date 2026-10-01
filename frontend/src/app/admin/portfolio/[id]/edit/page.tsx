'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchAdminPortfolio, updatePortfolio } from '@/lib/admin-api';
import { extractProjectDetails } from '@/lib/content-parser';
import { ArrowLeft, Loader2, Save, Wand2 } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export default function EditPortfolioPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    title: '', slug: '', description: '', clientName: '',
    projectDate: '', imageUrl: '', location: '', isActive: true,
    industry: '', requirement: '', solution: '',
  });

  useEffect(() => {
    const load = async () => {
      try {
        let page = 1;
        let found = null;
        while (!found) {
          const data = await fetchAdminPortfolio(page, 50);
          found = data.items.find((p: any) => p.id === id);
          if (found || page >= data.totalPages) break;
          page++;
        }
        if (!found) throw new Error('Portfolio tidak ditemukan');
        const parsedDetails = found.description ? extractProjectDetails(found.description) : { cleanText: '', extracted: { industry: '', requirement: '', solution: '' } };
        
        setForm({
          title: found.title || '',
          slug: found.slug || '',
          description: parsedDetails.cleanText || '',
          clientName: found.clientName || '',
          projectDate: found.projectDate || '',
          imageUrl: found.imageUrl || '',
          location: found.location || '',
          isActive: found.isActive !== false,
          industry: parsedDetails.extracted.industry || '',
          requirement: parsedDetails.extracted.requirement || '',
          solution: parsedDetails.extracted.solution || '',
        });
      } catch (err: any) {
        alert('Gagal memuat portfolio: ' + err.message);
        router.push('/admin/portfolio');
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [id, router]);

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      alert('Judul dan slug wajib diisi.');
      return;
    }
    // Image URL is optional - use existing value if not changed
    setLoading(true);
    try {
      let finalDesc = form.description?.trim() || '';
      if (form.industry || form.requirement || form.solution) {
        if (finalDesc) finalDesc += '\n\n';
        if (form.industry) finalDesc += `Industri/Bisnis: ${form.industry}\n\n`;
        if (form.requirement) finalDesc += `Kebutuhan (Requirement): ${form.requirement}\n\n`;
        if (form.solution) finalDesc += `Solusi Holic: ${form.solution}`;
      }

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        description: finalDesc || '',
        clientName: form.clientName?.trim() || '',
        projectDate: form.projectDate?.trim() || '',
        location: form.location?.trim() || '',
        imageUrl: form.imageUrl?.trim() || '', // Keep existing if present
        isActive: form.isActive,
      };
      await updatePortfolio(id, payload);
      router.push('/admin/portfolio');
    } catch (err: any) {
      alert('Gagal menyimpan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-[#2C1810]" /></div>;
  }

  return (
    <div className="w-full">
      {/* ── Top Header Bar ── */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b-2 border-[#2C1810]/10">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/portfolio"
            className="p-2 rounded-xl border-2 border-[#2C1810]/15 text-[#2C1810]/60 hover:border-[#C9A84C]/60 hover:text-[#2C1810] transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[#2C1810]">Edit Portfolio</h1>
            <p className="text-sm text-[#2C1810]/50 line-clamp-1 mt-0.5">{form.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/portfolio"
            className="px-4 py-2 rounded-xl border-2 border-[#2C1810]/15 text-[#2C1810]/60 text-sm font-medium hover:border-[#2C1810]/40 hover:text-[#2C1810] transition"
          >
            Batal
          </Link>
          <button
            type="submit"
            form="edit-portfolio-form"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-[#C9A84C] hover:bg-[#b08f3b] text-white text-sm font-semibold rounded-xl transition disabled:opacity-60 shadow-md shadow-[#C9A84C]/30"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Update Portfolio
          </button>
        </div>
      </div>

      <form id="edit-portfolio-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">

          {/* ── Kolom Kiri: Konten Utama ── */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border-2 border-[#2C1810]/10 p-6 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#2C1810]/8">
                <div className="w-1 h-5 bg-[#C9A84C] rounded-full" />
                <h2 className="text-sm font-bold text-[#2C1810] uppercase tracking-wider">Identitas Proyek</h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-2">
                  Judul Proyek <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => set('title', e.target.value)}
                  placeholder="Contoh: Instalasi Blast Freezer PT. ABC"
                  className="w-full px-4 py-3 border-2 border-[#2C1810]/15 rounded-xl text-[#2C1810] text-base font-medium placeholder:text-[#2C1810]/30 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider">
                    Slug URL <span className="text-red-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => set('slug', slugify(form.title))}
                    className="flex items-center gap-1 text-[10px] font-semibold text-[#C9A84C] hover:text-[#b08f3b] uppercase tracking-wider transition"
                  >
                    <Wand2 className="w-3 h-3" /> Auto dari judul
                  </button>
                </div>
                <input
                  type="text"
                  value={form.slug}
                  onChange={e => set('slug', e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-[#2C1810]/15 rounded-xl text-[#2C1810] font-mono text-sm placeholder:text-[#2C1810]/30 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition"
                  required
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border-2 border-[#2C1810]/10 p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#2C1810]/8">
                <div className="w-1 h-5 bg-[#C9A84C] rounded-full" />
                <h2 className="text-sm font-bold text-[#2C1810] uppercase tracking-wider">Deskripsi Proyek</h2>
              </div>
              <textarea
                value={form.description}
                onChange={e => set('description', e.target.value)}
                rows={8}
                placeholder="Ceritakan detail proyek..."
                className="w-full px-4 py-3 border-2 border-[#2C1810]/15 rounded-xl text-[#2C1810] text-sm placeholder:text-[#2C1810]/25 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition resize-y"
              />
              <div className="pt-4 border-t border-[#2C1810]/10 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-2">Industri/Bisnis</label>
                  <input
                    type="text"
                    value={form.industry}
                    onChange={e => set('industry', e.target.value)}
                    placeholder="Contoh: Restoran Jepang"
                    className="w-full px-3.5 py-2.5 border-2 border-[#2C1810]/15 rounded-xl text-[#2C1810] text-sm placeholder:text-[#2C1810]/30 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-2">Kebutuhan (Requirement)</label>
                  <textarea
                    value={form.requirement}
                    onChange={e => set('requirement', e.target.value)}
                    rows={3}
                    placeholder="Contoh: Klien membutuhkan showcase..."
                    className="w-full px-3.5 py-2.5 border-2 border-[#2C1810]/15 rounded-xl text-[#2C1810] text-sm placeholder:text-[#2C1810]/30 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-2">Solusi Holic</label>
                  <textarea
                    value={form.solution}
                    onChange={e => set('solution', e.target.value)}
                    rows={3}
                    placeholder="Contoh: Tim Holicindo melakukan desain kustom..."
                    className="w-full px-3.5 py-2.5 border-2 border-[#2C1810]/15 rounded-xl text-[#2C1810] text-sm placeholder:text-[#2C1810]/30 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Kolom Kanan: Detail & Gambar (Sticky) ── */}
          <div className="space-y-5 xl:sticky xl:top-5 xl:self-start">

            {/* Gambar Utama */}
            <div className="bg-white rounded-2xl border-2 border-[#2C1810]/10 p-5 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#2C1810]/8">
                <div className="w-1 h-5 bg-[#C9A84C] rounded-full" />
                <h2 className="text-sm font-bold text-[#2C1810] uppercase tracking-wider">Gambar Utama</h2>
              </div>
              <ImageUpload
                value={form.imageUrl}
                onChange={v => set('imageUrl', v)}
                hint="Foto proyek yang tampil di halaman portfolio."
              />
            </div>

            {/* Detail Proyek */}
            <div className="bg-white rounded-2xl border-2 border-[#2C1810]/10 p-5 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#2C1810]/8">
                <div className="w-1 h-5 bg-[#C9A84C] rounded-full" />
                <h2 className="text-sm font-bold text-[#2C1810] uppercase tracking-wider">Detail Proyek</h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-2">Nama Klien</label>
                <input
                  type="text"
                  value={form.clientName}
                  onChange={e => set('clientName', e.target.value)}
                  placeholder="PT. Nama Klien"
                  className="w-full px-3.5 py-2.5 border-2 border-[#2C1810]/15 rounded-xl text-[#2C1810] text-sm placeholder:text-[#2C1810]/30 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-2">Tanggal Proyek</label>
                <input
                  type="text"
                  value={form.projectDate}
                  onChange={e => set('projectDate', e.target.value)}
                  placeholder="Contoh: 2024-03 atau Maret 2024"
                  className="w-full px-3.5 py-2.5 border-2 border-[#2C1810]/15 rounded-xl text-[#2C1810] text-sm placeholder:text-[#2C1810]/30 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-2">Lokasi</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => set('location', e.target.value)}
                  placeholder="Contoh: Jakarta, Indonesia"
                  className="w-full px-3.5 py-2.5 border-2 border-[#2C1810]/15 rounded-xl text-[#2C1810] text-sm placeholder:text-[#2C1810]/30 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition"
                />
              </div>

              {/* Toggle: Aktif */}
              <label className="flex items-center justify-between gap-3 cursor-pointer pt-1">
                <div>
                  <p className="text-sm font-medium text-[#2C1810]">Aktif</p>
                  <p className="text-[11px] text-[#2C1810]/45">Tampil di website</p>
                </div>
                <div
                  onClick={() => set('isActive', !form.isActive)}
                  className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${form.isActive ? 'bg-[#C9A84C]' : 'bg-[#2C1810]/15'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${form.isActive ? 'left-6' : 'left-1'}`} />
                </div>
              </label>
            </div>

            {/* Mobile save button */}
            <button
              type="submit"
              disabled={loading}
              className="xl:hidden w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#C9A84C] hover:bg-[#b08f3b] text-white text-sm font-semibold rounded-xl transition disabled:opacity-60 shadow-md"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Update Portfolio
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
