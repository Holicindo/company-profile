'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Loader2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface ContactSubject {
  id: number;
  label_id: string;
  label_en: string;
  displayOrder: number;
  isActive: boolean;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3011';

export default function ContactSubjectsPage() {
  const [subjects, setSubjects] = useState<ContactSubject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ label_id: '', label_en: '', isActive: true });
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ContactSubject | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem('holic_admin_token');
      const res = await fetch(`${BACKEND_URL}/api/contact-subjects/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSubjects(data);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.label_id.trim()) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('holic_admin_token');
      const url = editingId
        ? `${BACKEND_URL}/api/contact-subjects/admin/${editingId}`
        : `${BACKEND_URL}/api/contact-subjects/admin`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchSubjects();
        handleCancel();
      }
    } catch (error) {
      console.error('Error saving subject:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const token = localStorage.getItem('holic_admin_token');
      const res = await fetch(`${BACKEND_URL}/api/contact-subjects/admin/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchSubjects();
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleEdit = (subject: ContactSubject) => {
    setEditingId(subject.id);
    setFormData({ label_id: subject.label_id, label_en: subject.label_en, isActive: subject.isActive });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ label_id: '', label_en: '', isActive: true });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#C9A84C]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Subjek Form Kontak</h1>
              <p className="text-sm text-neutral-500 mt-1">{subjects.length} subjek terdaftar</p>
            </div>
            <button
              onClick={() => { setEditingId(null); setFormData({ label_id: '', label_en: '', isActive: true }); setShowForm(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#b0903b] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Tambah Subjek
            </button>
          </div>

          {/* List */}
          <div className="space-y-2">
            {subjects.length === 0 ? (
              <div className="text-center py-16 text-neutral-400">
                <p className="text-lg font-medium">Belum ada subjek</p>
                <p className="text-sm mt-1">Tambahkan subjek form kontak pertama!</p>
              </div>
            ) : (
              subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg hover:border-[#C9A84C]/40 hover:shadow-sm transition-all"
                >
                  <div>
                    <h3 className="font-semibold text-neutral-900">{subject.label_id}</h3>
                    <p className="text-sm text-neutral-500 mt-0.5">{subject.label_en}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      {subject.isActive ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3 h-3" /> Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3" /> Nonaktif
                        </span>
                      )}
                      <span className="text-xs text-neutral-400">Urutan: {subject.displayOrder}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(subject)}
                      className="p-2 text-neutral-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(subject)}
                      className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal Form Tambah/Edit */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCancel} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-neutral-900">
                {editingId ? 'Edit Subjek' : 'Tambah Subjek Baru'}
              </h2>
              <button onClick={handleCancel} className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Label (Indonesia) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.label_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, label_id: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent outline-none transition"
                  placeholder="Inquiry Produk"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Label (English) <span className="text-neutral-400 font-normal">(opsional)</span>
                </label>
                <input
                  type="text"
                  value={formData.label_en}
                  onChange={(e) => setFormData(prev => ({ ...prev, label_en: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent outline-none transition"
                  placeholder="Product Inquiry"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
                  className={`relative w-10 h-6 rounded-full transition-colors ${formData.isActive ? 'bg-[#C9A84C]' : 'bg-neutral-300'}`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.isActive ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <label className="text-sm font-medium text-neutral-700">
                  {formData.isActive ? 'Aktif (tampil di form kontak)' : 'Nonaktif (disembunyikan)'}
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={saving || !formData.label_id.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#b0903b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2.5 bg-neutral-100 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
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
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-lg font-bold text-neutral-900 mb-2">Hapus Subjek?</h2>
              <p className="text-sm text-neutral-500 mb-6">
                Subjek <span className="font-semibold text-neutral-800">&ldquo;{deleteTarget.label_id}&rdquo;</span> akan dihapus permanen dan tidak bisa dikembalikan.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 px-4 py-2.5 bg-neutral-100 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
