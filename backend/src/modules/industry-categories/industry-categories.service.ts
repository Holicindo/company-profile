import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IndustryCategory } from './entities/industry-category.entity';
import { IndustryProductLink } from './entities/industry-product-link.entity';
import { CreateIndustryCategoryDto } from './dto/create-industry-category.dto';
import { UpdateIndustryCategoryDto } from './dto/update-industry-category.dto';

@Injectable()
export class IndustryCategoriesService {
  constructor(
    @InjectRepository(IndustryCategory)
    private industryCategoryRepo: Repository<IndustryCategory>,
    @InjectRepository(IndustryProductLink)
    private industryProductLinkRepo: Repository<IndustryProductLink>,
  ) {}

  async findAll(): Promise<IndustryCategory[]> {
    return this.industryCategoryRepo.find({
      where: { isActive: true },
      order: { displayOrder: 'ASC' },
    });
  }

  async findOne(id: number): Promise<IndustryCategory> {
    const category = await this.industryCategoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Industry category with ID ${id} not found`);
    }
    return category;
  }

  async findBySlug(slug: string): Promise<IndustryCategory> {
    const category = await this.industryCategoryRepo.findOne({ where: { slug } });
    if (!category) {
      throw new NotFoundException(`Industry category with slug ${slug} not found`);
    }
    return category;
  }

  async findProductsByCategory(categoryId: number) {
    const links = await this.industryProductLinkRepo.find({
      where: { industryCategoryId: categoryId },
      relations: ['product', 'product.category'],
      order: { displayOrder: 'ASC' },
    });
    return links.map(link => link.product);
  }

  async findProductsByCategorySlug(slug: string) {
    const category = await this.findBySlug(slug);
    return this.findProductsByCategory(category.id);
  }

  async create(createDto: CreateIndustryCategoryDto): Promise<IndustryCategory> {
    const category = this.industryCategoryRepo.create(createDto);
    const saved = await this.industryCategoryRepo.save(category);

    if (createDto.productIds && createDto.productIds.length > 0) {
      await this.updateProductLinks(saved.id, createDto.productIds);
    }

    return saved;
  }

  async update(id: number, updateDto: UpdateIndustryCategoryDto): Promise<IndustryCategory> {
    const category = await this.findOne(id);
    Object.assign(category, updateDto);
    const updated = await this.industryCategoryRepo.save(category);

    if (updateDto.productIds !== undefined) {
      await this.updateProductLinks(id, updateDto.productIds);
    }

    return updated;
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.industryCategoryRepo.remove(category);
  }

  async updateProductLinks(categoryId: number, productIds: number[]): Promise<void> {
    // Remove existing links
    await this.industryProductLinkRepo.delete({ industryCategoryId: categoryId });

    // Create new links
    const links = productIds.map((productId, index) => 
      this.industryProductLinkRepo.create({
        industryCategoryId: categoryId,
        productId,
        displayOrder: index,
      })
    );

    if (links.length > 0) {
      await this.industryProductLinkRepo.save(links);
    }
  }

  async getLinkedProductIds(categoryId: number): Promise<number[]> {
    const links = await this.industryProductLinkRepo.find({
      where: { industryCategoryId: categoryId },
      order: { displayOrder: 'ASC' },
    });
    return links.map(link => link.productId);
  }
}
