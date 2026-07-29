/**
 * Holicindo Web Seeder
 * Reads products_raw.json, portfolio_raw.json, news_raw.json
 * from D:\Holicindo\ and also parses the WordPress XML.
 *
 * Run: npm run seed
 */
import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import slugify from 'slugify';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { Product } from '../modules/products/entities/product.entity';
import { ProductCategory } from '../modules/products/entities/product-category.entity';
import { Portfolio } from '../modules/portfolio/entities/portfolio.entity';
import { BlogPost, PostStatus } from '../modules/blog/entities/blog-post.entity';
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
  synchronize: true,
  logging: false,
});

const slug = (t: string) => slugify(t || 'untitled', { lower: true, strict: true });

function cdata(v: any): string {
  if (!v) return '';
  if (typeof v === 'string') return v;
  if (Array.isArray(v)) return cdata(v[0]);
  if (v['_']) return v['_'];
  return String(v);
}

async function seedAdmin(repo: any) {
  console.log('👤 Admin...');
  if (!(await repo.findOne({ where: { email: 'admin@holicindo.com' } }))) {
    const a = repo.create({ email: 'admin@holicindo.com', password: 'Holic@2024!', name: 'Admin Holicindo' });
    await repo.save(a);
    console.log('   ✅ admin@holicindo.com / Holic@2024!  ← GANTI SETELAH DEPLOY!');
  } else { console.log('   ℹ️  Admin sudah ada'); }
}

async function seedFromJson(ds: DataSource) {
  const parentDir = path.resolve(__dirname, '../../../../../');
  const holicindoDir = path.resolve(__dirname, '../../../../../../');

  // Try to find the raw JSON files (they live in D:\Holicindo\)
  const dirs = [holicindoDir, parentDir, path.resolve(__dirname, '../../../')];
  let dataDir = '';
  for (const d of dirs) {
    if (fs.existsSync(path.join(d, 'products_raw.json'))) { dataDir = d; break; }
  }

  if (!dataDir) {
    console.log('   ⚠️  Raw JSON files not found, skipping JSON seed');
    return;
  }
  console.log(`📂 Reading JSON data from: ${dataDir}`);

  // Products
  const catRepo = ds.getRepository(ProductCategory);
  const prodRepo = ds.getRepository(Product);
  if (fs.existsSync(path.join(dataDir, 'products_raw.json'))) {
    const products = JSON.parse(fs.readFileSync(path.join(dataDir, 'products_raw.json'), 'utf-8'));
    console.log(`📦 Products: ${products.length} items`);
    for (const p of products) {
      const name = p.name || p.title || 'Untitled';
      const productSlug = p.slug || slug(name);
      if (await prodRepo.findOne({ where: { slug: productSlug } })) continue;

      let categoryId: number | null = null;
      if (p.category || p.categoryName) {
        const catName = p.category || p.categoryName;
        const catSlug = slug(catName);
        let cat = await catRepo.findOne({ where: { slug: catSlug } });
        if (!cat) { cat = await catRepo.save(catRepo.create({ slug: catSlug, name: catName })); }
        categoryId = cat.id;
      }

      await prodRepo.save(prodRepo.create({
        slug: productSlug, name,
        description: p.description || p.content || '',
        shortDescription: p.shortDescription || p.excerpt || '',
        imageUrl: p.imageUrl || p.image || p.thumbnail || null,
        galleryUrls: p.galleryUrls || p.images || null,
        categoryId,
        isFeatured: p.isFeatured || p.featured || false,
        isActive: true,
      }));
    }
    console.log('   ✅ Products seeded');
  }

  // Portfolio
  const portRepo = ds.getRepository(Portfolio);
  if (fs.existsSync(path.join(dataDir, 'portfolio_raw.json'))) {
    const portfolio = JSON.parse(fs.readFileSync(path.join(dataDir, 'portfolio_raw.json'), 'utf-8'));
    console.log(`🏗️  Portfolio: ${portfolio.length} items`);
    for (const p of portfolio) {
      const title = p.title || p.name || 'Untitled';
      const portSlug = p.slug || slug(title);
      if (await portRepo.findOne({ where: { slug: portSlug } })) continue;
      await portRepo.save(portRepo.create({
        slug: portSlug, title,
        description: p.description || p.content || '',
        clientName: p.clientName || p.client || null,
        projectDate: p.projectDate || p.date || null,
        imageUrl: p.imageUrl || p.image || null,
        galleryUrls: p.galleryUrls || p.images || null,
        location: p.location || null,
        isActive: true,
      }));
    }
    console.log('   ✅ Portfolio seeded');
  }

  // News / Blog
  const blogRepo = ds.getRepository(BlogPost);
  if (fs.existsSync(path.join(dataDir, 'news_raw.json'))) {
    const news = JSON.parse(fs.readFileSync(path.join(dataDir, 'news_raw.json'), 'utf-8'));
    console.log(`📝 News: ${news.length} items`);
    for (const n of news) {
      const title = n.title || 'Untitled';
      const postSlug = n.slug || slug(title);
      if (await blogRepo.findOne({ where: { slug: postSlug } })) continue;
      await blogRepo.save(blogRepo.create({
        slug: postSlug, title,
        content: n.content || n.description || '',
        excerpt: n.excerpt || n.shortDescription || null,
        featuredImage: n.featuredImage || n.image || null,
        author: n.author || 'Holicindo',
        status: PostStatus.PUBLISHED,
        publishedAt: n.publishedAt || n.date ? new Date(n.publishedAt || n.date) : new Date(),
        tags: n.tags || [],
      }));
    }
    console.log('   ✅ News seeded');
  }
}

async function seedFromXml(ds: DataSource) {
  // Look for WordPress XML in parent directories
  const searchPaths = [
    path.resolve(__dirname, '../../holic.WordPress.2026-07-27.xml'),
    path.resolve(__dirname, '../../../../../unit-passport-portal/holic.WordPress.2026-07-27.xml'),
  ];
  const xmlPath = searchPaths.find(p => fs.existsSync(p));
  if (!xmlPath) { console.log('   ⚠️  WordPress XML not found, skipping'); return; }

  console.log(`📄 WordPress XML: ${xmlPath}`);
  const xml = fs.readFileSync(xmlPath, 'utf-8');
  const parsed = await new xml2js.Parser({ explicitArray: true }).parseStringPromise(xml);
  const channel = parsed.rss.channel[0];
  const items: any[] = channel.item || [];
  const terms: any[] = channel['wp:term'] || [];
  console.log(`   Found ${items.length} items`);

  const catRepo = ds.getRepository(ProductCategory);
  const prodRepo = ds.getRepository(Product);
  const portRepo = ds.getRepository(Portfolio);
  const blogRepo = ds.getRepository(BlogPost);

  // Categories
  const productCats = terms.filter(t => cdata(t['wp:term_taxonomy']) === 'product_cat');
  const slugToId: Record<string, number> = {};
  const slugToParent: Record<string, string> = {};
  for (const t of productCats) {
    const s = cdata(t['wp:term_slug']);
    const name = cdata(t['wp:term_name']);
    const parent = cdata(t['wp:term_parent']);
    if (parent) slugToParent[s] = parent;
    let cat = await catRepo.findOne({ where: { slug: s } });
    if (!cat) { cat = await catRepo.save(catRepo.create({ slug: s, name })); }
    slugToId[s] = cat.id;
  }
  for (const [s, ps] of Object.entries(slugToParent)) {
    if (slugToId[s] && slugToId[ps]) await catRepo.update(slugToId[s], { parentId: slugToId[ps] });
  }
  console.log(`   ✅ ${productCats.length} categories`);

  // Products
  const productItems = items.filter(i => cdata(i['wp:post_type']) === 'product' && cdata(i['wp:status']) === 'publish');
  let pCount = 0;
  for (const item of productItems) {
    const wpId = parseInt(cdata(item['wp:post_id']));
    if (await prodRepo.findOne({ where: { wpPostId: wpId } })) continue;
    const name = cdata(item['title']);
    const s = cdata(item['wp:post_name']) || slug(name);
    const metas = Array.isArray(item['wp:postmeta']) ? item['wp:postmeta'] : [item['wp:postmeta']].filter(Boolean);
    const thumbMeta = metas.find((m: any) => cdata(m['wp:meta_key']) === '_thumbnail_id');
    let imageUrl: string | null = null;
    if (thumbMeta) {
      const tid = cdata(thumbMeta['wp:meta_value']);
      const att = items.find((i: any) => cdata(i['wp:post_id']) === tid && cdata(i['wp:post_type']) === 'attachment');
      if (att) imageUrl = cdata(att['wp:attachment_url']);
    }
    const cats = Array.isArray(item['category']) ? item['category'] : [];
    const pc = cats.find((c: any) => c?.$ && c.$['domain'] === 'product_cat');
    const catId = pc ? slugToId[pc.$['nicename']] || null : null;
    try {
      await prodRepo.save(prodRepo.create({ slug: s, name, description: cdata(item['content:encoded']), shortDescription: cdata(item['excerpt:encoded']), imageUrl, categoryId: catId, wpPostId: wpId, isActive: true }));
      pCount++;
    } catch { /* duplicate slug */ }
  }
  console.log(`   ✅ ${pCount} products`);

  // Portfolio
  const portItems = items.filter(i => cdata(i['wp:post_type']) === 'portfolio' && cdata(i['wp:status']) === 'publish');
  let portCount = 0;
  for (const item of portItems) {
    const wpId = parseInt(cdata(item['wp:post_id']));
    if (await portRepo.findOne({ where: { wpPostId: wpId } })) continue;
    const title = cdata(item['title']);
    const s = cdata(item['wp:post_name']) || slug(title);
    const metas = Array.isArray(item['wp:postmeta']) ? item['wp:postmeta'] : [item['wp:postmeta']].filter(Boolean);
    const thumbMeta = metas.find((m: any) => cdata(m['wp:meta_key']) === '_thumbnail_id');
    let imageUrl: string | null = null;
    if (thumbMeta) {
      const att = items.find((i: any) => cdata(i['wp:post_id']) === cdata(thumbMeta['wp:meta_value']) && cdata(i['wp:post_type']) === 'attachment');
      if (att) imageUrl = cdata(att['wp:attachment_url']);
    }
    try {
      await portRepo.save(portRepo.create({ slug: s, title, description: cdata(item['content:encoded']), imageUrl, projectDate: cdata(item['wp:post_date'])?.split(' ')[0], wpPostId: wpId, isActive: true }));
      portCount++;
    } catch { /* duplicate */ }
  }
  console.log(`   ✅ ${portCount} portfolio items`);

  // Blog posts
  const blogItems = items.filter(i => cdata(i['wp:post_type']) === 'post' && cdata(i['wp:status']) === 'publish');
  let bCount = 0;
  for (const item of blogItems) {
    const wpId = parseInt(cdata(item['wp:post_id']));
    if (await blogRepo.findOne({ where: { wpPostId: wpId } })) continue;
    const title = cdata(item['title']);
    const s = cdata(item['wp:post_name']) || slug(title);
    try {
      await blogRepo.save(blogRepo.create({ slug: s, title, content: cdata(item['content:encoded']), excerpt: cdata(item['excerpt:encoded']), author: cdata(item['dc:creator']), status: PostStatus.PUBLISHED, publishedAt: new Date(cdata(item['wp:post_date'])), wpPostId: wpId }));
      bCount++;
    } catch { /* duplicate */ }
  }
  console.log(`   ✅ ${bCount} blog posts`);
}

async function main() {
  console.log('\n🌱 Holicindo Web Seeder\n');
  await ds.initialize();
  console.log('🗄️  Database connected\n');

  await seedAdmin(ds.getRepository(Admin));
  await seedFromJson(ds);
  await seedFromXml(ds);

  await ds.destroy();
  console.log('\n✅ Seeding complete!\n');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
