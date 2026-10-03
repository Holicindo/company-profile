import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { PostStatus } from '../entities/blog-post.entity';

export class CreateBlogPostDto {
  @IsString() title: string;
  @IsOptional() @IsString() titleEn?: string;
  @IsString() slug: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsOptional() @IsString() excerptEn?: string;
  @IsString() content: string;
  @IsOptional() @IsString() contentEn?: string;
  @IsOptional() @IsString() featuredImage?: string;
  @IsOptional() @IsEnum(PostStatus) status?: PostStatus;
  @IsOptional() @IsString() author?: string;
  @IsOptional() @IsArray() tags?: string[];
  @IsOptional() publishedAt?: Date;
}
