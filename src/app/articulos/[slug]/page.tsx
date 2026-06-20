import { Metadata } from "next";
import Link from "next/link";
import articles from "@/data/articles.json";
import { ArticleSchema, BreadcrumbSchema, FAQPageSchema } from "@/components/JsonLd";

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
    alternates: {
      canonical: `/articulos/${slug}`,
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      locale: "es_ES",
      url: `https://www.minute-call.com/articulos/${slug}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: article.metaTitle }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: article.metaTitle,
      description: article.metaDescription,
      images: ["/og-image.png"],
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

  // Extract H2 headings for Table of Contents
  const blocks = article.content.split("\n\n");
  const headings = blocks
    .filter((block) => block.startsWith("## ") && !block.startsWith("### "))
    .map((block) => {
      const text = block.slice(3).trim().replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');
      const id = text
        .toLowerCase()
        .normalize("NFD").replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      return { text, id };
    });

  // Helper function to render content blocks
  const renderContentBlock = (block: string, index: number) => {
    // Handle h2 headings
    if (block.startsWith("## ") && !block.startsWith("### ")) {
      const text = block.slice(3).trim();
      const cleanText = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1');
      const id = cleanText
        .toLowerCase()
        .normalize("NFD").replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      const rendered = parseLinksInText(text);
      return (
        <h2
          key={index}
          id={id}
          style={{
            fontSize: "clamp(18px, 4vw, 24px)",
            letterSpacing: "-0.8px",
            lineHeight: 1.3,
            marginTop: 40,
            marginBottom: 16,
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
            marginTop: 28,
            marginBottom: 10,
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
        <ul key={index} style={{ margin: "8px 0", paddingLeft: 24 }}>
          {items.map((item, i) => {
            const text = item.slice(2).trim();
            const rendered = parseLinksInText(text);
            return (
              <li key={i} style={{ marginBottom: 6, lineHeight: 1.7 }}>
                {rendered}
              </li>
            );
          })}
        </ul>
      );
    }

    // Handle markdown tables
    if (block.includes('|') && block.split('\n').length > 1) {
      const lines = block.split('\n').filter((l: string) => l.trim().length > 0);
      const isTable = lines.every((l: string) => l.includes('|'));
      if (isTable) {
        const dataLines = lines.filter((l: string) => !l.match(/^[\s|:-]+$/));
        if (dataLines.length > 0) {
          const headers = dataLines[0].split('|').map((c: string) => c.trim()).filter(Boolean);
          const rows = dataLines.slice(1).map((l: string) => l.split('|').map((c: string) => c.trim()).filter(Boolean));
          return (
            <div key={index} style={{ overflowX: 'auto', margin: '24px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
                <thead>
                  <tr>
                    {headers.map((h: string, i: number) => (
                      <th key={i} style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        borderBottom: '2px solid #000',
                        fontWeight: 600,
                        fontSize: 14,
                        whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row: string[], ri: number) => (
                    <tr key={ri} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                      {row.map((cell: string, ci: number) => {
                        const rendered = parseLinksInText(cell);
                        return (
                          <td key={ci} style={{
                            padding: '12px 16px',
                            fontSize: 15,
                            color: 'rgba(0,0,0,0.75)',
                            lineHeight: 1.5,
                          }}>{rendered}</td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }
    }

    // Default: render as paragraph
    const rendered = parseLinksInText(block);
    return (
      <p key={index} style={{ margin: 0, lineHeight: 1.8, color: 'rgba(0,0,0,0.75)' }}>
        {rendered}
      </p>
    );
  };

  // Helper function to parse markdown links [text](url) and bold **text**
  const parseLinksInText = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      const [fullMatch, linkText, url] = match;
      const isExternal = url.startsWith('http');
      parts.push(
        <a
          key={`link-${match.index}`}
          href={url}
          style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {linkText}
        </a>
      );
      lastIndex = match.index + fullMatch.length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    // Parse bold **text**
    const finalParts: (string | React.ReactElement)[] = [];
    const allParts = parts.length > 0 ? parts : (typeof text === 'string' ? [text] : []);
    for (const part of allParts) {
      if (typeof part === 'string') {
        const boldRegex = /\*\*([^*]+)\*\*/g;
        let bLast = 0;
        let bMatch;
        while ((bMatch = boldRegex.exec(part)) !== null) {
          if (bMatch.index > bLast) finalParts.push(part.slice(bLast, bMatch.index));
          finalParts.push(<strong key={`b-${bMatch.index}`}>{bMatch[1]}</strong>);
          bLast = bMatch.index + bMatch[0].length;
        }
        if (bLast < part.length) finalParts.push(part.slice(bLast));
      } else {
        finalParts.push(part);
      }
    }

    return finalParts.length > 0 ? finalParts : text;
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>
      <ArticleSchema
        title={article.title}
        description={article.metaDescription}
        slug={`articulos/${article.slug}`}
      />
      {article.faq && article.faq.length > 0 && (
        <FAQPageSchema
          faqs={article.faq.map((f: {question: string; answer: string}) => ({
            question: f.question,
            answer: f.answer,
          }))}
        />
      )}
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

      {/* Article Header — full width */}
      <h1
        style={{
          marginBottom: 16,
          fontSize: "clamp(24px, 5vw, 36px)",
          letterSpacing: "-1.5px",
          lineHeight: 1.15,
          maxWidth: 700,
        }}
      >
        {article.title}
      </h1>
      <p style={{ fontSize: 17, marginBottom: 32, lineHeight: 1.6, maxWidth: 700, color: 'rgba(0,0,0,0.6)' }}>
        {article.excerpt}
      </p>

      {/* Direct Answer — featured snippet optimised */}
      {article.directAnswer && (
        <div
          style={{
            borderLeft: '4px solid #000',
            padding: '20px 24px',
            marginBottom: 32,
            borderRadius: '0 8px 8px 0',
            maxWidth: 700,
          }}
        >
          <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0, color: '#222', fontWeight: 500 }}>
            {article.directAnswer}
          </p>
        </div>
      )}

      {/* 2-column layout: Content + CTA Sidebar */}
      <div
        style={{
          display: "flex",
          gap: 48,
          alignItems: "flex-start",
        }}
      >
        {/* Main content column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Table of Contents */}
          {headings.length > 2 && (
            <details
              style={{
                marginBottom: 32,
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 12,
                padding: '16px 20px',
              }}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 15,
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                Tabla de contenidos
                <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)' }}>▼</span>
              </summary>
              <nav style={{ marginTop: 12 }}>
                <ol style={{ margin: 0, paddingLeft: 20 }}>
                  {headings.map((h, i) => (
                    <li key={i} style={{ marginBottom: 6 }}>
                      <a
                        href={`#${h.id}`}
                        style={{
                          color: 'rgba(0,0,0,0.7)',
                          textDecoration: 'none',
                          fontSize: 14,
                          lineHeight: 1.5,
                        }}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
          )}

          {/* Article Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {blocks.map((block, index) => renderContentBlock(block, index))}
          </div>

          {/* FAQ Section */}
          {article.faq && article.faq.length > 0 && (
            <section style={{ marginTop: 48 }}>
              <h2 style={{ fontSize: 22, letterSpacing: '-0.8px', marginBottom: 24 }}>
                Preguntas frecuentes
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {article.faq.map((faq: {question: string; answer: string}, i: number) => (
                  <details key={i} style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, padding: '16px 20px' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
                      {faq.question}
                    </summary>
                    <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.7, color: 'rgba(0,0,0,0.7)' }}>
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* CTA Sidebar — sticky, desktop only */}
        <aside
          className="article-sidebar"
          style={{
            width: 280,
            flexShrink: 0,
            position: 'sticky' as const,
            top: 100,
            alignSelf: 'flex-start',
            display: 'none',
          }}
        >
          <div
            style={{
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <p style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 16, lineHeight: 1.3 }}>
              No pierdas mas llamadas
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li style={{ fontSize: 14, display: 'flex', alignItems: 'flex-start', gap: 8, color: 'rgba(0,0,0,0.7)' }}>
                <span style={{ flexShrink: 0 }}>✓</span> Atención 24/7 con agentes nativos
              </li>
              <li style={{ fontSize: 14, display: 'flex', alignItems: 'flex-start', gap: 8, color: 'rgba(0,0,0,0.7)' }}>
                <span style={{ flexShrink: 0 }}>✓</span> Cualificación de leads en tiempo real
              </li>
              <li style={{ fontSize: 14, display: 'flex', alignItems: 'flex-start', gap: 8, color: 'rgba(0,0,0,0.7)' }}>
                <span style={{ flexShrink: 0 }}>✓</span> Gestión de citas y agenda
              </li>
              <li style={{ fontSize: 14, display: 'flex', alignItems: 'flex-start', gap: 8, color: 'rgba(0,0,0,0.7)' }}>
                <span style={{ flexShrink: 0 }}>✓</span> Sin permanencia
              </li>
            </ul>
            <Link
              href="/reserva-llamada"
              style={{
                display: 'block',
                textAlign: 'center',
                background: '#5AFF15',
                color: '#000',
                padding: '12px 20px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Reserva una llamada
            </Link>
            <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.55)', textAlign: 'center', marginTop: 10 }}>
              Sin compromiso · Respuesta en 24h
            </p>
          </div>
        </aside>
      </div>

      {/* Related Links */}
      {article.relatedLinks && article.relatedLinks.length > 0 && (
        <div style={{ marginTop: 48, padding: '32px', borderRadius: 12, border: '1px solid rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
            Servicios relacionados
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {article.relatedLinks.map((link: {href: string; label: string}) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  border: '1px solid #000',
                  borderRadius: 999,
                  fontSize: 14,
                  color: '#000',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                {link.label} →
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section style={{ marginTop: 64 }}>
          <h2
            style={{
              fontSize: "clamp(18px, 4vw, 24px)",
              letterSpacing: "-0.8px",
              marginBottom: 24,
            }}
          >
            Otros articulos
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {relatedArticles.map((related) => (
              <Link key={related.slug} href={`/articulos/${related.slug}`}>
                <div
                  className="card"
                  style={{ padding: 24, height: "100%" }}
                >
                  <h3 style={{ fontSize: 18, marginBottom: 8 }}>
                    {related.title}
                  </h3>
                  <p className="service-card-body">{related.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CSS for responsive sidebar */}
      <style>{`
        @media (min-width: 900px) {
          .article-sidebar {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
