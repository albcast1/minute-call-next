import { Metadata } from "next";
import Link from "next/link";
import articles from "@/data/articles.json";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {};
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <h1>Artículo no encontrado</h1>
        <p style={{ marginTop: 16 }}>
          <Link href="/" style={{ color: "black", textDecoration: "underline" }}>
            Volver al inicio
          </Link>
        </p>
      </div>
    );
  }

  const relatedArticles = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 80px" }}>
      {/* Back Link */}
      <Link
        href="/"
        style={{ fontSize: 14, color: "rgba(0,0,0,0.56)", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32 }}
      >
        ← Volver
      </Link>

      {/* Article Header */}
      <h1 style={{ marginBottom: 16, fontSize: 32, letterSpacing: "-1.5px", lineHeight: "38px" }}>{article.title}</h1>
      <p style={{ fontSize: 16, marginBottom: 48, lineHeight: "24px" }}>{article.excerpt}</p>

      {/* Article Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {article.content.split("\n\n").map((paragraph, index) => (
          <p key={index} style={{ margin: 0 }}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section style={{ marginTop: 80 }}>
          <h2 style={{ fontSize: 22, letterSpacing: "-0.8px", lineHeight: "28px", marginBottom: 24 }}>
            Otros artículos
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {relatedArticles.map((related) => (
              <Link key={related.slug} href={`/articulos/${related.slug}`}>
                <div className="card" style={{ padding: 24, height: "100%" }}>
                  <h3 style={{ fontSize: 18, marginBottom: 8 }}>{related.title}</h3>
                  <p className="service-card-body">{related.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* No CTA section - "No pierdas" text is only in the footer */}
    </div>
  );
}
