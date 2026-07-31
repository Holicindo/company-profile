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
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
  },
  {
    key: 'totalProducts',
    label: 'Total Produk',
    icon: Package,
    href: '/admin/products',
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
  },
  {
    key: 'totalPortfolio',
    label: 'Total Portfolio',
    icon: Image,
    href: '/admin/portfolio',
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
  },
  {
    key: 'unreadContacts',
    label: 'Pesan Belum Dibaca',
    icon: MessageSquare,
    href: '/admin/contacts',
    color: 'from-brand-500 to-brand-600',
    bg: 'bg-brand-50',
    text: 'text-brand-600',
  },
];

const quickActions = [
  { label: 'Tulis Artikel Baru', href: '/admin/blog/new', icon: FileText, color: 'bg-blue-600 hover:bg-blue-700' },
  { label: 'Tambah Produk', href: '/admin/products/new', icon: Package, color: 'bg-emerald-600 hover:bg-emerald-700' },
  { label: 'Tambah Portfolio', href: '/admin/portfolio/new', icon: Image, color: 'bg-purple-600 hover:bg-purple-700' },
  { label: 'Lihat Pesan Masuk', href: '/admin/contacts', icon: MessageSquare, color: 'bg-brand-600 hover:bg-brand-700' },
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
          <h1 className="text-2xl font-bold text-slate-800 font-display">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Selamat datang di panel administrasi Holicindo.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-white border border-slate-200 rounded-lg px-3 py-2">
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
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">{card.label}</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-slate-300" />
                    ) : (
                      <span className="text-3xl font-bold text-slate-800">{value}</span>
                    )}
                  </div>
                </div>
                <div className={`${card.bg} p-2.5 rounded-xl`}>
                  <Icon className={`w-5 h-5 ${card.text}`} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-slate-400 group-hover:text-slate-600 transition">
                <span>Lihat semua</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-semibold text-slate-700 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className={`${action.color} text-white rounded-xl p-4 flex flex-col items-start gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg`}
              >
                <div className="bg-white/20 rounded-lg p-2">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium leading-tight">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-700 mb-3">Navigasi Cepat</h3>
          <div className="space-y-2">
            {[
              { label: 'Kelola Blog & Artikel', href: '/admin/blog', desc: 'Tulis, edit, dan publikasikan artikel' },
              { label: 'Kelola Produk', href: '/admin/products', desc: 'Tambah dan update katalog produk' },
              { label: 'Kelola Portfolio', href: '/admin/portfolio', desc: 'Tampilkan proyek-proyek terbaik' },
              { label: 'Pesan Masuk', href: '/admin/contacts', desc: 'Baca dan balas pesan dari pengunjung' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition group">
                <div>
                  <p className="text-sm font-medium text-slate-700">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition" />
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-700 mb-3">Info Sistem</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Website</span>
              <a href="https://holicindo.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline font-medium">holicindo.com</a>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Backend API</span>
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block animate-pulse" />
                Online
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Environment</span>
              <span className="text-slate-700 font-medium">Production</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Versi</span>
              <span className="text-slate-700 font-medium">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
