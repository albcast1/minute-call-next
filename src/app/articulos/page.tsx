import { Metadata } from "next";
import Link from "next/link";
import articles from "@/data/articles.json";

export const metadata: Metadata = {
  title: "Blog - Minute Call | Atención telefónica con IA",
  description:
    "Descubre artículos y guías sobre secretaría virtual, recepcionistas de IA y atención telefónica para PYMES.",
  openGraph: {
    title: "Blog - Minute Call",
    description:
      "Descubre artículos y guías sobre secretaría virtual, recepcionistas de IA y atención telefónica para PYMES.",
    type: "website",
  },
};

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-[#EFEBE5] font-sans">
      {/* Header Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-block bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-900">
              Insights
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Informes
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-700">
            Aprende todo sobre atención telefónica, secretaría virtual y cómo
            optimizar tu servicio al cliente.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link key={article.slug} href={`/articulos/${article.slug}`}>
                <div className="bg-white rounded-2xl p-8 h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {article.excerpt}
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            ¿Tienes dudas sobre nuestro servicio?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Descubre cómo Minute Call puede transformar la atención telefónica
            de tu empresa.
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
