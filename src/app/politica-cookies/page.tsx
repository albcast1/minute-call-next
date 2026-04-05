import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de Cookies | minute call",
  description: "Política de cookies de minute call",
};

export default function PoliticaCookies() {
  return (
    <div className="min-h-screen flex flex-col bg-[#EFEBE5]">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-16">
        <h1 className="text-5xl font-bold text-black mb-12">
          Política de Cookies
        </h1>

        <div className="space-y-8 text-lg leading-relaxed text-[#6B6B6B]">
          {/* Introducción */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Introducción
            </h2>
            <p>
              Esta Política de Cookies explica cómo Minute Call utiliza cookies
              y tecnologías similares en nuestro sitio web. Las cookies son
              pequeños archivos de datos que se almacenan en su navegador o
              dispositivo.
            </p>
          </section>

          {/* ¿Qué son las Cookies? */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              ¿Qué son las Cookies?
            </h2>
            <p>
              Las cookies son archivos de texto pequeños que se descargan en su
              dispositivo cuando accede a nuestro sitio web. Las cookies permiten
              que el sitio web recuerde información sobre su visita, como su
              idioma preferido y otras configuraciones, lo que puede facilitar
              futuras visitas y mejorar la utilidad del sitio.
            </p>
          </section>

          {/* Tipos de Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Tipos de Cookies que Utilizamos
            </h2>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-black text-lg mb-2">
                  1. Cookies Esenciales
                </h3>
                <p>
                  Estas cookies son necesarias para el funcionamiento correcto de
                  nuestro sitio web. Sin ellas, el sitio no funcionaría
                  correctamente. Incluyen cookies de autenticación y seguridad.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-black text-lg mb-2">
                  2. Cookies de Funcionalidad
                </h3>
                <p>
                  Estas cookies permiten que nuestro sitio recuerde sus opciones
                  (como nombre de usuario, idioma o región) para proporcionar
                  características personalizadas. Sin ellas, algunas funciones
                  podrían no estar disponibles.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-black text-lg mb-2">
                  3. Cookies de Rendimiento
                </h3>
                <p>
                  Estas cookies recopilan información sobre cómo utiliza nuestro
                  sitio web. Utilizamos esta información para mejorar el
                  funcionamiento y la experiencia del sitio. No identifican
                  personalmente a los usuarios.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-black text-lg mb-2">
                  4. Cookies de Marketing
                </h3>
                <p>
                  Estas cookies se utilizan para rastrear su actividad en
                  internet y mostrar anuncios personalizados. Se comparten con
                  terceros y requieren su consentimiento explícito.
                </p>
              </div>
            </div>
          </section>

          {/* Terceros */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Cookies de Terceros
            </h2>
            <p>
              Nuestro sitio web puede contener enlaces a sitios web de terceros
              que pueden establecer sus propias cookies. Minute Call no es
              responsable de las políticas de cookies de estos sitios. Le
              recomendamos que revise las políticas de cookies de cualquier sitio
              web de terceros antes de aceptar sus cookies.
            </p>
            <p className="mt-4">
              Los siguientes son algunos de los servicios de terceros que
              utilizamos:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Google Analytics</li>
              <li>Facebook Pixel</li>
              <li>LinkedIn Insights</li>
              <li>Cloudflare</li>
            </ul>
          </section>

          {/* Duración */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Duración de las Cookies
            </h2>
            <p>
              Las cookies pueden ser de dos tipos en cuanto a su duración:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <strong>Cookies de sesión:</strong> Se eliminan cuando cierra su
                navegador.
              </li>
              <li>
                <strong>Cookies persistentes:</strong> Se almacenan durante un
                período especificado, que puede ser de días, meses o años.
              </li>
            </ul>
          </section>

          {/* Control de Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Control de Cookies
            </h2>
            <p>
              Puede controlar y administrar las cookies de varias maneras:
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-black mb-2">
                  Configuración del Navegador
                </h3>
                <p>
                  La mayoría de navegadores le permiten rechazar o aceptar
                  cookies. Puede ajustar estas configuraciones en el menú de
                  preferencias de su navegador. Consulte la documentación de su
                  navegador para obtener más información.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-black mb-2">
                  Nuestra Herramienta de Consentimiento
                </h3>
                <p>
                  Al visitar nuestro sitio web, puede ver una pancarta de
                  cookies que le permite aceptar o rechazar diferentes tipos de
                  cookies. Puede cambiar sus preferencias en cualquier momento
                  haciendo clic en el enlace de configuración de cookies en el
                  pie de página.
                </p>
              </div>
            </div>
          </section>

          {/* Consentimiento */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Consentimiento
            </h2>
            <p>
              De conformidad con la Ley de Cookies de la UE y la normativa de
              privacidad, obtenemos su consentimiento antes de usar cookies de
              marketing o de rendimiento. Las cookies esenciales se utilizan sin
              consentimiento previo, ya que son necesarias para el
              funcionamiento del sitio.
            </p>
            <p className="mt-4">
              Al hacer clic en "Aceptar" en nuestra pancarta de cookies,
              acepta el uso de todas las cookies descritas en esta política.
              Puede retirar su consentimiento en cualquier momento.
            </p>
          </section>

          {/* Consentimiento de Menores */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Consentimiento de Menores
            </h2>
            <p>
              Nuestro sitio web no está dirigido a menores de 16 años. No
              recopilamos información personal de menores de 16 años. Si
              descubrimos que hemos recopilado información de un menor sin el
              consentimiento de sus padres, eliminaremos esa información de
              inmediato.
            </p>
          </section>

          {/* Cambios */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Cambios en la Política de Cookies
            </h2>
            <p>
              Minute Call puede actualizar esta Política de Cookies
              periódicamente. Le informaremos sobre cualquier cambio importante
              publicando la política actualizada en nuestro sitio web con una
              fecha de revisión actualizada.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Contacto
            </h2>
            <p>
              Si tiene preguntas sobre nuestra Política de Cookies, contáctenos
              en:
            </p>
            <div className="mt-4 bg-white rounded-2xl p-6">
              <p className="font-semibold text-black">Minute Call</p>
              <p className="text-[#6B6B6B]">
                Email: privacy@minutecall.com
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
