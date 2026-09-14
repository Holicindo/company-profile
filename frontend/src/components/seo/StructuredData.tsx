import Script from 'next/script';

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PT Holicindo Dasa Anugerah',
    alternateName: 'Holicindo',
    url: 'https://holicindo.com',
    logo: 'https://holicindo.com/logo.png',
    description: 'Spesialis showcase & pendingin komersial sejak 2001. Solusi display berkualitas premium untuk bisnis F&B, retail, dan farmasi di seluruh Indonesia.',
    foundingDate: '2001',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
      addressLocality: 'Indonesia',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+62-21-xxx-xxxx',
      email: 'info@holicindo.com',
    },
    sameAs: [
      'https://www.facebook.com/holicindo',
      'https://www.instagram.com/holicindo',
      'https://www.linkedin.com/company/holicindo',
    ],
  };

  return <StructuredData data={schema} />;
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData data={schema} />;
}

// Product Schema
interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  brand?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
    availability?: string;
  };
}

export function ProductSchema({ name, description, image, brand = 'Holicindo', offers }: ProductSchemaProps) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
  };

  if (offers) {
    schema.offers = {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency || 'IDR',
      availability: offers.availability || 'https://schema.org/InStock',
    };
  }

  return <StructuredData data={schema} />;
}

// Article Schema (for blog posts)
interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}

export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = 'Holicindo',
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Holicindo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://holicindo.com/logo.png',
      },
    },
  };

  return <StructuredData data={schema} />;
}
