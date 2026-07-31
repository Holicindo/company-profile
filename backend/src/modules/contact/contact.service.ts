import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInquiry, InquiryStatus } from './entities/contact-inquiry.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(@InjectRepository(ContactInquiry) private repo: Repository<ContactInquiry>) {}

  async submit(dto: CreateContactDto) {
    const inquiry = this.repo.create(dto);
    return this.repo.save(inquiry);
  }

  async getAll(page = 1, limit = 20, status?: string) {
    const qb = this.repo.createQueryBuilder('c').orderBy('c.createdAt', 'DESC');
    if (status) qb.where('c.status = :status', { status });
    qb.skip((page - 1) * limit).take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async updateStatus(id: number, status: string) {
    const inquiry = await this.repo.findOne({ where: { id } });
    if (!inquiry) throw new NotFoundException('Inquiry not found');
    inquiry.status = status as InquiryStatus;
    return this.repo.save(inquiry);
  }

  async deleteInquiry(id: number) {
    const inquiry = await this.repo.findOne({ where: { id } });
    if (!inquiry) throw new NotFoundException('Inquiry not found');
    await this.repo.delete(id);
    return { message: 'Inquiry deleted successfully' };
  }
}
