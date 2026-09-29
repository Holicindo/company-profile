import { DataSource } from 'typeorm';
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
  ssl: process.env.DB_SSL === 'true' || (process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1')
    ? { rejectUnauthorized: false }
    : false,
});

async function fixImagePaths() {
  console.log('🔧 Fixing image paths...\n');

  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected\n');

    // Fix Products
    const productRepo = AppDataSource.getRepository(Product);
    const products = await productRepo.find();
    let productFixed = 0;

    for (const product of products) {
      let updated = false;
      
      if (product.imageUrl && product.imageUrl.includes('/api/uploads/')) {
        product.imageUrl = product.imageUrl.replace('/api/uploads/', '/uploads/');
        updated = true;
      }
      
      if (product.galleryUrls && Array.isArray(product.galleryUrls)) {
        product.galleryUrls = product.galleryUrls.map(url =>
          url.includes('/api/uploads/') ? url.replace('/api/uploads/', '/uploads/') : url
        );
        updated = true;
      }
      
      if (updated) {
        await productRepo.save(product);
        productFixed++;
      }
    }
    console.log(`✅ Fixed ${productFixed} products`);

    // Fix Portfolio
    const portfolioRepo = AppDataSource.getRepository(Portfolio);
    const portfolios = await portfolioRepo.find();
    let portfolioFixed = 0;

    for (const portfolio of portfolios) {
      let updated = false;
      
      if (portfolio.imageUrl && portfolio.imageUrl.includes('/api/uploads/')) {
        portfolio.imageUrl = portfolio.imageUrl.replace('/api/uploads/', '/uploads/');
        updated = true;
      }
      
      if (portfolio.galleryUrls && Array.isArray(portfolio.galleryUrls)) {
        portfolio.galleryUrls = portfolio.galleryUrls.map(url =>
          url.includes('/api/uploads/') ? url.replace('/api/uploads/', '/uploads/') : url
        );
        updated = true;
      }
      
      if (updated) {
        await portfolioRepo.save(portfolio);
        portfolioFixed++;
      }
    }
    console.log(`✅ Fixed ${portfolioFixed} portfolios`);

    // Fix Blog Posts
    const blogRepo = AppDataSource.getRepository(BlogPost);
    const blogs = await blogRepo.find();
    let blogFixed = 0;

    for (const blog of blogs) {
      let updated = false;
      
      if (blog.featuredImage && blog.featuredImage.includes('/api/uploads/')) {
        blog.featuredImage = blog.featuredImage.replace('/api/uploads/', '/uploads/');
        updated = true;
      }
      
      if (updated) {
        await blogRepo.save(blog);
        blogFixed++;
      }
    }
    console.log(`✅ Fixed ${blogFixed} blog posts`);

    console.log(`\n✨ Done! Fixed ${productFixed + portfolioFixed + blogFixed} total records`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await AppDataSource.destroy();
  }
}

fixImagePaths()
  .then(() => {
    console.log('\n✅ Image paths fixed successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Failed to fix image paths:', err);
    process.exit(1);
  });
