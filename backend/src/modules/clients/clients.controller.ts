import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  findAllAdmin() {
    return this.clientsService.findAllAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin')
  create(@Body() createDto: CreateClientDto) {
    return this.clientsService.create(createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/:id')
  update(@Param('id') id: string, @Body() updateDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/reorder')
  reorder(@Body('ids') ids: number[]) {
    return this.clientsService.reorder(ids);
  }
}
