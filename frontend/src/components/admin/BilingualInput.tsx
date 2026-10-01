import { useState, useEffect } from 'react';
import { Languages, Loader2 } from 'lucide-react';

interface BilingualInputProps {
  label: string;
  valueId: string;
  valueEn: string;
  onChangeId: (val: string) => void;
  onChangeEn: (val: string) => void;
  type?: 'text' | 'textarea';
  placeholderId?: string;
  placeholderEn?: string;
}

export function BilingualInput({
  label,
  valueId,
  valueEn,
  onChangeId,
  onChangeEn,
  type = 'text',
  placeholderId = 'Bahasa Indonesia',
  placeholderEn = 'English'
}: BilingualInputProps) {
  const [isTranslating, setIsTranslating] = useState(false);

  // Debounced translation
  useEffect(() => {
    const handler = setTimeout(async () => {
      // If Indonesian has value, and English is completely empty, auto translate
      if (valueId && !valueEn && !isTranslating) {
        await handleTranslate(valueId);
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(handler);
  }, [valueId, valueEn]); // Removed isTranslating from dependency intentionally to avoid loops

  const handleTranslate = async (textToTranslate: string) => {
    if (!textToTranslate) return;
    
    setIsTranslating(true);
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToTranslate, from: 'id', to: 'en' })
      });
      const data = await res.json();
      if (data.result) {
        onChangeEn(data.result);
      }
    } catch (err) {
      console.error('Translation failed', err);
    } finally {
      setIsTranslating(false);
    }
  };

  const inputClasses = "w-full px-4 py-2 bg-white border-2 border-[#2C1810]/20 rounded-xl text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#B8941E]/50";

  return (
    <div className="space-y-3 mb-4 p-4 border border-neutral-200 bg-neutral-50/50 rounded-xl">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold text-[#2C1810]">{label}</label>
        {isTranslating && (
          <span className="flex items-center gap-1.5 text-xs text-blue-600 font-medium">
            <Loader2 size={12} className="animate-spin" /> Auto-translating...
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Indonesian Input */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <Languages size={14} /> ID (Indonesia)
          </div>
          {type === 'textarea' ? (
            <textarea
              value={valueId || ''}
              onChange={(e) => onChangeId(e.target.value)}
              placeholder={placeholderId}
              className={inputClasses}
              rows={3}
            />
          ) : (
            <input
              type="text"
              value={valueId || ''}
              onChange={(e) => onChangeId(e.target.value)}
              placeholder={placeholderId}
              className={inputClasses}
            />
          )}
        </div>

        {/* English Input */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <Languages size={14} /> EN (English)
          </div>
          {type === 'textarea' ? (
            <textarea
              value={valueEn || ''}
              onChange={(e) => onChangeEn(e.target.value)}
              placeholder={placeholderEn}
              className={inputClasses}
              rows={3}
            />
          ) : (
            <input
              type="text"
              value={valueEn || ''}
              onChange={(e) => onChangeEn(e.target.value)}
              placeholder={placeholderEn}
              className={inputClasses}
            />
          )}
        </div>
      </div>
    </div>
  );
}
