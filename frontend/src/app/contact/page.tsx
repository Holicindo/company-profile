'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
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
    catch { setError('Terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-neutral-900 to-brand-800 py-16">
        <div className="container-wide">
          <nav className="text-sm text-neutral-400 mb-4"><Link href="/" className="hover:text-white">Home</Link> / <span className="text-white">Contact</span></nav>
          <h1 className="text-4xl font-bold font-display text-white mb-3">Hubungi Kami</h1>
          <p className="text-brand-200">Tim kami siap membantu Anda menemukan solusi terbaik</p>
        </div>
      </div>

      <div className="container-wide py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold font-display text-neutral-900 mb-5">Informasi Kontak</h2>
              <div className="space-y-5">
                {[{ icon: Phone, label: 'Telepon', text: '+6221-20832035', href: 'tel:+622120832035' },
                  { icon: Mail, label: 'Email', text: 'info@holicindo.com', href: 'mailto:info@holicindo.com' }].map(({ icon: Icon, label, text, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0"><Icon size={18} className="text-brand-600" /></div>
                    <div><p className="text-sm font-semibold text-neutral-700 mb-0.5">{label}</p><a href={href} className="text-neutral-500 hover:text-brand-600 transition-colors text-sm">{text}</a></div>
                  </div>
                ))}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0"><MapPin size={18} className="text-brand-600" /></div>
                  <div><p className="text-sm font-semibold text-neutral-700 mb-0.5">Lokasi</p><p className="text-neutral-500 text-sm">Jakarta, Indonesia</p></div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-50 rounded-2xl p-5">
              <h3 className="font-semibold text-neutral-900 mb-3">Jam Operasional</h3>
              <div className="space-y-2 text-sm">
                {[['Senin – Jumat', '08:00 – 17:00'], ['Sabtu', '08:00 – 13:00'], ['Minggu', 'Tutup']].map(([d, t]) => (
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
