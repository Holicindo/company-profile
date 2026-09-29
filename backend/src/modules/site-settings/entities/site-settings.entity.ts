import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('site_settings')
export class SiteSettings {
  @PrimaryGeneratedColumn()
  id: number;

  // Contact Information
  @Column({ type: 'varchar', length: 50, nullable: true })
  whatsapp: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  googleMapsLink: string;

  @Column({ type: 'text', nullable: true })
  googleMapsEmbed: string;

  // Social Media
  @Column({ type: 'varchar', length: 500, nullable: true })
  facebookUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  instagramUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  youtubeUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  linkedinUrl: string;

  // Operating Hours (stored as JSON)
  @Column({ type: 'json', nullable: true })
  operatingHours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };

  // Company Info
  @Column({ type: 'text', nullable: true })
  companyTagline: string;

  // CTA Section
  @Column({ type: 'varchar', length: 200, nullable: true })
  ctaHeading: string;

  @Column({ type: 'text', nullable: true })
  ctaDescription: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
