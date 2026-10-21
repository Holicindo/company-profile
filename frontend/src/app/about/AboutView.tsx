'use client';

import Image from 'next/image';
import { ClientsMarquee } from '@/components/home/ClientsMarquee';
import { useLanguage } from '@/context/LanguageContext';

interface AboutViewProps {
  initialData?: any;
}

const getDefaultFeatures = (t: any) => [
  {
    title: t('Dimensi', 'Dimensions'),
    desc: t('Fleksibilitas untuk mengatur panjang, lebar, dan tinggi mesin secara presisi mengikuti kapasitas ruang komersial Anda.', 'Flexibility to adjust length, width, and height precisely according to your commercial space capacity.'),
  },
  {
    title: t('Bentuk', 'Shape'),
    desc: t('Bentuk dan lekukan yang dirancang khusus agar menyatu sempurna dengan tata letak serta desain interior toko Anda.', 'Specially designed shapes and curves to blend perfectly with your store layout and interior design.'),
  },
  {
    title: t('Warna', 'Color'),
    desc: t('Pilihan warna yang beragam untuk mendukung estetika dan memperkuat identitas visual (branding) bisnis Anda.', 'Diverse color options to support aesthetics and strengthen your business visual identity (branding).'),
  },
  {
    title: t('Material', 'Material'),
    desc: t('Pemilihan material grade industri berkualitas tinggi yang dapat disesuaikan dengan standar operasional dan keawetan produk.', 'High-quality industrial-grade material selection that can be customized to operational standards and product durability.'),
  },
  {
    title: t('Fungsi', 'Function'),
    desc: t('Sistem pengaturan suhu dan tingkat kelembapan yang dikustomisasi spesifik untuk menjaga kualitas serta kesegaran optimal produk Anda.', 'Temperature and humidity control systems specifically customized to maintain optimal quality and freshness of your products.'),
  },
];

export function AboutView({ initialData }: AboutViewProps) {
  const { t } = useLanguage();
  
  const DEFAULT_FEATURES = getDefaultFeatures(t);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      {/* ── Hero Section ── */}
      <div className="relative border-b border-neutral-200 text-white overflow-hidden min-h-[240px] sm:min-h-[500px] py-10 sm:py-0 flex items-center">
        <Image
          src={'/images/about/hero-bg-02.jpg'}
          alt="Holicindo Warehouse"
          fill
          className="object-cover"
          priority
          quality={100}
          unoptimized
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 max-w-3xl">
            <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-2 sm:mb-6 leading-[1.15] drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 via-neutral-400 to-white animate-shimmer-text">
              {t(
                initialData?.hero?.titleId || initialData?.hero?.title || 'Profil Perusahaan',
                initialData?.hero?.titleEn || 'Company Profile'
              )}
            </h1>
            <p className="text-neutral-100 text-xs sm:text-base md:text-lg font-normal leading-relaxed drop-shadow-md">
              {t(
                initialData?.hero?.subtitleId || initialData?.hero?.subtitle || 'PT Holicindo Dasa Anugerah telah berdiri sebagai pemasar mesin makanan industri di Indonesia sejak tahun 2001.',
                initialData?.hero?.subtitleEn || 'PT Holicindo Dasa Anugerah has been established as an industrial food machinery distributor in Indonesia since 2001.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Container ── */}
      <div className="container-wide py-6 sm:py-10">
        {/* ── Sejarah Perusahaan & Visi ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 mb-8 sm:mb-16">
          {/* Left Column: Sejarah Perusahaan */}
          <div className="lg:col-span-7 p-4 sm:p-10 lg:p-14 border border-neutral-200 bg-white">
            <h2 className="text-xl sm:text-4xl font-bold text-[#2C1810] tracking-tight mb-3 sm:mb-8">
              {t(
                initialData?.history?.titleId || initialData?.history?.title || 'Sejarah Perusahaan',
                initialData?.history?.titleEn || 'Company History'
              )}
            </h2>
            <div className="space-y-3 sm:space-y-6 text-neutral-800 text-xs sm:text-lg leading-relaxed text-left sm:text-justify font-semibold">
              {(initialData?.history?.paragraph1Id || initialData?.history?.paragraph1En || initialData?.history?.paragraph1 || initialData?.history?.paragraph2)
                ? (
                  <>
                    <p>{t(
                      initialData.history.paragraph1Id || initialData.history.paragraph1 || '',
                      initialData.history.paragraph1En || initialData.history.paragraph1 || ''
                    )}</p>
                    {(initialData.history.paragraph2Id || initialData.history.paragraph2En || initialData.history.paragraph2) && <p>{t(
                      initialData.history.paragraph2Id || initialData.history.paragraph2 || '',
                      initialData.history.paragraph2En || initialData.history.paragraph2 || ''
                    )}</p>}
                  </>
                )
                : (
                  <>
                    <p>{t('PT. Holicindo Dasa Anugerah telah berdiri sebagai pemasar mesin makanan industri di Indonesia sejak tahun 2001. Perusahaan kami menyediakan berbagai macam mesin makanan, mulai dari sistem pendinginan, peralatan memanggang hingga etalase showcase untuk makanan.', 'PT. Holicindo Dasa Anugerah has been established as an industrial food machinery distributor in Indonesia since 2001. We provide various types of food machinery, from refrigeration systems, baking equipment to food showcases.')}</p>
                    <p>{t('Sebagai produsen spesialisasi pembuatan khusus kami dapat memanajemen harga etalase showcase untuk makanan. Sebagai produsen spesialisasi pendingin, kami telah merebut kepercayaan konsumen. Perusahaan kami menyediakan pengiriman, pemasangan produk yang disediakan akurat juga, kami juga memahami harga sales service semua produk kami di seluruh Indonesia.', 'As a specialized manufacturer of custom-made equipment, we can manage showcase prices for food displays. As a specialized refrigeration manufacturer, we have earned customer trust. Our company provides delivery, product installation accurately, and we also provide comprehensive sales service for all our products throughout Indonesia.')}</p>
                  </>
                )
              }
            </div>
          </div>

          {/* Right Column: Visi (Compact, Cream Background) */}
          <div className="lg:col-span-5 bg-[#F6F1E6] p-6 sm:p-8 lg:p-10 border border-neutral-200 rounded-xl">
            <div className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-[#2C1810] text-white text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 sm:mb-6 rounded-sm">
              {t('VISI', 'VISION')}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C1810] tracking-tight leading-[1.2] mb-4 sm:mb-6">
              {t('Lebih dari sekadar', 'More than')}<br />
              {t('distributor mesin', 'a showcase')}<br />
              <span className="text-[#C9A84C]">
                {t('pendingin komersial.', 'manufacturer.')}
              </span>
            </h2>

            <div className="w-10 sm:w-12 h-[2px] bg-[#C9A84C] mb-4 sm:mb-5" />

            <p className="text-[#2C1810] text-sm sm:text-base lg:text-lg font-bold leading-relaxed mb-4">
              {t(
                'Holicindo menghadirkan solusi display kustom yang membantu brand makanan mempresentasikan, menjaga, dan menjual produk mereka dengan lebih baik.',
                'Holicindo creates custom display solutions that help food brands present, preserve, and sell their products better.'
              )}
            </p>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-5">
              {t(
                'Di setiap proyek, Holicindo memadukan desain, manufaktur, instalasi, dan dukungan purna jual untuk menciptakan sistem display yang dibangun sesuai produk, ruang, dan kebutuhan bisnis setiap pelanggan.',
                'With every project, Holicindo brings together design, manufacturing, installation, and after-sales support to create display systems built around each customer\'s products, space, and business needs.'
              )}
            </p>

            <p
              className="text-[#2C1810] text-lg sm:text-xl lg:text-2xl leading-snug italic"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {t('Menciptakan Pengalaman Display Makanan Terbaik', 'Creating Better Food Display Experiences')}
            </p>
          </div>
        </div>

        {/* ── Kustomisasi ── */}
        <div className="relative mb-6 mt-6 sm:mt-8">
          <div className="absolute -left-4 top-0 w-72 h-72 bg-[#2C1810]/5 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="max-w-3xl mb-4 sm:mb-8">
              <div className="inline-block px-3 py-0.5 sm:px-3.5 sm:py-1 bg-[#2C1810] text-white text-xs sm:text-sm font-bold tracking-widest mb-2 sm:mb-6 rounded-full">
                {t(
                  initialData?.customization?.badgeId || initialData?.customization?.badge || 'Kustomisasi',
                  initialData?.customization?.badgeEn || 'Customization'
                )}
              </div>
              <h2 className="text-xl sm:text-5xl font-bold text-[#2C1810] tracking-tight mb-2 sm:mb-6 leading-[1.15]">
                {t(
                  initialData?.customization?.titleId || initialData?.customization?.title || 'Layanan Kustomisasi Premium',
                  initialData?.customization?.titleEn || 'Premium Customization Services'
                )}
              </h2>
              <p className="text-neutral-600 text-xs sm:text-base leading-relaxed">
                {t(
                  initialData?.customization?.descriptionId || initialData?.customization?.description || 'Berbekal pengalaman lebih dari 20 tahun, kami menghadirkan layanan pembuatan showcase pendingin kustom dengan spesifikasi yang dirancang khusus untuk memaksimalkan potensi bisnis Anda.',
                  initialData?.customization?.descriptionEn || 'With over 20 years of experience, we offer custom refrigerated showcase manufacturing with specifications tailored to maximize your business potential.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
              <div className="lg:col-span-5">
                <div className="relative rounded-xl bg-[#F6F1E6] h-full min-h-[400px] sm:min-h-full overflow-hidden">
                  <Image
                    src={initialData?.customization?.showcaseImage || '/images/about/showcase-hitam-bg3.png'}
                    alt="Showcase dengan Panah Dimension"
                    fill
                    className="object-contain p-6 sm:p-8"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    quality={100}
                    unoptimized
                  />
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-2.5 sm:gap-6 auto-rows-fr">
                {((initialData?.customization?.features && initialData.customization.features.length > 0) 
                  ? initialData.customization.features 
                  : DEFAULT_FEATURES
                ).map((feat: any, idx: number, arr: any[]) => (
                  <div
                    key={idx}
                    className={`bg-white border-2 border-neutral-200 rounded-xl p-2.5 sm:p-6 hover:border-[#2C1810] transition-all flex flex-col ${
                      idx === arr.length - 1 && arr.length % 2 !== 0 ? 'col-span-2' : ''
                    }`}
                  >
                    <h3 className="font-bold text-[#2C1810] text-[11px] sm:text-lg mb-1 sm:mb-3">
                      {t(feat.titleId || feat.title, feat.titleEn || feat.title)}
                    </h3>
                    <p className="text-neutral-600 text-[10px] sm:text-base leading-snug sm:leading-relaxed flex-1">
                      {t(feat.descriptionId || feat.description || feat.desc, feat.descriptionEn || feat.description || feat.desc)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClientsMarquee />
    </div>
  );
}
