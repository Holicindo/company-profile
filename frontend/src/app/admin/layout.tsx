'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Package,
  Image,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/products', label: 'Produk', icon: Package },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Image },
  { href: '/admin/contacts', label: 'Pesan Masuk', icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('Admin');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('holic_admin_token');
      if (!token) {
        router.replace('/admin/login');
        return;
      }
      // Decode JWT untuk email
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setAdminEmail(payload.email || payload.sub || 'Admin');
      } catch {}
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('holic_admin_token');
    document.cookie = 'holic_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.replace('/admin/login');
  };

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <div>
            <p className="font-bold text-white font-display text-sm">Holicindo</p>
            <p className="text-slate-500 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-brand-500/15 text-brand-400 border border-brand-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
              {active && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-800">
        <div className="px-3 py-2 mb-2">
          <p className="text-slate-400 text-xs">Masuk sebagai</p>
          <p className="text-white text-sm font-medium truncate">{adminEmail}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 flex flex-col lg:hidden transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h2 className="text-sm font-semibold text-slate-700">
                {navItems.find(i => isActive(i))?.label || 'Admin Panel'}
              </h2>
              <p className="text-xs text-slate-400 hidden sm:block">Holicindo Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-sm text-slate-600">{adminEmail}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              Keluar
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
