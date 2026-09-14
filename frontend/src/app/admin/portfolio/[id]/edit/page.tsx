'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchAdminPortfolio, updatePortfolio } from '@/lib/admin-api';
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
        setForm({
          title: found.title || '',
          slug: found.slug || '',
          description: found.description || '',
          clientName: found.clientName || '',
          projectDate: found.projectDate || '',
          imageUrl: found.imageUrl || '',
          location: found.location || '',
          isActive: found.isActive !== false,
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
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        description: form.description?.trim() || '',
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
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/portfolio" className="p-2 rounded-lg text-[#2C1810]/70 hover:text-[#2C1810] hover:bg-[#2C1810]/10 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]">Edit Portfolio</h1>
          <p className="text-sm text-[#2C1810]/60 line-clamp-1">{form.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gradient-to-br from-[#FAF7F0] to-[#F5F1E8] rounded-2xl border-2 border-[#2C1810] p-5 space-y-4 shadow-xl">
              <div>
                <label className="block text-sm font-semibold text-[#2C1810] mb-1.5">Judul Proyek <span className="text-red-600">*</span></label>
                <input type="text" value={form.title} onChange={e => set('title', e.target.value)} className="w-full px-3 py-2.5 border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] bg-white focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50 focus:border-[#B8941E]/50 transition" required />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-semibold text-[#2C1810]">Slug <span className="text-red-600">*</span></label>
                  <button type="button" onClick={() => set('slug', slugify(form.title))} className="flex items-center gap-1 text-xs text-[#2C1810]/70 hover:text-[#2C1810] font-semibold">
                    <Wand2 className="w-3 h-3" /> Auto dari judul
                  </button>
                </div>
                <input type="text" value={form.slug} onChange={e => set('slug', e.target.value)} className="w-full px-3 py-2.5 border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] bg-white focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50 focus:border-[#B8941E]/50 transition" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2C1810] mb-1.5">Deskripsi Proyek</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={6} className="w-full px-3 py-2.5 border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] bg-white focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50 focus:border-[#B8941E]/50 transition resize-y" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#FAF7F0] to-[#F5F1E8] rounded-2xl border-2 border-[#2C1810] p-5 space-y-4 shadow-xl">
              <h3 className="font-semibold text-[#2C1810] text-sm">Detail Proyek</h3>
              <div>
                <label className="block text-sm font-semibold text-[#2C1810] mb-1.5">Nama Klien</label>
                <input type="text" value={form.clientName} onChange={e => set('clientName', e.target.value)} className="w-full px-3 py-2.5 border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] bg-white focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50 focus:border-[#B8941E]/50 transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2C1810] mb-1.5">Tanggal Proyek</label>
                <input type="text" value={form.projectDate} onChange={e => set('projectDate', e.target.value)} className="w-full px-3 py-2.5 border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] bg-white focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50 focus:border-[#B8941E]/50 transition" placeholder="2022-01-01" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2C1810] mb-1.5">Lokasi</label>
                <input type="text" value={form.location} onChange={e => set('location', e.target.value)} className="w-full px-3 py-2.5 border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] bg-white focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50 focus:border-[#B8941E]/50 transition" placeholder="Indonesia" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="active" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} className="w-4 h-4 accent-[#B8941E]" />
                <label htmlFor="active" className="text-sm font-semibold text-[#2C1810]">Aktif (tampil di website)</label>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#FAF7F0] to-[#F5F1E8] rounded-2xl border-2 border-[#2C1810] p-5 shadow-xl">
              <ImageUpload
                label="Gambar Utama"
                value={form.imageUrl}
                onChange={v => set('imageUrl', v)}
                hint="Foto proyek yang tampil di halaman portfolio."
              />
            </div>

            <div className="flex gap-2">
              <Link href="/admin/portfolio" className="flex-1 text-center px-4 py-2.5 border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] text-sm font-semibold hover:bg-[#2C1810]/5 transition">Batal</Link>
              <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] text-[#2C1810] text-sm font-bold rounded-xl hover:from-[#FAF7F0] hover:to-[#F5F1E8] border-2 border-[#2C1810]/20 transition-all shadow-lg hover:shadow-xl disabled:opacity-60">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
