'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  gallery: string[];
  productName: string;
}

export default function ProductGallery({ gallery, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full lg:w-1/2">
      <div className="relative bg-white w-full aspect-square border border-neutral-200">
        {gallery[activeIndex] ? (
          <Image
            src={gallery[activeIndex]}
            alt={`${productName} - Slide ${activeIndex + 1}`}
            fill
            className="object-contain p-8 transition-opacity duration-300"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-neutral-300 text-xs uppercase tracking-[0.2em]">No Image Available</span>
          </div>
        )}
      </div>

      {/* Thumbnail gallery */}
      {gallery.length > 1 && (
        <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
          {gallery.map((url: string, i: number) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-24 h-24 border transition-colors bg-white ${
                activeIndex === i ? 'border-black' : 'border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <Image 
                src={url} 
                alt={`Gambar ${i + 1}`} 
                fill 
                className="object-contain p-2" 
                sizes="96px" 
                unoptimized 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
