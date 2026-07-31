'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Send, CheckCircle, ArrowLeft } from 'lucide-react';
import { submitContact } from '@/lib/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try { await submitContact(form); setSuccess(true); setForm({ name: '', email: '', phone: '', company: '', subject: '', message: '' }); }
    catch { setError('Terjadi kesalahan. Silakan coba lagi.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-900 py-16 border-b border-brand-500/20">
        <div className="container-wide">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 mb-6 transition-colors">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-bold font-display text-white mb-3">Hubungi Kami</h1>
          <p className="text-neutral-400">Tim kami siap membantu Anda menemukan solusi terbaik</p>
        </div>
      </div>

      <div className="container-wide py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold font-display text-neutral-900 mb-5">Informasi Kontak</h2>
              <div className="space-y-5">
                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="text-brand-600 w-[18px] h-[18px]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                  </div>
                  <div><p className="text-sm font-semibold text-neutral-700 mb-0.5">WhatsApp</p><a href="https://wa.me/6281111825718" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-brand-600 transition-colors text-sm">+62 811-1182-5718</a></div>
                </div>
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0"><Mail size={18} className="text-brand-600" /></div>
                  <div><p className="text-sm font-semibold text-neutral-700 mb-0.5">Email</p><a href="mailto:info@holicindo.com" className="text-neutral-500 hover:text-brand-600 transition-colors text-sm">info@holicindo.com</a></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0"><MapPin size={18} className="text-brand-600" /></div>
                  <div><p className="text-sm font-semibold text-neutral-700 mb-0.5">Lokasi</p><p className="text-neutral-500 text-sm">Jakarta, Indonesia</p></div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-5">
              <h3 className="font-semibold text-neutral-900 mb-3">Jam Operasional</h3>
              <div className="space-y-2 text-sm">
                {[['Senin – Jumat', '08:00 – 17:00'], ['Sabtu', '08:00 – 15:00'], ['Minggu', 'Tutup']].map(([d, t]) => (
                  <div key={d} className="flex justify-between"><span className="text-neutral-500">{d}</span><span className={`font-medium ${t === 'Tutup' ? 'text-neutral-400' : 'text-neutral-700'}`}>{t}</span></div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {success ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <CheckCircle size={56} className="text-green-500 mb-4" />
                <h2 className="text-2xl font-bold font-display text-neutral-900 mb-2">Pesan Terkirim!</h2>
                <p className="text-neutral-500 mb-6 max-w-md">Tim kami akan merespons dalam 1×24 jam kerja.</p>
                <button onClick={() => setSuccess(false)} className="btn-secondary">Kirim Pesan Lagi</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[{ n: 'name', l: 'Nama Lengkap', p: 'Nama Anda', t: 'text', req: true },
                    { n: 'email', l: 'Email', p: 'email@perusahaan.com', t: 'email', req: true },
                    { n: 'phone', l: 'No. Telepon', p: '+62...', t: 'tel', req: false },
                    { n: 'company', l: 'Perusahaan', p: 'Nama perusahaan', t: 'text', req: false }].map(({ n, l, p, t, req }) => (
                    <div key={n}>
                      <label htmlFor={n} className="block text-sm font-medium text-neutral-700 mb-1.5">{l}{req && <span className="text-red-500 ml-1">*</span>}</label>
                      <input id={n} name={n} type={t} required={req} value={(form as any)[n]} onChange={onChange} placeholder={p}
                        className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent" />
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1.5">Subjek <span className="text-red-500">*</span></label>
                  <select id="subject" name="subject" required value={form.subject} onChange={onChange}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white">
                    <option value="">Pilih subjek</option>
                    {['Inquiry Produk', 'Request Penawaran', 'Konsultasi Teknis', 'After Sales Service', 'Lainnya'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1.5">Pesan <span className="text-red-500">*</span></label>
                  <textarea id="message" name="message" required rows={5} value={form.message} onChange={onChange}
                    placeholder="Tuliskan kebutuhan atau pertanyaan Anda..."
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none" />
                </div>
                {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-lg">{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? 'Mengirim...' : <><span>Kirim Pesan</span><Send size={16} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
