'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { apiService, Client } from '@/services/api';

const FALLBACK_CLIENTS = [
  { id: 1, name: 'Gelael Signature', logo: null, displayOrder: 0, isActive: true },
  { id: 2, name: 'LuLu Hypermarket', logo: null, displayOrder: 1, isActive: true },
  { id: 3, name: 'Cinema XXI', logo: null, displayOrder: 2, isActive: true },
  { id: 4, name: 'Holland Bakery', logo: null, displayOrder: 3, isActive: true },
  { id: 5, name: 'Flix Cinema', logo: null, displayOrder: 4, isActive: true },
  { id: 6, name: 'BreadTalk', logo: null, displayOrder: 5, isActive: true },
  { id: 7, name: 'J.CO Donuts', logo: null, displayOrder: 6, isActive: true },
  { id: 8, name: 'Starbucks Indonesia', logo: null, displayOrder: 7, isActive: true },
  { id: 9, name: 'Roti O', logo: null, displayOrder: 8, isActive: true },
  { id: 10, name: 'Mayora Group', logo: null, displayOrder: 9, isActive: true },
  { id: 11, name: 'Indomaret', logo: null, displayOrder: 10, isActive: true },
  { id: 12, name: 'Alfamart', logo: null, displayOrder: 11, isActive: true },
  { id: 13, name: 'Transmart Carrefour', logo: null, displayOrder: 12, isActive: true },
  { id: 14, name: 'Giant Hypermart', logo: null, displayOrder: 13, isActive: true },
  { id: 15, name: 'Hero Supermarket', logo: null, displayOrder: 14, isActive: true },
  { id: 16, name: 'Ranch Market', logo: null, displayOrder: 15, isActive: true },
  { id: 17, name: 'Food Hall', logo: null, displayOrder: 16, isActive: true },
];

export function ClientsMarquee() {
  const { t } = useLanguage();
  const [clients, setClients] = useState<Client[]>(FALLBACK_CLIENTS);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await apiService.getClients();
      if (data && data.length > 0) {
        setClients(data);
      }
    };
    fetchClients();
  }, []);

  // Split into 2 rows for marquee effect
  const midpoint = Math.ceil(clients.length / 2);
  const row1 = [...clients.slice(0, midpoint), ...clients.slice(0, midpoint), ...clients.slice(0, midpoint)];
  const row2 = [...clients.slice(midpoint), ...clients.slice(midpoint), ...clients.slice(midpoint)];

  return (
    <section className="relative py-6 sm:py-8 md:py-10 bg-white overflow-hidden border-t border-neutral-200">
      
      {/* Heading */}
      <div className="relative z-10 container-wide mb-6 sm:mb-8 text-center px-4">
        <p className="text-[#C9A84C] font-black text-xs sm:text-sm uppercase tracking-[0.25em] mb-2 sm:mb-4">
          {t('Dipercaya Oleh', 'Trusted By')}
        </p>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black tracking-tight mb-2 sm:mb-4">
          {t('Klien & Mitra Kami', 'Our Clients & Partners')}
        </h2>
        <p className="text-neutral-600 font-normal mt-2 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-base md:text-lg leading-relaxed">
          {t(
            'Ratusan bisnis kuliner dan HORECA terkemuka di Indonesia telah mempercayakan kebutuhan mesin dan peralatan operasional mereka kepada Holicindo.',
            'Hundreds of leading F&B and HORECA businesses in Indonesia have trusted their operational machinery and equipment needs to Holicindo.'
          )}
        </p>
      </div>

      {/* Row 1 — bergerak ke kiri */}
      <div className="relative mb-3 sm:mb-4 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-3 sm:gap-6 animate-marquee-left whitespace-nowrap">
          {row1.map((item, idx) => (
            <div
              key={`r1-${idx}`}
              className="flex-shrink-0 flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 bg-white shadow-xs rounded-none min-w-[130px] sm:min-w-[180px] md:min-w-[200px]"
              style={{ border: '1px solid rgba(201,168,76,0.5)' }}
            >
              <span className="font-bold text-[#2C1810] text-xs sm:text-sm md:text-base tracking-tight select-none">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — bergerak ke kanan */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-3 sm:gap-6 animate-marquee-right whitespace-nowrap">
          {row2.map((item, idx) => (
            <div
              key={`r2-${idx}`}
              className="flex-shrink-0 flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-4 bg-white shadow-xs rounded-none min-w-[130px] sm:min-w-[180px] md:min-w-[200px]"
              style={{ border: '1px solid rgba(201,168,76,0.5)' }}
            >
              <span className="font-bold text-[#2C1810] text-xs sm:text-sm md:text-base tracking-tight select-none">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
