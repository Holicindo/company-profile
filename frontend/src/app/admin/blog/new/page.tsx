'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBlog } from '@/lib/admin-api';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import ImageUpload from '@/components/admin/ImageUpload';
import { AdminSelect } from '@/components/admin/AdminSelect';

// Lazy load editor (SSR incompatible)
const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

export default function NewBlogPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '',
    featuredImage: '', author: 'Holicindo', tags: '', status: 'draft',
  });

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleTitleChange = (v: string) => {
    setForm(p => ({ ...p, title: v, slug: slugify(v) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return alert('Judul wajib diisi.');
    if (!form.slug.trim()) return alert('Slug wajib diisi.');
    setSaving(true);
    try {
      await createBlog({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || null,
        content: form.content,
        featuredImage: form.featuredImage || null,
        author: form.author || 'Holicindo',
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        status: form.status,
      });
      router.push('/admin/blog');
    } catch (err: any) {
      alert('Gagal menyimpan: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* ── Top Header Bar ── */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b-2 border-[#2C1810]/10">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="p-2 rounded-xl border-2 border-[#2C1810]/15 text-[#2C1810]/60 hover:border-[#C9A84C]/60 hover:text-[#2C1810] transition">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[#2C1810]">Tulis Artikel Baru</h1>
            <p className="text-sm text-[#2C1810]/50 mt-0.5">Buat dan publikasikan artikel blog</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/blog" className="px-4 py-2 rounded-xl border-2 border-[#2C1810]/15 text-[#2C1810]/60 text-sm font-medium hover:border-[#2C1810]/40 hover:text-[#2C1810] transition">Batal</Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-[#C9A84C] hover:bg-[#b08f3b] text-white text-sm font-semibold rounded-xl transition disabled:opacity-60 shadow-md shadow-[#C9A84C]/30"
          >
            {saving ? <><Loader2 size={16} className="animate-spin" /> Menyimpan...</> : <><Save size={16} /> Simpan Artikel</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        {/* ── Kolom Kiri: Konten Artikel ── */}
        <div className="space-y-5">
          {/* Judul */}
          <div className="bg-white rounded-2xl border-2 border-[#2C1810]/10 p-6">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#2C1810]/8">
              <div className="w-1 h-5 bg-[#C9A84C] rounded-full" />
              <h2 className="text-sm font-bold text-[#2C1810] uppercase tracking-wider">Judul Artikel</h2>
            </div>
            <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-2">Judul <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={form.title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Tulis judul artikel yang menarik..."
              className="w-full px-4 py-3 border-2 border-[#2C1810]/15 rounded-xl text-[#2C1810] text-lg font-semibold placeholder:text-[#2C1810]/25 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition"
              required
            />
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[10px] font-semibold text-[#2C1810]/40 uppercase tracking-wider">Slug:</span>
              <input
                type="text"
                value={form.slug}
                onChange={e => set('slug', e.target.value)}
                className="flex-1 px-2.5 py-1.5 text-xs border-2 border-[#2C1810]/10 rounded-lg font-mono text-[#2C1810]/70 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/20 transition"
              />
            </div>
          </div>

          {/* Editor */}
          <div className="bg-white rounded-2xl border-2 border-[#2C1810]/10 p-6">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#2C1810]/8">
              <div className="w-1 h-5 bg-[#C9A84C] rounded-full" />
              <h2 className="text-sm font-bold text-[#2C1810] uppercase tracking-wider">Konten Artikel</h2>
            </div>
            <RichTextEditor value={form.content} onChange={v => set('content', v)} />
          </div>
        </div>

        {/* ── Kolom Kanan: Meta & Settings (Sticky) ── */}
        <div className="space-y-5 xl:sticky xl:top-5 xl:self-start">
          {/* Featured Image */}
          <div className="bg-white rounded-2xl border-2 border-[#2C1810]/10 p-5">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#2C1810]/8">
              <div className="w-1 h-5 bg-[#C9A84C] rounded-full" />
              <h2 className="text-sm font-bold text-[#2C1810] uppercase tracking-wider">Gambar Utama</h2>
            </div>
            <ImageUpload
              value={form.featuredImage}
              onChange={v => set('featuredImage', v)}
            />
          </div>

          {/* Meta */}
          <div className="bg-white rounded-2xl border-2 border-[#2C1810]/10 p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#2C1810]/8">
              <div className="w-1 h-5 bg-[#C9A84C] rounded-full" />
              <h2 className="text-sm font-bold text-[#2C1810] uppercase tracking-wider">Informasi Artikel</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-1.5">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={e => set('excerpt', e.target.value)}
                rows={3}
                placeholder="Ringkasan singkat untuk SEO & preview..."
                className="w-full px-3 py-2 border-2 border-[#2C1810]/10 rounded-xl text-sm text-[#2C1810] placeholder:text-[#2C1810]/30 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-1.5">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={e => set('author', e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#2C1810]/10 rounded-xl text-sm text-[#2C1810] focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-1.5">Tags (pisah koma)</label>
              <input
                type="text"
                value={form.tags}
                onChange={e => set('tags', e.target.value)}
                placeholder="mesin makanan, bakery, tips"
                className="w-full px-3 py-2 border-2 border-[#2C1810]/10 rounded-xl text-sm text-[#2C1810] placeholder:text-[#2C1810]/30 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2C1810]/60 uppercase tracking-wider mb-1.5">Status</label>
              <AdminSelect
                value={form.status}
                onChange={val => set('status', val)}
                options={[
                  { value: 'draft', label: 'Draft' },
                  { value: 'published', label: 'Published' },
                ]}
              />
            </div>
          </div>

          {/* Mobile save */}
          <button
            type="submit"
            disabled={saving}
            className="xl:hidden w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#C9A84C] hover:bg-[#b08f3b] text-white text-sm font-semibold rounded-xl transition disabled:opacity-60 shadow-md"
          >
            {saving ? <><Loader2 size={16} className="animate-spin" /> Menyimpan...</> : <><Save size={16} /> Simpan Artikel</>}
          </button>
        </div>
      </div>
    </form>
  );
}
