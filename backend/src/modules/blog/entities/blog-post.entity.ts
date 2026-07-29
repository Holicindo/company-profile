import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum PostStatus { DRAFT = 'draft', PUBLISHED = 'published' }

@Entity('blog_posts')
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  excerpt: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'featured_image', nullable: true })
  featuredImage: string;

  @Column({ default: PostStatus.DRAFT })
  status: PostStatus;

  @Column({ nullable: true })
  author: string;

  @Column({ type: 'jsonb', nullable: true })
  tags: string[];

  @Column({ name: 'published_at', nullable: true, type: 'timestamptz' })
  publishedAt: Date;

  @Column({ name: 'wp_post_id', nullable: true })
  wpPostId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
