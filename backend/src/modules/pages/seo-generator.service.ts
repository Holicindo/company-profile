import { Injectable, BadRequestException } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface SEOResult {
  title: string;
  description: string;
  keywords: string;
}

@Injectable()
export class SEOGeneratorService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // Initialize Gemini AI
    const apiKey = process.env.GEMINI_API_KEY || '';
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    }
  }

  async generateSEO(content: any, pageType: string): Promise<SEOResult> {
    if (!this.model) {
      throw new BadRequestException('Gemini API key tidak dikonfigurasi. Set GEMINI_API_KEY di environment variables.');
    }

    // Extract content text based on page type
    const contentText = this.extractContent(content, pageType);

    const prompt = `
Kamu adalah SEO expert yang ahli dalam optimasi search engine untuk website e-commerce Indonesia, khususnya untuk perusahaan B2B yang menjual showcase dan pendingin komersial.

KONTEN HALAMAN:
${contentText}

TUGAS:
Generate SEO metadata yang OPTIMAL untuk halaman ini dengan kriteria:

1. SEO TITLE (WAJIB max 60 karakter):
   - Harus include keyword utama di awal
   - Menarik dan memicu click
   - Include brand "Holicindo" di akhir
   - Contoh: "Showcase Komersial Premium | Holicindo"

2. SEO DESCRIPTION (WAJIB max 160 karakter):
   - Ringkas tapi compelling
   - Include 2-3 keywords penting
   - Ada call-to-action atau benefit
   - Gunakan angka/tahun jika relevan (misal: "sejak 2001")
   - Contoh: "Spesialis showcase & chiller sejak 2001. Solusi pendingin untuk F&B, retail & farmasi. Garansi resmi, kirim seluruh Indonesia."

3. KEYWORDS (5-7 keywords, pisahkan dengan koma):
   - Mix broad dan specific keywords
   - Include brand keyword
   - Include location keyword (Indonesia)
   - Contoh: "showcase komersial, kulkas display, chiller, pendingin komersial, holicindo, showcase indonesia"

PENTING:
- Title HARUS di bawah 60 karakter
- Description HARUS di bawah 160 karakter
- Fokus pada benefit untuk customer (pemilik restoran, kafe, toko)
- Bahasa Indonesia yang natural dan mudah dipahami
- Include unique selling points

FORMAT OUTPUT (WAJIB ikuti format ini):
TITLE: [your title here]
DESCRIPTION: [your description here]
KEYWORDS: [your keywords here]
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse response
      const parsed = this.parseGeminiResponse(text);
      return parsed;
    } catch (error) {
      console.error('Gemini API error:', error);
      // Fallback to simple generation
      return this.fallbackGenerate(contentText, pageType);
    }
  }

  private extractContent(content: any, pageType: string): string {
    let text = '';

    switch (pageType) {
      case 'beranda':
        text += `Title: ${content.mainHero?.title?.line1} ${content.mainHero?.title?.line2}\n`;
        text += `Subtitle: ${content.mainHero?.subtitle}\n`;
        text += `Hero: ${content.heroSection?.title}\n`;
        text += `Description: ${content.heroSection?.description}\n`;
        text += `Why Choose Us: ${content.whyChooseUs?.title}\n`;
        break;

      case 'tentang-kami':
        text += `Title: ${content.hero?.title}\n`;
        text += `Subtitle: ${content.hero?.subtitle}\n`;
        text += `History: ${content.history?.paragraph1}\n`;
        text += `Vision: ${content.vision?.title?.line1} ${content.vision?.title?.line2}\n`;
        break;

      case 'layanan':
        text += `Title: ${content.hero?.title}\n`;
        text += `Badge: ${content.hero?.badge}\n`;
        text += `Description: ${content.hero?.description}\n`;
        text += `Services: ${content.services?.title}\n`;
        break;

      default:
        text = JSON.stringify(content).substring(0, 1000);
    }

    return text;
  }

  private parseGeminiResponse(text: string): SEOResult {
    const lines = text.split('\n');
    let title = '';
    let description = '';
    let keywords = '';

    for (const line of lines) {
      if (line.startsWith('TITLE:')) {
        title = line.replace('TITLE:', '').trim();
      } else if (line.startsWith('DESCRIPTION:')) {
        description = line.replace('DESCRIPTION:', '').trim();
      } else if (line.startsWith('KEYWORDS:')) {
        keywords = line.replace('KEYWORDS:', '').trim();
      }
    }

    // Validate and truncate if needed
    if (title.length > 60) title = title.substring(0, 57) + '...';
    if (description.length > 160) description = description.substring(0, 157) + '...';

    return { title, description, keywords };
  }

  private fallbackGenerate(contentText: string, pageType: string): SEOResult {
    // Simple fallback if Gemini fails
    const title = contentText.split('\n')[0].substring(0, 50) + ' | Holicindo';
    const description = contentText.substring(0, 150).replace(/\n/g, ' ') + '...';
    const keywords = 'showcase komersial, pendingin komersial, holicindo, display cooler';

    return {
      title: title.substring(0, 60),
      description: description.substring(0, 160),
      keywords,
    };
  }
}
