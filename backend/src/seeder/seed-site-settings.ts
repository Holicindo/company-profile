import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

async function seedSiteSettings() {
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

    // Check if site settings already exist
    const existing = await queryRunner.query('SELECT * FROM site_settings WHERE id = 1');
    
    if (existing.length > 0) {
      console.log('✅ Site settings already exist, skipping...');
      await AppDataSource.destroy();
      return;
    }

    // Insert default site settings with current hardcoded values
    await queryRunner.query(`
      INSERT INTO site_settings (
        id,
        whatsapp,
        email,
        address,
        "googleMapsLink",
        "googleMapsEmbed",
        "facebookUrl",
        "instagramUrl",
        "youtubeUrl",
        "linkedinUrl",
        "operatingHours",
        "companyTagline",
        "ctaHeading",
        "ctaDescription",
        "createdAt",
        "updatedAt"
      ) VALUES (
        1,
        '+6281111825718',
        'info@holicindo.com',
        'Green Sedayu Bizpark Blok GSB No. 016, Jl. Cakung Cilincing Tim. No. Raya, Cakung Tim., Jakarta Timur 13910',
        'https://maps.app.goo.gl/bYT5nUqigmC3iS3SA',
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.8857544960757!2d106.96281097475954!3d-6.145877393846697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b04e03ab2a5%3A0x7889a417c00bdb0f!2sGreen%20Sedayu%20Bizpark!5e0!3m2!1sid!2sid!4v1708000000000!5m2!1sid!2sid',
        'https://web.facebook.com/holicindo.id',
        'https://www.instagram.com/holicindo.id?igsi=MTZqYmh4bzNmaGwzcw==',
        'https://youtube.com/@holicindo?si=WnStCOlV6evmhiPi',
        'https://www.linkedin.com/company/pt-holicindo-dasa-anugerah/',
        '{"monday":"08:00 – 17:00","tuesday":"08:00 – 17:00","wednesday":"08:00 – 17:00","thursday":"08:00 – 17:00","friday":"08:00 – 17:00","saturday":"08:00 – 15:00","sunday":"Closed"}',
        'Spesialis showcase kue, chiller komersial, dan refrigerator industri untuk HORECA Indonesia.',
        'Siap Mengembangkan Bisnis Anda?',
        'Konsultasikan spesifikasi mesin dan kebutuhan peralatan industri kuliner Anda langsung dengan ahlinya. Chat tim kami sekarang.',
        NOW(),
        NOW()
      )
    `);

    console.log('✅ Site settings seeded successfully!');

    await AppDataSource.destroy();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding site settings:', error);
    process.exit(1);
  }
}

seedSiteSettings();
