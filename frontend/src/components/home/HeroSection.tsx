'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, ShieldCheck, Wrench, Truck, X } from 'lucide-react';

export function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="relative bg-[#0d1013] min-h-[95vh] flex items-center pt-24 pb-32 overflow-hidden">

        {/* Wavy Divider di ATAS — transisi smooth dari navbar ke hero */}
        <div className="absolute -top-[2px] left-0 right-0 w-full overflow-hidden leading-none" style={{ zIndex: 1 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[50px] md:h-[70px] fill-slate-950 block rotate-180">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"></path>
          </svg>
        </div>

        {/* ── Gambar mesin — desktop: absolute overlay, mobile: dalam flow ── */}
        {/* Desktop */}
        <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: 10 }}>
          <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[40%] h-[70%] bg-brand-500/10 blur-[120px] rounded-full" />
          <div className="relative w-full h-full">
            <img
              src="/hero_section_1.png"
              alt="Kitchen Equipment Showcase"
              className="absolute top-1/2 right-0 -translate-y-1/2 w-[65%] h-[90%] object-contain object-right brightness-100"
              style={{ filter: 'drop-shadow(0 20px 60px rgba(212,175,55,0.15))' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0d1013 0%, #0d1013 42%, rgba(13,16,19,0.95) 52%, rgba(13,16,19,0.75) 60%, rgba(13,16,19,0.3) 70%, transparent 82%)', zIndex: 2 }} />
            <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#0d1013] to-transparent" style={{ zIndex: 2 }} />
            <div className="absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-[#0d1013] to-transparent" style={{ zIndex: 2 }} />
          </div>
        </div>

        {/* ── Foto mobile sebagai background overlay (di belakang teks) ── */}
        <div className="absolute inset-0 pointer-events-none block md:hidden" style={{ zIndex: 5 }}>
          <img
            src="/hero_section_1.png"
            alt=""
            className="absolute bottom-16 right-0 w-[75%] object-contain object-right-bottom opacity-30"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(212,175,55,0.15))' }}
          />
          {/* Fade dari kiri agar teks tetap terbaca */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0d1013 40%, rgba(13,16,19,0.7) 70%, rgba(13,16,19,0.2) 100%)' }} />
          {/* Fade dari bawah */}
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#0d1013] to-transparent" />
        </div>

        {/* ── Konten ── */}
        <div className="relative container-wide w-full" style={{ zIndex: 20 }}>
          <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8 items-center">

            {/* Teks */}
            <div className="md:col-span-6 xl:col-span-5 relative md:-ml-4" style={{ zIndex: 30 }}>
              <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-extrabold tracking-tight text-white leading-[1.08] mb-4 md:mb-5">
                Distributor Resmi<br />
                <span className="text-neutral-400">Mesin Food &amp; Beverage<br />Indonesia</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-neutral-400 font-medium leading-relaxed mb-6 md:mb-8 max-w-md">
                Holicindo menyediakan 400+ mesin produksi, pendingin komersial, siap kirim ke seluruh Indonesia.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-9">
                <Link href="/products" className="btn-primary px-8 shadow-[0_0_24px_rgba(212,175,55,0.25)] font-bold">
                  Jelajahi Produk
                </Link>
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center justify-center gap-3 px-7 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-lg transition-all duration-300 group">
                  <div className="w-8 h-8 rounded-full bg-brand-500 text-slate-900 flex items-center justify-center pl-0.5 group-hover:scale-110 transition-transform flex-shrink-0">
                    <Play size={14} fill="currentColor" />
                  </div>
                  Tonton Video
                </button>
              </div>
            </div>

            <div className="md:col-span-6 xl:col-span-7 hidden md:block" />
          </div>
        </div>

        {/* Wavy Divider bottom */}
        <div className="absolute -bottom-[2px] left-0 right-0 w-full overflow-hidden leading-none z-30">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[90px] fill-brand-50 block">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"></path>
          </svg>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-brand-500 rounded-full flex items-center justify-center text-white hover:text-slate-900 transition-colors"
            >
              <X size={20} />
            </button>
            <iframe 
              src="https://www.youtube.com/embed/SWEAJdRmvqk?autoplay=1" 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}

