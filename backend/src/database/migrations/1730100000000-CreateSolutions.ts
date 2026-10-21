import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateSolutions1730100000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create solutions table
    await queryRunner.createTable(
      new Table({
        name: 'solutions',
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
            name: 'icon',
            type: 'varchar',
            length: '100',
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

    // Create solution_product_links junction table
    await queryRunner.createTable(
      new Table({
        name: 'solution_product_links',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'solutionId',
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
      'solution_product_links',
      new TableForeignKey({
        columnNames: ['solutionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'solutions',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'solution_product_links',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
      }),
    );

    // Seed default solutions
    await queryRunner.query(`
      INSERT INTO solutions (name, "nameEn", slug, description, "descriptionEn", icon, "displayOrder", "isActive")
      VALUES
        (
          'Estetika Display & Presisi Suhu',
          'Display Aesthetics & Temperature Precision',
          'estetika-display',
          'Solusi display premium dengan kontrol suhu akurat untuk bisnis yang mengutamakan tampilan produk menarik',
          'Premium display solutions with accurate temperature control for businesses prioritizing attractive product presentation',
          'palette',
          1,
          true
        ),
        (
          'Ketahanan Dapur Komersial',
          'Commercial Kitchen Durability',
          'ketahanan-dapur',
          'Peralatan heavy-duty untuk operasi dapur komersial dengan beban kerja tinggi',
          'Heavy-duty equipment for commercial kitchen operations with high workload',
          'chef-hat',
          2,
          true
        ),
        (
          'Visibilitas & Kapasitas Ekstra',
          'Visibility & Extra Capacity',
          'visibilitas-kapasitas',
          'Display besar dengan kapasitas jumbo untuk retail dan supermarket',
          'Large display with jumbo capacity for retail and supermarkets',
          'eye',
          3,
          true
        ),
        (
          'Kekuatan Produksi Massal',
          'Mass Production Power',
          'produksi-massal',
          'Freezer industrial untuk produksi skala besar dan manufaktur',
          'Industrial freezer for large-scale production and manufacturing',
          'factory',
          4,
          true
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys first
    const solutionProductLinks = await queryRunner.getTable('solution_product_links');
    if (solutionProductLinks) {
      const foreignKeys = solutionProductLinks.foreignKeys;
      for (const fk of foreignKeys) {
        await queryRunner.dropForeignKey('solution_product_links', fk);
      }
    }

    // Drop tables
    await queryRunner.dropTable('solution_product_links', true);
    await queryRunner.dropTable('solutions', true);
  }
}
