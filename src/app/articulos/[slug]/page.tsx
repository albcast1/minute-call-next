import { Metadata } from "next";
import Link from "next/link";
import articles from "@/data/articles.json";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";

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

  // Helper function to render content blocks
  const renderContentBlock = (block: string, index: number) => {
    // Handle h2 headings
    if (block.startsWith("## ")) {
      const text = block.slice(3).trim();
      const rendered = parseLinksInText(text);
      return (
        <h2
          key={index}
          style={{
            fontSize: 22,
            letterSpacing: "-0.8px",
            lineHeight: "28px",
            marginTop: 32,
            marginBottom: 12,
          }}
        >
          {rendered}
        </h2>
      );
    }

    // Handle h3 headings
    if (block.startsWith("### ")) {
      const text = block.slice(4).trim();
      const rendered = parseLinksInText(text);
      return (
        <h3
          key={index}
          style={{
            fontSize: 18,
            letterSpacing: "-0.5px",
            marginTop: 24,
            marginBottom: 8,
          }}
        >
          {rendered}
        </h3>
      );
    }

    // Handle lists (bullet points)
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((line) => line.startsWith("- "));
      return (
        <ul key={index} style={{ margin: 0, paddingLeft: 24 }}>
          {items.map((item, i) => {
            const text = item.slice(2).trim();
            const rendered = parseLinksInText(text);
            return <li key={i}>{rendered}</li>;
          })}
        </ul>
      );
    }

    // Default: render as paragraph
    const rendered = parseLinksInText(block);
    return (
      <p key={index} style={{ margin: 0 }}>
        {rendered}
      </p>
    );
  };

  // Helper function to parse markdown links [text](url) and convert to JSX
  const parseLinksInText = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // Add the link
      const [fullMatch, linkText, url] = match;
      parts.push(
        <a
          key={`link-${match.index}`}
          href={url}
          style={{ color: "inherit", textDecoration: "underline" }}
        >
          {linkText}
        </a>
      );

      lastIndex = match.index + fullMatch.length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 80px" }}>
      <ArticleSchema
        title={article.title}
        description={article.metaDescription}
        slug={`articulos/${article.slug}`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://www.minute-call.com" },
          { name: "Artículos", url: "https://www.minute-call.com/articulos" },
          {
            name: article.title,
            url: `https://www.minute-call.com/articulos/${article.slug}`,
          },
        ]}
      />

      {/* Breadcrumbs */}
      <nav
        style={{
          fontSize: 13,
          color: "rgba(0,0,0,0.4)",
          marginBottom: 16,
          display: "flex",
          gap: 8,
        }}
      >
        <Link href="/" style={{ color: "rgba(0,0,0,0.4)" }}>
          Inicio
        </Link>
        <span>/</span>
        <Link href="/articulos" style={{ color: "rgba(0,0,0,0.4)" }}>
          Artículos
        </Link>
        <span>/</span>
        <span style={{ color: "rgba(0,0,0,0.56)" }}>
          {article.title.substring(0, 60)}
          {article.title.length > 60 ? "..." : ""}
        </span>
      </nav>

      {/* Article Header */}
      <h1 style={{ marginBottom: 16, fontSize: 32, letterSpacing: "-1.5px", lineHeight: "38px" }}>{article.title}</h1>
      <p style={{ fontSize: 16, marginBottom: 48, lineHeight: "24px" }}>{article.excerpt}</p>

      {/* Article Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {article.content.split("\n\n").map((block, index) => renderContentBlock(block, index))}
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section style={{ marginTop: 80 }}>
          <h2 style={{ fontSize: 22, letterSpacing: "-0.8px", lineHeight: "28px", marginBottom: 24 }}>
            Otros artículos
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
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
