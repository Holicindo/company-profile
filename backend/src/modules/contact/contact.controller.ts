import { Controller, Post, Get, Patch, Delete, Body, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private readonly svc: ContactService) {}

  @Post()
  submit(@Body() dto: CreateContactDto) { return this.svc.submit(dto); }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  getAll(@Query('page') page?: string, @Query('limit') limit?: string, @Query('status') status?: string) {
    return this.svc.getAll(page ? +page : 1, limit ? +limit : 20, status);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/:id')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() body: { status: string }) {
    return this.svc.updateStatus(id, body.status);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/:id')
  deleteInquiry(@Param('id', ParseIntPipe) id: number) {
    return this.svc.deleteInquiry(id);
  }
}
