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

  return cleaned;
}
