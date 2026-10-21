import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBilingualFieldsToBlogPosts1727665680000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if columns already exist before adding
    const table = await queryRunner.getTable('blog_posts');
    
    if (!table.findColumnByName('title_en')) {
      await queryRunner.query(`ALTER TABLE "blog_posts" ADD COLUMN "title_en" VARCHAR`);
    }
    
    if (!table.findColumnByName('excerpt_en')) {
      await queryRunner.query(`ALTER TABLE "blog_posts" ADD COLUMN "excerpt_en" TEXT`);
    }
    
    if (!table.findColumnByName('content_en')) {
      await queryRunner.query(`ALTER TABLE "blog_posts" ADD COLUMN "content_en" TEXT`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "blog_posts" 
      DROP COLUMN "title_en",
      DROP COLUMN "excerpt_en",
      DROP COLUMN "content_en"
    `);
  }
}
