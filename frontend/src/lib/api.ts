import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : (typeof window !== 'undefined' ? '/api' : 'http://localhost:3011/api');

export const api = axios.create({ baseURL: API_BASE, timeout: 60000 });

export const getProducts = (p?: any) => api.get('/products', { params: p }).then(r => r.data);
export const getProductBySlug = (slug: string) => api.get(`/products/${slug}`).then(r => r.data);
export const getFeaturedProducts = (limit = 8) => api.get('/products/featured', { params: { limit } }).then(r => r.data);
const sanitizeCategory = (c: any) => {
  if (c && c.name) c.name = c.name.replace('PLEER &AMP; SLICER', 'PEELER & SLICER').replace(/&AMP;/gi, '&');
  if (c && c.parent) c.parent = sanitizeCategory(c.parent);
  return c;
};

export const getProductCategories = () => api.get('/products/categories').then(r => r.data.map(sanitizeCategory));
export const getProductCategoryBySlug = (slug: string) => api.get(`/products/categories/${slug}`).then(r => sanitizeCategory(r.data));

export const getPortfolio = (p?: any) => api.get('/portfolio', { params: p }).then(r => r.data);
export const getFeaturedPortfolio = (limit = 6) => api.get('/portfolio/featured', { params: { limit } }).then(r => r.data);
export const getPortfolioBySlug = (slug: string) => api.get(`/portfolio/${slug}`).then(r => r.data);

export const getBlogPosts = (p?: any) => {
  // Add lang parameter if not already present
  const params = { ...p };
  if (!params.lang && typeof window !== 'undefined') {
    const lang = localStorage.getItem('language') || 'ID';
    params.lang = lang.toLowerCase();
  }
  return api.get('/blog', { params }).then(r => r.data).catch(e => { console.error('Blog fetch error:', e.message, e.response?.data); throw e; });
};

export const getLatestBlogPosts = (limit = 3, lang?: string) => {
  const params: any = { limit };
  if (lang) params.lang = lang.toLowerCase();
  else if (typeof window !== 'undefined') {
    const storedLang = localStorage.getItem('language') || 'ID';
    params.lang = storedLang.toLowerCase();
  }
  return api.get('/blog/latest', { params }).then(r => r.data);
};

export const getBlogPostBySlug = (slug: string, lang?: string) => {
  const params: any = {};
  if (lang) params.lang = lang.toLowerCase();
  else if (typeof window !== 'undefined') {
    const storedLang = localStorage.getItem('language') || 'ID';
    params.lang = storedLang.toLowerCase();
  }
  return api.get(`/blog/${slug}`, { params }).then(r => r.data);
};

export const submitContact = (data: any) => api.post('/contact', data).then(r => r.data);

export const getPageBySlug = (slug: string) =>
  api.get(`/pages/slug/${slug}`).then(r => r.data).catch(() => null);

export function getImageUrl(url?: string | null): string {
  if (!url) return '';

  // Handle data URLs
  if (url.startsWith('data:')) {
    return url;
  }

  // Preserve AWS S3 URLs
  if (url.includes('amazonaws.com') || url.includes('cloudfront.net')) {
    return url;
  }

  // Handle WordPress legacy full URLs
  if (url.includes('/wp-content/uploads/')) {
    const match = url.match(/\/wp-content\/uploads\/(.+)$/);
    if (match) {
      // Fallback to S3 URL for robustness if not served locally
      return `https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/${match[1]}`;
    }
  }

  // Relative /uploads/ path → served directly by Next.js static assets
  if (url.startsWith('/uploads/')) {
    return url;
  }

  // Other absolute URLs pointing to holicindo.com/uploads/ → convert to S3
  if (url.startsWith('http://') || url.startsWith('https://')) {
    if (url.includes('/uploads/')) {
      const uploadMatch = url.match(/\/uploads\/(.+)$/);
      if (uploadMatch) return `https://holicindo-web-storage.s3.ap-southeast-1.amazonaws.com/uploads/${uploadMatch[1]}`;
    }
    // All other external absolute URLs → return as-is
    return url;
  }

  // Relative path with leading slash (e.g. /images/logo.png)
  if (url.startsWith('/')) {
    return url;
  }

  return `/${url}`;
}

