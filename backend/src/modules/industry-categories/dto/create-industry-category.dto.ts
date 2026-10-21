import { IsString, IsOptional, IsBoolean, IsNumber, IsArray } from 'class-validator';

export class CreateIndustryCategoryDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  nameEn?: string;

  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  descriptionEn?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsOptional()
  displayOrder?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @IsOptional()
  productIds?: number[];
}
