import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private pageRepo: Repository<Page>,
  ) {}

  async findAll(): Promise<Page[]> {
    return this.pageRepo.find({ order: { updatedAt: 'DESC' } });
  }

  async findBySlug(slug: string): Promise<Page> {
    const page = await this.pageRepo.findOne({ where: { slug } });
    if (!page) throw new NotFoundException(`Halaman dengan slug "${slug}" tidak ditemukan`);
    return page;
  }

  async findOne(id: number): Promise<Page> {
    const page = await this.pageRepo.findOne({ where: { id } });
    if (!page) throw new NotFoundException(`Halaman dengan ID ${id} tidak ditemukan`);
    return page;
  }

  async create(dto: CreatePageDto): Promise<Page> {
    const page = this.pageRepo.create(dto);
    return this.pageRepo.save(page);
  }

  async update(id: number, dto: UpdatePageDto): Promise<Page> {
    await this.findOne(id); // Check if exists
    await this.pageRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const page = await this.findOne(id);
    await this.pageRepo.remove(page);
  }
}
