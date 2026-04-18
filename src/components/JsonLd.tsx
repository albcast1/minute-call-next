import React from 'react';

/**
 * OrganizationSchema Component
 * Outputs Organization schema for minute call.
 * Incluye founders (Person) + knowsAbout para reforzar E-E-A-T y AEO.
 */
export const OrganizationSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.minute-call.com/#organization',
    name: 'minute call',
    alternateName: 'Minute Call',
    url: 'https://www.minute-call.com',
    logo: 'https://www.minute-call.com/og-image.png',
    image: 'https://www.minute-call.com/og-image.png',
    description: 'Servicio de recepcionista virtual y atención telefónica 24/7 para PYMES en España. Agentes nativos o IA. Sin permanencia. Desde 250 €/mes.',
    foundingDate: '2024',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
    address: { '@type': 'PostalAddress', addressCountry: 'ES', addressLocality: 'Madrid' },
    areaServed: { '@type': 'Country', name: 'España' },
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', url: 'https://www.minute-call.com/reserva-llamada', availableLanguage: ['Spanish', 'English', 'French'] },
    sameAs: ['https://www.linkedin.com/company/minute-call/', 'https://es.trustpilot.com/review/minute-call.com'],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.4', reviewCount: '12', bestRating: '5' },
    knowsAbout: ['Atención telefónica 24/7', 'Recepcionista virtual', 'Call center para PYMES', 'IA conversacional', 'BPO y externalización', 'Cualificación de leads'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Planes de recepcionista virtual',
      itemListElement: [
        { '@type': 'Offer', name: 'Plan Starter', price: '250', priceCurrency: 'EUR' },
        { '@type': 'Offer', name: 'Plan Business', price: '490', priceCurrency: 'EUR' },
        { '@type': 'Offer', name: 'Plan Enterprise', price: '890', priceCurrency: 'EUR' },
      ],
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  id?: string;
  description?: string;
  sameAs?: string[];
  knowsAbout?: string[];
}

export const PersonSchema: React.FC<PersonSchemaProps> = ({
  name,
  jobTitle,
  sameAs = [],
  id,
  description,
  knowsAbout = [],
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    ...(id ? { '@id': id } : {}),
    name,
    jobTitle,
    ...(description ? { description } : {}),
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://www.minute-call.com/#organization',
      name: 'minute call',
      url: 'https://www.minute-call.com',
    },
    ...(knowsAbout.length ? { knowsAbout } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * LocalBusinessSchema Component
 * Outputs LocalBusiness schema for local SEO and AEO
 * NOW INCLUDES: AggregateRating for rich-snippet eligibility
 */
export const LocalBusinessSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.minute-call.com/#localbusiness',
    name: 'minute call',
    url: 'https://www.minute-call.com',
    logo: 'https://www.minute-call.com/og-image.png',
    image: 'https://www.minute-call.com/og-image.png',
    description:
      'Servicio de atención telefónica 24/7 para PYMES. Recepcionistas nativos y asistentes de IA. Sin permanencia.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    areaServed: [
      { '@type': 'Country', name: 'España' },
    ],
    priceRange: '€€',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English', 'French'],
    },
    sameAs: [
      'https://www.linkedin.com/company/minute-call/',
      'https://es.trustpilot.com/review/minute-call.com',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.4',
      reviewCount: '12',
      bestRating: '5',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * HowToSchema Component
 * Outputs HowTo schema for the "Cómo funciona" section
 */
interface HowToStep {
  name: string;
  text: string;
}

interface HowToSchemaProps {
  steps: HowToStep[];
}

export const HowToSchema: React.FC<HowToSchemaProps> = ({ steps }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Cómo funciona el servicio de recepcionista virtual de Minute Call',
    description:
      'Activa tu recepcionista virtual en 3 sencillos pasos: define el flujo, recibe llamadas y gestiona citas automáticamente.',
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * ServiceSchema Component
 * Outputs Service schema for each core offering
 * NOW INCLUDES: hasOfferCatalog with pricing tiers
 */
interface ServiceItem {
  name: string;
  description: string;
}

interface ServiceSchemaProps {
  services: ServiceItem[];
}

export const ServiceSchema: React.FC<ServiceSchemaProps> = ({ services }) => {
  const schema = services.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.description,
    provider: {
      '@type': 'Organization',
      name: 'minute call',
      url: 'https://www.minute-call.com',
    },
    areaServed: { '@type': 'Country', name: 'España' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceType: 'Atención telefónica',
    },
  }));

  return (
    <>
      {schema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
};

/**
 * FAQPageSchema Component
 * Accepts an array of FAQs and outputs FAQPage schema
 */
interface FAQ {
  question: string;
  answer: string;
}

interface FAQPageSchemaProps {
  faqs: FAQ[];
}

export const FAQPageSchema: React.FC<FAQPageSchemaProps> = ({ faqs }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * ArticleSchema Component
 * Accepts article metadata and outputs Article schema with Person as author (E-E-A-T)
 */
interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished?: string;
  dateModified?: string;
}

export const ArticleSchema: React.FC<ArticleSchemaProps> = ({
  title,
  description,
  slug,
  datePublished,
  dateModified,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: `https://www.minute-call.com/articulos/${slug}`,
    datePublished: datePublished,
    ...(dateModified && { dateModified }),
    author: {
      '@type': 'Person',
      '@id': 'https://www.minute-call.com/#alberto-castiel',
      name: 'Alberto Castiel',
      jobTitle: 'Co-fundador de minute call',
      url: 'https://www.minute-call.com/sobre-nosotros',
      sameAs: ['https://www.linkedin.com/in/alberto-castiel/'],
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://www.minute-call.com/#organization',
        name: 'minute call',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'minute call',
      url: 'https://www.minute-call.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.minute-call.com/og-image.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.minute-call.com/articulos/${slug}`,
    },
    inLanguage: 'es',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * ReviewSchema Component
 * Outputs Review schema for testimonials - improves rich snippet eligibility
 */
interface ReviewSchemaProps {
  authorName: string;
  authorRole: string;
  reviewBody: string;
  ratingValue?: number;
}

export const ReviewSchema: React.FC<ReviewSchemaProps> = ({
  authorName,
  authorRole,
  reviewBody,
  ratingValue = 5,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'minute call',
    },
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole,
    },
    reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue,
      bestRating: 5,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * BreadcrumbSchema Component
 * Accepts an array of breadcrumb items and outputs BreadcrumbList schema
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({
  items,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http')
        ? item.url
        : `https://www.minute-call.com${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * WebPageSchema Component (NEW)
 * Outputs WebPage schema for pSEO landing pages - improves AEO
 */
interface WebPageSchemaProps {
  name: string;
  description: string;
  url: string;
  breadcrumb?: BreadcrumbItem[];
}

export const WebPageSchema: React.FC<WebPageSchemaProps> = ({
  name,
  description,
  url,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: url.startsWith('http') ? url : `https://www.minute-call.com${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'minute call',
      url: 'https://www.minute-call.com',
    },
    provider: {
      '@type': 'Organization',
      name: 'minute call',
      url: 'https://www.minute-call.com',
    },
    inLanguage: 'es',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
