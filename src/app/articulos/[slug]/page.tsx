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
    return <div className="text-center py-20">Artículo no encontrado</div>;
  }

  // Get related articles (exclude current one)
  const relatedArticles = articles
    .filter((a) => a.slug !== slug)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-[#EFEBE5] font-sans">
      {/* Back Link */}
      <div className="pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/articulos"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            <span>←</span>
            <span>Volver a artículos</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-lg text-gray-700 mb-8">{article.excerpt}</p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto prose prose-sm sm:prose lg:prose-lg max-w-none">
          {article.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-6 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Otros artículos que te pueden interesar
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((related) => (
                <Link key={related.slug} href={`/articulos/${related.slug}`}>
                  <div className="bg-white rounded-2xl p-8 h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {related.title}
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {related.excerpt}
                    </p>
                    <div className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors">
                      <span>Leer más</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            ¿Listo para mejorar tu atención telefónica?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Descubre cómo Minute Call puede transformar la forma en que atienden
            las llamadas en tu empresa.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors">
            Solicitar demo gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Minute Call</h3>
              <p className="text-gray-400 text-sm">
                Atención telefónica 24/7 con IA para pymes en Europa.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Producto</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Casos de uso
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Legal
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Minute Call. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
