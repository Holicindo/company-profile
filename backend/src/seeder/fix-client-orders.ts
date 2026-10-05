import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

async function fixClientOrders() {
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
    console.log('Database connected');

    const queryRunner = AppDataSource.createQueryRunner();

    // Update displayOrder based on id ordering (ascending)
    await queryRunner.query(`
      UPDATE clients SET "displayOrder" = subq.row_num - 1
      FROM (
        SELECT id, ROW_NUMBER() OVER (ORDER BY id ASC) as row_num
        FROM clients
      ) subq
      WHERE clients.id = subq.id
    `);

    const result = await queryRunner.query(`SELECT COUNT(*) as count FROM clients`);
    console.log(`Fixed displayOrder for ${result[0].count} clients (0 to ${result[0].count - 1})`);

    await AppDataSource.destroy();
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixClientOrders();
