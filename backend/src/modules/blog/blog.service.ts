import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost, PostStatus } from './entities/blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(BlogPost) private repo: Repository<BlogPost>) {}

  async getPosts(page = 1, limit = 10, search?: string) {
    const qb = this.repo.createQueryBuilder('p')
      .where('p.status = :s', { s: PostStatus.PUBLISHED })
      .orderBy('p.publishedAt', 'DESC')
      .skip((page - 1) * limit).take(limit);
    if (search) qb.andWhere('(p.title ILIKE :q OR p.excerpt ILIKE :q)', { q: `%${search}%` });
    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getPostBySlug(slug: string) {
    const post = await this.repo.findOne({ where: { slug, status: PostStatus.PUBLISHED } });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async getLatestPosts(limit = 3) {
    return this.repo.find({ where: { status: PostStatus.PUBLISHED }, order: { publishedAt: 'DESC' }, take: limit });
  }

  async createPost(dto: CreateBlogPostDto) {
    const post = this.repo.create({
      ...dto,
      publishedAt: dto.status === PostStatus.PUBLISHED ? new Date() : null,
    });
    return this.repo.save(post);
  }

  async updatePost(id: number, dto: Partial<CreateBlogPostDto>) {
    const post = await this.repo.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    if (dto.status === PostStatus.PUBLISHED && post.status !== PostStatus.PUBLISHED) {
      (dto as any).publishedAt = new Date();
    }
    Object.assign(post, dto);
    return this.repo.save(post);
  }

  async deletePost(id: number) { await this.repo.delete(id); }

  async getAllForAdmin(page = 1, limit = 20) {
    const [items, total] = await this.repo.findAndCount({ order: { createdAt: 'DESC' }, skip: (page - 1) * limit, take: limit });
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
