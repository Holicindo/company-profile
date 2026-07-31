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
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Upload gagal (${res.status})`);
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err: any) {
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
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}

      {/* Mode toggle */}
      <div className="flex rounded-lg border border-slate-200 overflow-hidden w-fit text-xs">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`px-3 py-1.5 flex items-center gap-1.5 font-medium transition ${mode === 'url' ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
        >
          <LinkIcon size={12} /> URL
        </button>
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`px-3 py-1.5 flex items-center gap-1.5 font-medium transition ${mode === 'upload' ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
        >
          <Upload size={12} /> Upload File
        </button>
      </div>

      {mode === 'url' ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="https://example.com/gambar.jpg"
            className="flex-1 px-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
          />
          {value && (
            <button type="button" onClick={() => onChange('')} className="p-2.5 rounded-lg border border-neutral-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition">
              <X size={16} />
            </button>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-brand-400 transition cursor-pointer bg-slate-50"
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
              <Loader2 size={28} className="animate-spin text-brand-500" />
              <p className="text-sm text-slate-500">Mengupload gambar...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload size={28} className="text-slate-300" />
              <p className="text-sm text-slate-600 font-medium">Klik atau drag gambar ke sini</p>
              <p className="text-xs text-slate-400">JPG, PNG, WEBP — maks. 5MB</p>
            </div>
          )}
        </div>
      )}

      {uploadError && (
        <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">{uploadError}</p>
      )}

      {/* Preview */}
      {value && (
        <div className="relative w-full max-h-48 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50">
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

      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
