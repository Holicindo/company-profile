import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
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
  getAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.svc.getAll(page ? +page : 1, limit ? +limit : 20);
  }
}
