'use client';

// Klien & mitra Holicindo berdasarkan referensi website lama
const ROW_1 = [
  'Kopi Kenangan', 'Gelael Signature', 'LuLu Hypermarket', 'Cinema XXI',
  'Holland Bakery', 'Flix Cinema', 'BreadTalk', 'J.CO Donuts',
  'Starbucks Indonesia', 'HokBen', 'Chatime', 'Excelso',
];

const ROW_2 = [
  'McDonald\'s', 'KFC Indonesia', 'Pizza Hut', 'Sari Roti',
  'Mayora Group', 'Indomaret', 'Alfamart', 'Transmart Carrefour',
  'Giant Hypermart', 'Hero Supermarket', 'Ranch Market', 'Food Hall',
];

function ClientCard({ name }: { name: string }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center h-14 px-7 mx-2 bg-white border border-neutral-200 hover:border-black transition-all duration-200 cursor-default select-none">
      <span className="text-neutral-500 hover:text-black font-semibold text-sm whitespace-nowrap transition-colors">{name}</span>
    </div>
  );
}

export function ClientsMarquee() {
  const row1 = [...ROW_1, ...ROW_1, ...ROW_1];
  const row2 = [...ROW_2, ...ROW_2, ...ROW_2];

  return (
    <section className="relative py-12 md:py-16 bg-white overflow-hidden border-t border-neutral-200">
      
      {/* Heading */}
      <div className="relative z-10 container-wide mb-16 text-center px-4">
        <p className="text-neutral-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">Dipercaya Oleh</p>
        <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight mb-4">
          Klien &amp; Mitra Kami
        </h2>
        <p className="text-neutral-600 font-normal mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
          Ratusan bisnis kuliner dan HORECA terkemuka di Indonesia telah mempercayakan kebutuhan mesin dan peralatan operasional mereka kepada Holicindo.
        </p>
      </div>

      {/* Row 1 — bergerak ke kiri */}
      <div className="relative mb-4 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee-left">
          {row1.map((name, i) => (
            <ClientCard key={`r1-${i}`} name={name} />
          ))}
        </div>
      </div>

      {/* Row 2 — bergerak ke kanan */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee-right">
          {row2.map((name, i) => (
            <ClientCard key={`r2-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
