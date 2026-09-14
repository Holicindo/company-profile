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

async function seed() {
  try {
    console.log('🌱 Initializing database connection...');
    await AppDataSource.initialize();
    console.log('✅ Database connected successfully');

    const pageRepo = AppDataSource.getRepository(Page);

    // Seed Beranda
    console.log('\n📄 Seeding Beranda page...');
    let beranda = await pageRepo.findOne({ where: { slug: 'beranda' } });
    if (beranda) {
      beranda.sections = berandaSections;
      await pageRepo.save(beranda);
      console.log('✅ Beranda page updated');
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
    if (tentangKami) {
      tentangKami.sections = tentangKamiSections;
      await pageRepo.save(tentangKami);
      console.log('✅ Tentang Kami page updated');
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
    if (layanan) {
      layanan.sections = layananSections;
      await pageRepo.save(layanan);
      console.log('✅ Layanan page updated');
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

    console.log('\n✨ All pages seeded successfully!');
    console.log('📊 Summary:');
    console.log('   - Beranda: ✓');
    console.log('   - Tentang Kami: ✓');
    console.log('   - Layanan: ✓');

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
