'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ClientsMarquee } from '@/components/home/ClientsMarquee';
import { useLanguage } from '@/context/LanguageContext';

interface AboutViewProps {
  initialData?: any;
}

const DEFAULT_WAREHOUSE_SLIDES = [
  '/images/about/warehouse-slide-01.jpg',
  '/images/about/warehouse-slide-02.jpg',
  '/images/about/warehouse-slide-03.jpg',
  '/images/about/warehouse-slide-04.jpg',
];

const DEFAULT_FEATURES = [
  {
    title: 'Dimensi',
    desc: 'Fleksibilitas untuk mengatur panjang, lebar, dan tinggi mesin secara presisi mengikuti kapasitas ruang komersial Anda.',
  },
  {
    title: 'Bentuk',
    desc: 'Bentuk dan lekukan yang dirancang khusus agar menyatu sempurna dengan tata letak serta desain interior toko Anda.',
  },
  {
    title: 'Warna',
    desc: 'Pilihan warna yang beragam untuk mendukung estetika dan memperkuat identitas visual (branding) bisnis Anda.',
  },
  {
    title: 'Material',
    desc: 'Pemilihan material grade industri berkualitas tinggi yang dapat disesuaikan dengan standar operasional dan keawetan produk.',
  },
  {
    title: 'Fungsi',
    desc: 'Sistem pengaturan suhu dan tingkat kelembapan yang dikustomisasi spesifik untuk menjaga kualitas serta kesegaran optimal produk Anda.',
  },
];

export function AboutView({ initialData }: AboutViewProps) {
  const { t } = useLanguage();
  const [pageData, setPageData] = useState<any>(initialData || null);

  useEffect(() => {
    const fetchFreshData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011'}/api/pages/slug/tentang-kami`,
          {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' },
          }
        );
        if (res.ok) {
          const data = await res.json();
          if (data?.sections) {
            setPageData(data.sections);
          }
        }
      } catch (err) {
        console.error('Failed to fetch tentang-kami data:', err);
      }
    };

    fetchFreshData();
  }, []);

  const warehouseSlides =
    pageData?.history?.warehouseSlides && pageData.history.warehouseSlides.length > 0
      ? pageData.history.warehouseSlides
      : DEFAULT_WAREHOUSE_SLIDES;

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (currentSlide >= warehouseSlides.length) {
      setCurrentSlide(0);
    }
  }, [warehouseSlides.length, currentSlide]);

  useEffect(() => {
    if (warehouseSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % warehouseSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [warehouseSlides.length]);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      {/* ── Hero Section ── */}
      <div className="relative border-b border-neutral-200 text-white overflow-hidden min-h-[240px] sm:min-h-[500px] py-10 sm:py-0 flex items-center">
        <Image
          src={pageData?.hero?.backgroundImage || '/images/about/hero-bg-02.jpg'}
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
              {pageData?.hero?.title || t('Profil Perusahaan', 'Company Profile')}
            </h1>
            <p className="text-neutral-100 text-xs sm:text-base md:text-lg font-normal leading-relaxed drop-shadow-md">
              {pageData?.hero?.subtitle ||
                t(
                  'PT Holicindo Dasa Anugerah telah berdiri sebagai pemasar mesin makanan industri di Indonesia sejak tahun 2001.',
                  'PT Holicindo Dasa Anugerah has been established as an industrial food machinery distributor in Indonesia since 2001.'
                )}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Container ── */}
      <div className="container-wide py-6 sm:py-10">
        {/* ── Sejarah Perusahaan & Slideshow ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 mb-8 sm:mb-16">
          <div className="lg:col-span-7 p-4 sm:p-10 lg:p-14 border border-neutral-200 bg-white">
            <h2 className="text-xl sm:text-4xl font-bold text-[#2C1810] tracking-tight mb-3 sm:mb-8">
              {pageData?.history?.title || t('Sejarah Perusahaan', 'Company History')}
            </h2>
            <div className="space-y-3 sm:space-y-6 text-neutral-600 text-xs sm:text-lg leading-relaxed text-left sm:text-justify">
              <p>
                {pageData?.history?.paragraph1 ||
                  t(
                    'PT. Holicindo Dasa Anugerah telah berdiri sebagai pemasar mesin makanan industri di Indonesia sejak tahun 2001. Perusahaan kami menyediakan berbagai macam mesin makanan, mulai dari sistem pendinginan, peralatan memanggang hingga etalase showcase untuk makanan.',
                    'PT. Holicindo Dasa Anugerah has been established as an industrial food machinery distributor in Indonesia since 2001. We provide various types of food machinery, from refrigeration systems, baking equipment to food showcases.'
                  )}
              </p>
              <p>
                {pageData?.history?.paragraph2 ||
                  t(
                    'Sebagai produsen spesialisasi pembuatan khusus kami dapat memanajemen harga etalase showcase untuk makanan. Sebagai produsen spesialisasi pendingin, kami telah merebut kepercayaan konsumen. Perusahaan kami menyediakan pengiriman, pemasangan produk yang disediakan akurat juga, kami juga memahami harga sales service semua produk kami di seluruh Indonesia.',
                    'As a specialized manufacturer of custom-made equipment, we can manage showcase prices for food displays. As a specialized refrigeration manufacturer, we have earned customer trust. Our company provides delivery, product installation accurately, and we also provide comprehensive sales service for all our products throughout Indonesia.'
                  )}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative bg-neutral-900 border border-neutral-300 rounded-xl overflow-hidden shadow-sm aspect-[4/3] sm:aspect-auto sm:min-h-[500px]">
            {warehouseSlides.map((slide: string, index: number) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide}
                  alt={`Warehouse ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={100}
                  unoptimized
                />
              </div>
            ))}
            {warehouseSlides.length > 1 && (
              <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
                {warehouseSlides.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-5 sm:w-8' : 'bg-white/50 w-1.5 sm:w-2'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Visi ── */}
        <div className="mb-8 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-16 items-start mb-4 sm:mb-8">
            {/* Kolom Kiri: Badge + Judul */}
            <div>
              <div className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-[#2C1810] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-8 rounded-sm">
                {pageData?.vision?.badge || t('VISI', 'VISION')}
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810] tracking-tight leading-[1.2] mb-0">
                {pageData?.vision?.title?.line1 || t('Lebih dari sekadar', 'More than')}<br />
                {pageData?.vision?.title?.line2 || t('distributor mesin', 'a showcase')}<br />
                <span className="text-[#C9A84C]">
                  {pageData?.vision?.title?.line3 || t('pendingin komersial.', 'manufacturer.')}
                </span>
              </h2>
            </div>

            {/* Kolom Kanan: Garis + Deskripsi + Tagline */}
            <div className="flex flex-col gap-3 sm:gap-5 pt-0 lg:pt-14">
              <div className="w-10 sm:w-12 h-[2px] bg-[#C9A84C]" />

              <p className="text-[#2C1810] text-xs sm:text-base font-bold leading-relaxed">
                {pageData?.vision?.description1 ||
                  t(
                    'Holicindo menghadirkan solusi display kustom yang membantu brand makanan mempresentasikan, menjaga, dan menjual produk mereka dengan lebih baik.',
                    'Holicindo creates custom display solutions that help food brands present, preserve, and sell their products better.'
                  )}
              </p>

              <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
                {pageData?.vision?.description2 ||
                  t(
                    'Di setiap proyek, Holicindo memadukan desain, manufaktur, instalasi, dan dukungan purna jual untuk menciptakan sistem display yang dibangun sesuai produk, ruang, dan kebutuhan bisnis setiap pelanggan.',
                    'With every project, Holicindo brings together design, manufacturing, installation, and after-sales support to create display systems built around each customer\'s products, space, and business needs.'
                  )}
              </p>

              <p
                className="text-[#2C1810] text-lg sm:text-3xl leading-snug mt-1 sm:mt-2"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: 400 }}
              >
                {pageData?.vision?.tagline ||
                  t('Menciptakan Pengalaman Display Makanan Terbaik', 'Creating Better Food Display Experiences')}
              </p>
            </div>
          </div>
        </div>

        {/* ── Kustomisasi ── */}
        <div className="relative mb-6 mt-6 sm:mt-8">
          <div className="absolute -left-4 top-0 w-72 h-72 bg-[#2C1810]/5 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="max-w-3xl mb-4 sm:mb-8">
              <div className="inline-block px-3 py-0.5 sm:px-3.5 sm:py-1 bg-[#2C1810] text-white text-[9px] font-bold tracking-widest mb-2 sm:mb-6 rounded-full">
                {pageData?.customization?.badge || t('Kustomisasi', 'Customization')}
              </div>
              <h2 className="text-xl sm:text-5xl font-bold text-[#2C1810] tracking-tight mb-2 sm:mb-6 leading-[1.15]">
                {pageData?.customization?.title || t('Layanan Kustomisasi Premium', 'Premium Customization Services')}
              </h2>
              <p className="text-neutral-600 text-xs sm:text-base leading-relaxed">
                {pageData?.customization?.description ||
                  t(
                    'Berbekal pengalaman lebih dari 20 tahun, kami menghadirkan layanan pembuatan showcase pendingin kustom dengan spesifikasi yang dirancang khusus untuk memaksimalkan potensi bisnis Anda.',
                    'With over 20 years of experience, we offer custom refrigerated showcase manufacturing with specifications tailored to maximize your business potential.'
                  )}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
              <div className="lg:col-span-5">
                <div className="relative rounded-xl bg-[#2C1810] aspect-square sm:aspect-auto sm:min-h-[500px]">
                  <Image
                    src={pageData?.customization?.showcaseImage || '/images/about/showcase-hitam-bg3.png'}
                    alt="Showcase dengan Panah Dimension"
                    fill
                    className="object-contain p-4 sm:p-6"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    quality={100}
                    unoptimized
                  />
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-2.5 sm:gap-6">
                {(pageData?.customization?.features && pageData.customization.features.length > 0
                  ? pageData.customization.features
                  : DEFAULT_FEATURES
                ).map((feat: any, idx: number, arr: any[]) => (
                  <div
                    key={idx}
                    className={`bg-white border-2 border-neutral-200 rounded-xl p-2.5 sm:p-6 hover:border-[#2C1810] transition-all ${
                      idx === arr.length - 1 && arr.length % 2 !== 0 ? 'col-span-2' : ''
                    }`}
                  >
                    <h3 className="font-bold text-[#2C1810] text-[11px] sm:text-lg mb-1 sm:mb-3">
                      {feat.title}
                    </h3>
                    <p className="text-neutral-600 text-[10px] sm:text-base leading-snug sm:leading-relaxed">
                      {feat.description || feat.desc}
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
