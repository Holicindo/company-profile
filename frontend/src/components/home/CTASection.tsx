import Link from 'next/link';
import { Phone, Mail, ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="pt-32 pb-20 bg-slate-900 relative overflow-hidden">
      {/* Wavy Divider ATAS — putih mengisi dari atas, gelombang mengarah ke bawah */}
      <div className="absolute -top-[2px] left-0 right-0 w-full overflow-hidden leading-none z-20" style={{ transform: 'rotate(180deg)' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[90px] fill-white block">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"></path>
        </svg>
      </div>

      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="relative z-10 container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-3"></p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-400 uppercase mb-4 whitespace-nowrap">
            Siap Mulai Proyek Anda?
          </h2>
          <p className="text-neutral-400 text-lg mb-10 whitespace-nowrap">
            Konsultasikan kebutuhan mesin dapur komersial Anda langsung dengan tim kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/contact" className="btn-primary">Konsultasi Gratis <ArrowRight size={18} /></Link>
            <Link href="/products" className="btn-outline-white">Lihat Katalog Produk</Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://wa.me/6281111825718" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="text-brand-400 w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              +62 811-1182-5718
            </a>
            <a href="mailto:info@holicindo.com" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
              <Mail size={16} className="text-brand-400" /> info@holicindo.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
