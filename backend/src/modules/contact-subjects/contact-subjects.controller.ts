import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ContactSubjectsService } from './contact-subjects.service';
import { CreateContactSubjectDto } from './dto/create-contact-subject.dto';
import { UpdateContactSubjectDto } from './dto/update-contact-subject.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/contact-subjects')
export class ContactSubjectsController {
  constructor(private readonly subjectsService: ContactSubjectsService) {}

  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  findAllAdmin() {
    return this.subjectsService.findAllAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin')
  create(@Body() createDto: CreateContactSubjectDto) {
    return this.subjectsService.create(createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/:id')
  update(@Param('id') id: string, @Body() updateDto: UpdateContactSubjectDto) {
    return this.subjectsService.update(+id, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/reorder')
  reorder(@Body('ids') ids: number[]) {
    return this.subjectsService.reorder(ids);
  }
}
