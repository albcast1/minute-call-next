import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
// import WhatsAppButton from "@/components/WhatsAppButton"; // oculto temporalmente mientras WhatsApp revisa la cuenta
import { OrganizationSchema } from "@/components/JsonLd";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Minute Call | Call Center para PYMES",
  description:
    "Servicio de call center para PYMES con agentes nativos. Recepción de llamadas, cualificación de leads y gestión de citas 24/7. Sin permanencia, activo en 48h.",
  metadataBase: new URL("https://www.minute-call.com"),
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Minute Call",
    locale: "es_ES",
    type: "website",
    title: "Minute Call | Call Center para PYMES",
    description:
      "Servicio de call center para PYMES con agentes nativos. Recepción de llamadas, cualificación de leads y gestión de citas 24/7. Sin permanencia.",
    url: "https://www.minute-call.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Minute Call – Call center y atención telefónica para PYMES",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Minute Call | Call Center para PYMES",
    description:
      "Call center para PYMES con agentes nativos. Recepción de llamadas, cualificación de leads y gestión de citas 24/7.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  verification: {
    google: "D74asjvd2UZXLC_Id_bfCiQd-uWP0n0rr547fquxZTo",
  },
};


const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.minute-call.com/#website',
  name: 'minute call',
  url: 'https://www.minute-call.com',
  description: 'Servicio de atencion telefonica 24/7 para PYMES en Espana. Agentes nativos o IA. Sin permanencia.',
  inLanguage: 'es',
  publisher: {
    '@type': 'Organization',
    '@id': 'https://www.minute-call.com/#organization',
    name: 'minute call',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.minute-call.com/lp/{search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://framerusercontent.com" />
        {/* Google Tag Manager */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GTM-5D6TB4DZ"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GTM-5D6TB4DZ');
            `,
          }}
        />
        
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://www.minute-call.com/#localbusiness-rating',
        name: 'minute call',
        description: 'Servicio de call center y atencion telefonica 24/7 para PYMES en Espana. Agentes nativos o IA.',
        url: 'https://www.minute-call.com',
        areaServed: { '@type': 'Country', name: 'Espana', sameAs: 'https://www.wikidata.org/wiki/Q29' },
        priceRange: '€€',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          bestRating: '5',
          worstRating: '1',
          ratingCount: '13',
          reviewCount: '13',
        },
        sameAs: [
          'https://www.trustpilot.com/review/minute-call.com',
          'https://es.linkedin.com/company/minute-call',
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <OrganizationSchema />
        
      {/* @graph unificado - mejora comprensión de entidad por Google y LLMs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://www.minute-call.com/#organization",
                "name": "minute call",
                "url": "https://www.minute-call.com",
                "logo": { "@type": "ImageObject", "url": "https://www.minute-call.com/logo.png" },
                "sameAs": [
                  "https://es.trustpilot.com/review/minute-call.com",
                  "https://www.llamadaperdida.es",
                  "https://es.linkedin.com/company/minute-call"
                ],
                
              },
              {
                "@type": "WebSite",
                "@id": "https://www.minute-call.com/#website",
                "url": "https://www.minute-call.com",
                "name": "minute call",
                "publisher": { "@id": "https://www.minute-call.com/#organization" },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": { "@type": "EntryPoint", "urlTemplate": "https://www.minute-call.com/articulos?search={search_term_string}" },
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "Service",
                "@id": "https://www.minute-call.com/#service",
                "name": "Call center y atencion telefonica para PYMES",
                "provider": { "@id": "https://www.minute-call.com/#organization" },
                "description": "Servicio de call center y atencion telefonica 24/7 para PYMES en Espana. Agentes nativos o IA. Sin permanencia.",
                "areaServed": { "@type": "Country", "name": "Espana", "identifier": "ES" }
              }
            ]
          })
        }}
      />
        
      </head>
      <body className="min-h-full flex flex-col bg-[#EFEBE5]">
        <Nav />
        <main className="flex-grow">{children}</main>
        {/* <WhatsAppButton /> */}  {/* oculto temporalmente mientras WhatsApp revisa la cuenta */}
        <Footer />
      </body>
    </html>
  );
}
