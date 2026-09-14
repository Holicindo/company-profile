/**
 * Import ALL Insights Articles from Frontend Data File
 * Reads directly from frontend/src/data/insights-articles.ts
 * Run: npm run seed:insights
 */
import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { BlogPost, PostStatus } from '../modules/blog/entities/blog-post.entity';

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

async function readInsightsFromFrontend() {
  const frontendDataPath = path.resolve(__dirname, '../../../frontend/src/data/insights-articles.ts');
  
  if (!fs.existsSync(frontendDataPath)) {
    console.log('⚠️  Frontend insights file not found at:', frontendDataPath);
    return [];
  }

  // Read and parse the TypeScript file
  const fileContent = fs.readFileSync(frontendDataPath, 'utf-8');
  
  // Extract the array content using regex
  const match = fileContent.match(/export const INSIGHTS_ARTICLES[^=]*=\s*(\[[\s\S]*\]);/);
  if (!match) {
    console.log('⚠️  Could not parse INSIGHTS_ARTICLES from file');
    return [];
  }

  // Convert TypeScript to JSON-compatible format
  let arrayContent = match[1];
  
  // Remove template literals and convert to regular strings
  arrayContent = arrayContent.replace(/`([^`]*)`/g, (_, content) => {
    // Escape quotes and newlines in template literal content
    return '"' + content.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  });
  
  // Remove trailing commas before closing brackets/braces
  arrayContent = arrayContent.replace(/,(\s*[}\]])/g, '$1');
  
  // Parse as JSON
  try {
    const articles = eval('(' + arrayContent + ')');
    return articles;
  } catch (err: any) {
    console.log('⚠️  Error parsing articles:', err.message);
    return [];
  }
}

async function main() {
  console.log('\n🌱 Seeding ALL Insights Articles from Frontend\n');
  await ds.initialize();
  console.log('🗄️  Database connected\n');

  const articles = await readInsightsFromFrontend();
  console.log(`📄 Found ${articles.length} articles in frontend data\n`);

  if (articles.length === 0) {
    console.log('❌ No articles to import\n');
    await ds.destroy();
    return;
  }

  const blogRepo = ds.getRepository(BlogPost);
  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const article of articles) {
    try {
      // Check if already exists by slug
      const existing = await blogRepo.findOne({ where: { slug: article.slug } });
      if (existing) {
        console.log(`⏭️  Skipped (exists): ${article.title}`);
        skipped++;
        continue;
      }

      await blogRepo.save(blogRepo.create({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt || '',
        content: article.content || '',
        featuredImage: article.featuredImage || null,
        author: article.author || 'Holic',
        status: article.status === 'PUBLISHED' ? PostStatus.PUBLISHED : PostStatus.DRAFT,
        publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date(),
        tags: article.category ? [article.category] : [],
        views: Math.floor(Math.random() * 1000) + 50, // Random views 50-1050 for SEO tracking
      }));
      
      imported++;
      console.log(`✅ Imported: ${article.title}`);
    } catch (err: any) {
      errors++;
      console.log(`❌ Error: "${article.title}" - ${err.message}`);
    }
  }

  console.log(`\n✅ Seeding complete!`);
  console.log(`   Total found: ${articles.length}`);
  console.log(`   Imported: ${imported}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}\n`);

  await ds.destroy();
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
