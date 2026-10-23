import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Page } from '../modules/pages/entities/page.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'holicindo_web',
  entities: [Page],
  ssl: process.env.DB_SSL === 'true' || (process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1')
    ? { rejectUnauthorized: false }
    : false,
});

const berandaSections = {
  mainHero: {
    subtitle: 'Est. 2001',
    title: {
      line1: 'Spesialis Showcase & Pendingin',
      line2: 'Komersial Terpercaya Indonesia.',
    },
    slides: [
      '/images/about/hero-bg-02.jpg',
      '/images/experiences/hero_experiences_(4).png',
      '/images/experiences/hero_experiences_(1).png',
      '/images/experiences/hero_experiences _(7).png',
    ],
  },
  heroSection: {
    badge: 'SHOWCASE & PENDINGIN KOMERSIAL',
    title: 'Tingkatkan Daya Jual dengan Showcase & Chiller Premium.',
    description: 'Dari cake showcase berlampu LED hingga blast freezer industri — Holicindo menghadirkan solusi pendingin dan display spesifikasi HORECA dengan garansi resmi, siap kirim ke seluruh Indonesia.',
    image: '/hero_section_1.png',
    stats: {
      products: '282+',
      warranty: '100%',
      support: '24/7',
    },
    videoUrl: 'https://www.youtube.com/embed/SWEAJdRmvqk',
  },
  productCategories: {
    title: 'Display & Pendingin untuk Bisnis Anda',
    subtitle: 'Jika Anda sedang mencari unit showcase untuk kebutuhan restoran, toko roti, hotel, atau pabrik makanan yang memerlukan spesifikasi khusus (bukan ukuran standar rumah tangga), produk dari PT Holicindo bisa menjadi salah satu opsi yang tepat.',
    cards: [
      {
        name: 'Display Systems',
        slug: 'display-systems',
        description: 'Showcase & display produk makanan',
        image: '/showcase.png',
      },
      {
        name: 'Commercial Refrigeration',
        slug: 'commercial-refrigeration',
        description: 'Pendingin komersial & blast freezer',
        image: '/refrigerator.png',
      },
      {
        name: 'Ice Maker',
        slug: 'ice-maker',
        description: 'Mesin pembuat es untuk kebutuhan komersial',
        image: '',
      },
      {
        name: 'Bar Systems',
        slug: 'bar-systems',
        description: 'Peralatan bar & minuman profesional',
        image: '/machinery.png',
      },
    ],
  },
  whyChooseUs: {
    title: 'Mengapa Memilih Kami',
    subtitle: 'Berpengalaman lebih dari 20 tahun sebagai pionir penyedia peralatan dapur komersial dan mesin F&B di Indonesia. Kami menghadirkan presisi, kualitas, dan keandalan pada setiap instalasi bisnis Anda.',
    features: [
      {
        title: 'Kualitas Terjamin',
        description: 'Seluruh produk memenuhi standar kualitas internasional dengan bahan baku pilihan.',
      },
      {
        title: 'Garansi Resmi',
        description: 'Setiap produk dilengkapi garansi resmi dan dukungan purna jual terpercaya.',
      },
      {
        title: 'Teknisi Berpengalaman',
        description: 'Tim teknisi kami berpengalaman lebih dari 20 tahun di industri mesin makanan.',
      },
      {
        title: '500+ Klien',
        description: 'Dipercaya lebih dari 500 pelanggan dari berbagai segmen industri food & beverage.',
      },
      {
        title: 'Pengiriman Tepat Waktu',
        description: 'Komitmen ketepatan waktu pengiriman dan instalasi di seluruh Indonesia.',
      },
      {
        title: 'Support 24/7',
        description: 'Tim support siap membantu Anda kapan saja untuk memastikan operasional lancar.',
      },
    ],
  },
};

const tentangKamiSections = {
  hero: {
    title: 'Profil Perusahaan',
    subtitle: 'PT Holicindo Dasa Anugerah telah berdiri sebagai pemasar mesin makanan industri di Indonesia sejak tahun 2001.',
    backgroundImage: '/images/about/hero-bg-02.jpg',
  },
  history: {
    title: 'Sejarah Perusahaan',
    paragraph1: 'PT. Holicindo Dasa Anugerah telah berdiri sebagai pemasar mesin makanan industri di Indonesia sejak tahun 2001. Perusahaan kami menyediakan berbagai macam mesin makanan, mulai dari sistem pendinginan, peralatan memanggang hingga etalase showcase untuk makanan.',
    paragraph2: 'Sebagai produsen spesialisasi pembuatan khusus kami dapat memanajemen harga etalase showcase untuk makanan. Sebagai produsen spesialisasi pendingin, kami telah merebut kepercayaan konsumen. Perusahaan kami menyediakan pengiriman, pemasangan produk yang disediakan akurat juga, kami juga memahami harga sales service semua produk kami di seluruh Indonesia.',
    warehouseSlides: [
      '/images/about/warehouse-slide-01.jpg',
      '/images/about/warehouse-slide-02.jpg',
      '/images/about/warehouse-slide-03.jpg',
      '/images/about/warehouse-slide-04.jpg',
    ],
  },
  vision: {
    badge: 'VISI',
    title: {
      line1: 'Lebih dari sekadar',
      line2: 'distributor mesin',
      line3: 'pendingin komersial.',
    },
    description1: 'Holicindo menghadirkan solusi display kustom yang membantu brand makanan mempresentasikan, menjaga, dan menjual produk mereka dengan lebih baik.',
    description2: 'Di setiap proyek, Holicindo memadukan desain, manufaktur, instalasi, dan dukungan purna jual untuk menciptakan sistem display yang dibangun sesuai produk, ruang, dan kebutuhan bisnis setiap pelanggan.',
    tagline: 'Menciptakan Pengalaman Display Makanan Terbaik',
  },
  customization: {
    badge: 'Kustomisasi',
    title: 'Layanan Kustomisasi Premium',
    description: 'Berbekal pengalaman lebih dari 20 tahun, kami menghadirkan layanan pembuatan showcase pendingin kustom dengan spesifikasi yang dirancang khusus untuk memaksimalkan potensi bisnis Anda.',
    showcaseImage: '/images/about/showcase-hitam-bg3.png',
    features: [
      {
        title: 'Dimensi',
        description: 'Fleksibilitas untuk mengatur panjang, lebar, dan tinggi mesin secara presisi mengikuti kapasitas ruang komersial Anda.',
      },
      {
        title: 'Bentuk',
        description: 'Bentuk dan lekukan yang dirancang khusus agar menyatu sempurna dengan tata letak serta desain interior toko Anda.',
      },
      {
        title: 'Warna',
        description: 'Pilihan warna yang beragam untuk mendukung estetika dan memperkuat identitas visual (branding) bisnis Anda.',
      },
      {
        title: 'Material',
        description: 'Pemilihan material grade industri berkualitas tinggi yang dapat disesuaikan dengan standar operasional dan keawetan produk.',
      },
      {
        title: 'Fungsi',
        description: 'Sistem pengaturan suhu dan tingkat kelembapan yang dikustomisasi spesifik untuk menjaga kualitas serta kesegaran optimal produk Anda.',
      },
    ],
  },
};

const layananSections = {
  hero: {
    badge: 'LAYANAN PURNA JUAL',
    title: 'Dukungan Teknis & Servis Mesin Komersial',
    description: 'Kami memastikan peralatan dapur industrial Anda selalu beroperasi maksimal. Nikmati dukungan teknis terpadu, perawatan mesin berkala, dan jaminan purna jual eksklusif dari tim ahli Holicindo.',
    slides: [
      '/images/services/hero-services.png',
      '/images/services/hero-services-2.png',
      '/images/services/hero-services-3.png',
    ],
  },
  services: {
    title: 'Layanan Teknis Profesional',
    description: 'Tim teknisi berpengalaman kami siap memberikan solusi menyeluruh, mulai dari instalasi awal hingga perbaikan darurat untuk memastikan produktivitas dapur komersial Anda tidak terhambat.',
    items: [
      {
        title: 'Instalasi & Pelatihan',
        description: 'Instalasi unit mesin secara presisi sesuai standar pabrik. Kami juga memberikan pelatihan operasional dasar bagi staf Anda untuk meminimalisir kesalahan penggunaan (human error).',
      },
      {
        title: 'Garansi & Suku Cadang',
        description: 'Ketenangan pikiran dengan garansi resmi. Kami menjamin ketersediaan suku cadang asli (original spare parts) untuk penggantian komponen secara cepat dan akurat.',
      },
      {
        title: 'Maintenance & Perbaikan',
        description: 'Layanan perbaikan darurat dan perawatan berkala (preventive maintenance) untuk menjaga performa mesin tetap di kondisi puncak dan memperpanjang usia pakai aset Anda.',
      },
    ],
  },
  smartEcosystem: {
    badge: 'Eksklusif Untuk Klien B2B',
    title: 'Layanan Khusus untuk Customer',
    description: 'Fasilitas premium khusus untuk klien korporasi kami. Nikmati ketenangan pikiran dengan sistem pemantauan aset digital yang dirancang eksklusif untuk menjaga investasi bisnis Anda tetap terpantau dengan standar tertinggi.',
    showcaseImage: '/uploads/1789194555673-571623.png',
    features: [
      {
        title: 'Service Prioritas',
        description: 'Showcase bermasalah? WhatsApp kami dan teknisi langsung datang. Tidak perlu nunggu lama.',
      },
      {
        title: 'Pantau Semua Unit di Semua Outlet',
        description: 'Lihat status semua chiller di semua cabang Anda dari HP. Tahu suhu showcase normal atau tidak, meski Anda lagi di luar kota.',
      },
      {
        title: 'Garansi & Service History Digital',
        description: 'Kapan terakhir service? Garansi masih berlaku? Semua tercatat rapi. Anda tinggal cek online, tidak perlu cari-cari nota lagi.',
      },
    ],
    contactLink: 'https://wa.me/6281111825718',
  },
};

const katalogSections = {
  hero: {
    badge: 'KATALOG & ADVISOR PERALATAN 2026',
    title: 'Temukan Unit Pendingin Tepat untuk Kebutuhan Bisnis Anda.',
    description: 'Pilih sektor usaha, prioritas operasional, dan kapasitas outlet Anda. Sistem rekomendasi kami akan menampilkan pilihan unit commercial display & refrigeration paling ideal.',
  },
  sectors: [
    { id: 'bakery', label: 'Bakery & Pastry', sub: 'Cake, roti & artisan pastry' },
    { id: 'cafe', label: 'Coffee Shop & Beverage', sub: 'Specialty cafe, bar & lounge' },
    { id: 'supermarket', label: 'Supermarket & Food Service', sub: 'Retail swalayan, resto & hotel' },
  ],
  priorities: [
    { id: 'display', label: 'Display & Estetika Visual', desc: 'Showcase kaca bening anti-embun untuk display produk', cat: 'Showcase' },
    { id: 'storage', label: 'Penyimpanan Dapur (Storage)', desc: 'Chiller / freezer SUS304 tangguh untuk stok bahan baku', cat: 'Refrigerator' },
    { id: 'ice', label: 'Produksi Es Otomatis', desc: 'Mesin es higienis kristal kubus / flake continue', cat: 'Ice Maker' },
    { id: 'bar', label: 'Bar Counter & Station', desc: 'Undercounter modular untuk workstation barista/bartender', cat: 'Bar System' },
  ],
  scales: [
    { id: 'compact', label: 'Outlet Compact', desc: '1 - 2 Meter Counter' },
    { id: 'medium', label: 'Kapasitas Sedang', desc: 'Operasional Harian Aktif' },
    { id: 'high', label: 'Kapasitas Besar / Chain', desc: 'High Volume Continuous' },
  ],
  recommendations: {
    'ice-compact': {
      categoryTitle: 'Ice Maker Series',
      categorySlug: 'icemaker',
      unitName: 'Commercial Compact Ice Maker 35-50 kg',
      unitModel: 'Model: AC-80X Compact Series',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/AC80X.png',
      tag: 'Kapasitas Compact (Outlet Kecil)',
      temp: '-2°C ~ 0°C Output Es',
      highlightSpecs: [
        'Produksi harian 35 - 50 kg/24 jam, hemat daya & space',
        'Bin penyimpanan es terintegrasi (kapasitas 15-20 kg)',
        'Siklus pembekuan cepat & auto-cleaning higienis'
      ],
      description: 'Sangat ideal untuk coffee shop compact, booth minuman, dan cafe dengan kebutuhan es harian ringan.',
      sampleProductsCount: '37+ Unit Model Tersedia'
    },
    'ice-medium': {
      categoryTitle: 'Ice Maker Series',
      categorySlug: 'icemaker',
      unitName: 'Commercial Modular Ice Maker 80-120 kg',
      unitModel: 'Model: AP-0.6 Ice Maker Series',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/12/Ap-0.6-Ice-maker.png',
      tag: 'Kapasitas Sedang (Resto & Coffee Shop)',
      temp: '-2°C ~ 0°C Output Es Kristal',
      highlightSpecs: [
        'Produksi es 80 - 120 kg/24 jam untuk pesanan tinggi',
        'Evaporator Food-Grade SUS304 anti-karat & higienis',
        'Alarm sensor otomatis bila air habis atau bin penuh'
      ],
      description: 'Pilihan standar untuk restoran, cafe aktif, dan bar dengan aliran pesanan minuman dingin terus-menerus.',
      sampleProductsCount: '37+ Unit Model Tersedia'
    },
    'ice-high': {
      categoryTitle: 'Ice Maker Series',
      categorySlug: 'icemaker',
      unitName: 'Industrial Scale / Flake Ice Machine 600 kg',
      unitModel: 'Model: Industrial Ice Flake SUS304 (600kg/24h)',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/12/Ap-0.6-Ice-maker.png',
      tag: 'Kapasitas Besar / Chain (Heavy Duty)',
      temp: '-3°C ~ 0°C High Output',
      highlightSpecs: [
        'Kapasitas masif 600 kg / 24 jam produksi non-stop',
        'Heavy-duty kompresor industri untuk operasional 24 jam',
        'Cocok untuk central kitchen, supermarket segar, & hotel'
      ],
      description: 'Mesin es kapasitas ekstra besar untuk menyuplai cabang usaha, display seafood supermarket, atau hotel.',
      sampleProductsCount: '37+ Unit Model Tersedia'
    },
    'bar-compact': {
      categoryTitle: 'Bar Counter & Beverage Equipment',
      categorySlug: 'machinery',
      unitName: 'Commercial Undercounter Chiller 1.2M - 2 Door',
      unitModel: 'Model: UC-1200 Worktop Chiller',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/refrigerator-undercounter-2door.png',
      tag: 'Worktop Compact Barista Counter',
      temp: '+2°C ~ +8°C Chiller Counter',
      highlightSpecs: [
        'Top table stainless tebal bisa jadi meja racik barista',
        'Sistem hembusan dingin merata, minuman selalu segar',
        'Kapasitas 2 pintas ringkas hemat ruang outlet'
      ],
      description: 'Solusi all-in-one meja kerja dan pendingin minuman/susu di bawah bar area outlet Anda.',
      sampleProductsCount: '48+ Unit Bar Equipment'
    },
    'bar-medium': {
      categoryTitle: 'Bar Counter & Beverage Equipment',
      categorySlug: 'machinery',
      unitName: 'Commercial Undercounter Chiller 1.8M - 3 Door',
      unitModel: 'Model: UC-1800 Worktop Chiller Heavy Duty',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/refrigerator-undercounter-3door.png',
      tag: 'Station Barista & Bartender Standar',
      temp: '+1°C ~ +6°C High Precision',
      highlightSpecs: [
        'Panjang 1.8 meter muat 3 kompartemen pendingin besar',
        'Top stainless SUS304 food-grade kokoh anti getaran',
        'Digital controller dengan defrost otomatis tanpa embun'
      ],
      description: 'Meja bar workstation luas untuk operasional cafe aktif, bar lounge, dan restoran cepat saji.',
      sampleProductsCount: '48+ Unit Bar Equipment'
    },
    'bar-high': {
      categoryTitle: 'Bar Counter & Beverage Equipment',
      categorySlug: 'machinery',
      unitName: 'Dual-Temp Undercounter + Glass Door Showcase Bar',
      unitModel: 'Model: UCB-Glass Series High Output',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/refrigerator-undercounter-glass.png',
      tag: 'Professional High-End Bar & Beverage Chain',
      temp: '-2°C ~ +8°C Dual Zone',
      highlightSpecs: [
        'Pintu kaca ganti display botol minuman berlampu LED warm',
        'Kombinasi chiller & freezer terintegrasi di 1 frame bar',
        'Kompresor Embraco Eropa dingin stabil dan silent'
      ],
      description: 'Pendingin bar showcase kaca transparan untuk visual botol minuman premium sekaligus penyimpanan bahan segar.',
      sampleProductsCount: '48+ Unit Bar Equipment'
    },
    'display-bakery-compact': {
      categoryTitle: 'Showcase Cake & Pastry',
      categorySlug: 'showcase',
      unitName: 'Curve Glass Cake Showcase 0.9M - Tabletop',
      unitModel: 'Model: RTW-100L Tabletop Showcase',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/cake-showcase-curved.png',
      tag: 'Kue & Pastry Compact Counter',
      temp: '+2°C ~ +8°C Humidified Chiller',
      highlightSpecs: [
        'Kaca lengkung elegan anti-embun 4 sisi visual 360°',
        'LED warm light menonjolkan tekstur cake & pastry',
        'Tingkat kelembapan pas, kue tidak cepat kering'
      ],
      description: 'Showcase compact meja kasir ideal untuk toko roti artisan, cafe mini, dan counter pastry hotel.',
      sampleProductsCount: '57+ Unit Showcase'
    },
    'display-bakery-medium': {
      categoryTitle: 'Showcase Cake & Pastry',
      categorySlug: 'showcase',
      unitName: 'Square Glass Cake Showcase 1.2M - 4 Tier Floor Standing',
      unitModel: 'Model: F-1200S Modern Square Showcase',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/cake-showcase-square.png',
      tag: 'Showcase Standar Bakery & Cake Shop',
      temp: '+2°C ~ +6°C Anti-Fog Heated Glass',
      highlightSpecs: [
        'Desain kotak minimalis modern sudut tajam elegan',
        'Heated glass depan samping bebas kabur di ruangan AC',
        'Rak kaca tempered 3 tingkat dapat diatur ketinggiannya'
      ],
      description: 'Model paling populer untuk display cake utuh, tart ulang tahun, dan whole pastry modern berkelas.',
      sampleProductsCount: '57+ Unit Showcase'
    },
    'display-bakery-high': {
      categoryTitle: 'Showcase Cake & Pastry',
      categorySlug: 'showcase',
      unitName: 'Premium Square Glass Cake Showcase 1.8M - 4 Tier Floor Standing',
      unitModel: 'Model: F-1800S Grand Pastry Showcase',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/cake-showcase-1800.png',
      tag: 'Kapasitas Ekstra Besar Display Toko Roti',
      temp: '+2°C ~ +6°C Multi-Airflow System',
      highlightSpecs: [
        'Kapasitas pajang ekstra masif hingga 45+ piring cake',
        'Pencahayaan LED setiap tingkat rak tanpa bayangan gelap',
        'Digital micro-computer thermostat akurasi tinggi'
      ],
      description: 'Pilihan utama flagship outlet bakery dan supermarket premium untuk display koleksi cake lengkap.',
      sampleProductsCount: '57+ Unit Showcase'
    },
    'display-cafe-compact': {
      categoryTitle: 'Showcase Minuman & Grab-and-Go',
      categorySlug: 'showcase',
      unitName: 'Slim Upright Beverage Cooler 1-Door 350L',
      unitModel: 'Model: SC-350 Upright Glass Cooler',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/1790838553730-326408.png',
      tag: 'Grab & Go Cold Drink Showcase',
      temp: '0°C ~ +10°C Fast Pull-down',
      highlightSpecs: [
        'Bodi ramping 60 cm pas ditaruh di samping meja kasir',
        'Pintu kaca dobel insulated low-E hemat listrik',
        'Kapasitas tampung 200+ kaleng/botol minuman dingin'
      ],
      description: 'Showcase minuman botol dan can drink esensial di dekat area antrean kasir coffee shop.',
      sampleProductsCount: '57+ Unit Showcase'
    },
    'display-cafe-medium': {
      categoryTitle: 'Showcase Minuman & Grab-and-Go',
      categorySlug: 'showcase',
      unitName: 'Double Door Upright Beverage Showcase 800L',
      unitModel: 'Model: SC-800 2-Glass Door Cooler',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/1790837974818-591994.png',
      tag: 'Pusat Display Minuman Dingin',
      temp: '+1°C ~ +8°C Dynamic Cooling',
      highlightSpecs: [
        'Dua pintu kaca swing dengan self-closing otomatis',
        'Canopy lampu atas bisa dipasang branding logo outlet',
        'Sirkulasi fan blower cepat mendinginkan minuman baru'
      ],
      description: 'Kapasitas medium untuk cafe dengan variasi menuRTD (ready-to-drink), kombucha, dan susu segar.',
      sampleProductsCount: '57+ Unit Showcase'
    },
    'display-cafe-high': {
      categoryTitle: 'Showcase Open Chiller / Multideck',
      categorySlug: 'showcase',
      unitName: 'Open Front Multideck Chiller 1.5M (Self-Service)',
      unitModel: 'Model: MD-1500 Open Grab & Go',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/1791190052150-931306.png',
      tag: 'Self-Service Grab & Go Modern Cafe',
      temp: '+2°C ~ +7°C Air Curtain Tech',
      highlightSpecs: [
        'Tirai tirai udara (air curtain) tanpa pintu pelanggan langsung ambil',
        'Night blind hemat energi saat malam/tutup toko',
        'Tingkatkan impulsive buying hingga 40% di jam ramai'
      ],
      description: 'Konsep display terbuka modern untuk sandwich, salad bowl, dan cold brew siap bawa pulang.',
      sampleProductsCount: '57+ Unit Showcase'
    },
    'display-supermarket-compact': {
      categoryTitle: 'Open Multideck Chiller',
      categorySlug: 'showcase',
      unitName: 'Compact Multideck Open Display 1.2M',
      unitModel: 'Model: MD-1200 Mini Market Series',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/1791190052150-931306.png',
      tag: 'Retail Fresh Produce & Dairy',
      temp: '+2°C ~ +6°C Even Cooling',
      highlightSpecs: [
        'Tingkat rak miring display buah/sayur/dairy lebih jelas',
        'Sistem drainage otomatis anti becek di lantai toko',
        'Roda castor heavy duty mudah dipindah saat layout ditata'
      ],
      description: 'Ideal untuk minimarket modern, toko buah segar, dan display produk susu/yogurt.',
      sampleProductsCount: '57+ Unit Showcase'
    },
    'display-supermarket-medium': {
      categoryTitle: 'Commercial Island Freezer / Multideck',
      categorySlug: 'showcase',
      unitName: 'Curved Glass Island Deep Freezer 2.0M',
      unitModel: 'Model: IF-2000 Island Freezer Supermarket',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/1791184480687-400441.png',
      tag: 'Frozen Food Display Swalayan',
      temp: '-18°C ~ -22°C Deep Freeze',
      highlightSpecs: [
        'Tutup kaca sliding lengkung dengan pemanas anti kabur',
        'Kapasitas volume 900+ liter untuk nugget/daging/es krim',
        'Dapat digabung pulau berjejer (island block layout)'
      ],
      description: 'Pusat freezer display frozen food di lorong utama swalayan dan retail daging beku.',
      sampleProductsCount: '57+ Unit Showcase'
    },
    'display-supermarket-high': {
      categoryTitle: 'Commercial Island Freezer / Multideck',
      categorySlug: 'showcase',
      unitName: 'Continuous Island Multideck Remote System 2.5M+',
      unitModel: 'Model: Supermarket Line Up Commercial System',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/1791184480687-400441.png',
      tag: 'Hypermarket & Supermarket Chain Central Line',
      temp: '-2°C ~ +4°C / -20°C Dual Config',
      highlightSpecs: [
        'Dapat dirangkai memanjang tanpa sekat hingga puluhan meter',
        'Mendukung kompresor remote di luar gedung minim bising & panas',
        'Standar industri retail modern untuk daging, dairy & sayur'
      ],
      description: 'Sistem display komersial skala besar untuk jaringan hypermarket dan supermarket nasional.',
      sampleProductsCount: '57+ Unit Showcase'
    },
    'storage-bakery-compact': {
      categoryTitle: 'Kitchen Storage Refrigerator',
      categorySlug: 'refrigerator',
      unitName: 'Commercial Upright Chiller 2-Solid Door 500L',
      unitModel: 'Model: UR-500 Solid Door Stainless Chiller',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/SRWP-70.png',
      tag: 'Penyimpanan Bahan Baku Pastry Kitchen',
      temp: '-2°C ~ +8°C Fan Cooling',
      highlightSpecs: [
        'Bahan stainless SUS304 tebal higienis standar BPOM/HACCP',
        'Kompatibel dengan loyang bakery standar ukuran 40x60 cm',
        'Pintu solid tebal menjaga dingin maksimal walau sering dibuka'
      ],
      description: 'Menjaga stok butter, ragi, cream cheese, dan adonan pada suhu stabil tanpa kontaminasi aroma.',
      sampleProductsCount: '56+ Unit Refrigerator'
    },
    'storage-bakery-medium': {
      categoryTitle: 'Kitchen Storage Refrigerator',
      categorySlug: 'refrigerator',
      unitName: 'Commercial Upright Combo Chiller & Freezer 4-Door 1000L',
      unitModel: 'Model: URF-1000 4-Door Dual Temperature',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/SRWP-140.png',
      tag: 'Kapasitas Standar Kitchen Bakery',
      temp: 'Chiller +2°C ~ +8°C & Freezer -15°C ~ -20°C',
      highlightSpecs: [
        'Satu unit punya 2 ruang terpisah: chiller atas & freezer bawah',
        'Dua kompresor independen, performa tidak saling mengganggu',
        'Hemat listrik dan space dapur produksi'
      ],
      description: 'Pilihan paling efisien untuk menyimpan bahan beku dan bahan dingin di satu lemari pendingin.',
      sampleProductsCount: '56+ Unit Refrigerator'
    },
    'storage-bakery-high': {
      categoryTitle: 'Industrial Blast Freezer / Storage',
      categorySlug: 'refrigerator',
      unitName: 'Industrial Blast Freezer 10-15 Tray SUS304',
      unitModel: 'Model: BF-10T Quick Freezing Chamber',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/CB-70.png',
      tag: 'Pembekuan Cepat Adonan & Croissant',
      temp: '-35°C ~ -40°C Ultra Fast Freezing',
      highlightSpecs: [
        'Membekukan adonan dari suhu ruang ke -18°C dalam 90 menit',
        'Mencegah kristal es besar merusak serat tekstur croissant',
        'Sangat penting untuk central kitchen produksi massal roti'
      ],
      description: 'Mesin pembekuan cepat untuk mempertahankan kualitas adonan frozen dough dan pastry artisan.',
      sampleProductsCount: '56+ Unit Refrigerator'
    },
    'storage-cafe-compact': {
      categoryTitle: 'Kitchen Storage Refrigerator',
      categorySlug: 'refrigerator',
      unitName: 'Commercial Undercounter Solid Chiller 1.2M',
      unitModel: 'Model: UC-1200S Stainless Storage Counter',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/LREP-120-1.png',
      tag: 'Penyimpanan Susu & Simple Syrup Dapur Cafe',
      temp: '+1°C ~ +6°C Food Safety Standard',
      highlightSpecs: [
        'Muat puluhan liter susu fresh milk di bawah counter',
        'Rak kokoh menahan beban berat galon susu atau sirup',
        'Insulasi busa cyclopentane ramah lingkungan hemat listrik'
      ],
      description: 'Simpan stok susu segar dan saus di dekat mesin espresso tanpa repot bolak-balik ke gudang.',
      sampleProductsCount: '56+ Unit Refrigerator'
    },
    'storage-cafe-medium': {
      categoryTitle: 'Kitchen Storage Refrigerator',
      categorySlug: 'refrigerator',
      unitName: 'Commercial Upright Chiller 2-Solid Door 1000L',
      unitModel: 'Model: UR-1000 2-Door Big Volume Kitchen Chiller',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/SRWP-70.png',
      tag: 'Kapasitas Kitchen Cafe Aktif & Resto',
      temp: '+1°C ~ +8°C Uniform Cold',
      highlightSpecs: [
        'Kapasitas 1000 liter untuk bahan saus, pasta, sayur, & daging',
        'Sistem pendingin no-frost tanpa bunga es tebal',
        'Kaki adjustable kokoh memudahkan pembersihan kolong dapur'
      ],
      description: 'Standar chiller penyimpanan dapur cafe dengan menu makanan hangat yang variatif.',
      sampleProductsCount: '56+ Unit Refrigerator'
    },
    'storage-cafe-high': {
      categoryTitle: 'Kitchen Storage Refrigerator',
      categorySlug: 'refrigerator',
      unitName: 'Upright 6-Door Chiller & Freezer Kitchen Station',
      unitModel: 'Model: URF-6D Grand Kitchen Station',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/CT-SEP-180.png',
      tag: 'Multi-Compartment Chain Cafe Kitchen',
      temp: 'Zona Chiller & Freezer 6 Pintu Terpisah',
      highlightSpecs: [
        '6 pintu terpisah meminimalkan kehilangan udara dingin saat buka',
        'Kapasitas masif 1600+ liter untuk operasional volume tinggi',
        'Material SUS304 tahan asam, garam, dan lingkungan dapur lembap'
      ],
      description: 'Stasiun pendingin dapur utama untuk cafe chain, restoran waralaba, dan kitchen hotel.',
      sampleProductsCount: '56+ Unit Refrigerator'
    },
    'storage-supermarket-compact': {
      categoryTitle: 'Kitchen Storage Refrigerator',
      categorySlug: 'refrigerator',
      unitName: 'Commercial Upright Deep Freezer 2-Door 1000L',
      unitModel: 'Model: UF-1000 Commercial Deep Freezer',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/CT-SEP-70.png',
      tag: 'Gudang Stok Daging & Ikan Beku',
      temp: '-18°C ~ -22°C Deep Freeze',
      highlightSpecs: [
        'Pendinginan stabil untuk stok daging, seafood, & es krim',
        'Defrost cycle otomatis dengan elemen pemanas efisien',
        'Kunci pintu master-key untuk keamanan stok bernilai tinggi'
      ],
      description: 'Penyimpanan beku cadangan di gudang belakang toko swalayan atau restoran.',
      sampleProductsCount: '56+ Unit Refrigerator'
    },
    'storage-supermarket-medium': {
      categoryTitle: 'Commercial Upright Refrigerator',
      categorySlug: 'refrigerator',
      unitName: 'Commercial 4-Solid Door Freezer Heavy Duty 1200L',
      unitModel: 'Model: UF-1200-4D Industrial Grade Storage',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/CT-SEP-120.png',
      tag: 'Stok Cadangan Harian Supermarket',
      temp: '-18°C ~ -25°C Ultra Heavy Duty',
      highlightSpecs: [
        'Kompresor ganda dengan kipas condenser ekstra bertenaga',
        'Ketahanan tinggi untuk frekuensi buka-tutup ratusan kali/hari',
        'Lapisan insulasi tebal hingga 70 mm tahan panas ruangan luar'
      ],
      description: 'Didesain untuk operasional intensif bongkar muat stok bahan makanan beku.',
      sampleProductsCount: '56+ Unit Refrigerator'
    },
    'storage-supermarket-high': {
      categoryTitle: 'Cold Storage Walk-in Room',
      categorySlug: 'refrigerator',
      unitName: 'Walk-In Cold Storage & Freezer Room (Custom Built)',
      unitModel: 'Model: Walk-in Cold Room Industrial PU Panel 100mm',
      unitImage: 'https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/2021/11/CT-SEP-180.png',
      tag: 'Cold Storage Gudang Pusat (Walk-in)',
      temp: '-25°C ~ +5°C Sesuai Kebutuhan',
      highlightSpecs: [
        'Kapasitas tonase besar dapat dimasuki troli & palet barang',
        'Panel poliuretan high density 100-150mm cam-lock anti bocor suhu',
        'Unit condensing Bitzer / Danfoss Eropa daya tahan puluhan tahun'
      ],
      description: 'Solusi cold storage permanen untuk gudang distribusi, supermarket besar, dan food processing plant.',
      sampleProductsCount: '56+ Unit Refrigerator'
    }
  }
};

async function seed() {
  try {
    console.log('🌱 Initializing database connection...');
    await AppDataSource.initialize();
    console.log('✅ Database connected successfully');

    const pageRepo = AppDataSource.getRepository(Page);

    const force = process.argv.includes('--force');
    if (force) {
      console.log('⚠️  RUNNING WITH --force: Existing page content will be overwritten with default seed data!');
    } else {
      console.log('🛡️  SAFE MODE: Existing page content will be PRESERVED (pass --force to overwrite)');
    }

    // Seed Beranda
    console.log('\n📄 Seeding Beranda page...');
    let beranda = await pageRepo.findOne({ where: { slug: 'beranda' } });
    if (beranda && !force) {
      console.log('ℹ️  Beranda page already exists — preserving existing CMS content');
    } else if (beranda && force) {
      beranda.sections = berandaSections;
      await pageRepo.save(beranda);
      console.log('⚠️  Beranda page forcefully updated with seed data');
    } else {
      beranda = pageRepo.create({
        slug: 'beranda',
        title: 'Beranda',
        sections: berandaSections,
        status: 'published',
        metadata: {
          seoTitle: 'Showcase Komersial Terbaik Indonesia | Holicindo',
          seoDescription: 'Spesialis showcase & pendingin komersial sejak 2001. Solusi display berkualitas premium untuk bisnis F&B, retail, dan farmasi di seluruh Indonesia.',
          seoKeywords: 'showcase komersial, kulkas display, pendingin komersial, display cooler, cake showcase, chiller komersial, blast freezer',
          ogImage: '/images/og-beranda.jpg',
        },
      });
      await pageRepo.save(beranda);
      console.log('✅ Beranda page created');
    }

    // Seed Tentang Kami
    console.log('\n📄 Seeding Tentang Kami page...');
    let tentangKami = await pageRepo.findOne({ where: { slug: 'tentang-kami' } });
    if (tentangKami && !force) {
      console.log('ℹ️  Tentang Kami page already exists — preserving existing CMS content');
    } else if (tentangKami && force) {
      tentangKami.sections = tentangKamiSections;
      await pageRepo.save(tentangKami);
      console.log('⚠️  Tentang Kami page forcefully updated with seed data');
    } else {
      tentangKami = pageRepo.create({
        slug: 'tentang-kami',
        title: 'Tentang Kami',
        sections: tentangKamiSections,
        status: 'published',
        metadata: {
          seoTitle: 'Tentang Kami - Holicindo | Est. 2001',
          seoDescription: 'Kenali lebih dekat Holicindo, spesialis showcase & pendingin komersial sejak 2001. Visi, misi, dan komitmen kami untuk industri Indonesia.',
          seoKeywords: 'tentang holicindo, sejarah perusahaan, visi misi, showcase manufacturer, profil perusahaan',
          ogImage: '/images/og-tentang-kami.jpg',
        },
      });
      await pageRepo.save(tentangKami);
      console.log('✅ Tentang Kami page created');
    }

    // Seed Layanan
    console.log('\n📄 Seeding Layanan page...');
    let layanan = await pageRepo.findOne({ where: { slug: 'layanan' } });
    if (layanan && !force) {
      console.log('ℹ️  Layanan page already exists — preserving existing CMS content');
    } else if (layanan && force) {
      layanan.sections = layananSections;
      await pageRepo.save(layanan);
      console.log('⚠️  Layanan page forcefully updated with seed data');
    } else {
      layanan = pageRepo.create({
        slug: 'layanan',
        title: 'Layanan',
        sections: layananSections,
        status: 'published',
        metadata: {
          seoTitle: 'Layanan Showcase & Pendingin Komersial | Holicindo',
          seoDescription: 'Desain custom, instalasi, maintenance showcase & pendingin komersial. Solusi lengkap dari Holicindo untuk bisnis F&B, retail, farmasi.',
          seoKeywords: 'layanan showcase, custom showcase, instalasi pendingin, maintenance cooler, desain display, layanan after sales',
          ogImage: '/images/og-layanan.jpg',
        },
      });
      await pageRepo.save(layanan);
      console.log('✅ Layanan page created');
    }

    // Seed Katalog
    console.log('\n📄 Seeding Katalog page...');
    let katalog = await pageRepo.findOne({ where: { slug: 'katalog' } });
    if (katalog && !force) {
      console.log('ℹ️  Katalog page already exists — preserving existing CMS content');
    } else if (katalog && force) {
      katalog.sections = katalogSections;
      await pageRepo.save(katalog);
      console.log('⚠️  Katalog page forcefully updated with seed data');
    } else {
      katalog = pageRepo.create({
        slug: 'katalog',
        title: 'Katalog & Advisor',
        sections: katalogSections,
        status: 'published',
        metadata: {
          seoTitle: 'Katalog & Advisor Peralatan Pendingin Komersial | Holicindo',
          seoDescription: 'Temukan unit showcase, chiller, freezer, dan ice maker yang ideal untuk bisnis Bakery, Cafe, dan Supermarket Anda.',
          seoKeywords: 'katalog holicindo, equipment advisor, showcase cake, kitchen chiller, ice maker, pendingin komersial',
          ogImage: '/images/og-katalog.jpg',
        },
      });
      await pageRepo.save(katalog);
      console.log('✅ Katalog page created');
    }

    console.log('\n✨ All pages seeded successfully!');
    console.log('📊 Summary:');
    console.log('   - Beranda: ✓');
    console.log('   - Tentang Kami: ✓');
    console.log('   - Layanan: ✓');
    console.log('   - Katalog: ✓');

  } catch (error) {
    console.error('❌ Error seeding pages:', error);
    throw error;
  } finally {
    await AppDataSource.destroy();
    console.log('\n🔌 Database connection closed');
  }
}

seed()
  .then(() => {
    console.log('\n✅ Seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  });
