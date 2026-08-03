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
    <div className="flex-shrink-0 flex items-center justify-center h-14 px-7 mx-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-brand-400/40 transition-all duration-200 cursor-default select-none">
      <span className="text-neutral-300 font-semibold text-sm whitespace-nowrap">{name}</span>
    </div>
  );
}

export function ClientsMarquee() {
  const row1 = [...ROW_1, ...ROW_1, ...ROW_1];
  const row2 = [...ROW_2, ...ROW_2, ...ROW_2];

  return (
    <section className="relative pt-32 pb-32 md:pt-40 md:pb-40 bg-slate-900 overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Wavy divider ATAS — dari white ke slate-900 */}
      <div className="absolute -top-[2px] left-0 right-0 w-full overflow-hidden leading-none z-20" style={{ transform: 'rotate(180deg)' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[50px] md:h-[80px] fill-white block">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" />
        </svg>
      </div>

      {/* Heading */}
      <div className="relative z-10 container-wide mb-10 md:mb-12 text-center px-4">
        <p className="text-brand-400 font-bold text-xs uppercase tracking-widest mb-3">Dipercaya Oleh</p>
        <h2 className="text-2xl md:text-4xl font-extrabold text-white">
          Klien &amp; Mitra Kami
        </h2>
        <p className="text-neutral-400 mt-3 max-w-xl mx-auto text-sm md:text-base">
          Ratusan bisnis kuliner terkemuka di Indonesia mempercayakan kebutuhan mesin mereka kepada Holicindo.
        </p>
      </div>

      {/* Row 1 — bergerak ke kiri */}
      <div className="relative mb-3 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee-left">
          {row1.map((name, i) => (
            <ClientCard key={`r1-${i}`} name={name} />
          ))}
        </div>
      </div>

      {/* Row 2 — bergerak ke kanan */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee-right">
          {row2.map((name, i) => (
            <ClientCard key={`r2-${i}`} name={name} />
          ))}
        </div>
      </div>

      {/* Wavy divider BAWAH — dari slate-900 ke white */}
      <div className="absolute -bottom-[2px] left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[50px] md:h-[80px] fill-white block">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" />
        </svg>
      </div>
    </section>
  );
}
