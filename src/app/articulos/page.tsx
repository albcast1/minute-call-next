import { Metadata } from "next";
import Link from "next/link";
import articles from "@/data/articles.json";
import { NOINDEX_ARTICLES } from "@/lib/seo/noindex";
import { BrandPage, Hero, Ed, CtaFinal } from "@/components/brand/Sections";

export const metadata: Metadata = {
  title: "Artículos | minute call",
  description:
    "Descubre artículos y guías sobre secretaría virtual, recepcionistas de IA y atención telefónica para PYMES.",
  alternates: {
    canonical: "/articulos",
  },
};

export default function ArticlesPage() {
  return (
    <BrandPage>
      <Hero
        tag="Artículos"
        title="Nuestros artículos."
        sub="Aprende todo sobre atención telefónica, secretaría virtual y cómo optimizar tu servicio al cliente."
        trust={false}
      />
      <Ed tag="Blog" flush={false}>
        <div className="dir-grid dir-articles">
          {articles.filter((a) => !NOINDEX_ARTICLES.has(a.slug)).map((article) => (
            <Link key={article.slug} href={`/articulos/${article.slug}`} className="dir-item">
              <b>{article.title}</b>
              <span>{article.excerpt}</span>
              <em>Leer más →</em>
            </Link>
          ))}
        </div>
      </Ed>
      <CtaFinal />
    </BrandPage>
  );
}
