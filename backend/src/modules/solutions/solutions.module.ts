import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';
import { Solution } from './entities/solution.entity';
import { SolutionProductLink } from './entities/solution-product-link.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Solution, SolutionProductLink, Product]),
  ],
  controllers: [SolutionsController],
  providers: [SolutionsService],
  exports: [SolutionsService],
})
export class SolutionsModule {}
