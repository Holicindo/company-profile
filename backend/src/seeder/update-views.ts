/**
 * Update views for all blog posts with random values for SEO tracking
 * Run: npm run update:views
 */
import 'reflect-metadata';
import * as path from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { BlogPost } from '../modules/blog/entities/blog-post.entity';

const ds = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'holicindo_web',
  entities: [BlogPost],
  synchronize: true,
  logging: false,
  ssl: process.env.DB_SSL === 'true' || (process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1')
    ? { rejectUnauthorized: false }
    : false,
});

async function main() {
  console.log('\n🔄 Updating blog post views...\n');
  await ds.initialize();
  
  const blogRepo = ds.getRepository(BlogPost);
  const posts = await blogRepo.find();
  
  for (const post of posts) {
    const randomViews = Math.floor(Math.random() * 1000) + 50; // 50-1050
    await blogRepo.update(post.id, { views: randomViews });
    console.log(`✅ ${post.title}: ${randomViews} views`);
  }
  
  console.log(`\n✅ Updated ${posts.length} blog posts\n`);
  await ds.destroy();
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
