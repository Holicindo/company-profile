import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowLeft, ArrowRight, Phone, Mail } from 'lucide-react';
import { ClientsMarquee } from '@/components/home/ClientsMarquee';

export const metadata: Metadata = {
  title: 'Tentang Kami | PT. Holicindo Dasa Anugerah',
  description:
    'PT. Holicindo Dasa Anugerah adalah distributor mesin pengolah makanan terpercaya di Indonesia sejak 2001. Menyediakan mesin mixer, food processing, bakery, refrigerasi, showcase, dan layanan purna jual.',
  keywords: ['distributor mesin makanan', 'holicindo', 'mesin pengolah makanan', 'peralatan dapur komersial', 'food machinery indonesia'],
};

const productLines = [
  {
    title: 'Mesin Mixer',
    desc: 'Solusi pengaduk adonan industri untuk berbagai skala produksi — dari skala UMKM hingga pabrik.',
  },
  {
    title: 'Mesin Pengolah Makanan',
    desc: 'Peralatan modern untuk mempermudah pemotongan, pencampuran, dan pengolahan bahan baku makanan.',
  },
  {
    title: 'Peralatan Bakery',
    desc: 'Perlengkapan mesin roti lengkap untuk hasil panggangan yang konsisten, efisien, dan berkualitas tinggi.',
  },
  {
    title: 'Sistem Pendingin Industri',
    desc: 'Solusi refrigerasi profesional untuk menjaga kesegaran bahan makanan — blast freezer, chiller, upright freezer.',
  },
  {
    title: 'Showcase Makanan',
    desc: 'Etalase pemanas dan pendingin untuk menampilkan produk kuliner secara menarik dan higienis.',
  },
  {
    title: 'Food Delivery System',
    desc: 'Teknologi otomatisasi penyajian makanan modern untuk meningkatkan efisiensi dan pengalaman pelanggan.',
  },
];

const stats = [
  { n: '2001', l: 'Tahun Berdiri' },
  { n: '500+', l: 'Klien Terpercaya' },
  { n: '400+', l: 'Produk Tersedia' },
  { n: '24/7', l: 'Layanan Purna Jual' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Dark Hero Header ── */}
      <div className="relative bg-[#0d1013] pt-16 pb-28 overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-black tracking-tighter leading-none text-white/[0.04]"
            style={{ fontSize: 'clamp(60px, 14vw, 200px)', whiteSpace: 'nowrap' }}
          >
            HOLICINDO
          </span>
        </div>
        <div className="relative z-10 container-wide">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 mb-8 transition-colors font-medium">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
          <p className="text-brand-400 font-bold text-xs uppercase tracking-widest mb-3">Tentang Kami</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            PT. Holicindo Dasa Anugerah
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed">
            Distributor mesin pengolah makanan terpercaya di Indonesia sejak tahun 2001.
          </p>
        </div>
        <div className="absolute -bottom-[2px] left-0 right-0 w-full overflow-hidden leading-none z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[50px] md:h-[70px] fill-white block">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" />
          </svg>
        </div>
      </div>

      {/* ── Stat strip ── */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container-wide py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ n, l }) => (
              <div key={l} className="text-center">
                <div className="text-3xl font-extrabold text-brand-500 font-display">{n}</div>
                <div className="text-sm text-neutral-500 font-medium mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Intro section ── */}
      <section className="py-16 container-wide">
        <div className="max-w-3xl">
          <p className="text-brand-600 font-bold text-xs uppercase tracking-widest mb-3">Siapa Kami</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            Mitra Terpercaya Industri Kuliner Indonesia
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-[1.05rem]">
            <p>
              Berdiri sejak tahun 2001, <strong className="text-slate-800">PT. Holicindo Dasa Anugerah</strong> telah dipercaya
              sebagai distributor mesin pengolah makanan terdepan di Indonesia. Komitmen utama kami adalah menghadirkan
              solusi terbaik bagi para pelaku industri kuliner di seluruh nusantara.
            </p>
            <p>
              Kami hadir untuk membantu produsen makanan meningkatkan efisiensi dan efektivitas proses produksi, sehingga
              setiap produk kuliner dapat disajikan dalam kualitas terbaik kepada konsumen — dari skala UMKM hingga
              perusahaan multinasional.
            </p>
          </div>
        </div>
      </section>

      {/* ── Product lines ── */}
      <section className="py-16 bg-brand-50">
        <div className="container-wide">
          <div className="mb-12">
            <p className="text-brand-600 font-bold text-xs uppercase tracking-widest mb-3">Lini Produk Kami</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">Pilihan Mesin Pengolah Makanan Terlengkap</h2>
            <p className="text-slate-500 max-w-2xl leading-relaxed">
              Kami menyediakan berbagai jenis peralatan dan mesin pengolahan makanan berkualitas tinggi untuk
              memenuhi kebutuhan bisnis Anda di setiap skala produksi.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {productLines.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-6 border border-brand-100 shadow-sm hover:shadow-md hover:border-brand-300 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4">
                  <CheckCircle size={18} className="text-brand-500" />
                </div>
                <h3 className="font-extrabold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── After-sales & commitment ── */}
      <section className="py-16 container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-brand-600 font-bold text-xs uppercase tracking-widest mb-3">Komitmen Kami</p>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-5">Solusi Fleksibel &amp; Layanan Purna Jual Terdepan</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Dengan variasi produk yang luas, kami memberikan fleksibilitas penuh bagi Anda untuk memilih mesin
                yang paling sesuai dengan kebutuhan dan anggaran bisnis.
              </p>
              <p>
                Tidak hanya menjual produk — tim ahli kami siap mendampingi Anda di setiap tahap. Kami memberikan
                layanan purna jual menyeluruh, mulai dari <strong className="text-slate-800">pengiriman, instalasi di lokasi</strong>,
                hingga <strong className="text-slate-800">perawatan berkala dan perbaikan</strong>.
              </p>
              <p>
                PT. Holicindo Dasa Anugerah siap menjadi mitra terpercaya untuk mendukung kemajuan bisnis kuliner Anda.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/products" className="btn-primary">
                Lihat Katalog Produk <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Konsultasi Gratis
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: '🚚', title: 'Pengiriman ke Seluruh Indonesia', desc: 'Kami melayani pengiriman mesin ke seluruh wilayah Indonesia dengan penanganan khusus.' },
              { icon: '🔧', title: 'Instalasi & Commissioning', desc: 'Tim teknisi berpengalaman kami memastikan mesin terpasang dan beroperasi dengan sempurna.' },
              { icon: '🛡️', title: 'Garansi Resmi Produk', desc: 'Setiap produk dilengkapi garansi resmi dengan dukungan spare part dan layanan perbaikan.' },
              { icon: '📞', title: 'After-Sales 24/7', desc: 'Tim support kami siap dihubungi kapan saja untuk memastikan kelancaran operasional bisnis Anda.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-neutral-100 bg-white hover:border-brand-200 transition">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clients Marquee — menggantikan section timeline ── */}
      <ClientsMarquee />

      {/* ── CTA Bottom ── */}
      <section className="py-16 bg-white">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Siap Bermitra dengan Kami?</h2>
          <p className="text-slate-500 max-w-lg mx-auto mb-8">
            Hubungi tim kami sekarang untuk konsultasi gratis dan penawaran terbaik sesuai kebutuhan bisnis Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/6281111825718" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Phone size={16} /> WhatsApp Sekarang
            </a>
            <a href="mailto:info@holicindo.com" className="btn-secondary">
              <Mail size={16} /> Kirim Email
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
