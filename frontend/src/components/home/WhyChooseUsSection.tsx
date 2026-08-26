'use client';

import { useLanguage } from '@/context/LanguageContext';

export function WhyChooseUsSection() {
  const { t } = useLanguage();

  const features = [
    { title: t('Kualitas Terjamin', 'Guaranteed Quality'), desc: t('Seluruh produk memenuhi standar kualitas internasional dengan bahan baku pilihan.', 'All products meet international quality standards with selected raw materials.') },
    { title: t('Garansi Resmi', 'Official Warranty'), desc: t('Setiap produk dilengkapi garansi resmi dan dukungan purna jual terpercaya.', 'Every product comes with an official warranty and reliable after-sales support.') },
    { title: t('Teknisi Berpengalaman', 'Experienced Technicians'), desc: t('Tim teknisi kami berpengalaman lebih dari 20 tahun di industri mesin makanan.', 'Our technician team has over 20 years of experience in the food machinery industry.') },
    { title: t('500+ Klien', '500+ Clients'), desc: t('Dipercaya lebih dari 500 pelanggan dari berbagai segmen industri food & beverage.', 'Trusted by over 500 customers from various segments of the food & beverage industry.') },
    { title: t('Pengiriman Tepat Waktu', 'On-Time Delivery'), desc: t('Komitmen ketepatan waktu pengiriman dan instalasi di seluruh Indonesia.', 'Commitment to timely delivery and installation across Indonesia.') },
    { title: t('Support 24/7', '24/7 Support'), desc: t('Tim support siap membantu Anda kapan saja untuk memastikan operasional lancar.', 'Our support team is ready to help you anytime to ensure smooth operations.') },
  ];

  return (
    <section className="py-10 sm:py-16 bg-white relative overflow-hidden border-b border-neutral-200">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-12 mb-10 sm:mb-20">
          <div className="md:w-1/3">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black mb-2 sm:mb-6">
              {t('Mengapa Memilih Kami', 'Why Choose Us')}
            </h2>
          </div>
          <div className="md:w-2/3 border-l-2 border-neutral-900 pl-4 sm:pl-8 md:pl-12 flex items-center">
            <p className="text-neutral-800 font-medium text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
              {t(
                'Berpengalaman lebih dari 20 tahun sebagai pionir penyedia peralatan dapur komersial dan mesin F&B di Indonesia. Kami menghadirkan presisi, kualitas, dan keandalan pada setiap instalasi bisnis Anda.',
                'Over 20 years of experience as a pioneer provider of commercial kitchen equipment and F&B machinery in Indonesia. We deliver precision, quality, and reliability in every installation for your business.'
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-12 gap-y-8 sm:gap-y-16">
          {features.map(({ title, desc }, idx) => (
            <div key={title} className="border-t-2 border-neutral-900 pt-4 sm:pt-6">
              <span className="text-[10px] sm:text-xs font-black text-neutral-900 block mb-2 sm:mb-4 uppercase tracking-[0.2em]">0{idx + 1}</span>
              <h3 className="text-black font-bold text-lg sm:text-xl mb-2 sm:mb-3 tracking-tight">{title}</h3>
              <p className="text-neutral-700 text-xs sm:text-sm font-normal leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
