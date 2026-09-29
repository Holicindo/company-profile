import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const CLIENTS = [
  { name: 'Gelael Signature', displayOrder: 0 },
  { name: 'LuLu Hypermarket', displayOrder: 1 },
  { name: 'Cinema XXI', displayOrder: 2 },
  { name: 'Holland Bakery', displayOrder: 3 },
  { name: 'Flix Cinema', displayOrder: 4 },
  { name: 'BreadTalk', displayOrder: 5 },
  { name: 'J.CO Donuts', displayOrder: 6 },
  { name: 'Starbucks Indonesia', displayOrder: 7 },
  { name: 'Roti O', displayOrder: 8 },
  { name: 'Mayora Group', displayOrder: 9 },
  { name: 'Indomaret', displayOrder: 10 },
  { name: 'Alfamart', displayOrder: 11 },
  { name: 'Transmart Carrefour', displayOrder: 12 },
  { name: 'Giant Hypermart', displayOrder: 13 },
  { name: 'Hero Supermarket', displayOrder: 14 },
  { name: 'Ranch Market', displayOrder: 15 },
  { name: 'Food Hall', displayOrder: 16 },
];

async function seedClients() {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'holicindo_web',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  try {
    await AppDataSource.initialize();
    console.log('📦 Database connected');

    const queryRunner = AppDataSource.createQueryRunner();

    // Check if clients already exist
    const existing = await queryRunner.query('SELECT COUNT(*) as count FROM clients');
    
    if (existing[0].count > 0) {
      console.log('✅ Clients already exist, skipping...');
      await AppDataSource.destroy();
      return;
    }

    // Insert clients
    for (const client of CLIENTS) {
      await queryRunner.query(
        `INSERT INTO clients (name, logo, "displayOrder", "isActive", "createdAt", "updatedAt")
         VALUES ($1, NULL, $2, true, NOW(), NOW())`,
        [client.name, client.displayOrder]
      );
    }

    console.log(`✅ ${CLIENTS.length} clients seeded successfully!`);

    await AppDataSource.destroy();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding clients:', error);
    process.exit(1);
  }
}

seedClients();
