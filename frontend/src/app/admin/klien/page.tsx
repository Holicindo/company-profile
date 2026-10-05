'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Loader2, AlertTriangle, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  logo: string | null;
  displayOrder: number;
  isActive: boolean;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011';
const PAGE_SIZE = 10;

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', logo: '', isActive: true });
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => { fetchClients(); }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('holic_admin_token');
      const res = await fetch(`${BACKEND_URL}/api/clients/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setClients(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(clients.length / PAGE_SIZE);
  const paginatedClients = clients.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSave = async () => {
    if (!formData.name.trim()) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('holic_admin_token');
      const url = editingId ? `${BACKEND_URL}/api/clients/admin/${editingId}` : `${BACKEND_URL}/api/clients/admin`;
      const res = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      if (res.ok) { await fetchClients(); handleCancel(); }
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const token = localStorage.getItem('holic_admin_token');
      const res = await fetch(`${BACKEND_URL}/api/clients/admin/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchClients();
        const newTotalPages = Math.ceil((clients.length - 1) / PAGE_SIZE);
        if (currentPage > newTotalPages && newTotalPages > 0) setCurrentPage(newTotalPages);
      }
    } catch (e) { console.error(e); }
    finally { setDeleting(false); setDeleteTarget(null); }
  };

  const handleEdit = (client: Client) => {
    setEditingId(client.id);
    setFormData({ name: client.name, logo: client.logo || '', isActive: client.isActive });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', logo: '', isActive: true });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-7 h-7 animate-spin text-[#C9A84C]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 py-6">
      <div className="max-w-5xl mx-auto px-4">

        {/* Page Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#2C1810]">Kelola Klien</h1>
            <p className="text-sm text-neutral-500 mt-0.5">{clients.length} klien terdaftar</p>
          </div>
          <button
            onClick={() => { setEditingId(null); setFormData({ name: '', logo: '', isActive: true }); setShowForm(true); }}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#2C1810] text-[#2C1810] text-sm font-semibold rounded-lg hover:bg-[#2C1810] hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Klien
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[3rem_1fr_7rem_5rem] bg-[#2C1810] text-white text-xs font-semibold uppercase tracking-wide">
            <div className="px-3 py-2.5 text-center">#</div>
            <div className="px-3 py-2.5">Nama Klien</div>
            <div className="px-3 py-2.5 text-left">Status</div>
            <div className="px-3 py-2.5 text-center">Aksi</div>
          </div>

          {/* Rows */}
          {clients.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              <p className="font-medium">Belum ada klien</p>
              <p className="text-sm mt-1">Klik &ldquo;Tambah Klien&rdquo; untuk memulai</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {paginatedClients.map((client, idx) => {
                const globalIdx = (currentPage - 1) * PAGE_SIZE + idx + 1;
                return (
                  <div
                    key={client.id}
                    className="grid grid-cols-[3rem_1fr_7rem_5rem] items-center hover:bg-neutral-50 transition-colors"
                  >
                    <div className="px-3 py-2.5 text-left text-xs text-neutral-400 font-mono">{globalIdx}</div>
                    <div className="px-3 py-2.5">
                      <span className="font-medium text-sm text-neutral-800">{client.name}</span>
                      {client.logo && <span className="ml-2 text-xs text-neutral-400">• Ada logo</span>}
                    </div>
                    <div className="px-3 py-2.5 flex justify-start">
                      {client.isActive ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3" /> Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3" /> Nonaktif
                        </span>
                      )}
                    </div>
                    <div className="px-3 py-2.5 flex justify-start gap-0.5">
                      <button
                        onClick={() => handleEdit(client)}
                        className="p-1.5 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(client)}
                        className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-100 bg-neutral-50">
              <p className="text-xs text-neutral-500">
                {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, clients.length)} dari {clients.length} klien
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded text-xs font-medium transition-colors ${page === currentPage ? 'bg-[#2C1810] text-white' : 'hover:bg-neutral-200 text-neutral-600'
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Form Tambah/Edit */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCancel} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#2C1810]">
                {editingId ? 'Edit Klien' : 'Tambah Klien Baru'}
              </h2>
              <button onClick={handleCancel} className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors">
                <X className="w-4 h-4 text-neutral-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wide">
                  Nama Klien <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2.5 border-2 border-[#2C1810]/30 rounded-lg focus:border-[#2C1810] outline-none transition text-sm"
                  placeholder="Contoh: Gelael Signature"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5 uppercase tracking-wide">
                  Logo URL <span className="text-neutral-400 font-normal normal-case">(opsional)</span>
                </label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                  className="w-full px-3 py-2.5 border-2 border-[#2C1810]/30 rounded-lg focus:border-[#2C1810] outline-none transition text-sm"
                  placeholder="/clients/gelael.svg"
                />
              </div>
              <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
                  className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${formData.isActive ? 'bg-[#C9A84C]' : 'bg-neutral-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.isActive ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-sm text-neutral-700">
                  {formData.isActive ? <span className="font-medium text-emerald-700">Aktif</span> : <span className="text-neutral-500">Nonaktif</span>}
                  <span className="text-neutral-400 ml-1 text-xs">
                    — {formData.isActive ? 'tampil di website' : 'disembunyikan'}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={handleSave}
                disabled={saving || !formData.name.trim()}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#2C1810] text-white text-sm font-semibold rounded-lg hover:bg-[#3d241a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2.5 border border-neutral-300 text-neutral-700 text-sm font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-11 h-11 bg-red-100 rounded-full flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-base font-bold text-neutral-900 mb-1.5">Hapus Klien?</h2>
              <p className="text-sm text-neutral-500 mb-5">
                <span className="font-semibold text-neutral-800">&ldquo;{deleteTarget.name}&rdquo;</span> akan dihapus permanen.
              </p>
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 text-sm font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  {deleting ? 'Menghapus...' : 'Ya, Hapus'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
