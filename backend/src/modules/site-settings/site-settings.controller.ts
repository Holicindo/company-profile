import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { SiteSettingsService } from './site-settings.service';
import { UpdateSiteSettingsDto } from './dto/update-site-settings.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/site-settings')
export class SiteSettingsController {
  constructor(private readonly siteSettingsService: SiteSettingsService) {}

  @Get()
  getSettings() {
    return this.siteSettingsService.getSettings();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateSettings(@Body() updateDto: UpdateSiteSettingsDto) {
    return this.siteSettingsService.updateSettings(updateDto);
  }
}
