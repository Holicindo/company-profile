export interface ProductCategory {
  id: number; slug: string; name: string;
  description?: string; imageUrl?: string;
  parentId?: number; parent?: ProductCategory; children?: ProductCategory[];
}
export interface Product {
  id: number; slug: string; name: string;
  description?: string; shortDescription?: string;
  imageUrl?: string; galleryUrls?: string[];
  categoryId?: number; category?: ProductCategory;
  sku?: string; isFeatured: boolean; isActive: boolean; createdAt: string;
}
export interface Portfolio {
  id: number; slug: string; title: string;
  description?: string; clientName?: string; projectDate?: string;
  imageUrl?: string; galleryUrls?: string[];
  location?: string; isActive: boolean; createdAt: string;
}
export interface BlogPost {
  id: number; slug: string; title: string;
  excerpt?: string; content: string; featuredImage?: string;
  status: 'draft' | 'published'; author?: string;
  tags?: string[]; publishedAt: string; createdAt: string;
}
export interface PaginatedResponse<T> {
  items: T[]; total: number; page: number; limit: number; totalPages: number;
}
