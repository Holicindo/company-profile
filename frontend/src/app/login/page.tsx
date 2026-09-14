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
      const token = data?.accessToken || data?.access_token;
      if (!token) throw new Error('Token tidak diterima dari server');

      localStorage.setItem('holic_admin_token', token);
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
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f0a] via-[#2C1810] to-[#0f0805] flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#B8941E]/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-6xl">
        <div className="bg-gradient-to-br from-[#2C1810] to-[#1a0f0a] rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/20">
          <div className="grid lg:grid-cols-2">
            
            {/* LEFT SIDE - Welcome Section with Hologram Effect */}
            <div className="relative p-12 lg:p-16 flex flex-col justify-center items-start bg-gradient-to-br from-[#2C1810] via-[#1a0f0a] to-[#2C1810] overflow-hidden">
              {/* Hologram Gold Effect */}
              <div className="absolute inset-0 overflow-hidden opacity-40">
                <div className="absolute top-1/4 left-1/4 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-shimmer"></div>
                <div className="absolute top-1/3 left-1/3 w-full h-px bg-gradient-to-r from-transparent via-[#B8941E] to-transparent animate-shimmer delay-300"></div>
                <div className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-shimmer delay-500"></div>
                <div className="absolute top-2/3 left-1/4 w-full h-px bg-gradient-to-r from-transparent via-[#B8941E] to-transparent animate-shimmer delay-700"></div>
                <div className="absolute bottom-1/4 left-1/3 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent animate-shimmer delay-1000"></div>
                
                {/* Vertical lines */}
                <div className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent"></div>
                <div className="absolute top-0 left-2/4 h-full w-px bg-gradient-to-b from-transparent via-[#B8941E]/30 to-transparent"></div>
                <div className="absolute top-0 right-1/4 h-full w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent"></div>
              </div>

              {/* Logo */}
              <div className="relative z-10 mb-10">
                <div className="inline-block">
                  <Image 
                    src="/logo.png" 
                    alt="Holicindo" 
                    width={100} 
                    height={100} 
                    className="object-contain brightness-0 invert" 
                    unoptimized 
                    priority 
                  />
                </div>
              </div>

              {/* Welcome Text */}
              <div className="relative z-10 space-y-6">
                <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
                  SELAMAT<br/>DATANG!
                </h1>
                <p className="text-lg text-white/80 max-w-md leading-relaxed">
                  Panel admin untuk mengelola seluruh konten website Holicindo. 
                  Atur artikel blog, produk, portofolio proyek, dan pesan pelanggan 
                  dalam satu dashboard terintegrasi.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE - Login Form */}
            <div className="p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-[#1a0f0a] to-[#0f0805]">
              <div className="w-full max-w-md mx-auto">
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Login Admin</h2>
                  <p className="text-white/60">Masuk ke panel administrasi</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-medium">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="admin@holicindo.com"
                        className="w-full pl-12 pr-4 py-4 bg-[#2C1810] border-2 border-[#D4AF37]/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition font-medium"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
                      <input
                        type={showPw ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full pl-12 pr-14 py-4 bg-[#2C1810] border-2 border-[#D4AF37]/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(!showPw)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/60 hover:text-[#D4AF37] transition"
                      >
                        {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 bg-gradient-to-r from-[#F5F1E8] to-[#FAF7F0] hover:from-[#FAF7F0] hover:to-[#F5F1E8] text-[#2C1810] font-bold text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Memproses...</>
                    ) : 'Masuk ke Dashboard'}
                  </button>
                </form>

                {/* Footer */}
                <p className="text-center text-white/40 text-xs mt-8">
                  © {new Date().getFullYear()} Holicindo. Akses terbatas hanya untuk admin.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Add shimmer animation to global styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
}
