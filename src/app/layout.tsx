import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

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
        
      {/* JSON-LD unificado.
          Antes se inyectaban CUATRO bloques en cada pagina: Organization
          definida 3 veces bajo el mismo @id con logo y sameAs distintos,
          WebSite 2 veces con dos SearchAction que apuntaban a buscadores que
          no existen, y aggregateRating auto-declarado (5,0 de 13 resenas), que
          Google no muestra y es motivo de accion manual. Un solo @graph
          coherente, sin valoraciones propias y sin SearchAction falso. */}
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
                "alternateName": "Minute Call",
                "url": "https://www.minute-call.com",
                "logo": { "@type": "ImageObject", "url": "https://www.minute-call.com/logo.png" },
                "image": "https://www.minute-call.com/og-image.png",
                "description":
                  "Servicio de recepcionista virtual y atención telefónica 24/7 para pymes en España. Agentes nativos o IA, sin permanencia.",
                "foundingDate": "2024",
                // Direccion segun el aviso legal. Antes el schema decia Madrid
                // y el aviso legal Malaga: una contradiccion que penaliza la
                // fiabilidad de la entidad ante Google y ante los LLM.
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "ES",
                  "addressLocality": "Málaga",
                  "addressRegion": "Andalucía"
                },
                "areaServed": { "@type": "Country", "name": "España" },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "url": "https://www.minute-call.com/reserva-llamada",
                  "availableLanguage": ["Spanish", "English", "French"]
                },
                "sameAs": [
                  "https://es.trustpilot.com/review/minute-call.com",
                  "https://es.linkedin.com/company/minute-call"
                ],
                "knowsAbout": [
                  "Atención telefónica 24/7",
                  "Recepcionista virtual",
                  "Call center para pymes",
                  "IA conversacional",
                  "BPO y externalización",
                  "Cualificación de leads"
                ]
              },
              {
                "@type": "WebSite",
                "@id": "https://www.minute-call.com/#website",
                "url": "https://www.minute-call.com",
                "name": "minute call",
                "inLanguage": "es",
                "publisher": { "@id": "https://www.minute-call.com/#organization" }
              },
              {
                "@type": "Service",
                "@id": "https://www.minute-call.com/#service",
                "name": "Atención telefónica y recepcionista virtual para pymes",
                "serviceType": "Atención telefónica externalizada",
                "provider": { "@id": "https://www.minute-call.com/#organization" },
                "description":
                  "Agentes nativos en España o IA atienden las llamadas de tu empresa, gestionan citas y cualifican leads. Sin permanencia, activo en 48 horas.",
                "areaServed": { "@type": "Country", "name": "España" }
              }
            ]
          })
        }}
      />

      </head>
      <body className="min-h-full flex flex-col bg-[#EFEBE5]">
        <Nav />
        <main className="flex-grow">{children}</main>
        <WhatsAppButton />
        <Footer />
        {/* Analitica propia: mide visitas reales sin depender de Search Console,
            que es lo que dejo de registrar datos entre el 28 de agosto y la
            reverificacion de la propiedad. Sin cookies y sin datos personales. */}
        <Analytics />
      </body>
    </html>
  );
}
