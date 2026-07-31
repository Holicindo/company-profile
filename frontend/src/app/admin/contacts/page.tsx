'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchAdminContacts, updateContactStatus, deleteContact } from '@/lib/admin-api';
import {
  MessageSquare, Loader2, ChevronLeft, ChevronRight,
  ChevronDown, ChevronUp, Trash2, Mail, MailOpen, CheckCircle,
} from 'lucide-react';

interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  read: 'bg-amber-100 text-amber-700',
  replied: 'bg-emerald-100 text-emerald-700',
};

const statusLabels = {
  new: 'Baru',
  read: 'Dibaca',
  replied: 'Dibalas',
};

export default function AdminContactsPage() {
  const [items, setItems] = useState<ContactInquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [updating, setUpdating] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const LIMIT = 20;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAdminContacts(page, LIMIT, filterStatus || undefined);
      setItems(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      alert('Gagal memuat pesan: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [page, filterStatus]);

  useEffect(() => { load(); }, [load]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    setUpdating(id);
    try {
      await updateContactStatus(id, newStatus);
      setItems(prev => prev.map(i => i.id === id ? { ...i, status: newStatus as any } : i));
    } catch (err: any) {
      alert('Gagal update status: ' + err.message);
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus pesan ini? Tindakan tidak bisa dibatalkan.')) return;
    setDeleting(id);
    try {
      await deleteContact(id);
      await load();
    } catch (err: any) {
      alert('Gagal menghapus: ' + err.message);
    } finally {
      setDeleting(null);
    }
  };

  const toggleExpand = (id: number) => {
    setExpanded(prev => {
      const next = prev === id ? null : id;
      // Auto-mark as read when opening
      if (next !== null) {
        const item = items.find(i => i.id === id);
        if (item?.status === 'new') {
          handleStatusChange(id, 'read');
        }
      }
      return next;
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Pesan Masuk</h1>
          <p className="text-slate-500 text-sm">{total} pesan tersimpan</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-400 transition bg-white"
          >
            <option value="">Semua Status</option>
            <option value="new">Baru</option>
            <option value="read">Dibaca</option>
            <option value="replied">Dibalas</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>Belum ada pesan masuk.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.id} className={`transition ${item.status === 'new' ? 'bg-blue-50/40' : ''}`}>
                {/* Row */}
                <div
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 cursor-pointer"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="flex-shrink-0">
                    {item.status === 'new'
                      ? <div className="w-2 h-2 bg-blue-500 rounded-full mt-0.5" />
                      : <div className="w-2 h-2 bg-slate-200 rounded-full mt-0.5" />
                    }
                  </div>
                  <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4">
                    <div className="sm:col-span-1">
                      <p className={`text-sm font-medium truncate ${item.status === 'new' ? 'text-slate-900' : 'text-slate-700'}`}>
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate">{item.email}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-sm text-slate-700 truncate">{item.subject}</p>
                      <p className="text-xs text-slate-400 truncate hidden sm:block">{item.message}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                        {statusLabels[item.status]}
                      </span>
                      <span className="text-xs text-slate-400 hidden sm:block">
                        {new Date(item.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                      {expanded === item.id
                        ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      }
                    </div>
                  </div>
                </div>

                {/* Expanded Detail */}
                {expanded === item.id && (
                  <div className="px-5 pb-5 bg-slate-50/80 border-t border-slate-100">
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Message */}
                      <div className="sm:col-span-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Pesan</p>
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                          <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{item.message}</p>
                        </div>
                      </div>

                      {/* Contact info */}
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Info Pengirim</p>
                        <div className="bg-white rounded-lg border border-slate-200 p-3 space-y-2">
                          <div className="flex gap-2 text-sm"><span className="text-slate-400 w-20">Nama:</span><span className="text-slate-700">{item.name}</span></div>
                          <div className="flex gap-2 text-sm"><span className="text-slate-400 w-20">Email:</span><a href={`mailto:${item.email}`} className="text-brand-600 hover:underline">{item.email}</a></div>
                          {item.phone && <div className="flex gap-2 text-sm"><span className="text-slate-400 w-20">Telp:</span><span className="text-slate-700">{item.phone}</span></div>}
                          {item.company && <div className="flex gap-2 text-sm"><span className="text-slate-400 w-20">Perusahaan:</span><span className="text-slate-700">{item.company}</span></div>}
                          <div className="flex gap-2 text-sm"><span className="text-slate-400 w-20">Tanggal:</span><span className="text-slate-700">{new Date(item.createdAt).toLocaleString('id-ID')}</span></div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Aksi</p>
                        <div className="bg-white rounded-lg border border-slate-200 p-3 space-y-2">
                          <div className="grid grid-cols-1 gap-2">
                            {item.status !== 'read' && (
                              <button
                                onClick={e => { e.stopPropagation(); handleStatusChange(item.id, 'read'); }}
                                disabled={updating === item.id}
                                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition disabled:opacity-50"
                              >
                                {updating === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <MailOpen className="w-3.5 h-3.5" />}
                                Tandai Sudah Dibaca
                              </button>
                            )}
                            {item.status !== 'replied' && (
                              <button
                                onClick={e => { e.stopPropagation(); handleStatusChange(item.id, 'replied'); }}
                                disabled={updating === item.id}
                                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition disabled:opacity-50"
                              >
                                {updating === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                                Tandai Sudah Dibalas
                              </button>
                            )}
                            {item.status !== 'new' && (
                              <button
                                onClick={e => { e.stopPropagation(); handleStatusChange(item.id, 'new'); }}
                                disabled={updating === item.id}
                                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition disabled:opacity-50"
                              >
                                {updating === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
                                Tandai Baru
                              </button>
                            )}
                            <a
                              href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject)}`}
                              onClick={e => e.stopPropagation()}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              Balas via Email
                            </a>
                            <button
                              onClick={e => { e.stopPropagation(); handleDelete(item.id); }}
                              disabled={deleting === item.id}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition disabled:opacity-50"
                            >
                              {deleting === item.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                              Hapus Pesan
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
            <p className="text-xs text-slate-400">Halaman {page} dari {totalPages} ({total} pesan)</p>
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
