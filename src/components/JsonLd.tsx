import React from 'react';

/**
 * OrganizationSchema Component
 * Outputs Organization schema for minute call
 */
export const OrganizationSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'minute call',
    url: 'https://www.minute-call.com',
    logo: 'https://www.minute-call.com/og-image.png',
    description:
      'Servicio de atención telefónica 24/7 para PYMES con agentes nativos y asistentes de IA',
    sameAs: ['https://www.linkedin.com/company/minute-call/'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English', 'French'],
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
 * LocalBusinessSchema Component
 * Outputs LocalBusiness schema for local SEO and AEO
 */
export const LocalBusinessSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
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
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English', 'French'],
    },
    sameAs: ['https://www.linkedin.com/company/minute-call/'],
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
 * Accepts article metadata and outputs Article schema with Organization as author
 */
interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished?: string;
}

export const ArticleSchema: React.FC<ArticleSchemaProps> = ({
  title,
  description,
  slug,
  datePublished,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: `https://www.minute-call.com/${slug}`,
    datePublished: datePublished,
    author: {
      '@type': 'Organization',
      name: 'minute call',
      url: 'https://www.minute-call.com',
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
 * ReviewSchema Component
 * Outputs Review schema for testimonials - improves rich snippet eligibility
 */
interface ReviewSchemaProps {
  authorName: string;
  authorRole: string;
  reviewBody: string;
  ratingValue?: number;
}

export const ReviewSchema: React.FC<ReviewSchemaProps> = ({ authorName, authorRole, reviewBody, ratingValue = 5 }) => {
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

export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
