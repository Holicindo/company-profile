import { Controller, Get, Post, Patch, Delete, Param, Query, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('blog')
export class BlogController {
  constructor(private readonly svc: BlogService) {}

  @Get('latest')
  getLatest(@Query('limit') limit?: string) { return this.svc.getLatestPosts(limit ? +limit : 3); }

  @Get()
  getPosts(@Query('page') page?: string, @Query('limit') limit?: string, @Query('search') search?: string) {
    return this.svc.getPosts(page ? +page : 1, limit ? +limit : 10, search);
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) { return this.svc.getPostBySlug(slug); }

  @UseGuards(JwtAuthGuard)
  @Get('admin/all')
  getAllAdmin(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.svc.getAllForAdmin(page ? +page : 1, limit ? +limit : 20);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin')
  createPost(@Body() dto: CreateBlogPostDto) { return this.svc.createPost(dto); }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/:id')
  updatePost(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreateBlogPostDto>) {
    return this.svc.updatePost(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/:id')
  deletePost(@Param('id', ParseIntPipe) id: number) { return this.svc.deletePost(id); }
}
