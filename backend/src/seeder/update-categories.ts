/**
 * Script untuk update struktur kategori produk:
 * 1. Blast Freezer → digabungkan ke Refrigerator (sebagai sub-kategori atau produknya dipindah)
 * 2. Showcase → diberi sub-kategori: Cold Case, Undercounter, Showcase
 *
 * Run: npm run update:categories
 */
import 'reflect-metadata';
import * as path from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import slugify from 'slugify';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { Product } from '../modules/products/entities/product.entity';
import { ProductCategory } from '../modules/products/entities/product-category.entity';
import { Portfolio } from '../modules/portfolio/entities/portfolio.entity';
import { BlogPost } from '../modules/blog/entities/blog-post.entity';
import { ContactInquiry } from '../modules/contact/entities/contact-inquiry.entity';
import { Admin } from '../modules/auth/entities/admin.entity';

const ds = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'holicindo_web',
  entities: [Product, ProductCategory, Portfolio, BlogPost, ContactInquiry, Admin],
  synchronize: false,
  logging: false,
  ssl: process.env.DB_SSL === 'true' || (process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1')
    ? { rejectUnauthorized: false }
    : false,
});

const slug = (t: string) => slugify(t || 'untitled', { lower: true, strict: true });

async function updateCategories() {
  await ds.initialize();
  const catRepo = ds.getRepository(ProductCategory);
  const prodRepo = ds.getRepository(Product);

  console.log('🔄 Memulai update struktur kategori produk...\n');

  // ─── STEP 1: Cari atau buat kategori "Refrigerator" ───────────────────────
  let refrigeratorCat = await catRepo.findOne({ where: { slug: 'refrigerator' } });
  if (!refrigeratorCat) {
    // Coba beberapa slug umum
    refrigeratorCat = await catRepo.findOne({ where: { slug: 'refrigerators' } });
  }
  if (!refrigeratorCat) {
    refrigeratorCat = await catRepo.findOne({ where: { slug: 'reach-in-refrigerator' } });
  }
  if (!refrigeratorCat) {
    // Buat baru jika tidak ada
    refrigeratorCat = catRepo.create({
      slug: 'refrigerator',
      name: 'Refrigerator',
      description: 'Kulkas dan refrigerator komersial untuk bisnis F&B',
      order: 1,
    });
    refrigeratorCat = await catRepo.save(refrigeratorCat);
    console.log('✅ Kategori "Refrigerator" dibuat baru');
  } else {
    console.log(`✅ Kategori "Refrigerator" ditemukan: ID ${refrigeratorCat.id} (${refrigeratorCat.name})`);
  }

  // ─── STEP 2: Cari kategori "Blast Freezer" dan pindahkan produknya ────────
  const blastFreezerCats = await catRepo.find();
  const blastFreezerLike = blastFreezerCats.filter(c =>
    c.name.toLowerCase().includes('blast') ||
    c.slug.toLowerCase().includes('blast')
  );

  for (const blastCat of blastFreezerLike) {
    console.log(`\n🔍 Ditemukan kategori Blast Freezer: "${blastCat.name}" (ID: ${blastCat.id})`);

    // Pindahkan semua produk dari blast freezer ke refrigerator
    const blastProducts = await prodRepo.find({ where: { categoryId: blastCat.id } });
    console.log(`   → ${blastProducts.length} produk akan dipindah ke Refrigerator`);

    for (const prod of blastProducts) {
      prod.categoryId = refrigeratorCat.id;
      await prodRepo.save(prod);
    }
    console.log(`   ✅ Semua produk Blast Freezer dipindah ke Refrigerator`);

    // Hapus kategori Blast Freezer (sekarang kosong)
    await catRepo.remove(blastCat);
    console.log(`   🗑️  Kategori "${blastCat.name}" dihapus`);
  }

  if (blastFreezerLike.length === 0) {
    console.log('ℹ️  Tidak ada kategori Blast Freezer yang ditemukan');
  }

  // ─── STEP 3: Cari atau buat kategori parent "Showcase" ────────────────────
  let showcaseCat = await catRepo.findOne({ where: { slug: 'showcase' } });
  if (!showcaseCat) {
    showcaseCat = await catRepo.findOne({ where: { slug: 'showcases' } });
  }

  if (!showcaseCat) {
    showcaseCat = catRepo.create({
      slug: 'showcase',
      name: 'Showcase',
      description: 'Display case dan showcase untuk retail dan F&B',
      order: 2,
    });
    showcaseCat = await catRepo.save(showcaseCat);
    console.log('\n✅ Kategori parent "Showcase" dibuat baru');
  } else {
    console.log(`\n✅ Kategori parent "Showcase" ditemukan: ID ${showcaseCat.id} (${showcaseCat.name})`);
  }

  // ─── STEP 4: Buat sub-kategori Showcase jika belum ada ────────────────────
  const showcaseSubCategories = [
    { slug: 'cold-case', name: 'Cold Case', description: 'Open display refrigerator untuk minuman dan produk dingin', order: 1 },
    { slug: 'undercounter', name: 'Undercounter', description: 'Showcase undercounter yang hemat ruang untuk counter bar & kafe', order: 2 },
    { slug: 'showcase', name: 'Showcase', description: 'Showcase display vertikal untuk produk premium dan retail', order: 3 },
  ];

  for (const subData of showcaseSubCategories) {
    let existingSub = await catRepo.findOne({ where: { slug: subData.slug, parentId: showcaseCat.id } });
    if (!existingSub) {
      // Juga cek apakah slug ini sudah ada di level atas
      const topLevel = await catRepo.findOne({ where: { slug: subData.slug } });
      if (topLevel && topLevel.id !== showcaseCat.id) {
        // Update jadi sub-kategori showcase
        topLevel.parentId = showcaseCat.id;
        topLevel.order = subData.order;
        await catRepo.save(topLevel);
        console.log(`✅ "${subData.name}" dijadikan sub-kategori Showcase`);
      } else if (!topLevel) {
        const newSub = catRepo.create({
          slug: subData.slug,
          name: subData.name,
          description: subData.description,
          parentId: showcaseCat.id,
          order: subData.order,
        });
        await catRepo.save(newSub);
        console.log(`✅ Sub-kategori "${subData.name}" dibuat baru di bawah Showcase`);
      }
    } else {
      console.log(`ℹ️  Sub-kategori "${subData.name}" sudah ada di bawah Showcase`);
    }
  }

  // ─── STEP 5: Cek hasil akhir ───────────────────────────────────────────────
  console.log('\n📋 Struktur Kategori Setelah Update:');
  const allCats = await catRepo.find({ order: { order: 'ASC', name: 'ASC' } });
  const roots = allCats.filter(c => c.parentId === null);
  for (const root of roots) {
    const children = allCats.filter(c => c.parentId === root.id);
    console.log(`  📁 ${root.name} (${root.slug}) [ID: ${root.id}]`);
    for (const child of children) {
      const prodCount = await prodRepo.count({ where: { categoryId: child.id } });
      console.log(`     └─ ${child.name} (${child.slug}) — ${prodCount} produk`);
    }
    const rootProdCount = await prodRepo.count({ where: { categoryId: root.id } });
    if (rootProdCount > 0) console.log(`     └─ (${rootProdCount} produk langsung di kategori ini)`);
  }

  await ds.destroy();
  console.log('\n✅ Update kategori selesai!');
}

updateCategories().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
