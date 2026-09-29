import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSettings } from './entities/site-settings.entity';
import { UpdateSiteSettingsDto } from './dto/update-site-settings.dto';

@Injectable()
export class SiteSettingsService {
  constructor(
    @InjectRepository(SiteSettings)
    private siteSettingsRepository: Repository<SiteSettings>,
  ) {}

  async getSettings(): Promise<SiteSettings> {
    // Always return the first (and only) settings record
    let settings = await this.siteSettingsRepository.findOne({ where: { id: 1 } });
    
    // If no settings exist, create default one
    if (!settings) {
      settings = this.siteSettingsRepository.create({
        id: 1,
        whatsapp: '+6281111825718',
        email: 'info@holicindo.com',
        address: 'Green Sedayu Bizpark Blok GSB No. 016, Jl. Cakung Cilincing Tim. No. Raya, Cakung Tim., Jakarta Timur 13910',
        googleMapsLink: 'https://maps.app.goo.gl/bYT5nUqigmC3iS3SA',
        googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.8857544960757!2d106.96281097475954!3d-6.145877393846697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698b04e03ab2a5%3A0x7889a417c00bdb0f!2sGreen%20Sedayu%20Bizpark!5e0!3m2!1sid!2sid!4v1708000000000!5m2!1sid!2sid',
        facebookUrl: 'https://web.facebook.com/holicindo.id',
        instagramUrl: 'https://www.instagram.com/holicindo.id?igsi=MTZqYmh4bzNmaGwzcw==',
        youtubeUrl: 'https://youtube.com/@holicindo?si=WnStCOlV6evmhiPi',
        linkedinUrl: 'https://www.linkedin.com/company/pt-holicindo-dasa-anugerah/',
        operatingHours: {
          monday: '08:00 – 17:00',
          tuesday: '08:00 – 17:00',
          wednesday: '08:00 – 17:00',
          thursday: '08:00 – 17:00',
          friday: '08:00 – 17:00',
          saturday: '08:00 – 15:00',
          sunday: 'Closed',
        },
        companyTagline: 'Spesialis showcase kue, chiller komersial, dan refrigerator industri untuk HORECA Indonesia.',
        ctaHeading: 'Siap Mengembangkan Bisnis Anda?',
        ctaDescription: 'Konsultasikan spesifikasi mesin dan kebutuhan peralatan industri kuliner Anda langsung dengan ahlinya. Chat tim kami sekarang.',
      });
      await this.siteSettingsRepository.save(settings);
    }
    
    return settings;
  }

  async updateSettings(updateDto: UpdateSiteSettingsDto): Promise<SiteSettings> {
    let settings = await this.siteSettingsRepository.findOne({ where: { id: 1 } });
    
    if (!settings) {
      settings = this.siteSettingsRepository.create({ id: 1, ...updateDto });
    } else {
      Object.assign(settings, updateDto);
    }
    
    return this.siteSettingsRepository.save(settings);
  }
}
