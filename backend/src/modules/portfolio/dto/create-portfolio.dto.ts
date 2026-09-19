import { IsString, IsOptional, IsBoolean, IsArray, IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  clientName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  projectDate?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  galleryUrls?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(255)
  location?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
