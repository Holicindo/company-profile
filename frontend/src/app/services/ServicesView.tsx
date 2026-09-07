'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Wrench, QrCode, ShieldCheck, Cog, CheckCircle2, Headphones, Activity } from 'lucide-react';
import Image from 'next/image';

export function ServicesView() {
  const { t } = useLanguage();

  const heroSlides = [
    '/images/services/hero-services.png',
    '/images/services/hero-services-2.png',
    '/images/services/hero-services-3.png'
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* Hero Section */}
      <div className="relative border-b border-white/10 text-white overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-[75vh] flex items-center">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0 bg-black">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: index === currentSlide ? 1 : 0 }}
            >
              <Image 
                src={slide}
                alt={`Services Background ${index + 1}`} 
                fill 
                className="object-cover" 
                quality={100}
                unoptimized
              />
            </div>
          ))}
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="inline-block px-3 py-1 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-6 rounded-full border border-white/20">
              {t('LAYANAN PURNA JUAL', 'AFTER-SALES SERVICE')}
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6 pb-2 leading-[1.15] drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-white">
              {t('Dukungan Teknis & Servis Mesin Komersial', 'Technical Support & Commercial Machine Servicing')}
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
              {t(
                'Kami memastikan peralatan dapur industrial Anda selalu beroperasi maksimal. Nikmati dukungan teknis terpadu, perawatan mesin berkala, dan jaminan purna jual eksklusif dari tim ahli Holicindo.',
                'We ensure your industrial kitchen equipment always operates at its peak. Enjoy integrated technical support, regular machine maintenance, and exclusive after-sales guarantees from Holicindo experts.'
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="container-wide py-12 sm:py-20">
        
        {/* Core Services Section */}
        <div className="mb-16 sm:mb-24">
          <div className="max-w-3xl mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#2C1810] tracking-tight mb-4">
              {t('Layanan Teknis Profesional', 'Professional Technical Services')}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              {t(
                'Tim teknisi berpengalaman kami siap memberikan solusi menyeluruh, mulai dari instalasi awal hingga perbaikan darurat untuk memastikan produktivitas dapur komersial Anda tidak terhambat.',
                'Our experienced technician team is ready to provide comprehensive solutions, from initial installation to emergency repairs to ensure your commercial kitchen productivity remains unhindered.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all hover:border-[#2C1810]">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-[#2C1810] mb-6">
                <Cog size={24} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-[#2C1810] text-lg mb-3">
                {t('Instalasi & Pelatihan', 'Installation & Training')}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                {t(
                  'Instalasi unit mesin secara presisi sesuai standar pabrik. Kami juga memberikan pelatihan operasional dasar bagi staf Anda untuk meminimalisir kesalahan penggunaan (human error).',
                  'Precision machine unit installation according to factory standards. We also provide basic operational training for your staff to minimize human error.'
                )}
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all hover:border-[#2C1810]">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-[#2C1810] mb-6">
                <ShieldCheck size={24} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-[#2C1810] text-lg mb-3">
                {t('Garansi & Suku Cadang', 'Warranty & Spare Parts')}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                {t(
                  'Ketenangan pikiran dengan garansi resmi. Kami menjamin ketersediaan suku cadang asli (original spare parts) untuk penggantian komponen secara cepat dan akurat.',
                  'Peace of mind with official warranty. We guarantee the availability of original spare parts for fast and accurate component replacement.'
                )}
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all hover:border-[#2C1810]">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-[#2C1810] mb-6">
                <Wrench size={24} strokeWidth={2} />
              </div>
              <h3 className="font-bold text-[#2C1810] text-lg mb-3">
                {t('Maintenance & Perbaikan', 'Maintenance & Repair')}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                {t(
                  'Layanan perbaikan darurat dan perawatan berkala (preventive maintenance) untuk menjaga performa mesin tetap di kondisi puncak dan memperpanjang usia pakai aset Anda.',
                  'Emergency repair services and preventive maintenance to keep machine performance at peak condition and extend the lifespan of your assets.'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Holic Unit Passport Portal - USP Section */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#C9A84C]/20 relative" style={{ background: 'linear-gradient(135deg, #080401 0%, #130a05 25%, #1e0e07 50%, #2C1810 80%, #3D2010 100%)' }}>

          {/* Unified clean grid — full card */}
          <div className="absolute inset-0 pointer-events-none z-0" style={{
            backgroundImage: 'linear-gradient(to right, rgba(201,168,76,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,168,76,0.18) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 30% 50%, transparent 20%, black 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 30% 50%, transparent 20%, black 100%)'
          }} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            {/* Left Content */}
            <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2C1810] text-white text-[10px] font-bold uppercase tracking-widest mb-6 rounded-full w-fit shadow-inner">
                <Activity size={12} className="text-green-400" />
                {t('Eksklusif Untuk Klien B2B', 'Exclusive for B2B Clients')}
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
                Holic Smart Asset Ecosystem
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
                {t(
                  'Fasilitas premium khusus untuk klien korporasi kami. Nikmati ketenangan pikiran dengan sistem pemantauan aset digital yang dirancang eksklusif untuk menjaga investasi bisnis Anda tetap terpantau dengan standar tertinggi.',
                  'A premium facility exclusively for our corporate clients. Enjoy peace of mind with a digital asset monitoring system exclusively designed to keep your business investments monitored to the highest standards.'
                )}
              </p>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-white border border-white/20">
                    <QrCode size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{t('Akses Instan & VIP', 'Instant & VIP Access')}</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm">{t('Dapatkan jalur prioritas untuk terhubung langsung dengan tim dukungan teknis kami secara presisi dan efisien hanya dalam hitungan detik.', 'Get priority routing to connect directly with our technical support team precisely and efficiently in just seconds.')}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-white border border-white/20">
                    <Activity size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{t('Pemantauan Armada Terpusat', 'Centralized Fleet Monitoring')}</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm">{t('Kendali penuh atas seluruh aset operasional Anda di berbagai cabang. Dapatkan visibilitas komprehensif untuk memastikan produktivitas tanpa henti.', 'Full control over your entire operational assets across branches. Gain comprehensive visibility to ensure non-stop productivity.')}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-white border border-white/20">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{t('Keamanan & Rekam Jejak Digital', 'Security & Digital Track Record')}</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm">{t('Validasi keaslian produk dan pelacakan riwayat perawatan terstruktur yang menjamin transparansi serta nilai investasi jangka panjang mesin Anda.', 'Product authenticity validation and structured maintenance history tracking that guarantees transparency and the long-term investment value of your machines.')}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <a 
                  href="https://wa.me/6281111825718" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#2C1810] px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors shadow-sm"
                >
                  <Headphones size={16} />
                  {t('Hubungi Tim Layanan', 'Contact Service Team')}
                </a>
              </div>
            </div>

            {/* Right Graphic: X-Ray Scanner */}
            <div className="relative overflow-hidden border-l border-[#C9A84C]/15 min-h-[560px]">
               
               {/* Full-panel X-Ray Scanner — spans entire right panel width */}
               <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
                 <div className="absolute w-full left-0" style={{ animation: 'scan_sweep 4s linear infinite' }}>
                   <div className="w-full h-[2px] bg-[#22d3ee] shadow-[0_0_20px_#22d3ee,0_0_40px_#22d3ee,0_0_60px_#22d3ee]" />
                   <div className="w-full h-40 bg-gradient-to-t from-[#22d3ee]/15 to-transparent" />
                 </div>
               </div>

               {/* Showcase — fills entire right panel */}
               <div className="absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-6">
                 <Image src="/images/services/Cold%20case%20FIC%20FIXNB.png" alt="Showcase Unit" fill className="object-contain drop-shadow-2xl" style={{ padding: '16px' }} unoptimized />
               </div>

               {/* Glowing Digital Node 1 (Cabinet/Temperature) */}
               <div className="absolute z-30 flex items-center gap-2" style={{ top: '30%', left: '4%', animation: 'node_pulse 3s ease-in-out infinite' }}>
                 <div className="text-[10px] text-cyan-300 font-bold uppercase tracking-widest bg-[#2C1810]/90 backdrop-blur-sm px-3 py-1.5 rounded border border-cyan-500/50 shadow-lg whitespace-nowrap">
                   CABINET: 4°C
                 </div>
                 <div className="h-[2px] w-12 sm:w-20 bg-cyan-400/80" />
                 <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-ping" />
               </div>

               {/* Glowing Digital Node 2 (Compressor) */}
               <div className="absolute z-30 flex items-center gap-2" style={{ bottom: '28%', right: '4%', animation: 'node_pulse 3s ease-in-out infinite 1.5s' }}>
                 <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_15px_#fbbf24] animate-ping" />
                 <div className="h-[2px] w-12 sm:w-20 bg-amber-400/80" />
                 <div className="text-[10px] text-amber-300 font-bold uppercase tracking-widest bg-[#2C1810]/90 backdrop-blur-sm px-3 py-1.5 rounded border border-amber-500/50 shadow-lg whitespace-nowrap">
                   COMPRESSOR: ACTIVE
                 </div>
               </div>

               {/* Central UI Badge */}
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-5 py-2 bg-[#128C7E]/90 backdrop-blur-md rounded-full text-white text-[10px] font-bold tracking-widest uppercase shadow-[0_0_20px_#128C7E] flex items-center gap-2 border border-white/20">
                 <QrCode size={14} /> System Synchronized
               </div>

               <style dangerouslySetInnerHTML={{__html: `
                 @keyframes scan_sweep {
                   0% { top: -20%; opacity: 0; }
                   10% { opacity: 1; }
                   90% { opacity: 1; }
                   100% { top: 120%; opacity: 0; }
                 }
                 @keyframes node_pulse {
                   0%, 100% { transform: scale(1); filter: brightness(1); }
                   50% { transform: scale(1.05); filter: brightness(1.3); }
                 }
               `}} />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
