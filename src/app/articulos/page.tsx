import { Metadata } from "next";
import Link from "next/link";
import articles from "@/data/articles.json";

export const metadata: Metadata = {
  title: "Artículos | minute call",
  description:
    "Descubre artículos y guías sobre secretaría virtual, recepcionistas de IA y atención telefónica para PYMES.",
};

export default function ArticlesPage() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 64px 80px" }}>
      <span className="pill-label" style={{ marginBottom: 24, display: "inline-block" }}>
        Artículos
      </span>

      <h1 style={{ marginTop: 16, fontSize: 36, letterSpacing: "-2px", lineHeight: "40px" }}>
        Nuestros artículos
      </h1>

      <p style={{ marginTop: 16, maxWidth: 500 }}>
        Aprende todo sobre atención telefónica, secretaría virtual y cómo
        optimizar tu servicio al cliente.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24,
          marginTop: 48,
        }}
      >
        {articles.map((article) => (
          <Link key={article.slug} href={`/articulos/${article.slug}`} style={{ textDecoration: "none" }}>
            <div className="card" style={{ padding: 32, height: "100%" }}>
              <h2 style={{ fontSize: 20, letterSpacing: "-0.8px", lineHeight: "26px", marginBottom: 12 }}>
                {article.title}
              </h2>
              <p className="service-card-body">{article.excerpt}</p>
              <span style={{ fontSize: 14, fontWeight: 500, color: "black", marginTop: 16, display: "inline-block" }}>
                Leer más →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
