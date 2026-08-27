'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ClientsMarquee } from '@/components/home/ClientsMarquee';
import { useLanguage } from '@/context/LanguageContext';

export function AboutView() {
  const { t } = useLanguage();

  const warehouseSlides = [
    '/images/about/warehouse-slide-01.jpg',
    '/images/about/warehouse-slide-02.jpg',
    '/images/about/warehouse-slide-03.jpg',
    '/images/about/warehouse-slide-04.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % warehouseSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [warehouseSlides.length]);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      <div className="relative border-b border-neutral-200 text-white overflow-hidden min-h-[360px] sm:min-h-[500px]">
        <Image 
          src="/images/about/hero-bg-02.jpg" 
          alt="Holicindo Warehouse" 
          fill
          className="object-cover"
          priority
          quality={100}
          unoptimized
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 sm:px-6 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.15] drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 via-neutral-400 to-white animate-shimmer-text">{t('Profil Perusahaan', 'Company Profile')}</h1>
            <p className="text-neutral-100 text-sm sm:text-base md:text-lg font-normal leading-relaxed drop-shadow-md">{t('PT Holicindo Dasa Anugerah telah berdiri sebagai pemasar mesin makanan industri di Indonesia sejak tahun 2001.', 'PT Holicindo Dasa Anugerah has been established as an industrial food machinery distributor in Indonesia since 2001.')}</p>
          </div>
        </div>
      </div>

      <div className="container-wide py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 border border-neutral-200 bg-white">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#2D3E50] tracking-tight mb-4 sm:mb-8">{t('Perjalanan Kami', 'Our Journey')}</h2>
            <div className="space-y-4 sm:space-y-6 text-neutral-600 text-sm sm:text-lg leading-relaxed text-justify">
              <p>{t('PT. Holicindo Dasa Anugerah telah berdiri sebagai pemasar mesin makanan industri di Indonesia sejak tahun 2001. Perusahaan kami menyediakan berbagai macam mesin makanan, mulai dari sistem pendinginan, peralatan memanggang hingga etalase showcase untuk makanan.', 'PT. Holicindo Dasa Anugerah has been established as an industrial food machinery distributor in Indonesia since 2001. We provide various types of food machinery, from refrigeration systems, baking equipment to food showcases.')}</p>
              <p>{t('Sebagai produsen spesialisasi pembuatan khusus kami dapat memanajemen harga etalase showcase untuk makanan. Sebagai produsen spesialisasi pendingin, kami telah merebut kepercayaan konsumen. Perusahaan kami menyediakan pengiriman, pemasangan produk yang disediakan akurat juga, kami juga memahami harga sales service semua produk kami di seluruh Indonesia.', 'As a specialized manufacturer of custom-made equipment, we can manage showcase prices for food displays. As a specialized refrigeration manufacturer, we have earned customer trust. Our company provides delivery, product installation accurately, and we also provide comprehensive sales service for all our products throughout Indonesia.')}</p>
            </div>
          </div>

          <div className="lg:col-span-5 relative bg-neutral-900 border border-neutral-300 rounded-xl overflow-hidden shadow-sm min-h-[300px] sm:min-h-[500px]">
            {warehouseSlides.map((slide, index) => (
              <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                <Image src={slide} alt={`Warehouse ${index + 1}`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" quality={100} unoptimized />
              </div>
            ))}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {warehouseSlides.map((_, index) => (
                <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6 sm:w-8' : 'bg-white/50 w-2'}`} aria-label={`Go to slide ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="mb-12 sm:mb-16">
          <div className="max-w-3xl mb-6 sm:mb-8">
            <div className="inline-block px-3.5 py-1 bg-neutral-100 text-[#2D3E50] text-[9px] font-bold uppercase tracking-widest mb-4 sm:mb-6 rounded-full border border-neutral-200">{t('VISI', 'VISION')}</div>
            <h2 className="text-2xl sm:text-5xl font-bold text-[#2D3E50] tracking-tight mb-4 sm:mb-6 leading-[1.15]">{t('Menjadi Distributor Terdepan', 'To Become the Leading Distributor')}</h2>
            <p className="text-neutral-600 text-sm sm:text-lg leading-relaxed font-semibold mb-4 sm:mb-6">{t('Menjadi distributor mesin pengolahan makanan dan pendingin komersial terdepan di Indonesia, dengan komitmen menghadirkan standar kualitas industri terbaik untuk bisnis Anda.', 'To become the leading food processing machine and commercial refrigeration distributor in Indonesia, committed to delivering the best industry quality standards for your business.')}</p>
          </div>

          <div className="bg-white border-2 border-neutral-200 rounded-xl p-6 sm:p-10 shadow-sm">
            <h3 className="font-bold text-[#2D3E50] text-lg sm:text-xl mb-4 sm:mb-6">{t('Produk dan Layanan:', 'Products and Services:')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <h4 className="font-bold text-[#2D3E50] text-base sm:text-lg mb-2 sm:mb-3">{t('Mesin Pengolahan Makanan', 'Food Processing Machinery')}</h4>
                <p className="text-neutral-600 text-xs sm:text-base leading-relaxed">{t('Peralatan industrial seperti mixer dan slicer komersial yang dirancang khusus untuk memaksimalkan efisiensi dan konsistensi produksi dapur Anda.', 'Industrial equipment such as commercial mixers and slicers specifically engineered to maximize your kitchen production efficiency and consistency.')}</p>
              </div>
              <div>
                <h4 className="font-bold text-[#2D3E50] text-base sm:text-lg mb-2 sm:mb-3">{t('Showcase Kustom', 'Custom Showcase')}</h4>
                <p className="text-neutral-600 text-xs sm:text-base leading-relaxed">{t('Desain dan pembuatan showcase pendingin yang fungsional sekaligus estetis. Sangat ideal untuk display makanan dengan kustomisasi spesifikasi sesuai kebutuhan bisnis.', 'Functional and aesthetic design and manufacturing of custom refrigerated showcases. Ideal for food displays with tailor-made specifications to suit your business needs.')}</p>
              </div>
              <div>
                <h4 className="font-bold text-[#2D3E50] text-base sm:text-lg mb-2 sm:mb-3">{t('Etalase Pastry & Chiller', 'Pastry Display & Chiller')}</h4>
                <p className="text-neutral-600 text-xs sm:text-base leading-relaxed">{t('Sistem pendingin komersial berkualitas tinggi yang dapat disesuaikan dengan kapasitas dan spesifikasi produk kuliner Anda.', 'High-quality commercial cooling systems adaptable to your culinary product capacity and specifications.')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mb-6 mt-6 sm:mt-8">
          <div className="absolute -left-4 top-0 w-72 h-72 bg-[#2D3E50]/5 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="max-w-3xl mb-6 sm:mb-8">
              <div className="inline-block px-3.5 py-1 bg-[#2D3E50] text-white text-[9px] font-bold tracking-widest mb-4 sm:mb-6 rounded-full">{t('Kustomisasi', 'Customization')}</div>
              <h2 className="text-2xl sm:text-5xl font-bold text-[#2D3E50] tracking-tight mb-4 sm:mb-6 leading-[1.15]">{t('Layanan Kustomisasi Premium', 'Premium Customization Services')}</h2>
              <p className="text-neutral-600 text-xs sm:text-base leading-relaxed">{t('Berbekal pengalaman lebih dari 20 tahun, kami menghadirkan layanan pembuatan showcase pendingin kustom dengan spesifikasi yang dirancang khusus untuk memaksimalkan potensi bisnis Anda.', 'With over 20 years of experience, we offer custom refrigerated showcase manufacturing with specifications tailored to maximize your business potential.')}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              <div className="lg:col-span-5">
                <div className="relative rounded-xl bg-[#2D3E50] min-h-[340px] sm:min-h-[500px]">
                  <Image src="/images/about/showcase-hitam-bg3.png" alt="Showcase dengan Panah Dimension" fill className="object-contain p-4 sm:p-6" sizes="(max-width: 1024px) 100vw, 42vw" quality={100} unoptimized />
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-6">
                <div className="bg-white border-2 border-neutral-200 rounded-xl p-3 sm:p-6 hover:border-[#2D3E50] transition-all">
                  <h3 className="font-bold text-[#2D3E50] text-[11px] sm:text-lg mb-1 sm:mb-3">{t('Dimensi', 'Dimensions')}</h3>
                  <p className="text-neutral-600 text-[10px] sm:text-base leading-snug sm:leading-relaxed">{t('Fleksibilitas untuk mengatur panjang, lebar, dan tinggi mesin secara presisi mengikuti kapasitas ruang komersial Anda.', 'Flexibility to precisely customize length, width, and height according to your commercial space capacity.')}</p>
                </div>

                <div className="bg-white border-2 border-neutral-200 rounded-xl p-3 sm:p-6 hover:border-[#2D3E50] transition-all">
                  <h3 className="font-bold text-[#2D3E50] text-[11px] sm:text-lg mb-1 sm:mb-3">{t('Bentuk', 'Shape & Form')}</h3>
                  <p className="text-neutral-600 text-[10px] sm:text-base leading-snug sm:leading-relaxed">{t('Bentuk dan lekukan yang dirancang khusus agar menyatu sempurna dengan tata letak serta desain interior toko Anda.', 'Custom shapes and curves designed to seamlessly integrate with your store layout and interior design.')}</p>
                </div>

                <div className="bg-white border-2 border-neutral-200 rounded-xl p-3 sm:p-6 hover:border-[#2D3E50] transition-all">
                  <h3 className="font-bold text-[#2D3E50] text-[11px] sm:text-lg mb-1 sm:mb-3">{t('Warna', 'Color Palette')}</h3>
                  <p className="text-neutral-600 text-[10px] sm:text-base leading-snug sm:leading-relaxed">{t('Pilihan warna yang beragam untuk mendukung estetika dan memperkuat identitas visual (branding) bisnis Anda.', 'Diverse color choices to enhance aesthetics and reinforce your visual brand identity.')}</p>
                </div>

                <div className="bg-white border-2 border-neutral-200 rounded-xl p-3 sm:p-6 hover:border-[#2D3E50] transition-all">
                  <h3 className="font-bold text-[#2D3E50] text-[11px] sm:text-lg mb-1 sm:mb-3">{t('Material', 'Materials')}</h3>
                  <p className="text-neutral-600 text-[10px] sm:text-base leading-snug sm:leading-relaxed">{t('Pemilihan material grade industri berkualitas tinggi yang dapat disesuaikan dengan standar operasional dan keawetan produk.', 'High-grade industrial material selection customized for operational standards and long-lasting durability.')}</p>
                </div>

                <div className="bg-white border-2 border-neutral-200 rounded-xl p-3 sm:p-6 hover:border-[#2D3E50] transition-all col-span-2">
                  <h3 className="font-bold text-[#2D3E50] text-[11px] sm:text-lg mb-1 sm:mb-3">{t('Fungsi', 'Functionality')}</h3>
                  <p className="text-neutral-600 text-[10px] sm:text-base leading-snug sm:leading-relaxed">{t('Sistem pengaturan suhu dan tingkat kelembapan yang dikustomisasi spesifik untuk menjaga kualitas serta kesegaran optimal produk Anda.', 'Customized temperature and humidity control systems designed to preserve optimal quality and freshness.')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClientsMarquee />
    </div>
  );
}
