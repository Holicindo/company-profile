import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product-category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(ProductCategory) private categoryRepo: Repository<ProductCategory>,
  ) {}

  async getCategories() {
    const all = await this.categoryRepo.find({ order: { order: 'ASC', name: 'ASC' } });
    const roots = all.filter(c => c.parentId === null);
    roots.forEach(r => { (r as any).children = all.filter(c => c.parentId === r.id); });
    return roots;
  }

  async getCategoryBySlug(slug: string) {
    const all = await this.categoryRepo.find({ order: { name: 'ASC' } });
    const cat = all.find(c => c.slug === slug);
    if (!cat) throw new NotFoundException('Category not found');
    (cat as any).children = all.filter(c => c.parentId === cat.id);
    (cat as any).parent = cat.parentId ? all.find(c => c.id === cat.parentId) || null : null;
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
      const allCats = await this.categoryRepo.find();
      const cat = allCats.find(c => c.slug === category);
      if (cat) {
        const childIds = allCats.filter(c => c.parentId === cat.id).map(c => c.id);
        const ids = [cat.id, ...childIds];
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

  // ── Admin CRUD ───────────────────────────────────────────────────────────────

  async getAllForAdmin(page = 1, limit = 20) {
    const qb = this.productRepo.createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'cat')
      .orderBy('p.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async createProduct(dto: any) {
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  async updateProduct(id: number, dto: any) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  async deleteProduct(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    await this.productRepo.delete(id);
    return { message: 'Product deleted successfully' };
  }
}
