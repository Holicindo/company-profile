import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { IndustryCategoriesService } from './industry-categories.service';
import { CreateIndustryCategoryDto } from './dto/create-industry-category.dto';
import { UpdateIndustryCategoryDto } from './dto/update-industry-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('industry-categories')
export class IndustryCategoriesController {
  constructor(private readonly industryCategoriesService: IndustryCategoriesService) {}

  @Get()
  findAll() {
    return this.industryCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.industryCategoriesService.findOne(+id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.industryCategoriesService.findBySlug(slug);
  }

  @Get(':id/products')
  getProducts(@Param('id') id: string) {
    return this.industryCategoriesService.findProductsByCategory(+id);
  }

  @Get('slug/:slug/products')
  getProductsBySlug(@Param('slug') slug: string) {
    return this.industryCategoriesService.findProductsByCategorySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDto: CreateIndustryCategoryDto) {
    return this.industryCategoriesService.create(createDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateDto: UpdateIndustryCategoryDto) {
    return this.industryCategoriesService.update(+id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.industryCategoriesService.remove(+id);
  }

  @Get(':id/linked-products')
  @UseGuards(JwtAuthGuard)
  getLinkedProductIds(@Param('id') id: string) {
    return this.industryCategoriesService.getLinkedProductIds(+id);
  }
}
