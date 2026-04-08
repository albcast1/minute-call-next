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
    logo: 'https://framerusercontent.com/images/ovXvDkQi2KTHjwV1Nl9n9WlloRI.png',
    description: 'Servicio de atenciÃ³n telefÃ³nica 24/7 para PYMES con agentes nativos y asistentes de IA',
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
