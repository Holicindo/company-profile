import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactSubject } from './entities/contact-subject.entity';
import { CreateContactSubjectDto } from './dto/create-contact-subject.dto';
import { UpdateContactSubjectDto } from './dto/update-contact-subject.dto';

@Injectable()
export class ContactSubjectsService {
  constructor(
    @InjectRepository(ContactSubject)
    private subjectRepository: Repository<ContactSubject>,
  ) {}

  async findAll(): Promise<ContactSubject[]> {
    return this.subjectRepository.find({
      where: { isActive: true },
      order: { displayOrder: 'ASC', label_id: 'ASC' },
    });
  }

  async findAllAdmin(): Promise<ContactSubject[]> {
    return this.subjectRepository.find({
      order: { displayOrder: 'ASC', label_id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<ContactSubject> {
    const subject = await this.subjectRepository.findOne({ where: { id } });
    if (!subject) {
      throw new NotFoundException(`Contact subject with ID ${id} not found`);
    }
    return subject;
  }

  async create(createDto: CreateContactSubjectDto): Promise<ContactSubject> {
    const subject = this.subjectRepository.create(createDto);
    return this.subjectRepository.save(subject);
  }

  async update(id: number, updateDto: UpdateContactSubjectDto): Promise<ContactSubject> {
    const subject = await this.findOne(id);
    Object.assign(subject, updateDto);
    return this.subjectRepository.save(subject);
  }

  async remove(id: number): Promise<void> {
    const subject = await this.findOne(id);
    await this.subjectRepository.remove(subject);
  }

  async reorder(ids: number[]): Promise<void> {
    for (let i = 0; i < ids.length; i++) {
      await this.subjectRepository.update(ids[i], { displayOrder: i });
    }
  }
}
