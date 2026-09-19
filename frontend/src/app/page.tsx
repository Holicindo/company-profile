import type { Metadata } from 'next';
import { MainHero } from '@/components/home/MainHero';
import { HeroSection } from '@/components/home/HeroSection';
import { ProductCategoriesSection } from '@/components/home/ProductCategoriesSection';
import { FeaturedProductsSection } from '@/components/home/FeaturedProductsSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { ClientsMarquee } from '@/components/home/ClientsMarquee';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { getProductCategories, getFeaturedProducts, getFeaturedPortfolio, getPageBySlug } from '@/lib/api';
import { generatePageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('beranda', {
    title: 'Holicindo | Spesialis Showcase & Pendingin Komersial untuk HORECA Indonesia',
    description: 'Holicindo adalah spesialis showcase kue, chiller komersial, dan refrigerator industri terpercaya di Indonesia. Solusi pendingin & display premium untuk restoran, hotel, bakery, dan kafe.',
    keywords: 'showcase komersial, kulkas display, pendingin komersial, display cooler, cake showcase, chiller komersial',
  });
}

// Force dynamic so admin updates reflect immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getData() {
  try {
    const [categories, featuredProducts, portfolio, berandaPage] = await Promise.all([
      getProductCategories().catch(() => []),
      getFeaturedProducts(8).catch(() => []),
      getFeaturedPortfolio(6).catch(() => []),
      getPageBySlug('beranda').catch(() => null),
    ]);
    return { categories, featuredProducts, portfolio, sections: berandaPage?.sections };
  } catch {
    return { categories: [], featuredProducts: [], portfolio: [], sections: null };
  }
}

export default async function HomePage() {
  const { categories, featuredProducts, portfolio, sections } = await getData();
  return (
    <>
      <MainHero initialData={sections?.mainHero} />
      <HeroSection initialData={sections?.heroSection} />

      <ProductCategoriesSection categories={categories} />
      <FeaturedProductsSection products={featuredProducts} />
      <WhyChooseUsSection initialData={sections?.whyChooseUs} />
      <ProjectsSection projects={portfolio} />
    </>
  );
}

