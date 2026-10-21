import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

async function seedSolutions() {
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
    const solutions = [
      {
        name: 'Estetika Display & Presisi Suhu',
        nameEn: 'Display Aesthetics & Temperature Precision',
        slug: 'estetika-display',
        description: 'Solusi display premium dengan kontrol suhu akurat untuk bisnis yang mengutamakan tampilan produk menarik',
        descriptionEn: 'Premium display solutions with accurate temperature control for businesses prioritizing attractive product presentation',
        icon: 'palette',
        displayOrder: 1,
        isActive: true,
      },
      {
        name: 'Ketahanan Dapur Komersial',
        nameEn: 'Commercial Kitchen Durability',
        slug: 'ketahanan-dapur',
        description: 'Peralatan heavy-duty untuk operasi dapur komersial dengan beban kerja tinggi',
        descriptionEn: 'Heavy-duty equipment for commercial kitchen operations with high workload',
        icon: 'chef-hat',
        displayOrder: 2,
        isActive: true,
      },
      {
        name: 'Visibilitas & Kapasitas Ekstra',
        nameEn: 'Visibility & Extra Capacity',
        slug: 'visibilitas-kapasitas',
        description: 'Display besar dengan kapasitas jumbo untuk retail dan supermarket',
        descriptionEn: 'Large display with jumbo capacity for retail and supermarkets',
        icon: 'eye',
        displayOrder: 3,
        isActive: true,
      },
      {
        name: 'Kekuatan Produksi Massal',
        nameEn: 'Mass Production Power',
        slug: 'produksi-massal',
        description: 'Freezer industrial untuk produksi skala besar dan manufaktur',
        descriptionEn: 'Industrial freezer for large-scale production and manufacturing',
        icon: 'factory',
        displayOrder: 4,
        isActive: true,
      },
    ];

    for (const solution of solutions) {
      const exists = await dataSource.query(
        'SELECT id FROM solutions WHERE slug = $1',
        [solution.slug]
      );

      if (exists.length === 0) {
        await dataSource.query(
          `INSERT INTO solutions (name, "nameEn", slug, description, "descriptionEn", icon, "displayOrder", "isActive", "createdAt", "updatedAt") 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())`,
          [
            solution.name,
            solution.nameEn,
            solution.slug,
            solution.description,
            solution.descriptionEn,
            solution.icon,
            solution.displayOrder,
            solution.isActive,
          ]
        );
        console.log(`✓ Created solution: ${solution.name}`);
      } else {
        console.log(`- Solution already exists: ${solution.name}`);
      }
    }

    console.log('\n✅ Solutions seeding completed!');
  } catch (error) {
    console.error('Error seeding solutions:', error);
  } finally {
    await dataSource.destroy();
  }
}

seedSolutions();
