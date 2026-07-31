'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { fetchAdminProducts, fetchCategories, deleteProduct } from '@/lib/admin-api';
import {
  Plus, Pencil, Trash2, Loader2, Package, Search,
  ChevronLeft, ChevronRight, Star, StarOff,
} from 'lucide-react';

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
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Manajemen Produk</h1>
          <p className="text-slate-500 text-sm">{total} produk tersimpan</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-600 to-brand-400 text-white text-sm font-semibold rounded-lg hover:from-brand-500 hover:to-brand-300 transition shadow">
          <Plus className="w-4 h-4" />
          Tambah Produk
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-400 transition bg-white"
          />
        </div>
        <select
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-400 transition bg-white"
        >
          <option value="">Semua Kategori</option>
          {categories.map(c => (
            <option key={c.id} value={String(c.id)}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>Belum ada produk.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th className="text-left px-5 py-3 font-medium w-12">Foto</th>
                  <th className="text-left px-4 py-3 font-medium">Nama Produk</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Kategori</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Unggulan</th>
                  <th className="text-right px-5 py-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition">
                    <td className="px-5 py-3">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded-lg border border-slate-200" />
                      ) : (
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <Package className="w-4 h-4 text-slate-300" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-800">{product.name}</p>
                      <p className="text-xs text-slate-400">{product.slug}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-slate-500">
                      {product.category?.name || '—'}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {product.isFeatured
                        ? <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full"><Star className="w-3 h-3" /> Unggulan</span>
                        : <span className="text-xs text-slate-400">—</span>
                      }
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/${product.id}/edit`} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={deleting === product.id}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition disabled:opacity-50"
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
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
            <p className="text-xs text-slate-400">Halaman {page} dari {totalPages} ({total} produk)</p>
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
