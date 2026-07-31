'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { fetchAdminBlogs, deleteBlog } from '@/lib/admin-api';
import {
  Plus, Pencil, Trash2, Loader2, FileText, Search,
  ChevronLeft, ChevronRight, Eye, EyeOff,
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  author: string;
  createdAt: string;
  publishedAt: string | null;
  excerpt?: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const LIMIT = 15;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAdminBlogs(page, LIMIT);
      setPosts(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      alert('Gagal memuat data blog: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Hapus artikel "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setDeleting(id);
    try {
      await deleteBlog(id);
      await load();
    } catch (err: any) {
      alert('Gagal menghapus: ' + err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Manajemen Blog</h1>
          <p className="text-slate-500 text-sm">{total} artikel tersimpan</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-brand-400 text-white text-sm font-semibold rounded-lg hover:from-brand-500 hover:to-brand-300 transition shadow"
        >
          <Plus className="w-4 h-4" />
          Tulis Artikel Baru
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>Belum ada artikel. Mulai menulis!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th className="text-left px-5 py-3 font-medium">Judul</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Author</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Tanggal</th>
                  <th className="text-right px-5 py-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50 transition">
                    <td className="px-5 py-3">
                      <div>
                        <p className="font-medium text-slate-800 line-clamp-1">{post.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">/news/{post.slug}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-slate-500">{post.author || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.status === 'published'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {post.status === 'published'
                          ? <><Eye className="w-3 h-3" /> Published</>
                          : <><EyeOff className="w-3 h-3" /> Draft</>
                        }
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-slate-400 text-xs">
                      {new Date(post.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deleting === post.id}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                          title="Hapus"
                        >
                          {deleting === post.id
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <Trash2 className="w-4 h-4" />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
            <p className="text-xs text-slate-400">
              Halaman {page} dari {totalPages} ({total} artikel)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
