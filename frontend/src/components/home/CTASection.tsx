import Link from 'next/link';
import { Phone, Mail, ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-neutral-900">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">
            Siap Tingkatkan Kapasitas Produksi Anda?
          </h2>
          <p className="text-neutral-400 text-lg mb-10">
            Konsultasikan kebutuhan mesin produksi makanan Anda dengan tim ahli kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/contact" className="btn-primary">Konsultasi Gratis <ArrowRight size={18} /></Link>
            <Link href="/products" className="btn-outline-white">Lihat Katalog Produk</Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="tel:+622120832035" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
              <Phone size={16} className="text-brand-400" /> +6221-20832035
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
