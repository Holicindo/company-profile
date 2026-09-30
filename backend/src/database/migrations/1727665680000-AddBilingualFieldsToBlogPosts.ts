import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBilingualFieldsToBlogPosts1727665680000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "blog_posts" 
      ADD COLUMN "title_en" VARCHAR,
      ADD COLUMN "excerpt_en" TEXT,
      ADD COLUMN "content_en" TEXT
    `);
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
