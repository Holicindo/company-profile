import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('portfolio')
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'client_name', nullable: true })
  clientName: string;

  @Column({ name: 'project_date', nullable: true })
  projectDate: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column({ type: 'jsonb', nullable: true, name: 'gallery_urls' })
  galleryUrls: string[];

  @Column({ nullable: true })
  location: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'wp_post_id', nullable: true })
  wpPostId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
