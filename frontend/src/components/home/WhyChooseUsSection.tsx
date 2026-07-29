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
    <section className="py-20 bg-brand-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="relative container-wide">
        <div className="text-center mb-14">
          <p className="text-brand-300 font-semibold text-sm uppercase tracking-wider mb-2">Mengapa Holicindo</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">Keunggulan Kami</h2>
          <p className="text-brand-200 text-lg max-w-2xl mx-auto">
            Lebih dari dua dekade melayani industri makanan Indonesia
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="text-white font-semibold font-display mb-2">{title}</h3>
              <p className="text-brand-200 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
