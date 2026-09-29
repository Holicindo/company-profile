import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const SUBJECTS = [
  { label_id: 'Inquiry Produk', label_en: 'Product Inquiry', displayOrder: 0 },
  { label_id: 'Request Penawaran', label_en: 'Request Quotation', displayOrder: 1 },
  { label_id: 'Konsultasi Teknis', label_en: 'Technical Consultation', displayOrder: 2 },
  { label_id: 'After Sales Service', label_en: 'After Sales Service', displayOrder: 3 },
  { label_id: 'Lainnya', label_en: 'Other', displayOrder: 4 },
];

async function seedContactSubjects() {
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

    // Check if subjects already exist
    const existing = await queryRunner.query('SELECT COUNT(*) as count FROM contact_subjects');
    
    if (existing[0].count > 0) {
      console.log('✅ Contact subjects already exist, skipping...');
      await AppDataSource.destroy();
      return;
    }

    // Insert subjects
    for (const subject of SUBJECTS) {
      await queryRunner.query(
        `INSERT INTO contact_subjects (label_id, label_en, "displayOrder", "isActive", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, true, NOW(), NOW())`,
        [subject.label_id, subject.label_en, subject.displayOrder]
      );
    }

    console.log(`✅ ${SUBJECTS.length} contact subjects seeded successfully!`);

    await AppDataSource.destroy();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding contact subjects:', error);
    process.exit(1);
  }
}

seedContactSubjects();
