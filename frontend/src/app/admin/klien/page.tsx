'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Loader2, GripVertical } from 'lucide-react';

interface Client {
  id: number;
  name: string;
  logo: string | null;
  displayOrder: number;
  isActive: boolean;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3011';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', logo: '', isActive: true });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BACKEND_URL}/api/clients/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = editingId
        ? `${BACKEND_URL}/api/clients/admin/${editingId}`
        : `${BACKEND_URL}/api/clients/admin`;
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
        fetchClients();
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: '', logo: '', isActive: true });
      }
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus klien ini?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BACKEND_URL}/api/clients/admin/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchClients();
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    }
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
            <h1 className="text-2xl font-bold text-neutral-900">Kelola Klien</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#b0903b] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Tambah Klien
            </button>
          </div>

          {showForm && (
            <div className="mb-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h3 className="text-lg font-semibold mb-4">{editingId ? 'Edit Klien' : 'Tambah Klien Baru'}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Nama Klien</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                    placeholder="Contoh: Gelael Signature"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Logo URL (optional)</label>
                  <input
                    type="text"
                    value={formData.logo}
                    onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                    placeholder="/clients/gelael.svg"
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
            {clients.length === 0 ? (
              <p className="text-center text-neutral-500 py-8">Belum ada klien. Tambahkan klien pertama Anda!</p>
            ) : (
              clients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <GripVertical className="w-5 h-5 text-neutral-400 cursor-move" />
                    <div>
                      <h3 className="font-semibold text-neutral-900">{client.name}</h3>
                      <p className="text-sm text-neutral-500">
                        {client.isActive ? '✓ Aktif' : '✗ Tidak Aktif'} • Order: {client.displayOrder}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(client)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
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
