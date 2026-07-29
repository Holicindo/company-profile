import { Controller, Get, Param, Query } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

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
}
