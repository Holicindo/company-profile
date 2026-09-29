'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Loader2 } from 'lucide-react';

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

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem('token');
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
    try {
      const token = localStorage.getItem('token');
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
        setShowForm(false);
        setEditingId(null);
        setFormData({ label_id: '', label_en: '', isActive: true });
      }
    } catch (error) {
      console.error('Error saving subject:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus subjek ini?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BACKEND_URL}/api/contact-subjects/admin/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchSubjects();
      }
    } catch (error) {
      console.error('Error deleting subject:', error);
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
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-neutral-900">Subjek Form Kontak</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#b0903b] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Tambah Subjek
            </button>
          </div>

          {showForm && (
            <div className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h3 className="text-lg font-semibold mb-4">{editingId ? 'Edit Subjek' : 'Tambah Subjek Baru'}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Label (Indonesia)</label>
                  <input
                    type="text"
                    value={formData.label_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, label_id: e.target.value }))}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                    placeholder="Inquiry Produk"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Label (English)</label>
                  <input
                    type="text"
                    value={formData.label_en}
                    onChange={(e) => setFormData(prev => ({ ...prev, label_en: e.target.value }))}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                    placeholder="Product Inquiry"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 text-[#C9A84C] border-neutral-300 rounded focus:ring-[#C9A84C]"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-neutral-700">Aktif</label>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#b0903b] transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Simpan
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-200 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {subjects.length === 0 ? (
              <p className="text-center text-neutral-500 py-8">Belum ada subjek. Tambahkan subjek pertama!</p>
            ) : (
              subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-neutral-900">{subject.label_id}</h3>
                    <p className="text-sm text-neutral-500">{subject.label_en}</p>
                    <p className="text-xs text-neutral-400 mt-1">
                      {subject.isActive ? '✓ Aktif' : '✗ Tidak Aktif'} • Order: {subject.displayOrder}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(subject)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(subject.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
    </div>
  );
}
