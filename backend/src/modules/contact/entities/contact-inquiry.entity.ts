import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum InquiryStatus { NEW = 'new', READ = 'read', REPLIED = 'replied' }

@Entity('contact_inquiries')
export class ContactInquiry {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() email: string;
  @Column({ nullable: true }) phone: string;
  @Column({ nullable: true }) company: string;
  @Column() subject: string;
  @Column({ type: 'text' }) message: string;
  @Column({ default: InquiryStatus.NEW }) status: InquiryStatus;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}
