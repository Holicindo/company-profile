import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pages')
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string; // 'beranda', 'tentang-kami', 'layanan'

  @Column()
  title: string;

  @Column('json')
  sections: any; // JSON structure for page content sections

  @Column('json', { nullable: true })
  metadata: any; // SEO metadata (title, description, keywords)

  @Column({ default: 'published' })
  status: string; // 'draft' or 'published'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
