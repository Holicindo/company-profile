import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './entities/portfolio.entity';

@Injectable()
export class PortfolioService {
  constructor(@InjectRepository(Portfolio) private repo: Repository<Portfolio>) {}

  async getAll(page = 1, limit = 12) {
    const [items, total] = await this.repo.findAndCount({
      where: { isActive: true },
      order: { projectDate: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getBySlug(slug: string) {
    const item = await this.repo.findOne({ where: { slug, isActive: true } });
    if (!item) throw new NotFoundException('Project not found');
    return item;
  }

  async getFeatured(limit = 6) {
    return this.repo.find({ where: { isActive: true }, order: { createdAt: 'DESC' }, take: limit });
  }
}
