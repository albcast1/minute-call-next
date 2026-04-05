import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Atención telefónica para PYMES",
  description:
    "Servicio de atención telefónica con agentes nativos y asistentes de IA. Recepción de llamadas, filtrado, conversión de leads, y gestión de citas.",
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
      </head>
      <body className="min-h-full flex flex-col bg-[#EFEBE5]">
        <Nav />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
