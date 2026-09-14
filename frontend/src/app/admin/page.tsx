'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchDashboardStats } from '@/lib/admin-api';
import {
  FileText,
  Package,
  Image,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Loader2,
  Plus,
} from 'lucide-react';

interface Stats {
  totalBlogs: number;
  totalProducts: number;
  totalPortfolio: number;
  unreadContacts: number;
}

const statCards = [
  {
    key: 'totalBlogs',
    label: 'Total Artikel Blog',
    icon: FileText,
    href: '/admin/blog',
    bg: 'bg-[#3d2817]',
    text: 'text-white/70',
  },
  {
    key: 'totalProducts',
    label: 'Total Produk',
    icon: Package,
    href: '/admin/products',
    bg: 'bg-[#3d2817]',
    text: 'text-white/70',
  },
  {
    key: 'totalPortfolio',
    label: 'Total Portfolio',
    icon: Image,
    href: '/admin/portfolio',
    bg: 'bg-[#3d2817]',
    text: 'text-white/70',
  },
  {
    key: 'unreadContacts',
    label: 'Pesan Belum Dibaca',
    icon: MessageSquare,
    href: '/admin/contacts',
    bg: 'bg-[#3d2817]',
    text: 'text-white/70',
  },
];

const quickActions = [
  { label: 'Tulis Artikel Baru', href: '/admin/blog/new', icon: FileText, color: 'bg-gradient-to-br from-[#F5F1E8] to-[#FAF7F0] hover:from-[#FAF7F0] hover:to-[#F5F1E8] text-[#2C1810]' },
  { label: 'Tambah Produk', href: '/admin/products/new', icon: Package, color: 'bg-gradient-to-br from-[#F5F1E8] to-[#FAF7F0] hover:from-[#FAF7F0] hover:to-[#F5F1E8] text-[#2C1810]' },
  { label: 'Tambah Portfolio', href: '/admin/portfolio/new', icon: Image, color: 'bg-gradient-to-br from-[#F5F1E8] to-[#FAF7F0] hover:from-[#FAF7F0] hover:to-[#F5F1E8] text-[#2C1810]' },
  { label: 'Lihat Pesan Masuk', href: '/admin/contacts', icon: MessageSquare, color: 'bg-gradient-to-br from-[#F5F1E8] to-[#FAF7F0] hover:from-[#FAF7F0] hover:to-[#F5F1E8] text-[#2C1810]' },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats()
      .then(setStats)
      .catch(() => setStats({ totalBlogs: 0, totalProducts: 0, totalPortfolio: 0, unreadContacts: 0 }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810] font-display">Dashboard</h1>
          <p className="text-[#2C1810]/60 text-sm mt-0.5">Selamat datang di panel administrasi Holicindo.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#2C1810]/60 bg-white border border-[#2C1810]/10 rounded-lg px-3 py-2 shadow-sm">
          <TrendingUp className="w-3.5 h-3.5" />
          {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const value = stats ? (stats as any)[card.key] : 0;
          return (
            <Link
              key={card.key}
              href={card.href}
              className="bg-gradient-to-br from-[#2C1810] to-[#1a0f0a] rounded-xl border-2 border-[#B8941E]/30 p-5 hover:border-[#FAF7F0]/60 hover:shadow-xl hover:shadow-black/20 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-white/70 font-medium">{card.label}</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-white/50" />
                    ) : (
                      <span className="text-3xl font-bold text-white">{value}</span>
                    )}
                  </div>
                </div>
                <div className={`${card.bg} p-2.5 rounded-xl`}>
                  <Icon className={`w-5 h-5 ${card.text}`} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-white/50 group-hover:text-white/70 transition">
                <span>Lihat semua</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-semibold text-[#2C1810] mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className={`${action.color} rounded-xl border-2 border-[#2C1810]/20 p-4 flex flex-col items-start gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-[#2C1810]/40 font-semibold`}
              >
                <div className="bg-[#2C1810]/10 rounded-lg p-2">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm leading-tight">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#FAF7F0] to-[#F5F1E8] rounded-2xl border-2 border-[#2C1810] p-5 shadow-2xl">
          <h3 className="font-semibold text-[#2C1810] mb-3 text-lg">Navigasi Cepat</h3>
          <div className="space-y-2">
            {[
              { label: 'Kelola Blog & Artikel', href: '/admin/blog', desc: 'Tulis, edit, dan publikasikan artikel' },
              { label: 'Kelola Produk', href: '/admin/products', desc: 'Tambah dan update katalog produk' },
              { label: 'Kelola Portfolio', href: '/admin/portfolio', desc: 'Tampilkan proyek-proyek terbaik' },
              { label: 'Pesan Masuk', href: '/admin/contacts', desc: 'Baca dan balas pesan dari pengunjung' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#2C1810]/10 border border-transparent hover:border-[#2C1810]/20 transition group">
                <div>
                  <p className="text-sm font-semibold text-[#2C1810]">{item.label}</p>
                  <p className="text-xs text-[#2C1810]/50 mt-0.5">{item.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#2C1810]/30 group-hover:text-[#2C1810]/60 transition" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#FAF7F0] to-[#F5F1E8] rounded-2xl border-2 border-[#2C1810] p-5 shadow-2xl">
          <h3 className="font-semibold text-[#2C1810] mb-3 text-lg">Info Sistem</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-[#2C1810]/20">
              <span className="text-[#2C1810]/60">Website</span>
              <a href="https://holicindo.com" target="_blank" rel="noopener noreferrer" className="text-[#2C1810] hover:underline font-semibold">holicindo.com</a>
            </div>
            <div className="flex justify-between py-2 border-b border-[#2C1810]/20">
              <span className="text-[#2C1810]/60">Backend API</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block animate-pulse" />
                Online
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#2C1810]/20">
              <span className="text-[#2C1810]/60">Environment</span>
              <span className="text-[#2C1810] font-semibold">Production</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#2C1810]/60">Versi</span>
              <span className="text-[#2C1810] font-semibold">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
