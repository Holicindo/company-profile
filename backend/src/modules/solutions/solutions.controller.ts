import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Get()
  findAll() {
    return this.solutionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solutionsService.findOne(+id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.solutionsService.findBySlug(slug);
  }

  @Get(':id/products')
  getProducts(@Param('id') id: string) {
    return this.solutionsService.getProducts(+id);
  }

  @Get('slug/:slug/products')
  getProductsBySlug(@Param('slug') slug: string) {
    return this.solutionsService.getProductsBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateSolutionDto) {
    return this.solutionsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSolutionDto) {
    return this.solutionsService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solutionsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/linked-products')
  getLinkedProductIds(@Param('id') id: string) {
    return this.solutionsService.getLinkedProductIds(+id);
  }
}
