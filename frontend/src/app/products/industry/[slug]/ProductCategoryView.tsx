'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getIndustryCategoryProducts } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  slug: string;
  imageUrl: string | null;
  shortDescription: string | null;
}

interface Category {
  id: number;
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  descriptionEn: string;
  image: string | null;
}

interface Props {
  category: Category;
  searchParams: { page?: string; search?: string };
}

export default function ProductCategoryView({ category, searchParams }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const page = searchParams.page ? +searchParams.page : 1;

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const data = await getIndustryCategoryProducts(category.id);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category.id]);

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      
      {/* Minimalist Header */}
      <div className="relative border-b border-neutral-200 bg-neutral-50 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span
            className="font-black tracking-tighter leading-none text-black/[0.02] uppercase"
            style={{ fontSize: 'clamp(60px, 14vw, 200px)', whiteSpace: 'nowrap' }}
          >
            {category.name}
          </span>
        </div>

        <div className="relative z-10 container-wide">
          <nav className="mb-6">
            <Link 
              href="/products" 
              className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
            >
              ← Kembali ke Katalog
            </Link>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-3">
            {category.name}
          </h1>
          <p className="text-neutral-500 font-light max-w-2xl">
            {category.description}
          </p>
          {!loading && (
            <p className="text-neutral-400 text-sm mt-4">
              {products.length} produk tersedia
            </p>
          )}
        </div>
      </div>

      <div className="container-wide py-16">
        
        {loading ? (
          <div className="text-center py-32">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            <p className="text-neutral-500 mt-4 text-sm uppercase tracking-widest">Loading...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 border-t border-l border-neutral-200">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="bg-white border-b border-r border-neutral-200 group hover:border-black hover:shadow-lg transition-all duration-300 relative z-0 hover:z-10 block"
              >
                <div className="relative h-56 bg-white overflow-hidden p-6">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-neutral-300 text-[10px] font-bold uppercase tracking-[0.2em]">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-5 border-t border-neutral-100 bg-neutral-50/50">
                  <h3 className="text-sm font-light text-black group-hover:text-neutral-500 transition-colors leading-relaxed line-clamp-2">
                    {product.name}
                  </h3>
                  {product.shortDescription && (
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2 font-light">
                      {product.shortDescription.replace(/<[^>]*>/g, '')}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-neutral-50 border border-neutral-200">
            <p className="text-neutral-500 text-lg font-light mb-6">
              Belum ada produk yang terhubung ke kategori ini
            </p>
            <Link 
              href="/products" 
              className="inline-block px-8 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Lihat Semua Produk
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
