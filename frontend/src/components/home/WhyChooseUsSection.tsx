import { Shield, Wrench, Clock, Award, Users, Headphones } from 'lucide-react';

const features = [
  { icon: Award, title: 'Kualitas Terjamin', desc: 'Seluruh produk memenuhi standar kualitas internasional dengan bahan baku pilihan.' },
  { icon: Shield, title: 'Garansi Resmi', desc: 'Setiap produk dilengkapi garansi resmi dan dukungan purna jual terpercaya.' },
  { icon: Wrench, title: 'Teknisi Berpengalaman', desc: 'Tim teknisi kami berpengalaman lebih dari 20 tahun di industri mesin makanan.' },
  { icon: Users, title: '500+ Klien', desc: 'Dipercaya lebih dari 500 pelanggan dari berbagai segmen industri food & beverage.' },
  { icon: Clock, title: 'Pengiriman Tepat Waktu', desc: 'Komitmen ketepatan waktu pengiriman dan instalasi di seluruh Indonesia.' },
  { icon: Headphones, title: 'Support 24/7', desc: 'Tim support siap membantu Anda kapan saja untuk memastikan operasional lancar.' },
];

export function WhyChooseUsSection() {
  return (
    <section className="pt-32 pb-32 md:pt-40 md:pb-40 bg-slate-900 relative overflow-hidden">
      {/* Wavy Divider ATAS */}
      <div className="absolute -top-[2px] left-0 right-0 w-full overflow-hidden leading-none z-20" style={{ transform: 'rotate(180deg)' }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[50px] md:h-[80px] fill-white block">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"></path>
        </svg>
      </div>

      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="relative z-10 container-wide">
        <div className="text-center mb-10 md:mb-14 px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-brand-400 uppercase mb-4">
            Mengapa Memilih Kami
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto">
            Dedikasi lebih dari dua dekade sebagai pionir solusi dapur komersial Indonesia.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 md:p-6 hover:bg-slate-800 transition-colors shadow-lg">
              <div className="w-12 h-12 bg-brand-500/10 border border-brand-500/20 rounded-xl flex items-center justify-center mb-4">
                <Icon size={22} className="text-brand-400" />
              </div>
              <h3 className="text-white font-semibold font-display mb-2">{title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wavy Divider BAWAH */}
      <div className="absolute -bottom-[2px] left-0 right-0 w-full overflow-hidden leading-none z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[50px] md:h-[80px] fill-white block">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"></path>
        </svg>
      </div>
    </section>
  );
}
