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
    <form onSubmit={handleSubmit} className="space-y-5 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Tulis Artikel Baru</h1>
            <p className="text-slate-500 text-sm">Buat dan publikasikan artikel blog</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => { set('status', 'draft'); }} className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${form.status === 'draft' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            Draft
          </button>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-brand-400 text-white text-sm font-semibold rounded-lg hover:from-brand-500 hover:to-brand-300 transition disabled:opacity-60 shadow">
            {saving ? <><Loader2 size={16} className="animate-spin" /> Menyimpan...</> : <><Save size={16} /> Publikasikan</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Judul */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">Judul Artikel <span className="text-red-500">*</span></label>
            <input
              type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)}
              placeholder="Tulis judul artikel yang menarik..."
              className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-lg font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
              required
            />
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-slate-400">Slug:</span>
              <input
                type="text" value={form.slug} onChange={e => set('slug', e.target.value)}
                className="flex-1 px-2 py-1 text-xs border border-neutral-200 rounded-lg font-mono text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-400"
              />
            </div>
          </div>

          {/* Editor */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <label className="block text-sm font-medium text-slate-700 mb-3">Konten Artikel</label>
            <RichTextEditor value={form.content} onChange={v => set('content', v)} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Featured Image */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <ImageUpload
              label="Gambar Utama (Featured Image)"
              value={form.featuredImage}
              onChange={v => set('featuredImage', v)}
              hint="Gambar yang tampil di thumbnail dan header artikel."
            />
          </div>

          {/* Meta */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <h3 className="font-semibold text-slate-700 text-sm">Informasi Artikel</h3>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Excerpt / Ringkasan</label>
              <textarea
                value={form.excerpt} onChange={e => set('excerpt', e.target.value)}
                rows={3} placeholder="Ringkasan singkat artikel (untuk SEO & preview)..."
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Author</label>
              <input
                type="text" value={form.author} onChange={e => set('author', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Tags (pisahkan dengan koma)</label>
              <input
                type="text" value={form.tags} onChange={e => set('tags', e.target.value)}
                placeholder="mesin makanan, bakery, tips"
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Status</label>
              <select
                value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"
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
