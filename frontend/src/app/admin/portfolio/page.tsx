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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]">Manajemen Portfolio</h1>
          <p className="text-[#2C1810]/60 text-sm mt-1">{total} proyek tersimpan</p>
        </div>
        <Link href="/admin/portfolio/new" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] text-[#2C1810] text-sm font-bold rounded-xl hover:from-[#FAF7F0] hover:to-[#F5F1E8] border-2 border-[#2C1810]/20 transition-all shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5" />
          Tambah Portfolio
        </Link>
      </div>

      <div className="bg-gradient-to-br from-[#FAF7F0] to-[#F5F1E8] rounded-2xl border-2 border-[#2C1810] shadow-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#2C1810]" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-[#2C1810]/50">
            <Image className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-base">Belum ada portfolio.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#3d2817] border-b-2 border-[#2C1810] text-white/80">
                  <th className="text-center px-4 py-3 font-semibold w-20">Foto</th>
                  <th className="text-left px-4 py-3 font-semibold">Judul Proyek</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Klien</th>
                  <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Lokasi</th>
                  <th className="text-center px-4 py-3 font-semibold hidden sm:table-cell w-28">Status</th>
                  <th className="text-center px-4 py-3 font-semibold w-24">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-[#2C1810]/20 hover:bg-[#F5F1E8] transition">
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.title} className="w-12 h-12 object-cover rounded-lg border-2 border-[#2C1810]/20" />
                        ) : (
                          <div className="w-12 h-12 bg-[#2C1810]/5 rounded-lg flex items-center justify-center border-2 border-[#2C1810]/10">
                            <Image className="w-5 h-5 text-[#2C1810]/30" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-[#2C1810] text-sm">{item.title}</p>
                      <p className="text-xs text-[#2C1810]/40 mt-0.5">{item.projectDate || '—'}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-[#2C1810]/70 text-sm">{item.clientName || '—'}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-[#2C1810]/60 text-xs">{item.location || '—'}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-center">
                      {item.isActive ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-600/30">
                          <CheckCircle className="w-3 h-3" />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2C1810]/50 bg-[#2C1810]/10 px-2.5 py-1 rounded-lg border border-[#2C1810]/20">
                          <XCircle className="w-3 h-3" />
                          Non-aktif
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Link href={`/admin/portfolio/${item.id}/edit`} className="p-2 rounded-lg text-[#2C1810]/70 hover:text-[#2C1810] hover:bg-[#2C1810]/10 transition" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(item.id, item.title)} disabled={deleting === item.id} className="p-2 rounded-lg text-[#2C1810]/70 hover:text-red-600 hover:bg-red-100 transition disabled:opacity-50" title="Hapus">
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
          <div className="px-6 py-4 border-t-2 border-[#2C1810] bg-gradient-to-r from-[#FAF7F0] to-[#F5F1E8] flex items-center justify-between">
            <p className="text-sm text-[#2C1810]/60">Halaman {page} dari {totalPages} ({total} proyek)</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-lg text-[#2C1810]/70 hover:text-[#2C1810] hover:bg-[#2C1810]/10 transition disabled:opacity-30 disabled:cursor-not-allowed border border-[#2C1810]/20">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition border ${
                      page === pageNum
                        ? 'bg-gradient-to-r from-[#2C1810] to-[#1a0f0a] text-white border-[#2C1810]'
                        : 'text-[#2C1810]/70 hover:text-[#2C1810] hover:bg-[#2C1810]/10 border-[#2C1810]/20'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-lg text-[#2C1810]/70 hover:text-[#2C1810] hover:bg-[#2C1810]/10 transition disabled:opacity-30 disabled:cursor-not-allowed border border-[#2C1810]/20">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
