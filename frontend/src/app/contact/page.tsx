'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Map, ArrowRight } from 'lucide-react';
import { submitContact } from '@/lib/api';

// Google Maps embed URL untuk lokasi Holicindo Cimahi
const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9!2d107.5625!3d-6.9015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e5bc4c91533b%3A0x56ee64bece87acae!2sHolicindo%20dasa%20anugrah!5e0!3m2!1sen!2sid!4v1690000000000!5m2!1sen!2sid";

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showMap, setShowMap] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await submitContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    } catch { setError('Terjadi kesalahan. Silakan coba lagi.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">

      {/* ── Minimalist Header ── */}
      <div className="relative border-b border-neutral-200 bg-neutral-50 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 flex items-start justify-center overflow-hidden pointer-events-none select-none" aria-hidden="true">
          <span
            className="font-black tracking-tighter leading-none text-black/[0.02]"
            style={{ fontSize: 'clamp(60px, 16vw, 220px)', whiteSpace: 'nowrap', marginTop: '-0.05em' }}
          >
            CONTACT
          </span>
        </div>

        <div className="relative z-10 container-wide">
          <p className="text-neutral-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">Hubungi Kami</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-black mb-6 leading-tight">
            Siap Membantu Anda
          </h1>
          <p className="text-neutral-500 font-light text-base md:text-lg max-w-xl mb-12">
            Tim kami siap membantu Anda menemukan solusi operasional terbaik untuk bisnis food &amp; beverage Anda.
          </p>

          <button
            onClick={() => setShowMap(v => !v)}
            className="inline-flex items-center gap-3 px-6 py-3 border border-black bg-white text-[10px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            <Map size={14} strokeWidth={1.5} />
            {showMap ? 'Tutup Peta' : 'Peta Lokasi'}
          </button>

          {showMap && (
            <div className="mt-8 border border-neutral-200" style={{ height: '400px' }}>
              <iframe
                src={MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Holicindo Dasa Anugerah"
              />
            </div>
          )}
        </div>
      </div>

      <div className="container-wide py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">

          {/* ── Kolom Info ── */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-light text-black tracking-tight mb-8">Informasi Kontak</h2>
              <div className="space-y-8">

                <div className="border-l border-neutral-200 pl-6">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2">WhatsApp</p>
                  <a href="https://wa.me/6281111825718" target="_blank" rel="noopener noreferrer"
                    className="text-black font-light hover:text-neutral-500 transition-colors text-lg">
                    +62 811-1182-5718
                  </a>
                </div>

                <div className="border-l border-neutral-200 pl-6">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2">Email</p>
                  <a href="mailto:info@holicindo.com" className="text-black font-light hover:text-neutral-500 transition-colors text-lg">
                    info@holicindo.com
                  </a>
                </div>

                <div className="border-l border-neutral-200 pl-6">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2">Kantor Jakarta</p>
                  <p className="text-neutral-500 font-light text-sm leading-relaxed">
                    Green Sedayu Bizpark Blok GSB No. 016, Jl. Cakung Cilincing Tim. No. Raya, Cakung Tim., Jakarta Timur 13910
                  </p>
                </div>

                <div className="border-l border-neutral-200 pl-6">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2">Kantor Cimahi</p>
                  <p className="text-neutral-500 font-light text-sm leading-relaxed">
                    Komplek Jersindo, Jl. Raya Cimindi No.115, Cibeureum, Cimahi Selatan, Jawa Barat 40535
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-neutral-200 p-8 bg-neutral-50">
              <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-6">Jam Operasional</h3>
              <div className="space-y-4 text-sm font-light">
                {[['Senin – Jumat', '08:00 – 17:00'], ['Sabtu', '08:00 – 15:00'], ['Minggu', 'Tutup']].map(([d, t]) => (
                  <div key={d} className="flex justify-between border-b border-neutral-200 pb-2 last:border-0 last:pb-0">
                    <span className="text-neutral-500">{d}</span>
                    <span className={`text-black ${t === 'Tutup' ? 'text-neutral-400' : ''}`}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Kolom Form ── */}
          <div className="lg:col-span-2">
            {success ? (
              <div className="flex flex-col items-center justify-center h-full py-24 text-center border border-neutral-200 bg-neutral-50">
                <h2 className="text-3xl font-light text-black tracking-tight mb-4">Pesan Terkirim</h2>
                <p className="text-neutral-500 font-light mb-8 max-w-md">Tim kami akan merespons dalam 1×24 jam kerja.</p>
                <button onClick={() => setSuccess(false)} className="btn-secondary">Kirim Pesan Lagi</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { n: 'name', l: 'Nama Lengkap', p: 'Nama Anda', t: 'text', req: true },
                    { n: 'email', l: 'Email', p: 'email@perusahaan.com', t: 'email', req: true },
                    { n: 'phone', l: 'No. Telepon', p: '+62...', t: 'tel', req: false },
                    { n: 'company', l: 'Perusahaan', p: 'Nama perusahaan', t: 'text', req: false },
                  ].map(({ n, l, p, t, req }) => (
                    <div key={n}>
                      <label htmlFor={n} className="block text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                        {l}{req && <span className="text-black ml-1">*</span>}
                      </label>
                      <input id={n} name={n} type={t} required={req} value={(form as any)[n]} onChange={onChange} placeholder={p}
                        className="w-full px-4 py-3 border-b border-neutral-200 bg-transparent text-sm focus:outline-none focus:border-black transition-all placeholder-neutral-300" />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                    Subjek <span className="text-black">*</span>
                  </label>
                  <select id="subject" name="subject" required value={form.subject} onChange={onChange}
                    className="w-full px-4 py-3 border-b border-neutral-200 bg-transparent text-sm focus:outline-none focus:border-black transition-all appearance-none cursor-pointer">
                    <option value="" disabled hidden>Pilih subjek</option>
                    {['Inquiry Produk', 'Request Penawaran', 'Konsultasi Teknis', 'After Sales Service', 'Lainnya'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-3">
                    Pesan <span className="text-black">*</span>
                  </label>
                  <textarea id="message" name="message" required rows={6} value={form.message} onChange={onChange}
                    placeholder="Tuliskan kebutuhan atau pertanyaan Anda..."
                    className="w-full px-4 py-3 border border-neutral-200 bg-transparent text-sm focus:outline-none focus:border-black transition-all resize-none placeholder-neutral-300" />
                </div>

                {error && <p className="text-xs text-red-500 font-light">{error}</p>}

                <button type="submit" disabled={loading}
                  className="btn-primary w-full sm:w-auto inline-flex justify-center items-center gap-3 disabled:opacity-50">
                  {loading ? 'Mengirim...' : <><span>Kirim Pesan</span><ArrowRight size={14} strokeWidth={2} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
