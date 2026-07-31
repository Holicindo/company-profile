'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createProduct, fetchCategories } from '@/lib/admin-api';
import { ArrowLeft, Loader2, Save, Wand2 } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: '', slug: '', description: '', shortDescription: '',
    imageUrl: '', sku: '', categoryId: '', isFeatured: false, isActive: true,
  });

  useEffect(() => {
    fetchCategories().then((cats: any[]) => {
      const flat: any[] = [];
      cats.forEach((c: any) => { flat.push(c); if (c.children) flat.push(...c.children); });
      setCategories(flat);
    }).catch(() => {});
  }, []);

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.slug.trim()) {
      alert('Nama dan slug wajib diisi.');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        categoryId: form.categoryId ? Number(form.categoryId) : undefined,
        imageUrl: form.imageUrl || undefined,
        sku: form.sku || undefined,
      };
      await createProduct(payload);
      router.push('/admin/products');
    } catch (err: any) {
      alert('Gagal menyimpan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/products" className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 transition">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Tambah Produk Baru</h1>
          <p className="text-sm text-slate-500">Isi detail produk di bawah ini</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Produk <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => { set('name', e.target.value); if (!form.slug || form.slug === slugify(form.name)) set('slug', slugify(e.target.value)); }}
                  placeholder="Contoh: Blast Freezer 500L"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 transition"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-slate-700">Slug <span className="text-red-500">*</span></label>
                  <button type="button" onClick={() => set('slug', slugify(form.name))} className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700">
                    <Wand2 className="w-3 h-3" /> Auto dari nama
                  </button>
                </div>
                <input
                  type="text"
                  value={form.slug}
                  onChange={e => set('slug', e.target.value)}
                  placeholder="blast-freezer-500l"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi Singkat</label>
                <textarea
                  value={form.shortDescription}
                  onChange={e => set('shortDescription', e.target.value)}
                  rows={2}
                  placeholder="Deskripsi singkat untuk kartu produk..."
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Deskripsi Lengkap
                  <span className="ml-2 text-xs font-normal text-slate-400">(HTML diperbolehkan)</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  rows={10}
                  placeholder="<p>Deskripsi lengkap produk...</p>"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 transition font-mono text-sm resize-y"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-semibold text-slate-700 text-sm">Pengaturan Produk</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Kategori</label>
                <select
                  value={form.categoryId}
                  onChange={e => set('categoryId', e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 transition"
                >
                  <option value="">Tanpa Kategori</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">SKU</label>
                <input type="text" value={form.sku} onChange={e => set('sku', e.target.value)} placeholder="SKU-001" className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 transition" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="featured" checked={form.isFeatured} onChange={e => set('isFeatured', e.target.checked)} className="w-4 h-4 accent-brand-500" />
                <label htmlFor="featured" className="text-sm font-medium text-slate-700">Produk Unggulan</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="active" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} className="w-4 h-4 accent-brand-500" />
                <label htmlFor="active" className="text-sm font-medium text-slate-700">Aktif (tampil di website)</label>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <h3 className="font-semibold text-slate-700 text-sm">Gambar Produk</h3>
              <ImageUpload
                value={form.imageUrl}
                onChange={v => set('imageUrl', v)}
                hint="Gambar utama produk yang tampil di katalog."
              />
            </div>

            <div className="flex gap-2">
              <Link href="/admin/products" className="flex-1 text-center px-4 py-2.5 border border-slate-300 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 transition">
                Batal
              </Link>
              <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-600 to-brand-400 text-white text-sm font-semibold rounded-lg hover:from-brand-500 hover:to-brand-300 transition disabled:opacity-60">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Simpan
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
