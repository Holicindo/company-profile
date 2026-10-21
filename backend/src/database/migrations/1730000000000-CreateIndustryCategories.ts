import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateIndustryCategories1730000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create industry_categories table
    await queryRunner.createTable(
      new Table({
        name: 'industry_categories',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'nameEn',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'descriptionEn',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'displayOrder',
            type: 'int',
            default: 0,
          },
          {
            name: 'isActive',
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Create industry_product_links junction table
    await queryRunner.createTable(
      new Table({
        name: 'industry_product_links',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'industryCategoryId',
            type: 'int',
          },
          {
            name: 'productId',
            type: 'int',
          },
          {
            name: 'displayOrder',
            type: 'int',
            default: 0,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Add foreign keys
    await queryRunner.createForeignKey(
      'industry_product_links',
      new TableForeignKey({
        columnNames: ['industryCategoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'industry_categories',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'industry_product_links',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );

    // Insert default categories
    await queryRunner.query(`
      INSERT INTO industry_categories (name, nameEn, slug, description, descriptionEn, displayOrder, isActive)
      VALUES
        ('Bakery & Pastry', 'Bakery & Pastry', 'bakery-pastry', 'Produk untuk industri roti dan kue', 'Products for bakery and pastry industry', 1, true),
        ('Café & Beverage', 'Café & Beverage', 'cafe-beverage', 'Produk untuk kafe dan minuman', 'Products for café and beverage industry', 2, true),
        ('Restaurant & Hotel', 'Restaurant & Hotel', 'restaurant-hotel', 'Produk untuk restoran dan hotel', 'Products for restaurant and hotel industry', 3, true),
        ('Retail & Supermarket', 'Retail & Supermarket', 'retail-supermarket', 'Produk untuk retail dan supermarket', 'Products for retail and supermarket industry', 4, true)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const industryProductLinksTable = await queryRunner.getTable('industry_product_links');
    const foreignKeys = industryProductLinksTable.foreignKeys;

    for (const foreignKey of foreignKeys) {
      await queryRunner.dropForeignKey('industry_product_links', foreignKey);
    }

    await queryRunner.dropTable('industry_product_links');
    await queryRunner.dropTable('industry_categories');
  }
}
