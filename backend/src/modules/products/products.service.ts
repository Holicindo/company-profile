import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(ProductCategory) private categoryRepo: Repository<ProductCategory>,
  ) {}

  async getCategories() {
    return this.categoryRepo.find({
      where: { parentId: IsNull() },
      relations: ['children'],
      order: { order: 'ASC', name: 'ASC' },
    });
  }

  async getCategoryBySlug(slug: string) {
    const cat = await this.categoryRepo.findOne({ where: { slug }, relations: ['children', 'parent'] });
    if (!cat) throw new NotFoundException('Category not found');
    return cat;
  }

  async getProducts(q: { page?: number; limit?: number; category?: string; search?: string; featured?: boolean }) {
    const { page = 1, limit = 20, category, search, featured } = q;
    const qb = this.productRepo.createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'cat')
      .where('p.isActive = true');

    if (search) qb.andWhere('(p.name ILIKE :s OR p.description ILIKE :s)', { s: `%${search}%` });
    if (featured) qb.andWhere('p.isFeatured = true');
    if (category) {
      const cat = await this.categoryRepo.findOne({ where: { slug: category }, relations: ['children'] });
      if (cat) {
        const ids = [cat.id, ...(cat.children?.map((c) => c.id) || [])];
        qb.andWhere('p.categoryId IN (:...ids)', { ids });
      }
    }

    const [items, total] = await qb.orderBy('p.name', 'ASC').skip((page - 1) * limit).take(limit).getManyAndCount();
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getProductBySlug(slug: string) {
    const p = await this.productRepo.findOne({ where: { slug, isActive: true }, relations: ['category', 'category.parent'] });
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }

  async getFeaturedProducts(limit = 8) {
    return this.productRepo.find({ where: { isFeatured: true, isActive: true }, relations: ['category'], take: limit });
  }
}
