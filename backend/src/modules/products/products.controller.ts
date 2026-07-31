import { Controller, Get, Post, Patch, Delete, Param, Query, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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

  // ── Admin endpoints ──────────────────────────────────────────────────────────

  @UseGuards(JwtAuthGuard)
  @Get('admin/all')
  getAllAdmin(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.svc.getAllForAdmin(page ? +page : 1, limit ? +limit : 20);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin')
  createProduct(@Body() dto: any) { return this.svc.createProduct(dto); }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/:id')
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    return this.svc.updateProduct(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.svc.deleteProduct(id);
  }
}
