import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IndustryCategory } from './industry-category.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('industry_product_links')
export class IndustryProductLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  industryCategoryId: number;

  @Column()
  productId: number;

  @Column({ default: 0 })
  displayOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => IndustryCategory, category => category.productLinks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'industryCategoryId' })
  industryCategory: IndustryCategory;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
