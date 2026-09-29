import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class CreateContactSubjectDto {
  @IsString()
  label_id: string;

  @IsString()
  label_en: string;

  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
