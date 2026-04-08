import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { OrganizationSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Recepcionista virtual para PYMES | Minute Call",
  description:
    "Servicio de atención telefónica con agentes nativos y asistentes de IA. Recepción de llamadas, filtrado, conversión de leads y gestión de citas para PYMES.",
  metadataBase: new URL("https://www.minute-call.com"),
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Minute Call",
    locale: "es_ES",
    type: "website",
    title: "Recepcionista virtual para PYMES | Minute Call",
    description:
      "Servicio de atención telefónica con agentes nativos y asistentes de IA para PYMES. Sin perder ni una llamada.",
    url: "https://www.minute-call.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Minute Call – Recepcionista virtual para PYMES",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recepcionista virtual para PYMES | Minute Call",
    description:
      "Servicio de atención telefónica con agentes nativos y asistentes de IA. Sin perder ni una llamada.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
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
        <OrganizationSchema />
      </head>
      <body className="min-h-full flex flex-col bg-[#EFEBE5]">
        <Nav />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
