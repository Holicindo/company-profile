import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-neutral-900 via-brand-900 to-neutral-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://holicindo.com/wp-content/uploads/2021/01/slider-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-brand-900/60" />
      <div className="relative container-wide py-24 md:py-36">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-brand-600/20 border border-brand-500/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            <span className="text-brand-300 text-sm font-medium">Holic Food Machinery</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-tight mb-6">
            Solusi Mesin Produksi <span className="text-brand-400">Makanan</span> Berkualitas Tinggi
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-8 max-w-2xl">
            Kami menyediakan solusi lengkap untuk kebutuhan produksi makanan Anda — dari mixer, oven, refrigerator, hingga blast freezer dengan standar kualitas internasional.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {['Food Machinery', 'Refrigerator & Showcase', 'Blast Freezer', '400+ Products'].map(h => (
              <div key={h} className="flex items-center gap-1.5 text-sm text-neutral-200">
                <CheckCircle size={16} className="text-brand-400" /> {h}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products" className="btn-primary">Lihat Produk Kami <ArrowRight size={18} /></Link>
            <Link href="/contact" className="btn-outline-white">Hubungi Kami</Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
