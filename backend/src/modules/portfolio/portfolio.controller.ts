import { Controller, Get, Post, Patch, Delete, Param, Query, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly svc: PortfolioService) {}

  @Get('featured')
  getFeatured(@Query('limit') limit?: string) { return this.svc.getFeatured(limit ? +limit : 6); }

  @Get()
  getAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.svc.getAll(page ? +page : 1, limit ? +limit : 12);
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) { return this.svc.getBySlug(slug); }

  // ── Admin endpoints ──────────────────────────────────────────────────────────

  @UseGuards(JwtAuthGuard)
  @Get('admin/all')
  getAllAdmin(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.svc.getAllForAdmin(page ? +page : 1, limit ? +limit : 20);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin')
  create(@Body() dto: any) { return this.svc.createPortfolio(dto); }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    return this.svc.updatePortfolio(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.deletePortfolio(id);
  }
}
