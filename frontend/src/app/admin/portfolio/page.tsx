'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { fetchAdminPortfolio, deletePortfolio } from '@/lib/admin-api';
import {
  Plus, Pencil, Trash2, Loader2, Image,
  ChevronLeft, ChevronRight, CheckCircle, XCircle,
} from 'lucide-react';

interface Portfolio {
  id: number;
  title: string;
  slug: string;
  clientName?: string;
  projectDate?: string;
  imageUrl?: string;
  isActive: boolean;
  location?: string;
  createdAt: string;
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const LIMIT = 15;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAdminPortfolio(page, LIMIT);
      setItems(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      alert('Gagal memuat portfolio: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Hapus portfolio "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setDeleting(id);
    try {
      await deletePortfolio(id);
      await load();
    } catch (err: any) {
      alert('Gagal menghapus: ' + err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Manajemen Portfolio</h1>
          <p className="text-slate-500 text-sm">{total} proyek tersimpan</p>
        </div>
        <Link href="/admin/portfolio/new" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-brand-400 text-white text-sm font-semibold rounded-lg hover:from-brand-500 hover:to-brand-300 transition shadow">
          <Plus className="w-4 h-4" />
          Tambah Portfolio
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Image className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>Belum ada portfolio.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th className="text-left px-5 py-3 font-medium w-12">Foto</th>
                  <th className="text-left px-4 py-3 font-medium">Judul Proyek</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Klien</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Lokasi</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Status</th>
                  <th className="text-right px-5 py-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="px-5 py-3">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-10 h-10 object-cover rounded-lg border border-slate-200" />
                      ) : (
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <Image className="w-4 h-4 text-slate-300" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-800">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.projectDate || '—'}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-slate-500">{item.clientName || '—'}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-slate-400 text-xs">{item.location || '—'}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {item.isActive
                        ? <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3" /> Aktif</span>
                        : <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full"><XCircle className="w-3 h-3" /> Non-aktif</span>
                      }
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/portfolio/${item.id}/edit`} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(item.id, item.title)} disabled={deleting === item.id} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition disabled:opacity-50" title="Hapus">
                          {deleting === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
            <p className="text-xs text-slate-400">Halaman {page} dari {totalPages} ({total} proyek)</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
