import type { Metadata } from 'next';
import { MainHero } from '@/components/home/MainHero';
import { HeroSection } from '@/components/home/HeroSection';
import { ProductCategoriesSection } from '@/components/home/ProductCategoriesSection';
import { FeaturedProductsSection } from '@/components/home/FeaturedProductsSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { ClientsMarquee } from '@/components/home/ClientsMarquee';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { getProductCategories, getFeaturedProducts, getFeaturedPortfolio } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Holicindo | Spesialis Showcase & Pendingin Komersial untuk HORECA Indonesia',
  description: 'Holicindo adalah spesialis showcase kue, chiller komersial, dan refrigerator industri terpercaya di Indonesia. Solusi pendingin & display premium untuk restoran, hotel, bakery, dan kafe.',
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
