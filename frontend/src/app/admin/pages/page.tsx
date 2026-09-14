'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Edit, Loader2, Search, RefreshCw } from 'lucide-react';

interface Page {
  id: number;
  slug: string;
  title: string;
  status: string;
  updatedAt: string;
}

export default function PagesAdminPage() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchPages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('holic_admin_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPages(data);
      }
    } catch (err) {
      console.error('Failed to fetch pages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const filteredPages = pages.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const getPageIcon = (slug: string) => {
    switch (slug) {
      case 'beranda': return '🏠';
      case 'tentang-kami': return '👥';
      case 'layanan': return '⚙️';
      default: return '📄';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1810] mb-2">Manajemen Halaman</h1>
          <p className="text-[#2C1810]/60">Kelola konten halaman website Anda</p>
        </div>
        <button
          onClick={fetchPages}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] text-[#2C1810] rounded-xl border-2 border-[#2C1810]/20 font-bold hover:shadow-lg transition disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2C1810]/40" size={20} />
          <input
            type="text"
            placeholder="Cari halaman..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] placeholder-[#2C1810]/30 focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50 focus:border-[#B8941E]/50"
          />
        </div>
      </div>

      {/* Pages Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={40} className="animate-spin text-[#B8941E]" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border-2 border-[#2C1810]/20 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#2C1810] to-[#1a0f0a] text-white">
                <th className="px-6 py-4 text-left text-sm font-bold w-16">#</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Halaman</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Slug</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Terakhir Diubah</th>
                <th className="px-6 py-4 text-center text-sm font-bold w-32">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C1810]/10">
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#2C1810]/50">
                    <FileText size={48} className="mx-auto mb-3 opacity-30" />
                    <p className="font-semibold">Belum ada halaman</p>
                    <p className="text-sm">Jalankan seeder untuk membuat halaman default</p>
                  </td>
                </tr>
              ) : (
                filteredPages.map((page, idx) => (
                  <tr key={page.id} className="hover:bg-[#FAF7F0]/30 transition">
                    <td className="px-6 py-4 text-[#2C1810]/60 text-sm">{idx + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getPageIcon(page.slug)}</span>
                        <span className="font-semibold text-[#2C1810]">{page.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="px-3 py-1 bg-[#F5F1E8] text-[#2C1810] rounded-lg text-sm font-mono border border-[#2C1810]/10">
                        {page.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                          page.status === 'published'
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                        }`}
                      >
                        {page.status === 'published' ? '✓ Dipublikasi' : '⏳ Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#2C1810]/60 text-sm">
                      {new Date(page.updatedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => router.push(`/admin/pages/${page.slug}/edit`)}
                          className="p-2 bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] text-[#2C1810] rounded-lg border-2 border-[#2C1810]/20 hover:shadow-md transition"
                          title="Edit halaman"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Info Card */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl">
        <p className="text-sm text-blue-900">
          <strong>💡 Tips:</strong> Klik tombol <strong>Edit</strong> untuk mengelola konten masing-masing halaman. 
          Setiap halaman memiliki struktur konten yang disesuaikan dengan kebutuhannya.
        </p>
      </div>
    </div>
  );
}
