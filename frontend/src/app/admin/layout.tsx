'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  FileText,
  Package,
  Image as ImageIcon,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Bell,
  Home,
  Users,
  Wrench,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/beranda', label: 'Beranda', icon: Home },
  { href: '/admin/tentang-kami', label: 'Tentang Kami', icon: Users },
  { href: '/admin/layanan', label: 'Layanan', icon: Wrench },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/products', label: 'Produk', icon: Package },
  { href: '/admin/portfolio', label: 'Portofolio', icon: ImageIcon },
  { href: '/admin/contacts', label: 'Pesan Masuk', icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [adminEmail, setAdminEmail] = useState('Admin');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('holic_admin_token');
      if (!token) {
        router.replace('/login');
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
    router.replace('/login');
  };

  const isActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo & Collapse Toggle */}
      <div className={`${sidebarCollapsed ? 'px-4 py-6' : 'px-6 py-8'} border-b border-[#3d2817] flex items-center justify-center relative transition-all duration-300`}>
        {!sidebarCollapsed ? (
          <div className="flex items-center justify-center w-full">
            <Image 
              src="/logo.png" 
              alt="Holicindo" 
              width={140} 
              height={140} 
              className="object-contain brightness-0 invert" 
              unoptimized 
              priority
            />
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            {/* Just the expand button when collapsed */}
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="p-3 rounded-lg text-white/70 hover:text-white hover:bg-[#3d2817] transition"
              title="Expand sidebar"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
        
        {/* Desktop collapse toggle - only show when expanded */}
        {!sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(true)}
            className="hidden lg:block p-2 rounded-lg text-white/70 hover:text-white hover:bg-[#3d2817] transition absolute top-8 right-4"
            title="Collapse sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        
        {/* Mobile close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-lg text-white hover:bg-[#3d2817] transition absolute top-8 right-4"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-5 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 ${
                active
                  ? 'bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] text-[#2C1810] shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-[#3d2817]'
              }`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
              {!sidebarCollapsed && active && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!sidebarCollapsed && (
        <div className="px-4 py-4 border-t border-[#3d2817]">
          <div className="px-4 py-3 mb-3 bg-[#3d2817] rounded-xl">
            <p className="text-white/50 text-xs mb-1">Masuk sebagai</p>
            <p className="text-white text-base font-semibold truncate">{adminEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold text-white/80 hover:text-red-400 hover:bg-red-900/20 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      )}
      
      {sidebarCollapsed && (
        <div className="px-4 py-4 border-t border-[#3d2817] flex justify-center">
          <button
            onClick={handleLogout}
            className="p-3 rounded-xl text-white/80 hover:text-red-400 hover:bg-red-900/20 transition-all"
            title="Keluar"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#FAF7F0] to-[#F5F1E8] flex">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col ${sidebarCollapsed ? 'w-20' : 'w-72'} bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] fixed inset-y-0 left-0 z-30 border-r border-[#3d2817] transition-all duration-300`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-[#2C1810] to-[#1a0f0a] flex flex-col lg:hidden transition-transform duration-300 border-r border-[#3d2817] ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className={`flex-1 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'} flex flex-col min-h-screen transition-all duration-300`}>
        {/* Mobile menu button - floating */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 left-6 z-30 w-14 h-14 bg-gradient-to-br from-[#2C1810] to-[#1a0f0a] border-2 border-[#B8941E]/30 text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
