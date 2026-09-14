import { IsString, IsObject, IsOptional } from 'class-validator';

export class CreatePageDto {
  @IsString()
  slug: string;

  @IsString()
  title: string;

  @IsObject()
  sections: any;

  @IsOptional()
  @IsObject()
  metadata?: any;

  @IsOptional()
  @IsString()
  status?: string;
}
