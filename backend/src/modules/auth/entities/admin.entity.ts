import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn() id: number;
  @Column({ unique: true }) email: string;
  @Column() password: string;
  @Column() name: string;
  @Column({ default: true, name: 'is_active' }) isActive: boolean;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) this.password = await bcrypt.hash(this.password, 12);
  }

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}
