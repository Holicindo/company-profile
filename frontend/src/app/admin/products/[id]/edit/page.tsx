'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchAdminProducts, fetchCategories, updateProduct } from '@/lib/admin-api';
import { ArrowLeft, Loader2, Save, Wand2 } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { AdminSelect } from '@/components/admin/AdminSelect';

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: '', slug: '', description: '', shortDescription: '',
    imageUrl: '', sku: '', categoryId: '', isFeatured: false, isActive: true,
  });

  useEffect(() => {
    fetchCategories().then((cats: any[]) => {
      setCategories(cats || []);
    }).catch(() => {});

    const load = async () => {
      try {
        let page = 1;
        let found = null;
        while (!found) {
          const data = await fetchAdminProducts(page, 50);
          found = data.items.find((p: any) => p.id === id);
          if (found || page >= data.totalPages) break;
          page++;
        }
        if (!found) throw new Error('Produk tidak ditemukan');
        setForm({
          name: found.name || '',
          slug: found.slug || '',
          description: found.description || '',
          shortDescription: found.shortDescription || '',
          imageUrl: found.imageUrl || '',
          sku: found.sku || '',
          categoryId: found.categoryId ? String(found.categoryId) : '',
          isFeatured: found.isFeatured || false,
          isActive: found.isActive !== false,
        });
      } catch (err: any) {
        alert('Gagal memuat produk: ' + err.message);
        router.push('/admin/products');
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [id, router]);

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
      await updateProduct(id, payload);
      router.push('/admin/products');
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
    <div className="w-full">
      {/* ── Top Header Bar ── */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b-2 border-[#2C1810]/10">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl border-2 border-[#2C1810]/15 text-[#2C1810]/60 hover:border-[#C9A84C]/60 hover:text-[#2C1810] transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[#2C1810]">Edit Produk</h1>
            <p className="text-sm text-[#2C1810]/50 line-clamp-1 mt-0.5">{form.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-xl border-2 border-[#2C1810]/15 text-[#2C1810]/60 text-sm font-medium hover:border-[#2C1810]/40 hover:text-[#2C1810] transition"
          >
            Batal
          </Link>
          <button
            type="submit"
            form="edit-product-form"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-[#C9A84C] hover:bg-[#b08f3b] text-white text-sm font-semibold rounded-xl transition disabled:opacity-60 shadow-md shadow-[#C9A84C]/30"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Perubahan
          </button>
        </div>
      </div>

      <form id="edit-product-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">

          {/* ── Kolom Kiri: Konten Utama ── */}
          <div className="space-y-5">
            {/* Identitas Produk */}
            <div className="bg-white rounded-2xl border-2 border-[#2C1810]/10 p-6 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#2C1810]/8">
                <div className="w-1 h-5 bg-[#C9A84C] rounded-full" />
                <h2 className="text-sm font-bold text-[#2C1810] uppercase tracking-wider">Identitas Produk</h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-2">
                  Nama Produk <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="Contoh: Blast Freezer 2 Door 500L"
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
                    onClick={() => set('slug', slugify(form.name))}
                    className="flex items-center gap-1 text-[10px] font-semibold text-[#C9A84C] hover:text-[#b08f3b] uppercase tracking-wider transition"
                  >
                    <Wand2 className="w-3 h-3" /> Auto dari nama
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

              <div>
                <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-2">
                  Deskripsi Singkat
                </label>
                <textarea
                  value={form.shortDescription}
                  onChange={e => set('shortDescription', e.target.value)}
                  rows={3}
                  placeholder="Deskripsi pendek untuk kartu produk di katalog..."
                  className="w-full px-4 py-3 border-2 border-[#2C1810]/15 rounded-xl text-[#2C1810] text-sm placeholder:text-[#2C1810]/30 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition resize-none"
                />
              </div>
            </div>

            {/* Deskripsi Lengkap */}
            <div className="bg-white rounded-2xl border-2 border-[#2C1810]/10 p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#2C1810]/8">
                <div className="w-1 h-5 bg-[#C9A84C] rounded-full" />
                <h2 className="text-sm font-bold text-[#2C1810] uppercase tracking-wider">Deskripsi Lengkap</h2>
                <span className="ml-auto text-[10px] text-[#2C1810]/40 font-medium bg-[#2C1810]/5 px-2 py-0.5 rounded-full">HTML diperbolehkan</span>
              </div>
              <textarea
                value={form.description}
                onChange={e => set('description', e.target.value)}
                rows={16}
                placeholder="<p>Deskripsi lengkap produk dalam format HTML...</p>"
                className="w-full px-4 py-3 border-2 border-[#2C1810]/15 rounded-xl text-[#2C1810] font-mono text-sm placeholder:text-[#2C1810]/25 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition resize-y min-h-[280px]"
              />
            </div>
          </div>

          {/* ── Kolom Kanan: Pengaturan (Sticky) ── */}
          <div className="space-y-5 xl:sticky xl:top-5 xl:self-start">

            {/* Gambar Produk */}
            <div className="bg-white rounded-2xl border-2 border-[#2C1810]/10 p-5 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#2C1810]/8">
                <div className="w-1 h-5 bg-[#C9A84C] rounded-full" />
                <h2 className="text-sm font-bold text-[#2C1810] uppercase tracking-wider">Gambar Produk</h2>
              </div>
              <ImageUpload
                value={form.imageUrl}
                onChange={v => set('imageUrl', v)}
                hint="Gambar utama yang tampil di katalog."
              />
            </div>

            {/* Pengaturan */}
            <div className="bg-white rounded-2xl border-2 border-[#2C1810]/10 p-5 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#2C1810]/8">
                <div className="w-1 h-5 bg-[#C9A84C] rounded-full" />
                <h2 className="text-sm font-bold text-[#2C1810] uppercase tracking-wider">Pengaturan</h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-2">Kategori</label>
                <AdminSelect
                  value={form.categoryId}
                  onChange={val => set('categoryId', val)}
                  placeholder="Tanpa Kategori"
                  options={[
                    { value: '', label: 'Tanpa Kategori' },
                    ...categories.flatMap((c: any) => {
                      if (c.children && c.children.length > 0) {
                        return [
                          { value: c.id, label: c.name, isGroup: true },
                          { value: c.id, label: `${c.name} (Utama)`, indent: 1 },
                          ...c.children.map((ch: any) => ({ value: ch.id, label: `↳ ${ch.name}`, indent: 1 })),
                        ];
                      }
                      return [{ value: c.id, label: c.name }];
                    }),
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-2">SKU</label>
                <input
                  type="text"
                  value={form.sku}
                  onChange={e => set('sku', e.target.value)}
                  placeholder="Contoh: BF-500L-2D"
                  className="w-full px-3.5 py-2.5 border-2 border-[#2C1810]/15 rounded-xl text-[#2C1810] text-sm font-mono placeholder:text-[#2C1810]/30 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition"
                />
              </div>

              {/* Toggle: Produk Unggulan */}
              <label className="flex items-center justify-between gap-3 cursor-pointer group">
                <div>
                  <p className="text-sm font-medium text-[#2C1810]">Produk Unggulan</p>
                  <p className="text-[11px] text-[#2C1810]/45">Tampil di halaman utama</p>
                </div>
                <div
                  onClick={() => set('isFeatured', !form.isFeatured)}
                  className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${form.isFeatured ? 'bg-[#C9A84C]' : 'bg-[#2C1810]/15'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${form.isFeatured ? 'left-6' : 'left-1'}`} />
                </div>
              </label>

              {/* Toggle: Aktif */}
              <label className="flex items-center justify-between gap-3 cursor-pointer group">
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

            {/* Mobile Save Button */}
            <button
              type="submit"
              disabled={loading}
              className="xl:hidden w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#C9A84C] hover:bg-[#b08f3b] text-white text-sm font-semibold rounded-xl transition disabled:opacity-60 shadow-md"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Simpan Perubahan
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}

