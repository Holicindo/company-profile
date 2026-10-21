import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

async function seedIndustryCategories() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'holicindo_web',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    ssl: process.env.DB_SSL === 'true' || (process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1')
      ? { rejectUnauthorized: false }
      : false,
  });

  await dataSource.initialize();
  console.log('Connected to database');

  try {
    const categories = [
      {
        name: 'Bakery & Pastry',
        nameEn: 'Bakery & Pastry',
        slug: 'bakery-pastry',
        description: 'Produk untuk toko roti, pastry, dan kue',
        descriptionEn: 'Products for bakeries, pastries, and cake shops',
        displayOrder: 1,
        isActive: true,
      },
      {
        name: 'Café & Beverage',
        nameEn: 'Café & Beverage',
        slug: 'cafe-beverage',
        description: 'Produk untuk café dan minuman',
        descriptionEn: 'Products for cafés and beverages',
        displayOrder: 2,
        isActive: true,
      },
      {
        name: 'Restaurant & Hotel',
        nameEn: 'Restaurant & Hotel',
        slug: 'restaurant-hotel',
        description: 'Produk untuk restoran dan hotel',
        descriptionEn: 'Products for restaurants and hotels',
        displayOrder: 3,
        isActive: true,
      },
      {
        name: 'Retail & Supermarket',
        nameEn: 'Retail & Supermarket',
        slug: 'retail-supermarket',
        description: 'Produk untuk retail dan supermarket',
        descriptionEn: 'Products for retail and supermarkets',
        displayOrder: 4,
        isActive: true,
      },
    ];

    for (const category of categories) {
      const exists = await dataSource.query(
        'SELECT id FROM industry_categories WHERE slug = $1',
        [category.slug]
      );

      if (exists.length === 0) {
        await dataSource.query(
          `INSERT INTO industry_categories (name, "nameEn", slug, description, "descriptionEn", "displayOrder", "isActive", "createdAt", "updatedAt") 
           VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
          [
            category.name,
            category.nameEn,
            category.slug,
            category.description,
            category.descriptionEn,
            category.displayOrder,
            category.isActive,
          ]
        );
        console.log(`✓ Created category: ${category.name}`);
      } else {
        console.log(`- Category already exists: ${category.name}`);
      }
    }

    console.log('\n✅ Industry categories seeding completed!');
  } catch (error) {
    console.error('Error seeding industry categories:', error);
  } finally {
    await dataSource.destroy();
  }
}

seedIndustryCategories();
