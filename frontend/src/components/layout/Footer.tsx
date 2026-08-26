'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Facebook, Instagram, Youtube, Linkedin, ExternalLink, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const socialLinks = [
  { name: 'Facebook', href: 'https://web.facebook.com/holicindo.id', icon: Facebook, color: '#1877F2' },
  { name: 'Instagram', href: 'https://www.instagram.com/holicindo.id?igsi=MTZqYmh4bzNmaGwzcw==', icon: Instagram, color: '#E4405F' },
  { name: 'YouTube', href: 'https://youtube.com/@holicindo?si=WnStCOlV6evmhiPi', icon: Youtube, color: '#FF0000' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/pt-holicindo-dasa-anugerah/', icon: Linkedin, color: '#0A66C2' },
];

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#404F68] relative overflow-hidden flex flex-col">
      {/* ── Immersive CTA Section ── */}
      <div className="py-10 sm:py-14 md:py-16 relative border-b border-white/10">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container-wide relative z-10">
          <div className="max-w-4xl mx-auto text-center px-2 flex flex-col items-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-3 sm:mb-4">
              {t('Siap Mengembangkan Bisnis Anda?', 'Ready to Elevate Your Business?')}
            </h2>
            <p className="text-neutral-200 font-normal text-xs sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              {t(
                'Konsultasikan spesifikasi mesin dan kebutuhan peralatan industri kuliner Anda langsung dengan ahlinya. Chat tim kami sekarang.',
                'Consult machinery specifications & commercial culinary equipment needs directly with our experts. Chat our team now.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/6281111825718" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white rounded-lg transition-all duration-300 hover:brightness-110 shadow-sm border border-white/20 active:scale-[0.98] w-full sm:w-auto"
                style={{ backgroundColor: '#128C7E' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Chat via WhatsApp
              </a>

              {/* Email Button */}
              <a 
                href="mailto:info@holicindo.com" 
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white rounded-lg transition-all duration-300 hover:brightness-110 shadow-sm border border-white/20 active:scale-[0.98] w-full sm:w-auto"
                style={{ backgroundColor: '#1976D2' }}
              >
                <Mail size={16} strokeWidth={2.25} className="flex-shrink-0" />
                {t('Email Kami', 'Email Us')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Minimalist B2B Footer ── */}
      <div className="container-wide py-8 sm:py-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
          
          {/* Col 1: Brand */}
          <div className="flex flex-col">
            <Image src="/logo.png" alt="Holicindo Logo" width={130} height={38} className="object-contain brightness-0 invert mb-3 sm:mb-4" />
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-200 font-normal">
              {t(
                'Solusi mesin produksi makanan berkualitas tinggi untuk industri food & beverage Indonesia.',
                'High-performance food processing machinery solutions for Indonesia food & beverage industry.'
              )}
            </p>
          </div>

          {/* Col 2: Jakarta */}
          <div>
            <p className="text-[10px] text-white uppercase tracking-[0.2em] mb-2.5 sm:mb-3 font-bold flex items-center gap-2">
              <span className="w-4 h-px bg-white/50"></span> Jakarta
            </p>
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal mb-2">
              Green Sedayu Bizpark Blok GSB No. 016, Cakung Tim., Jakarta Timur 13910
            </p>
            <a 
              href="https://maps.app.goo.gl/bYT5nUqigmC3iS3SA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-200 hover:text-white transition-colors underline underline-offset-4 decoration-neutral-300 hover:decoration-white font-normal"
            >
              {t('Lihat di Maps', 'View on Maps')} <ExternalLink size={12} strokeWidth={2} />
            </a>
          </div>

          {/* Col 3: Cimahi */}
          <div>
            <p className="text-[10px] text-white uppercase tracking-[0.2em] mb-2.5 sm:mb-3 font-bold flex items-center gap-2">
              <span className="w-4 h-px bg-white/50"></span> Cimahi
            </p>
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal mb-2">
              Komplek Jersindo, Jl. Raya Cimindi No.115, Cimahi Selatan, Jawa Barat 40535
            </p>
            <a 
              href="https://maps.app.goo.gl/mzNfquTqXZtTCTxz8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-200 hover:text-white transition-colors underline underline-offset-4 decoration-neutral-300 hover:decoration-white font-normal"
            >
              {t('Lihat di Maps', 'View on Maps')} <ExternalLink size={12} strokeWidth={2} />
            </a>
          </div>
            
          {/* Col 4: Temui Kami */}
          <div>
            <p className="text-[10px] text-white uppercase tracking-[0.2em] mb-2.5 sm:mb-3 font-bold flex items-center gap-2">
              <span className="w-4 h-px bg-white/50"></span> {t('Temui Kami:', 'Find Us:')}
            </p>
            <div className="flex gap-3 pt-1">
              {socialLinks.map(s => {
                const Icon = s.icon;
                return (
                  <a 
                    key={s.name} 
                    href={s.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95 rounded-lg shadow-sm"
                    style={{ backgroundColor: s.color }}
                    title={s.name}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </a>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container-wide py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-neutral-300">© {new Date().getFullYear()} Holicindo. All rights reserved.</p>
          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-neutral-300">Food Machinery, Refrigerator &amp; Showcase</p>
        </div>
      </div>
    </footer>
  );
}
