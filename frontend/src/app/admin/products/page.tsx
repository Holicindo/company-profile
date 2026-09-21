'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { fetchAdminProducts, fetchCategories, deleteProduct } from '@/lib/admin-api';
import {
  Plus, Pencil, Trash2, Loader2, Package, Search,
  ChevronLeft, ChevronRight, Star, StarOff,
} from 'lucide-react';
import { AdminSelect } from '@/components/admin/AdminSelect';

interface Product {
  id: number;
  name: string;
  slug: string;
  imageUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
  categoryId?: number;
  category?: { name: string; id: number };
  createdAt: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const LIMIT = 15;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAdminProducts(page, LIMIT);
      setProducts(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      alert('Gagal memuat produk: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    fetchCategories().then((cats: any[]) => {
      const flat: Category[] = [];
      cats.forEach((c: any) => {
        flat.push(c);
        if (c.children) flat.push(...c.children);
      });
      setCategories(flat);
    }).catch(() => {});
  }, []);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Hapus produk "${name}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setDeleting(id);
    try {
      await deleteProduct(id);
      await load();
    } catch (err: any) {
      alert('Gagal menghapus: ' + err.message);
    } finally {
      setDeleting(null);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCat || String(p.categoryId) === filterCat || p.category?.name === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]">Manajemen Produk</h1>
          <p className="text-[#2C1810]/60 text-sm mt-1">{total} produk tersimpan</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] text-[#2C1810] text-sm font-bold rounded-xl hover:from-[#FAF7F0] hover:to-[#F5F1E8] border-2 border-[#2C1810]/20 transition-all shadow-lg hover:shadow-xl">
          <Plus className="w-5 h-5" />
          Tambah Produk
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C1810]/40" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-10 pr-4 py-2.5 border-2 border-[#2C1810]/20 rounded-xl text-sm text-[#2C1810] placeholder:text-[#2C1810]/40 focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50 focus:border-[#B8941E]/50 transition bg-white"
          />
        </div>
        <AdminSelect
          value={filterCat}
          onChange={val => { setFilterCat(val); }}
          placeholder="Semua Kategori"
          options={[
            { value: '', label: 'Semua Kategori' },
            ...categories.map(c => ({ value: String(c.id), label: c.name })),
          ]}
          className="min-w-[180px]"
        />
      </div>

      <div className="bg-gradient-to-br from-[#FAF7F0] to-[#F5F1E8] rounded-2xl border-2 border-[#2C1810] shadow-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#2C1810]" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-[#2C1810]/50">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-base">Belum ada produk.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#3d2817] border-b-2 border-[#2C1810] text-white/80">
                  <th className="text-center px-4 py-3 font-semibold w-20">Foto</th>
                  <th className="text-left px-4 py-3 font-semibold">Nama Produk</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Kategori</th>
                  <th className="text-center px-4 py-3 font-semibold hidden sm:table-cell w-32">Unggulan</th>
                  <th className="text-center px-4 py-3 font-semibold w-24">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-[#2C1810]/20 hover:bg-[#F5F1E8] transition">
                    <td className="px-4 py-3">
                      <div className="flex justify-center">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-lg border-2 border-[#2C1810]/20" />
                        ) : (
                          <div className="w-12 h-12 bg-[#2C1810]/5 rounded-lg flex items-center justify-center border-2 border-[#2C1810]/10">
                            <Package className="w-5 h-5 text-[#2C1810]/30" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-[#2C1810] text-sm">{product.name}</p>
                      <p className="text-xs text-[#2C1810]/40 mt-0.5">{product.slug}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-[#2C1810]/70 text-sm">
                      {product.category?.name || '—'}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-center">
                      {product.isFeatured ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-600/30">
                          <Star className="w-3 h-3 fill-amber-700" />
                          Unggulan
                        </span>
                      ) : (
                        <span className="text-xs text-[#2C1810]/30">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Link href={`/admin/products/${product.id}/edit`} className="p-2 rounded-lg text-[#2C1810]/70 hover:text-[#2C1810] hover:bg-[#2C1810]/10 transition" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={deleting === product.id}
                          className="p-2 rounded-lg text-[#2C1810]/70 hover:text-red-600 hover:bg-red-100 transition disabled:opacity-50"
                          title="Hapus"
                        >
                          {deleting === product.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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
            <p className="text-sm text-[#2C1810]/60">Halaman {page} dari {totalPages} ({total} produk)</p>
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
