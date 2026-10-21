import { IsString, IsOptional, IsBoolean, IsInt, IsArray } from 'class-validator';

export class CreateSolutionDto {
  @IsString()
  name: string;

  @IsString()
  nameEn: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  productIds?: number[];
}
