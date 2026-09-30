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
  
  // Handle WordPress legacy URLs - extract the path and serve from backend
  if (url.includes('/wp-content/uploads/')) {
    const backendBase = process.env.NEXT_PUBLIC_API_URL || 
      (typeof window !== 'undefined' && window.location.origin.includes('localhost') 
        ? 'http://localhost:3011' 
        : 'http://52.64.193.232:3011');
    const cleanBackend = backendBase.replace(/\/+$/, '').replace(/\/api$/, '');
    
    // Extract path after wp-content/uploads/ and serve from backend /uploads/
    const match = url.match(/\/wp-content\/uploads\/(.+)$/);
    if (match) {
      return `${cleanBackend}/uploads/${match[1]}`;
    }
  }
  
  // Handle absolute URLs (including full https://holicindo.com/... URLs)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // If it's our own domain with /uploads/, proxy through backend
    if ((url.includes('holicindo.com/uploads/') || url.includes('holicindo.com/wp-content/')) && !url.includes('52.64.193.232')) {
      const backendBase = process.env.NEXT_PUBLIC_API_URL || 
        (typeof window !== 'undefined' && window.location.origin.includes('localhost') 
          ? 'http://localhost:3011' 
          : 'http://52.64.193.232:3011');
      const cleanBackend = backendBase.replace(/\/+$/, '').replace(/\/api$/, '');
      
      // Extract path for /uploads/
      if (url.includes('/uploads/')) {
        const uploadMatch = url.match(/\/uploads\/(.+)$/);
        if (uploadMatch) {
          return `${cleanBackend}/uploads/${uploadMatch[1]}`;
        }
      }
      
      // Extract path for /wp-content/uploads/
      if (url.includes('/wp-content/uploads/')) {
        const wpMatch = url.match(/\/wp-content\/uploads\/(.+)$/);
        if (wpMatch) {
          return `${cleanBackend}/uploads/${wpMatch[1]}`;
        }
      }
    }
    
    // Other external URLs - return as is
    return url;
  }
  
  // Handle backend /uploads/ paths
  const backendBase = process.env.NEXT_PUBLIC_API_URL || 
    (typeof window !== 'undefined' && window.location.origin.includes('localhost') 
      ? 'http://localhost:3011' 
      : 'http://52.64.193.232:3011');
  const cleanBackend = backendBase.replace(/\/+$/, '').replace(/\/api$/, '');
  
  if (url.startsWith('/uploads/')) {
    return `${cleanBackend}${url}`;
  }
  
  if (url.startsWith('/')) {
    return url;
  }
  
  return `${cleanBackend}/${url}`;
}

