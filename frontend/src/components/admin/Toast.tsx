'use client';

import { X, Check } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

// SVG Showcase Icon Component
const ShowcaseIcon = ({ isError }: { isError: boolean }) => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform ${isError ? 'rotate-180' : ''}`}
  >
    {/* Showcase body */}
    <rect x="20" y="25" width="60" height="50" stroke="currentColor" strokeWidth="2.5" fill="none" rx="2"/>
    
    {/* Glass door */}
    <rect x="25" y="30" width="50" height="40" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6"/>
    
    {/* Shelves */}
    <line x1="25" y1="45" x2="75" y2="45" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
    <line x1="25" y1="57" x2="75" y2="57" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
    
    {/* Base */}
    <rect x="15" y="75" width="70" height="5" fill="currentColor" opacity="0.3"/>
    
    {/* Handle */}
    <line x1="73" y1="48" x2="73" y2="55" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export function Toast({ type, message, onClose }: ToastProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-[#FAF7F0] to-[#F5F1E8] rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 border-4 border-[#2C1810]/10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#2C1810]/10 rounded-full transition"
        >
          <X size={20} className="text-[#2C1810]" />
        </button>

        {/* Icon Container */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Background Circle */}
            <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
              type === 'success' ? 'bg-[#104908]/10' : 'bg-red-50'
            }`}>
              {/* Showcase Icon */}
              <div className={type === 'success' ? 'text-[#104908]' : 'text-red-600'}>
                <ShowcaseIcon isError={type === 'error'} />
              </div>
            </div>
            
            {/* Status Badge */}
            <div className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center ${
              type === 'success' 
                ? 'bg-[#104908] text-white' 
                : 'bg-red-600 text-white'
            }`}>
              {type === 'success' ? (
                <Check size={24} strokeWidth={3} />
              ) : (
                <X size={24} strokeWidth={3} />
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className={`text-2xl font-bold text-center mb-3 ${
          type === 'success' ? 'text-[#104908]' : 'text-red-700'
        }`}>
          {type === 'success' ? 'Berhasil!' : 'Oops!'}
        </h3>

        {/* Message */}
        <p className="text-center text-[#2C1810] text-base mb-6 leading-relaxed">
          {message}
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all hover:shadow-lg ${
            type === 'success'
              ? 'bg-[#104908] hover:bg-[#0d3a06]'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {type === 'success' ? 'Oke, Mantap!' : 'Coba Lagi'}
        </button>
      </div>
    </div>
  );
}
