/**
 * Transforms raw HTML content from WordPress / database into clean HTML
 * with responsive embedded YouTube video players and fixed image URLs.
 */
export function parseHtmlContent(html: string | null | undefined): string {
  if (!html) return '';

  // Fix double slashes in holicindo image URLs
  let cleaned = html.replace(/https:\/\/holicindo\.com\/\//g, 'https://holicindo.com/');

  // Replace WordPress Youtube block embeds, raw URLs, and [embed] Youtube tags
  // Example 1: <!-- wp:core-embed/youtube ... -->https://www.youtube.com/watch?v=XYZ<!-- /wp:core-embed/youtube -->
  // Example 2: [embed]https://www.youtube.com/watch?v=XYZ[/embed]
  // Example 3: https://www.youtube.com/watch?v=XYZ
  // Example 4: https://youtu.be/XYZ
  
  // First match [embed] tags
  cleaned = cleaned.replace(/\[embed\]https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)[^\[]*\[\/embed\]/gi, (_, id) => {
    return `<div class="my-6 relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
      <iframe src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="absolute inset-0 w-full h-full"></iframe>
    </div>`;
  });

  // Next match WordPress core-embed youtube figures or remaining raw youtube URLs in content
  cleaned = cleaned.replace(/<figure[^>]*class="[^"]*wp-block-embed-youtube[^"]*"[^>]*>[\s\S]*?(?:https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+))[[\s\S]*?<\/figure>/gi, (_, id) => {
    return `<div class="my-6 relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
      <iframe src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="absolute inset-0 w-full h-full"></iframe>
    </div>`;
  });

  // Replace remaining raw youtube link paragraphs or text
  cleaned = cleaned.replace(/(?:<p>)?\s*https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)[^\s<]*\s*(?:<\/p>)?/gi, (_, id) => {
    return `<div class="my-6 relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
      <iframe src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="absolute inset-0 w-full h-full"></iframe>
    </div>`;
  });

  // Remove WordPress Gutenberg block comments <!-- wp:... -->
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

  return cleaned;
}

/**
 * Strips WordPress Gutenberg block comments, image HTML tags, and raw markup
 * returning clean, human-readable Indonesian text for project descriptions.
 */
export function sanitizeProjectDescription(desc: string | null | undefined, title?: string, clientName?: string): string {
  if (!desc) {
    return `Proyek pengadaan dan instalasi peralatan mesin industri F&B oleh Holicindo${clientName ? ` untuk ${clientName}` : ''}. Dirancang untuk meningkatkan efisiensi operasional dan standar kualitas produk.`;
  }

  // Remove Gutenberg block comments <!-- wp:... -->
  let text = desc.replace(/<!--[\s\S]*?-->/g, '');

  // Remove WP image figure blocks <figure...>...</figure>
  text = text.replace(/<figure[\s\S]*?<\/figure>/gi, '');

  // Strip HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Clean HTML entities & whitespace
  text = text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/Bagaimana apakah anda juga tertarik[\s\S]*?www\.holicindo\.com/gi, '')
    .replace(/Contact Us\s*:[\s\S]*?www\.holicindo\.com/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text || text.length < 15 || text.includes('wp-block')) {
    return `Proyek pengadaan dan instalasi unit mesin komersial profesional oleh Holicindo${clientName ? ` untuk ${clientName}` : ''}${title && !clientName ? ` (${title})` : ''}. Membantu optimalisasi kapasitas produksi dan efisiensi operasional industri kuliner.`;
  }

  // 1. Direct translation for known English text (Maxx Coffee)
  if (text.toLowerCase().includes('holic showcase is especially suitable')) {
    text = text.replace(
      /Holic showcase is especially suitable for those who have high standards for their product displays\.? Maxx Coffee is one of those\.? Having various products in need of different storage conditions, Holic multi-temperature showcase offer the best solution\.?/gi,
      'Showcase Holic sangat cocok bagi mereka yang memiliki standar tinggi untuk tampilan produknya, salah satunya adalah Maxx Coffee. Dengan berbagai produk yang membutuhkan kondisi penyimpanan berbeda, showcase multi-temperatur Holic menawarkan solusi pendinginan terbaik.'
    );
  }

  // 2. Heuristic check for other English descriptions
  // If the text contains 3 or more common English stopwords, replace it with a professional Indonesian fallback.
  const englishStopwords = [' the ', ' is ', ' of ', ' and ', ' to ', ' for ', ' with ', ' this ', ' showcase '];
  const englishWordCount = englishStopwords.filter(word => text.toLowerCase().includes(word)).length;
  
  if (englishWordCount >= 3 && !text.toLowerCase().includes('yang')) {
    return `Proyek pengadaan dan instalasi unit mesin komersial profesional oleh Holicindo${clientName ? ` untuk ${clientName}` : ''}${title && !clientName ? ` (${title})` : ''}. Dirancang khusus untuk mengoptimalkan kapasitas penyimpanan, menjaga kualitas produk, dan meningkatkan efisiensi operasional bisnis.`;
  }

  return text;
}
