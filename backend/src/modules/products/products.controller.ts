import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly svc: ProductsService) {}

  @Get('categories')
  getCategories() { return this.svc.getCategories(); }

  @Get('categories/:slug')
  getCategoryBySlug(@Param('slug') slug: string) { return this.svc.getCategoryBySlug(slug); }

  @Get('featured')
  getFeatured(@Query('limit') limit?: string) { return this.svc.getFeaturedProducts(limit ? +limit : 8); }

  @Get()
  getProducts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('featured') featured?: string,
  ) {
    return this.svc.getProducts({ page: page ? +page : 1, limit: limit ? +limit : 20, category, search, featured: featured === 'true' });
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) { return this.svc.getProductBySlug(slug); }
}
