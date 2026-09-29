import { DataSource } from 'typeorm';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, extname } from 'path';
import * as dotenv from 'dotenv';
import { Product } from '../modules/products/entities/product.entity';
import { ProductCategory } from '../modules/products/entities/product-category.entity';
import { Portfolio } from '../modules/portfolio/entities/portfolio.entity';
import { BlogPost } from '../modules/blog/entities/blog-post.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'holicindo_web',
  entities: [Product, ProductCategory, Portfolio, BlogPost],
  ssl: process.env.DB_SSL === 'true' || (process.env.DB_HOST && process.env.DB_HOST !== 'localhost')
    ? { rejectUnauthorized: false }
    : false,
});

async function migrateToS3() {
  console.log('🚀 Starting migration of local images to S3...\n');

  // Check AWS credentials
  const bucket = process.env.AWS_S3_BUCKET;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || 'ap-southeast-1';

  if (!bucket || !accessKeyId || !secretAccessKey) {
    console.error('❌ AWS credentials not configured in .env file!');
    console.error('Please set: AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION');
    process.exit(1);
  }

  console.log(`✅ AWS S3 configured: ${bucket} (${region})\n`);

  const s3Client = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected\n');

    // Path to local uploads
    const uploadsPath = join(process.cwd(), '..', 'frontend', 'public', 'uploads');
    console.log(`📁 Scanning local uploads folder: ${uploadsPath}\n`);

    let files: string[] = [];
    try {
      files = readdirSync(uploadsPath).filter(f => {
        const fullPath = join(uploadsPath, f);
        return statSync(fullPath).isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(f);
      });
    } catch (err) {
      console.error(`❌ Could not read uploads folder: ${uploadsPath}`);
      console.log('ℹ️  This is normal if no images have been uploaded yet.');
      process.exit(0);
    }

    console.log(`📦 Found ${files.length} image files\n`);

    if (files.length === 0) {
      console.log('ℹ️  No images to migrate. Exiting.');
      process.exit(0);
    }

    // Upload files to S3
    const uploadedUrls: Record<string, string> = {};
    let uploadCount = 0;

    for (const filename of files) {
      try {
        const filePath = join(uploadsPath, filename);
        const fileBuffer = readFileSync(filePath);
        const ext = extname(filename).toLowerCase();
        const mimeTypes: Record<string, string> = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.gif': 'image/gif',
          '.webp': 'image/webp',
        };

        const key = `uploads/${filename}`;
        const command = new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: fileBuffer,
          ContentType: mimeTypes[ext] || 'image/jpeg',
        });

        await s3Client.send(command);
        const s3Url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
        uploadedUrls[`/uploads/${filename}`] = s3Url;
        uploadCount++;
        console.log(`✅ [${uploadCount}/${files.length}] Uploaded: ${filename}`);
      } catch (err) {
        console.error(`❌ Failed to upload ${filename}:`, err);
      }
    }

    console.log(`\n✨ Uploaded ${uploadCount} images to S3\n`);

    // Update database URLs
    console.log('🔄 Updating database records...\n');

    // Update Products
    const productRepo = AppDataSource.getRepository(Product);
    const products = await productRepo.find();
    let productUpdated = 0;

    for (const product of products) {
      let updated = false;

      if (product.imageUrl && uploadedUrls[product.imageUrl]) {
        product.imageUrl = uploadedUrls[product.imageUrl];
        updated = true;
      }

      if (product.galleryUrls && Array.isArray(product.galleryUrls)) {
        product.galleryUrls = product.galleryUrls.map(url =>
          uploadedUrls[url] || url
        );
        updated = true;
      }

      if (updated) {
        await productRepo.save(product);
        productUpdated++;
      }
    }
    console.log(`✅ Updated ${productUpdated} products`);

    // Update Portfolio
    const portfolioRepo = AppDataSource.getRepository(Portfolio);
    const portfolios = await portfolioRepo.find();
    let portfolioUpdated = 0;

    for (const portfolio of portfolios) {
      let updated = false;

      if (portfolio.imageUrl && uploadedUrls[portfolio.imageUrl]) {
        portfolio.imageUrl = uploadedUrls[portfolio.imageUrl];
        updated = true;
      }

      if (portfolio.galleryUrls && Array.isArray(portfolio.galleryUrls)) {
        portfolio.galleryUrls = portfolio.galleryUrls.map(url =>
          uploadedUrls[url] || url
        );
        updated = true;
      }

      if (updated) {
        await portfolioRepo.save(portfolio);
        portfolioUpdated++;
      }
    }
    console.log(`✅ Updated ${portfolioUpdated} portfolios`);

    // Update Blog Posts
    const blogRepo = AppDataSource.getRepository(BlogPost);
    const blogs = await blogRepo.find();
    let blogUpdated = 0;

    for (const blog of blogs) {
      if (blog.featuredImage && uploadedUrls[blog.featuredImage]) {
        blog.featuredImage = uploadedUrls[blog.featuredImage];
        await blogRepo.save(blog);
        blogUpdated++;
      }
    }
    console.log(`✅ Updated ${blogUpdated} blog posts`);

    console.log(`\n🎉 Migration complete!`);
    console.log(`   - Uploaded: ${uploadCount} files`);
    console.log(`   - Updated: ${productUpdated + portfolioUpdated + blogUpdated} database records`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await AppDataSource.destroy();
  }
}

migrateToS3()
  .then(() => {
    console.log('\n✅ All done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Migration error:', err);
    process.exit(1);
  });
