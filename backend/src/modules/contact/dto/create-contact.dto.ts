import { IsEmail, IsString, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsString() name: string;
  @IsEmail() email: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() company?: string;
  @IsString() subject: string;
  @IsString() message: string;
}
