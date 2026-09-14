'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface Props {
  value: string;           // URL gambar saat ini
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
}

export default function ImageUpload({ value, onChange, label = 'Gambar', hint }: Props) {
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // Upload file ke backend → simpan ke /public/uploads (via API route)
  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('File harus berupa gambar (jpg, png, webp, gif).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Ukuran file maksimal 5MB.');
      return;
    }

    setUploading(true);
    setUploadError('');
    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = typeof window !== 'undefined' ? localStorage.getItem('holic_admin_token') || '' : '';
      // Environment variable is available on client side because it starts with NEXT_PUBLIC_
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011';
      const uploadUrl = `${backendUrl}/api/upload`;
      
      console.log('Uploading directly to backend:', uploadUrl);
      console.log('Token exists:', !!token);
      
      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      console.log('Upload response status:', res.status);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('Upload error:', err);
        throw new Error(err.message || `Upload gagal (${res.status})`);
      }

      const data = await res.json();
      console.log('Upload success:', data);
      onChange(data.url);
    } catch (err: any) {
      console.error('Upload exception:', err);
      setUploadError(err.message || 'Upload gagal. Coba lagi.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-semibold text-[#2C1810]">{label}</label>}

      {/* Mode toggle */}
      <div className="flex rounded-xl border-2 border-[#2C1810]/20 overflow-hidden w-fit text-xs">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`px-3 py-1.5 flex items-center gap-1.5 font-bold transition ${mode === 'url' ? 'bg-gradient-to-r from-[#2C1810] to-[#1a0f0a] text-white' : 'bg-white text-[#2C1810]/70 hover:bg-[#F5F1E8]'}`}
        >
          <LinkIcon size={12} /> URL
        </button>
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`px-3 py-1.5 flex items-center gap-1.5 font-bold transition ${mode === 'upload' ? 'bg-gradient-to-r from-[#2C1810] to-[#1a0f0a] text-white' : 'bg-white text-[#2C1810]/70 hover:bg-[#F5F1E8]'}`}
        >
          <Upload size={12} /> Upload File
        </button>
      </div>

      {mode === 'url' ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="https://example.com/gambar.jpg"
            className="flex-1 px-3 py-2.5 bg-white border-2 border-[#2C1810]/20 rounded-xl text-sm text-[#2C1810] placeholder-[#2C1810]/30 focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50 focus:border-[#B8941E]/50"
          />
          {value && (
            <button type="button" onClick={() => onChange('')} className="p-2.5 rounded-xl border-2 border-[#2C1810]/20 text-[#2C1810]/60 hover:text-red-600 hover:border-red-400/50 transition">
              <X size={16} />
            </button>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="border-2 border-dashed border-[#2C1810]/30 rounded-xl p-6 text-center hover:border-[#B8941E] transition cursor-pointer bg-white"
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={28} className="animate-spin text-[#B8941E]" />
              <p className="text-sm text-[#2C1810]/70">Mengupload gambar...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload size={28} className="text-[#B8941E]/50" />
              <p className="text-sm text-[#2C1810] font-semibold">Klik atau drag gambar ke sini</p>
              <p className="text-xs text-[#2C1810]/50">JPG, PNG, WEBP — maks. 5MB</p>
            </div>
          )}
        </div>
      )}

      {uploadError && (
        <p className="text-xs text-red-600 bg-red-100 px-3 py-2 rounded-xl border-2 border-red-300">{uploadError}</p>
      )}

      {/* Preview */}
      {value && (
        <div className="relative w-full max-h-48 rounded-xl overflow-hidden border-2 border-[#2C1810]/20 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="w-full h-48 object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {hint && <p className="text-xs text-[#2C1810]/50">{hint}</p>}
    </div>
  );
}
