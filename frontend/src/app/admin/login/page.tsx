'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminLogin } from '@/lib/admin-api';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already logged in, redirect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('holic_admin_token');
      if (token) router.replace('/admin');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await adminLogin(email, password);
      // Backend mengembalikan accessToken (camelCase)
      const token = data?.accessToken || data?.access_token;
      if (!token) throw new Error('Token tidak diterima dari server');

      // Simpan di localStorage
      localStorage.setItem('holic_admin_token', token);

      // Simpan di cookie untuk middleware (expires 7 hari)
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `holic_admin_token=${token}; path=/; expires=${expires}; SameSite=Lax`;

      router.replace('/admin');
    } catch (err: any) {
      setError(err.message === 'HTTP 401' ? 'Email atau password salah.' : (err.message || 'Login gagal.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-slate-900 to-slate-950" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 mb-4 shadow-lg shadow-brand-900/50">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Holicindo Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Masuk ke panel administrasi</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8">
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-900/40 border border-red-700 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="admin@holicindo.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-brand-600 to-brand-400 hover:from-brand-500 hover:to-brand-300 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-brand-500/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Memproses...</>
              ) : 'Masuk ke Dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          © {new Date().getFullYear()} Holicindo. Akses terbatas hanya untuk admin.
        </p>
      </div>
    </div>
  );
}
