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

export const getBlogPosts = (p?: any) => api.get('/blog', { params: p }).then(r => r.data).catch(e => { console.error('Blog fetch error:', e.message, e.response?.data); throw e; });
export const getLatestBlogPosts = (limit = 3) => api.get('/blog/latest', { params: { limit } }).then(r => r.data);
export const getBlogPostBySlug = (slug: string) => api.get(`/blog/${slug}`).then(r => r.data);

export const submitContact = (data: any) => api.post('/contact', data).then(r => r.data);
