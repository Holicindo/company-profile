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

  // ── Admin CRUD ───────────────────────────────────────────────────────────────

  async getAllForAdmin(page = 1, limit = 20) {
    const [items, total] = await this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async createPortfolio(dto: any) {
    const item = this.repo.create(dto);
    return this.repo.save(item);
  }

  async updatePortfolio(id: number, dto: any) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Portfolio not found');
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async deletePortfolio(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Portfolio not found');
    await this.repo.delete(id);
    return { message: 'Portfolio deleted successfully' };
  }
}
