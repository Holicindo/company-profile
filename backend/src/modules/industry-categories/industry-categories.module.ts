import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustryCategoriesController } from './industry-categories.controller';
import { IndustryCategoriesService } from './industry-categories.service';
import { IndustryCategory } from './entities/industry-category.entity';
import { IndustryProductLink } from './entities/industry-product-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndustryCategory, IndustryProductLink])],
  controllers: [IndustryCategoriesController],
  providers: [IndustryCategoriesService],
  exports: [IndustryCategoriesService],
})
export class IndustryCategoriesModule {}
