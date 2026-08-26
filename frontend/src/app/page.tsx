import type { Metadata } from 'next';
import { MainHero } from '@/components/home/MainHero';
import { HeroSection } from '@/components/home/HeroSection';
import { ProductCategoriesSection } from '@/components/home/ProductCategoriesSection';
import { FeaturedProductsSection } from '@/components/home/FeaturedProductsSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { getProductCategories, getFeaturedProducts, getFeaturedPortfolio } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Holic | Penyedia Peralatan Dapur Komersial & Mesin F&B Terpercaya',
  description: 'Holic adalah penyedia peralatan dapur komersial terpercaya di Indonesia. Berpengalaman 20+ tahun menghadirkan mesin F&B berkualitas dengan garansi resmi.',
};

export const revalidate = 3600;

async function getData() {
  try {
    const [categories, featuredProducts, portfolio] = await Promise.all([
      getProductCategories(), getFeaturedProducts(8), getFeaturedPortfolio(6)
    ]);
    return { categories, featuredProducts, portfolio };
  } catch {
    return { categories: [], featuredProducts: [], portfolio: [] };
  }
}

export default async function HomePage() {
  const { categories, featuredProducts, portfolio } = await getData();
  return (
    <>
      <MainHero />
      <HeroSection />
      <ProductCategoriesSection categories={categories} />
      <FeaturedProductsSection products={featuredProducts} />
      <WhyChooseUsSection />
      <ProjectsSection projects={portfolio} />
    </>
  );
}
