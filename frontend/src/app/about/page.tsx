import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Holicindo – lebih dari 20 tahun menyediakan solusi mesin produksi makanan untuk industri food & beverage Indonesia.',
};

const milestones = [
  { year: '2000', text: 'Holicindo didirikan sebagai distributor mesin makanan' },
  { year: '2005', text: 'Ekspansi ke produk refrigerator dan showcase' },
  { year: '2010', text: 'Mencapai 100+ klien aktif di seluruh Indonesia' },
  { year: '2015', text: 'Membuka service center di Jakarta' },
  { year: '2020', text: 'Meluncurkan katalog digital dengan 400+ produk' },
  { year: '2024', text: 'Lebih dari 500 klien, melayani seluruh Indonesia' },
];

const values = [
  'Kualitas produk yang tidak pernah dikompromikan',
  'Layanan purna jual yang responsif dan profesional',
  'Harga kompetitif dengan nilai terbaik',
  'Tim ahli berpengalaman lebih dari 20 tahun',
  'Komitmen pada kepuasan pelanggan',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-neutral-900 to-brand-800 py-20">
        <div className="container-wide">
          <nav className="text-sm text-neutral-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">About Us</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">About Holicindo</h1>
          <p className="text-brand-200 text-lg max-w-2xl">Lebih dari dua dekade melayani industri food & beverage Indonesia</p>
        </div>
      </div>

      <section className="py-16 container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-2">Cerita Kami</p>
            <h2 className="text-3xl font-bold font-display text-neutral-900 mb-5">Mitra Terpercaya Industri Makanan</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Holicindo didirikan dengan visi menjadi mitra terpercaya bagi industri makanan Indonesia.
              Kami memahami bahwa kualitas mesin produksi adalah jantung dari setiap bisnis makanan yang sukses.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Dengan lebih dari 400 produk dalam katalog kami — mulai dari mixer profesional, oven industri,
              blast freezer, hingga showcase modern — kami siap mendukung bisnis makanan Anda dari skala kecil hingga enterprise.
            </p>
            <ul className="space-y-3">
              {values.map(v => (
                <li key={v} className="flex items-start gap-2.5">
                  <CheckCircle size={18} className="text-brand-600 mt-0.5 flex-shrink-0" />
                  <span className="text-neutral-600 text-sm">{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[{ n: '20+', l: 'Tahun Pengalaman' }, { n: '500+', l: 'Klien Terpercaya' }, { n: '400+', l: 'Produk Tersedia' }, { n: '24/7', l: 'Support & Service' }].map(({ n, l }) => (
              <div key={l} className="bg-neutral-50 rounded-2xl p-6 text-center border border-neutral-100">
                <div className="text-3xl font-bold font-display text-brand-600 mb-2">{n}</div>
                <div className="text-sm text-neutral-500 font-medium">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title">Perjalanan Kami</h2>
            <p className="section-subtitle mx-auto">Milestone pencapaian Holicindo selama lebih dari dua dekade</p>
          </div>
          <div className="max-w-2xl mx-auto">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6 pb-8">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0 z-10">
                    <span className="text-white text-xs font-bold">{m.year.slice(2)}</span>
                  </div>
                  {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-neutral-200 mt-2" />}
                </div>
                <div className="pt-2">
                  <span className="text-brand-600 font-bold text-sm">{m.year}</span>
                  <p className="text-neutral-700 mt-1">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 container-wide text-center">
        <h2 className="text-2xl font-bold font-display text-neutral-900 mb-4">Tertarik Bekerja Sama?</h2>
        <p className="text-neutral-500 mb-8 max-w-lg mx-auto">Konsultasikan kebutuhan Anda dengan tim kami</p>
        <Link href="/contact" className="btn-primary">Hubungi Kami <ArrowRight size={18} /></Link>
      </section>
    </div>
  );
}
