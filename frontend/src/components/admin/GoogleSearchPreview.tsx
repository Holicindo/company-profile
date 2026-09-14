'use client';

interface GoogleSearchPreviewProps {
  title: string;
  description: string;
  url?: string;
}

export function GoogleSearchPreview({ title, description, url = 'https://holicindo.com' }: GoogleSearchPreviewProps) {
  // Truncate title to 60 chars, description to 160 chars
  const truncatedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  const truncatedDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-6">
      <div className="text-xs text-neutral-500 mb-2 font-medium uppercase tracking-wide">
        Preview Google Search
      </div>
      
      <div className="space-y-1">
        {/* URL */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-neutral-200 flex items-center justify-center text-[10px]">
            H
          </div>
          <div className="text-sm text-neutral-600">{url}</div>
        </div>

        {/* Title */}
        <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer font-normal leading-tight">
          {truncatedTitle || 'Judul halaman akan muncul di sini'}
        </div>

        {/* Description */}
        <div className="text-sm text-neutral-600 leading-relaxed">
          {truncatedDescription || 'Deskripsi meta akan muncul di sini. Pastikan deskripsi menarik dan informatif untuk meningkatkan click-through rate dari hasil pencarian Google.'}
        </div>
      </div>

      {/* Character counters */}
      <div className="mt-4 pt-4 border-t border-neutral-200 flex gap-4 text-xs">
        <div>
          <span className={title.length > 60 ? 'text-red-600 font-bold' : 'text-neutral-600'}>
            Title: {title.length}/60
          </span>
        </div>
        <div>
          <span className={description.length > 160 ? 'text-red-600 font-bold' : 'text-neutral-600'}>
            Description: {description.length}/160
          </span>
        </div>
      </div>
    </div>
  );
}
