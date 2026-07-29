import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProductCategory } from './product-category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true, name: 'short_description' })
  shortDescription: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ type: 'jsonb', nullable: true, name: 'gallery_urls' })
  galleryUrls: string[];

  @Column({ name: 'category_id', nullable: true })
  categoryId: number;

  @ManyToOne(() => ProductCategory, (c) => c.products, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: ProductCategory;

  @Column({ nullable: true })
  sku: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ default: false, name: 'is_featured' })
  isFeatured: boolean;

  @Column({ name: 'wp_post_id', nullable: true })
  wpPostId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
