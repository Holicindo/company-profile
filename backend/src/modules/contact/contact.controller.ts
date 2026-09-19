import { Controller, Post, Get, Patch, Delete, Body, Param, Query, UseGuards, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InquiryStatus } from './entities/contact-inquiry.entity';

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
    const validStatuses = Object.values(InquiryStatus);
    if (!validStatuses.includes(body.status as InquiryStatus)) {
      throw new BadRequestException(`Status tidak valid. Gunakan salah satu: ${validStatuses.join(', ')}`);
    }
    return this.svc.updateStatus(id, body.status as InquiryStatus);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/:id')
  deleteInquiry(@Param('id', ParseIntPipe) id: number) {
    return this.svc.deleteInquiry(id);
  }
}
