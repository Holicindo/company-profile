'use client';
import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';

interface SiteSettings {
  whatsapp: string;
  email: string;
  address: string;
  googleMapsLink: string;
  googleMapsEmbed: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  operatingHours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  companyTagline: string;
  ctaHeading: string;
  ctaDescription: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3011';

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    whatsapp: '',
    email: '',
    address: '',
    googleMapsLink: '',
    googleMapsEmbed: '',
    facebookUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
    linkedinUrl: '',
    operatingHours: {},
    companyTagline: '',
    ctaHeading: '',
    ctaDescription: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/site-settings`);
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BACKEND_URL}/api/site-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage('Pengaturan berhasil disimpan!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Gagal menyimpan pengaturan.');
      }
    } catch (error) {
      setMessage('Terjadi kesalahan.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof SiteSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const updateOperatingHours = (day: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      operatingHours: { ...prev.operatingHours, [day]: value },
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <h1 className="text-2xl font-bold text-neutral-900 mb-6">Pengaturan Situs</h1>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.includes('berhasil') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <section>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4 pb-2 border-b">Informasi Kontak</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">WhatsApp</label>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                    placeholder="+6281111825718"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                    placeholder="info@holicindo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Alamat Kantor</label>
                  <textarea
                    value={settings.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                    placeholder="Green Sedayu Bizpark..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Google Maps Link</label>
                  <input
                    type="url"
                    value={settings.googleMapsLink}
                    onChange={(e) => updateField('googleMapsLink', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                    placeholder="https://maps.app.goo.gl/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Google Maps Embed URL</label>
                  <textarea
                    value={settings.googleMapsEmbed}
                    onChange={(e) => updateField('googleMapsEmbed', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                    placeholder="https://www.google.com/maps/embed?pb=..."
                  />
                </div>
              </div>
            </section>

            {/* Social Media */}
            <section>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4 pb-2 border-b">Social Media</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Facebook URL</label>
                  <input
                    type="url"
                    value={settings.facebookUrl}
                    onChange={(e) => updateField('facebookUrl', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Instagram URL</label>
                  <input
                    type="url"
                    value={settings.instagramUrl}
                    onChange={(e) => updateField('instagramUrl', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">YouTube URL</label>
                  <input
                    type="url"
                    value={settings.youtubeUrl}
                    onChange={(e) => updateField('youtubeUrl', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={settings.linkedinUrl}
                    onChange={(e) => updateField('linkedinUrl', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Operating Hours */}
            <section>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4 pb-2 border-b">Jam Operasional</h2>
              <div className="grid grid-cols-2 gap-4">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                  <div key={day}>
                    <label className="block text-sm font-medium text-neutral-700 mb-2 capitalize">{day}</label>
                    <input
                      type="text"
                      value={settings.operatingHours[day as keyof typeof settings.operatingHours] || ''}
                      onChange={(e) => updateOperatingHours(day, e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                      placeholder="08:00 – 17:00 or Closed"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Company Info */}
            <section>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4 pb-2 border-b">Informasi Perusahaan</h2>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Company Tagline</label>
                <textarea
                  value={settings.companyTagline}
                  onChange={(e) => updateField('companyTagline', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                  placeholder="Spesialis showcase kue, chiller komersial..."
                />
              </div>
            </section>

            {/* CTA Section */}
            <section>
              <h2 className="text-lg font-semibold text-neutral-900 mb-4 pb-2 border-b">CTA Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">CTA Heading</label>
                  <input
                    type="text"
                    value={settings.ctaHeading}
                    onChange={(e) => updateField('ctaHeading', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                    placeholder="Siap Mengembangkan Bisnis Anda?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">CTA Description</label>
                  <textarea
                    value={settings.ctaDescription}
                    onChange={(e) => updateField('ctaDescription', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent"
                    placeholder="Konsultasikan spesifikasi mesin..."
                  />
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-white font-semibold rounded-lg hover:bg-[#b0903b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Simpan Pengaturan
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
