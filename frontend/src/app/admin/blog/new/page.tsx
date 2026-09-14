'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBlog } from '@/lib/admin-api';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import ImageUpload from '@/components/admin/ImageUpload';

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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-[#2C1810] to-[#3d2817] px-6 py-5 rounded-2xl border border-[#D4AF37]/20">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 rounded-lg border border-[#D4AF37]/30 text-white hover:bg-[#3d2817] transition">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Tulis Artikel Baru</h1>
            <p className="text-white/60 text-sm mt-1">Buat dan publikasikan artikel blog</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => { set('status', 'draft'); }} className={`px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition ${form.status === 'draft' ? 'bg-amber-500 text-[#2C1810] border-amber-500' : 'bg-[#3d2817] border-[#D4AF37]/30 text-white/70 hover:border-[#D4AF37]'}`}>
            Draft
          </button>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941E] text-[#2C1810] text-sm font-bold rounded-xl hover:from-[#B8941E] hover:to-[#D4AF37] transition disabled:opacity-60 shadow-lg">
            {saving ? <><Loader2 size={18} className="animate-spin" /> Menyimpan...</> : <><Save size={18} /> Publikasikan</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Judul */}
          <div className="bg-gradient-to-br from-[#2C1810] to-[#1a0f0a] rounded-2xl border border-[#D4AF37]/20 p-6">
            <label className="block text-sm font-bold text-white mb-3">Judul Artikel <span className="text-red-400">*</span></label>
            <input
              type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)}
              placeholder="Tulis judul artikel yang menarik..."
              className="w-full px-4 py-3 border-2 border-[#D4AF37]/30 rounded-xl text-lg font-semibold text-white bg-[#3d2817] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent placeholder:text-white/30"
              required
            />
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs font-medium text-white/60">Slug:</span>
              <input
                type="text" value={form.slug} onChange={e => set('slug', e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-[#D4AF37]/30 rounded-lg font-mono text-white/80 bg-[#3d2817] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
          </div>

          {/* Editor */}
          <div className="bg-gradient-to-br from-[#2C1810] to-[#1a0f0a] rounded-2xl border border-[#D4AF37]/20 p-6">
            <label className="block text-sm font-bold text-white mb-4">Konten Artikel</label>
            <RichTextEditor value={form.content} onChange={v => set('content', v)} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-gradient-to-br from-[#2C1810] to-[#1a0f0a] rounded-2xl border border-[#D4AF37]/20 p-6">
            <ImageUpload
              label="Gambar Utama (Featured Image)"
              value={form.featuredImage}
              onChange={v => set('featuredImage', v)}
              hint="Gambar yang tampil di thumbnail dan header artikel."
            />
          </div>

          {/* Meta */}
          <div className="bg-gradient-to-br from-[#2C1810] to-[#1a0f0a] rounded-2xl border border-[#D4AF37]/20 p-6 space-y-5">
            <h3 className="font-bold text-white text-base">Informasi Artikel</h3>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">Excerpt / Ringkasan</label>
              <textarea
                value={form.excerpt} onChange={e => set('excerpt', e.target.value)}
                rows={3} placeholder="Ringkasan singkat artikel (untuk SEO & preview)..."
                className="w-full px-3 py-2.5 border border-[#D4AF37]/30 rounded-xl text-sm text-white/80 bg-[#3d2817] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">Author</label>
              <input
                type="text" value={form.author} onChange={e => set('author', e.target.value)}
                className="w-full px-3 py-2.5 border border-[#D4AF37]/30 rounded-xl text-sm text-white/80 bg-[#3d2817] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">Tags (pisahkan dengan koma)</label>
              <input
                type="text" value={form.tags} onChange={e => set('tags', e.target.value)}
                placeholder="mesin makanan, bakery, tips"
                className="w-full px-3 py-2.5 border border-[#D4AF37]/30 rounded-xl text-sm text-white/80 bg-[#3d2817] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">Status</label>
              <select
                value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full px-3 py-2.5 border border-[#D4AF37]/30 rounded-xl text-sm text-white/80 bg-[#3d2817] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <option value="draft">Draft (tidak tampil)</option>
                <option value="published">Published (tampil di website)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
