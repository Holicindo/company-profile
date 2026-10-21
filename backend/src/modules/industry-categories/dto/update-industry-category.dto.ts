import { PartialType } from '@nestjs/mapped-types';
import { CreateIndustryCategoryDto } from './create-industry-category.dto';

export class UpdateIndustryCategoryDto extends PartialType(CreateIndustryCategoryDto) {}
