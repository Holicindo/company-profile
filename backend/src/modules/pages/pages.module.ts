import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { Page } from './entities/page.entity';
import { SEOGeneratorService } from './seo-generator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  controllers: [PagesController],
  providers: [PagesService, SEOGeneratorService],
  exports: [PagesService],
})
export class PagesModule {}
