import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Solution } from './entities/solution.entity';
import { SolutionProductLink } from './entities/solution-product-link.entity';
import { Product } from '../products/entities/product.entity';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(Solution)
    private readonly solutionRepository: Repository<Solution>,
    @InjectRepository(SolutionProductLink)
    private readonly linkRepository: Repository<SolutionProductLink>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Solution[]> {
    return this.solutionRepository.find({
      where: { isActive: true },
      order: { displayOrder: 'ASC', name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Solution> {
    const solution = await this.solutionRepository.findOne({ where: { id } });
    if (!solution) {
      throw new NotFoundException(`Solution with ID ${id} not found`);
    }
    return solution;
  }

  async findBySlug(slug: string): Promise<Solution> {
    const solution = await this.solutionRepository.findOne({ where: { slug } });
    if (!solution) {
      throw new NotFoundException(`Solution with slug "${slug}" not found`);
    }
    return solution;
  }

  async create(dto: CreateSolutionDto): Promise<Solution> {
    const solution = this.solutionRepository.create(dto);
    const saved = await this.solutionRepository.save(solution);

    if (dto.productIds && dto.productIds.length > 0) {
      await this.linkProducts(saved.id, dto.productIds);
    }

    return saved;
  }

  async update(id: number, dto: UpdateSolutionDto): Promise<Solution> {
    const solution = await this.findOne(id);
    Object.assign(solution, dto);
    const updated = await this.solutionRepository.save(solution);

    if (dto.productIds !== undefined) {
      await this.linkProducts(id, dto.productIds);
    }

    return updated;
  }

  async remove(id: number): Promise<void> {
    const solution = await this.findOne(id);
    await this.solutionRepository.remove(solution);
  }

  async getProducts(id: number): Promise<Product[]> {
    const links = await this.linkRepository.find({
      where: { solutionId: id },
      relations: ['product', 'product.category'],
      order: { displayOrder: 'ASC' },
    });

    return links.map(link => link.product);
  }

  async getProductsBySlug(slug: string): Promise<Product[]> {
    const solution = await this.findBySlug(slug);
    return this.getProducts(solution.id);
  }

  async getLinkedProductIds(id: number): Promise<number[]> {
    const links = await this.linkRepository.find({
      where: { solutionId: id },
      select: ['productId'],
    });

    return links.map(link => link.productId);
  }

  async linkProducts(solutionId: number, productIds: number[]): Promise<void> {
    await this.linkRepository.delete({ solutionId });

    if (productIds.length === 0) return;

    const links = productIds.map((productId, index) => ({
      solutionId,
      productId,
      displayOrder: index,
    }));

    await this.linkRepository.save(links);
  }
}
