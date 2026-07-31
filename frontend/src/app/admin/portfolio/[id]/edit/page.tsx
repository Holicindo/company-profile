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
    setLoading(true);
    try {
      const payload = {
        ...form,
        imageUrl: form.imageUrl || undefined,
        clientName: form.clientName || undefined,
        projectDate: form.projectDate || undefined,
        location: form.location || undefined,
        description: form.description || undefined,
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
    return <div className="flex items-center justify-center py-24"><Loader2 className="w-6 h-6 animate-spin text-brand-500" /></div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/portfolio" className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Edit Portfolio</h1>
          <p className="text-sm text-slate-500 line-clamp-1">{form.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Judul Proyek <span className="text-red-500">*</span></label>
                <input type="text" value={form.title} onChange={e => set('title', e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 transition" required />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-slate-700">Slug <span className="text-red-500">*</span></label>
                  <button type="button" onClick={() => set('slug', slugify(form.title))} className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700">
                    <Wand2 className="w-3 h-3" /> Auto dari judul
                  </button>
                </div>
                <input type="text" value={form.slug} onChange={e => set('slug', e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 transition" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi Proyek</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={6} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 transition resize-y" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-semibold text-slate-700 text-sm">Detail Proyek</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Klien</label>
                <input type="text" value={form.clientName} onChange={e => set('clientName', e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tanggal Proyek</label>
                <input type="text" value={form.projectDate} onChange={e => set('projectDate', e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Lokasi</label>
                <input type="text" value={form.location} onChange={e => set('location', e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 transition" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="active" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} className="w-4 h-4 accent-brand-500" />
                <label htmlFor="active" className="text-sm font-medium text-slate-700">Aktif (tampil di website)</label>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <ImageUpload
                label="Gambar Utama"
                value={form.imageUrl}
                onChange={v => set('imageUrl', v)}
                hint="Foto proyek yang tampil di halaman portfolio."
              />
            </div>

            <div className="flex gap-2">
              <Link href="/admin/portfolio" className="flex-1 text-center px-4 py-2.5 border border-slate-300 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 transition">Batal</Link>
              <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-600 to-brand-400 text-white text-sm font-semibold rounded-lg hover:from-brand-500 hover:to-brand-300 transition disabled:opacity-60">
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
