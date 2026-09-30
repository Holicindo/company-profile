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

  /**
   * Transform WordPress legacy URLs to backend proxy URLs
   * Example: https://holicindo.com/wp-content/uploads/2021/11/SRWP-70.png
   * Becomes: /uploads/2021/11/SRWP-70.png (relative path for Next.js rewrite)
   */
  private transformImageUrl(url: string | null): string | null {
    if (!url) return null;
    
    // Check if it's a WordPress legacy URL
    if (url.includes('/wp-content/uploads/')) {
      // Extract the path after /wp-content/uploads/
      const match = url.match(/\/wp-content\/uploads\/(.+)$/);
      if (match) {
        // Return relative path (will be proxied by Next.js to backend)
        return `/uploads/${match[1]}`;
      }
    }
    
    return url;
  }

  /**
   * Transform product image URLs for display
   */
  private transformProduct(product: Product): Product {
    if (product) {
      product.imageUrl = this.transformImageUrl(product.imageUrl);
      if (product.galleryUrls && Array.isArray(product.galleryUrls)) {
        product.galleryUrls = product.galleryUrls.map(url => this.transformImageUrl(url));
      }
    }
    return product;
  }

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
    // Transform image URLs
    items.forEach(item => this.transformProduct(item));
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getProductBySlug(slug: string) {
    const p = await this.productRepo.findOne({ where: { slug, isActive: true }, relations: ['category', 'category.parent'] });
    if (!p) throw new NotFoundException('Product not found');
    return this.transformProduct(p);
  }

  async getFeaturedProducts(limit = 8) {
    const items = await this.productRepo.find({ where: { isFeatured: true, isActive: true }, relations: ['category'], take: limit });
    items.forEach(item => this.transformProduct(item));
    return items;
  }

  // ── Admin CRUD ───────────────────────────────────────────────────────────────

  async getAllForAdmin(page = 1, limit = 20, search?: string, category?: string) {
    const qb = this.productRepo.createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'cat')
      .orderBy('p.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);
    if (search) qb.andWhere('(p.name ILIKE :s OR p.sku ILIKE :s)', { s: `%${search}%` });
    if (category) qb.andWhere('cat.slug = :category', { category });
    const [items, total] = await qb.getManyAndCount();
    // Transform image URLs for admin panel
    items.forEach(item => this.transformProduct(item));
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getProductById(id: number) {
    const product = await this.productRepo.findOne({ where: { id }, relations: ['category', 'category.parent'] });
    if (!product) throw new NotFoundException('Product not found');
    return this.transformProduct(product);
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
