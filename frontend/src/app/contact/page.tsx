'use client';
import { useState } from 'react';
import { Map, ArrowRight, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { submitContact } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9!2d107.5625!3d-6.9015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e5bc4c91533b%3A0x56ee64bece87acae!2sHolicindo%20dasa%20anugrah!5e0!3m2!1sen!2sid!4v1690000000000!5m2!1sen!2sid";

export default function ContactPage() {
  const { t } = useLanguage();
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
    } catch { setError(t('Terjadi kesalahan. Silakan coba lagi.', 'Something went wrong. Please try again.')); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#1a0b06] font-sans text-white">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-[#C9A84C]/20 py-20 lg:py-32">
        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span
            className="font-black tracking-tighter leading-none text-white/[0.025]"
            style={{ fontSize: 'clamp(80px, 20vw, 280px)', whiteSpace: 'nowrap' }}
          >
            CONTACT
          </span>
        </div>

        <div className="relative z-10 container-wide">
          <p className="text-[#C9A84C] font-bold text-[10px] uppercase tracking-[0.3em] mb-5">
            {t('Hubungi Kami', 'Contact Us')}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            {t('Siap Membantu Anda', 'Ready to Help You')}
          </h1>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            {t(
              'Tim kami siap membantu Anda menemukan solusi operasional terbaik untuk bisnis food & beverage Anda.',
              'Our team is ready to help you find the best operational solutions for your food & beverage business.'
            )}
          </p>

          <button
            onClick={() => setShowMap(v => !v)}
            className="inline-flex items-center gap-3 px-6 py-3 border border-[#C9A84C]/50 text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest hover:bg-[#C9A84C] hover:text-[#1a0b06] transition-colors duration-300"
          >
            <Map size={14} strokeWidth={1.5} />
            {showMap ? t('Tutup Peta', 'Close Map') : t('Peta Lokasi', 'View Map')}
          </button>

          {showMap && (
            <div className="mt-8 border border-[#C9A84C]/30 overflow-hidden" style={{ height: '400px' }}>
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

      {/* ── Main Content ── */}
      <div className="bg-white py-16 lg:py-24">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

          {/* ── Info Column ── */}
          <div className="space-y-8">

            {/* Contact info cards */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-neutral-900 tracking-tight mb-6">
                {t('Informasi Kontak', 'Contact Information')}
              </h2>

              <a href="https://wa.me/6281111825718" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 bg-[#251009] hover:bg-[#2e1410] transition-all group">
                <div className="w-9 h-9 bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A84C]/20 transition-colors">
                  <MessageCircle size={16} className="text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-[0.2em] mb-1">WhatsApp</p>
                  <p className="text-white text-sm font-medium">+62 811-1182-5718</p>
                </div>
              </a>

              <a href="mailto:info@holicindo.com"
                className="flex items-start gap-4 p-5 border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 bg-[#251009] hover:bg-[#2e1410] transition-all group">
                <div className="w-9 h-9 bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A84C]/20 transition-colors">
                  <Mail size={16} className="text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-[0.2em] mb-1">Email</p>
                  <p className="text-white text-sm font-medium">info@holicindo.com</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-5 border border-[#C9A84C]/20 bg-[#251009]">
                <div className="w-9 h-9 bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-[#C9A84C]" />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-[0.2em] mb-1">
                      {t('Kantor Jakarta', 'Jakarta Office')}
                    </p>
                    <p className="text-white font-bold text-xs leading-relaxed">
                      Green Sedayu Bizpark Blok GSB No. 016, Jl. Cakung Cilincing Tim. No. Raya, Cakung Tim., Jakarta Timur 13910
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-[0.2em] mb-1">
                      {t('Kantor Cimahi', 'Cimahi Office')}
                    </p>
                    <p className="text-white font-bold text-xs leading-relaxed">
                      Komplek Jersindo, Jl. Raya Cimindi No.115, Cibeureum, Cimahi Selatan, Jawa Barat 40535
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Jam Operasional */}
            <div className="p-5 border border-[#C9A84C]/20 bg-[#251009]">
              <div className="flex items-center gap-3 mb-5">
                <Clock size={15} className="text-[#C9A84C]" />
                <p className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-[0.2em]">
                  {t('Jam Operasional', 'Operating Hours')}
                </p>
              </div>
              <div className="space-y-3">
                {([
                  [t('Senin – Jumat', 'Monday – Friday'), '08:00 – 17:00'],
                  [t('Sabtu', 'Saturday'), '08:00 – 15:00'],
                  [t('Minggu', 'Sunday'), t('Tutup', 'Closed')],
                ] as [string, string][]).map(([d, h]) => (
                  <div key={d} className="flex justify-between border-b border-[#C9A84C]/10 pb-3 last:border-0 last:pb-0">
                    <span className="text-white font-bold text-xs">{d}</span>
                    <span className={`text-xs font-bold ${h === 'Tutup' || h === 'Closed' ? 'text-neutral-500' : 'text-white'}`}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Form Column ── */}
          <div className="lg:col-span-2">
            {success ? (
              <div className="flex flex-col items-center justify-center h-full py-24 text-center border border-[#C9A84C]/30 bg-[#251009]">
                <div className="w-16 h-16 bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center mb-6">
                  <Mail size={28} className="text-[#C9A84C]" />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                  {t('Pesan Terkirim', 'Message Sent')}
                </h2>
                <p className="text-neutral-400 mb-8 max-w-md text-sm leading-relaxed">
                  {t('Tim kami akan merespons dalam 1×24 jam kerja.', 'Our team will respond within 1×24 business hours.')}
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-7 py-3 border border-[#C9A84C]/50 text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest hover:bg-[#C9A84C] hover:text-[#1a0b06] transition-colors"
                >
                  {t('Kirim Pesan Lagi', 'Send Another Message')}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  {[
                    { n: 'name', l: t('Nama Lengkap', 'Full Name'), p: t('Nama Anda', 'Your Name'), type: 'text', req: true },
                    { n: 'email', l: 'Email', p: 'email@perusahaan.com', type: 'email', req: true },
                    { n: 'phone', l: t('No. Telepon', 'Phone Number'), p: '+62...', type: 'tel', req: false },
                    { n: 'company', l: t('Perusahaan', 'Company'), p: t('Nama perusahaan', 'Company name'), type: 'text', req: false },
                  ].map(({ n, l, p, type, req }) => (
                    <div key={n}>
                      <label htmlFor={n} className="block text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-3">
                        {l}{req && <span className="text-neutral-900 ml-1">*</span>}
                      </label>
                      <input
                        id={n} name={n} type={type} required={req}
                        value={(form as any)[n]} onChange={onChange} placeholder={p}
                        className="w-full px-0 py-3 border-b border-neutral-300 bg-transparent text-neutral-900 text-sm focus:outline-none focus:border-[#2C1810] transition-all placeholder-neutral-400"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-3">
                    {t('Subjek', 'Subject')} <span className="text-neutral-900">*</span>
                  </label>
                  <select
                    id="subject" name="subject" required
                    value={form.subject} onChange={onChange}
                    className="w-full px-0 py-3 border-b border-neutral-300 bg-transparent text-neutral-900 text-sm focus:outline-none focus:border-[#2C1810] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled hidden className="bg-white">
                      {t('Pilih subjek', 'Select subject')}
                    </option>
                    {[
                      t('Inquiry Produk', 'Product Inquiry'),
                      t('Request Penawaran', 'Request Quotation'),
                      t('Konsultasi Teknis', 'Technical Consultation'),
                      t('After Sales Service', 'After Sales Service'),
                      t('Lainnya', 'Other'),
                    ].map(s => (
                      <option key={s} value={s} className="bg-white">{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-3">
                    {t('Pesan', 'Message')} <span className="text-neutral-900">*</span>
                  </label>
                  <textarea
                    id="message" name="message" required rows={6}
                    value={form.message} onChange={onChange}
                    placeholder={t('Tuliskan kebutuhan atau pertanyaan Anda...', 'Describe your needs or questions...')}
                    className="w-full px-0 py-3 border-b border-neutral-300 bg-transparent text-neutral-900 text-sm focus:outline-none focus:border-neutral-900 transition-all resize-none placeholder-neutral-400"
                  />
                </div>

                {error && <p className="text-xs text-red-400">{error}</p>}

                <button
                  type="submit" disabled={loading}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-[#C9A84C] text-[#1a0b06] text-sm font-bold uppercase tracking-widest hover:bg-[#b0903b] transition-colors shadow-lg disabled:opacity-50 active:scale-95 w-full sm:w-auto justify-center"
                >
                  {loading
                    ? t('Mengirim...', 'Sending...')
                    : <><span>{t('Kirim Pesan', 'Send Message')}</span><ArrowRight size={16} strokeWidth={2.5} /></>
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
