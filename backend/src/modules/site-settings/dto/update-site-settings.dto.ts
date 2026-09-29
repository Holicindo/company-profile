import { IsString, IsEmail, IsOptional, IsObject } from 'class-validator';

export class UpdateSiteSettingsDto {
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  googleMapsLink?: string;

  @IsOptional()
  @IsString()
  googleMapsEmbed?: string;

  @IsOptional()
  @IsString()
  facebookUrl?: string;

  @IsOptional()
  @IsString()
  instagramUrl?: string;

  @IsOptional()
  @IsString()
  youtubeUrl?: string;

  @IsOptional()
  @IsString()
  linkedinUrl?: string;

  @IsOptional()
  @IsObject()
  operatingHours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };

  @IsOptional()
  @IsString()
  companyTagline?: string;

  @IsOptional()
  @IsString()
  ctaHeading?: string;

  @IsOptional()
  @IsString()
  ctaDescription?: string;
}
