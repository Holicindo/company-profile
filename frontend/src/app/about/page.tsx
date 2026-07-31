import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, ThumbsUp, CheckCircle, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Mengenal lebih dekat Holicindo.',
};

const milestones = [
  { year: '2016', text: 'Mulai berjualan peralatan mesin makanan online secara retail.' },
  { year: '2017', text: 'Melayani instalasi sistem dapur komersial untuk F&B.' },
  { year: '2018', text: 'Menjadi agen utama produk GEA, GETRA, dan RSA di Jakarta.' },
  { year: '2019', text: 'Fokus melayani project-project besar skala nasional.' },
  { year: '2020', text: 'Dipercaya berbagai instansi pemerintah dan perusahaan multinasional.' },
  { year: '2022', text: 'Mendirikan PT. Holicindo Dasa Anugerah dengan legalitas lengkap.' }
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
    <div className="min-h-screen bg-brand-50">
      <div className="bg-slate-900 py-16 border-b border-brand-500/20">
        <div className="container-wide">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 mb-6 transition-colors">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-bold font-display text-white mb-3">Tentang Holicindo</h1>
          <p className="text-neutral-400 text-lg max-w-2xl">Lebih dari dua dekade melayani industri food & beverage Indonesia</p>
        </div>
      </div>

      <section className="py-16 container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-600 font-semibold text-sm uppercase tracking-widest mb-2">Cerita Kami</p>
            <h2 className="text-3xl font-bold font-display text-slate-900 mb-5">Mitra Terpercaya Industri Makanan</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Holicindo didirikan dengan visi menjadi mitra terpercaya bagi industri makanan Indonesia.
              Kami memahami bahwa kualitas mesin produksi adalah jantung dari setiap bisnis makanan yang sukses.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              Dengan lebih dari 400 produk dalam katalog kami — mulai dari mixer profesional, oven industri,
              blast freezer, hingga showcase modern — kami siap mendukung bisnis makanan Anda dari skala kecil hingga enterprise.
            </p>
            <ul className="space-y-3">
              {values.map(v => (
                <li key={v} className="flex items-start gap-2.5">
                  <CheckCircle size={18} className="text-brand-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[{ n: '20+', l: 'Tahun Pengalaman' }, { n: '500+', l: 'Klien Terpercaya' }, { n: '400+', l: 'Produk Tersedia' }, { n: '24/7', l: 'Support & Service' }].map(({ n, l }) => (
              <div key={l} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-brand-200">
                <div className="text-3xl font-bold font-display text-brand-600 mb-2">{n}</div>
                <div className="text-sm text-slate-600 font-medium">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="section-title text-slate-900">Perjalanan Kami</h2>
            <p className="section-subtitle text-slate-600 mx-auto">Milestone pencapaian Holicindo selama lebih dari dua dekade</p>
          </div>
          <div className="max-w-2xl mx-auto">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6 pb-8">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0 z-10 shadow-md">
                    <span className="text-white text-xs font-bold">{m.year.slice(2)}</span>
                  </div>
                  {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-brand-200 mt-2" />}
                </div>
                <div className="pt-2">
                  <span className="text-brand-600 font-bold text-sm">{m.year}</span>
                  <p className="text-slate-800 mt-1">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
