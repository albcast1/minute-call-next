import { Metadata } from "next";
import sectors from "@/data/sectors.json";

type SectorData = (typeof sectors)[0];

export async function generateStaticParams() {
  return sectors.map((sector) => ({
    slug: sector.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);

  if (!sector) {
    return {};
  }

  return {
    title: sector.metaTitle,
    description: sector.metaDescription,
    openGraph: {
      title: sector.metaTitle,
      description: sector.metaDescription,
      type: "website",
    },
  };
}

function FAQAccordion({
  faq,
}: {
  faq: Array<{ question: string; answer: string }>;
}) {
  return (
    <div className="space-y-4">
      {faq.map((item, index) => (
        <details
          key={index}
          className="group border border-gray-200 rounded-lg overflow-hidden"
        >
          <summary className="cursor-pointer px-6 py-4 bg-white hover:bg-gray-50 flex items-center justify-between font-medium text-gray-900">
            <span>{item.question}</span>
            <span className="text-gray-400 group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>
          <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-200">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);

  if (!sector) {
    return <div className="text-center py-20">Sector no encontrado</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Trustpilot Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-900">
              <span className="text-yellow-400">★★★★★</span>
              <span>4.9 en Trustpilot</span>
            </div>
          </div>

          {/* Tag Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-block bg-white px-4 py-2 rounded-full text-sm font-semibold text-gray-900">
              {sector.heroTag}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-6 leading-tight">
            Recepcionista de IA para <em className="italic">{sector.sector}</em>.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-700 text-center mb-8 leading-relaxed max-w-3xl mx-auto">
            {sector.heroSubtitle}
          </p>

          {/* Social Proof */}
          <p className="text-center text-gray-600 mb-10">{sector.socialProof}</p>

          {/* CTA Button */}
          <div className="flex justify-center mb-12">
            <button style={{ backgroundColor: "#5AFF15", color: "black", border: "2px solid #222", fontWeight: "600", padding: "16px 32px", borderRadius: "50px", fontSize: "18px", cursor: "pointer", transition: "all 0.2s ease" }}>
              Solicitar demo
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "rgba(0,0,0,0.04)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 text-4xl">💬</div>
          <blockquote className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 italic">
            "{sector.testimonial.quote}"
          </blockquote>
          <p className="text-gray-700">
            <span className="font-semibold">{sector.testimonial.author}</span>
            <br />
            <span className="text-gray-600">{sector.testimonial.role}</span>
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Ventajas clave
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sector.features.map((feature, index) => (
              <div
                key={index}
                style={{ backgroundColor: "rgba(0,0,0,0.04)", borderRadius: "24px", padding: "32px" }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "rgba(0,0,0,0.04)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Cómo funciona
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "Configuración",
                description:
                  "Te conocemos. Entrenamos a la IA con tus datos, políticas y FAQs.",
              },
              {
                number: "2",
                title: "Integración",
                description:
                  "Configuramos tu número. Los clientes siguen llamando al mismo número.",
              },
              {
                number: "3",
                title: "Gestión",
                description:
                  "La IA atiende, filtra leads y agenda citas. Tú solo enfocado en cerrar.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full font-bold text-2xl mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Preguntas frecuentes
          </h2>
          <FAQAccordion faq={sector.faq} />
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "rgba(0,0,0,0.04)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            ¿Listo para transformar tu atención telefónica?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Prueba Minute Call sin compromiso. La mayoría de clientes ven
            resultados en la primera semana.
          </p>
          <button style={{ backgroundColor: "#5AFF15", color: "black", border: "2px solid #222", fontWeight: "600", padding: "16px 32px", borderRadius: "50px", fontSize: "18px", cursor: "pointer", transition: "all 0.2s ease" }}>
            Solicitar demo gratis
          </button>
        </div>
      </section>
    </div>
  );
}
