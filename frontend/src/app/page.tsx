import { HeroSection } from '@/components/home/HeroSection';
import { ProductCategoriesSection } from '@/components/home/ProductCategoriesSection';
import { FeaturedProductsSection } from '@/components/home/FeaturedProductsSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { LatestNewsSection } from '@/components/home/LatestNewsSection';
import { CTASection } from '@/components/home/CTASection';
import { getProductCategories, getFeaturedProducts, getFeaturedPortfolio, getLatestBlogPosts } from '@/lib/api';

export const revalidate = 3600;

async function getData() {
  try {
    const [categories, featuredProducts, portfolio, latestNews] = await Promise.all([
      getProductCategories(), getFeaturedProducts(8), getFeaturedPortfolio(6), getLatestBlogPosts(3),
    ]);
    return { categories, featuredProducts, portfolio, latestNews };
  } catch {
    return { categories: [], featuredProducts: [], portfolio: [], latestNews: [] };
  }
}

export default async function HomePage() {
  const { categories, featuredProducts, portfolio, latestNews } = await getData();
  return (
    <>
      <HeroSection />
      <ProductCategoriesSection categories={categories} />
      <FeaturedProductsSection products={featuredProducts} />
      <WhyChooseUsSection />
      <ProjectsSection projects={portfolio} />
      <LatestNewsSection posts={latestNews} />
      <CTASection />
    </>
  );
}
