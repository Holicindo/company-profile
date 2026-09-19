import { IsString, IsOptional, IsBoolean, IsArray, IsNumber, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  galleryUrls?: string[];

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  sku?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
