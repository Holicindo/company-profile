'use client';

import { useRef, useState, useEffect, useId } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  /** Jika true, baris ini jadi header grup (tidak bisa dipilih) */
  isGroup?: boolean;
  /** Indentasi untuk sub-item (0 = normal, 1 = satu level dalam, dst) */
  indent?: number;
}

interface AdminSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Custom styled dropdown untuk admin pages.
 * Tema: deep brown (#2C1810) + gold (#C9A84C), rounded-2xl, animasi smooth.
 * Gantikan semua <select> native di admin dengan komponen ini.
 */
export function AdminSelect({
  value,
  onChange,
  options,
  placeholder = 'Pilih...',
  label,
  className = '',
  disabled = false,
}: AdminSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const uid = useId();

  const selectedOption = options.find(o => !o.isGroup && o.value === value);
  const displayLabel = selectedOption?.label ?? placeholder;

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  function handleSelect(opt: SelectOption) {
    if (opt.isGroup) return;
    onChange(opt.value);
    setOpen(false);
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label
          htmlFor={uid}
          className="block text-xs font-semibold text-[#2C1810]/70 uppercase tracking-wider mb-1.5"
        >
          {label}
        </label>
      )}

      {/* Trigger button */}
      <button
        id={uid}
        type="button"
        disabled={disabled}
        onClick={() => setOpen(prev => !prev)}
        className={[
          'w-full flex items-center justify-between gap-2',
          'px-3.5 py-2.5 rounded-xl border-2 text-sm font-medium',
          'transition-all duration-200',
          open
            ? 'border-[#C9A84C] ring-2 ring-[#C9A84C]/20 bg-white text-[#2C1810]'
            : 'border-[#2C1810]/20 bg-white text-[#2C1810] hover:border-[#C9A84C]/60',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <span className={`truncate ${!selectedOption ? 'text-[#2C1810]/40' : ''}`}>
          {displayLabel}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2.5}
          className={`flex-shrink-0 text-[#C9A84C] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className={[
            'absolute z-50 w-full mt-1.5 rounded-2xl',
            'bg-[#2C1810] border border-[#C9A84C]/30',
            'shadow-2xl shadow-[#2C1810]/40',
            'overflow-hidden',
          ].join(' ')}
          style={{ animation: 'adminSelectIn 0.15s ease' }}
        >
          {/* Gold top accent line */}
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

          <div className="max-h-64 overflow-y-auto py-1.5 scrollbar-thin scrollbar-track-[#1a0c06] scrollbar-thumb-[#C9A84C]/40">
            {options.map((opt, idx) => {
              const isSelected = !opt.isGroup && opt.value === value;
              const indentPx = 14 + (opt.indent ?? 0) * 14;

              if (opt.isGroup) {
                return (
                  <div
                    key={idx}
                    className="pt-2.5 pb-1 text-[9px] font-bold uppercase tracking-widest text-[#C9A84C]/70"
                    style={{ paddingLeft: `${indentPx}px`, paddingRight: '14px' }}
                  >
                    {opt.label}
                  </div>
                );
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className={[
                    'w-full flex items-center justify-between gap-2',
                    'py-2 pr-3.5 text-sm text-left transition-colors duration-100',
                    isSelected
                      ? 'bg-[#C9A84C] text-[#1a0c06] font-semibold'
                      : 'text-[#FAF7F0]/90 hover:bg-[#C9A84C]/15 hover:text-white',
                  ].join(' ')}
                  style={{ paddingLeft: `${indentPx}px` }}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <Check size={14} strokeWidth={2.5} className="flex-shrink-0 text-[#1a0c06]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @keyframes adminSelectIn {
          from { opacity: 0; transform: translateY(-4px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </div>
  );
}

