'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { fetchAdminBlogs, deleteBlog } from '@/lib/admin-api';
import {
  Plus, Pencil, Trash2, Loader2, FileText, Search,
  ChevronLeft, ChevronRight, Eye, EyeOff, ChevronDown,
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  author: string;
  createdAt: string;
  publishedAt: string | null;
  excerpt?: string;
  tags?: string[];
  views?: number;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const LIMIT = 15; // 15 rows per page

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAdminBlogs(1, 100); // Fetch more to filter client-side
      setPosts(data.items || []);
      setTotal(data.total || 0);
    } catch (err: any) {
      alert('Gagal memuat data blog: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Filter and paginate
  useEffect(() => {
    let filtered = posts;
    
    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = posts.filter(post => {
        const postCategories = Array.isArray(post.tags) ? post.tags : [];
        return postCategories.includes(categoryFilter);
      });
    }

    setFilteredPosts(filtered);
    setTotalPages(Math.ceil(filtered.length / LIMIT));
    setPage(1); // Reset to first page when filter changes
  }, [posts, categoryFilter]);

  // Get unique categories from all posts
  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    posts.forEach(post => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach(tag => cats.add(tag));
      }
    });
    return Array.from(cats).sort();
  }, [posts]);

  // Paginated posts
  const paginatedPosts = React.useMemo(() => {
    const startIdx = (page - 1) * LIMIT;
    return filteredPosts.slice(startIdx, startIdx + LIMIT);
  }, [filteredPosts, page]);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Hapus artikel "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setDeleting(id);
    try {
      await deleteBlog(id);
      await load();
    } catch (err: any) {
      alert('Gagal menghapus: ' + err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]">Manajemen Blog</h1>
          <p className="text-[#2C1810]/60 text-sm mt-1">{filteredPosts.length} artikel {categoryFilter !== 'all' ? `(${categoryFilter})` : ''}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Custom Category Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-between gap-3 px-4 py-2.5 bg-gradient-to-br from-[#2C1810] to-[#1a0f0a] text-white border-2 border-[#B8941E]/30 rounded-xl text-sm font-semibold hover:border-[#B8941E]/50 focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50 transition min-w-[180px]"
            >
              <span className="truncate">{categoryFilter === 'all' ? 'Semua Kategori' : categoryFilter}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdownOpen && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setDropdownOpen(false)}
                />
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-64 bg-gradient-to-br from-[#2C1810] to-[#1a0f0a] border-2 border-[#B8941E]/30 rounded-xl shadow-2xl overflow-hidden z-20">
                  <div className="py-2 max-h-64 overflow-y-auto">
                    <button
                      onClick={() => {
                        setCategoryFilter('all');
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition ${
                        categoryFilter === 'all'
                          ? 'bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] text-[#2C1810]'
                          : 'text-white/80 hover:bg-[#3d2817] hover:text-white'
                      }`}
                    >
                      Semua Kategori
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCategoryFilter(cat);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium transition ${
                          categoryFilter === cat
                            ? 'bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] text-[#2C1810]'
                            : 'text-white/80 hover:bg-[#3d2817] hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <Link
            href="/admin/blog/new"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] text-[#2C1810] text-sm font-bold rounded-xl hover:from-[#FAF7F0] hover:to-[#F5F1E8] border-2 border-[#2C1810]/20 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Tulis Artikel Baru
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gradient-to-br from-[#FAF7F0] to-[#F5F1E8] rounded-2xl border-2 border-[#2C1810] shadow-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#2C1810]" />
          </div>
        ) : paginatedPosts.length === 0 ? (
          <div className="text-center py-20 text-[#2C1810]/50">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-base">Belum ada artikel{categoryFilter !== 'all' ? ` di kategori "${categoryFilter}"` : ''}.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#3d2817] border-b-2 border-[#2C1810] text-white/80">
                    <th className="text-center px-3 py-3 font-semibold w-12">#</th>
                    <th className="text-left px-4 py-3 font-semibold">Judul</th>
                    <th className="text-center px-3 py-3 font-semibold w-24 hidden lg:table-cell">Views</th>
                    <th className="text-center px-3 py-3 font-semibold w-32 hidden md:table-cell">Tanggal</th>
                    <th className="text-center px-3 py-3 font-semibold w-28">Status</th>
                    <th className="text-center px-4 py-3 font-semibold w-24">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPosts.map((post, idx) => {
                    const rowNumber = (page - 1) * LIMIT + idx + 1;
                    return (
                      <tr key={post.id} className="border-b border-[#2C1810]/20 hover:bg-[#F5F1E8] transition">
                        <td className="px-3 py-3 text-center text-[#2C1810]/50 font-mono text-xs">{rowNumber}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-semibold text-[#2C1810] text-sm">{post.title}</p>
                            <p className="text-xs text-[#2C1810]/40 mt-0.5 line-clamp-1">/news/{post.slug}</p>
                          </div>
                        </td>
                        <td className="px-3 py-3 hidden lg:table-cell text-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#2C1810]/5 text-[#2C1810]/70 text-xs font-semibold rounded-md border border-[#2C1810]/10">
                            <Eye className="w-3 h-3" />
                            {post.views || 0}
                          </span>
                        </td>
                        <td className="px-3 py-3 hidden md:table-cell text-center text-[#2C1810]/50 text-xs">
                          {new Date(post.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-3 py-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                            post.status === 'published'
                              ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-600/30'
                              : 'bg-amber-500/20 text-amber-700 border border-amber-600/30'
                          }`}>
                            {post.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span className="hidden sm:inline">{post.status === 'published' ? 'Published' : 'Draft'}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <Link
                              href={`/admin/blog/${post.id}/edit`}
                              className="p-2 rounded-lg text-[#2C1810]/70 hover:text-[#2C1810] hover:bg-[#2C1810]/10 transition"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(post.id, post.title)}
                              disabled={deleting === post.id}
                              className="p-2 rounded-lg text-[#2C1810]/70 hover:text-red-600 hover:bg-red-100 transition disabled:opacity-50"
                              title="Hapus"
                            >
                              {deleting === post.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t-2 border-[#2C1810] bg-gradient-to-r from-[#FAF7F0] to-[#F5F1E8] flex items-center justify-between">
                <p className="text-sm text-[#2C1810]/60">
                  Halaman {page} dari {totalPages} ({filteredPosts.length} artikel)
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-lg text-[#2C1810]/70 hover:text-[#2C1810] hover:bg-[#2C1810]/10 transition disabled:opacity-30 disabled:cursor-not-allowed border border-[#2C1810]/20"
                  >
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
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg text-[#2C1810]/70 hover:text-[#2C1810] hover:bg-[#2C1810]/10 transition disabled:opacity-30 disabled:cursor-not-allowed border border-[#2C1810]/20"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
