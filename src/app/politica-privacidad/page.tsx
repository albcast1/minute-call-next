import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad | minute call",
  description:
    "Política de privacidad y protección de datos de minute call",
};

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen flex flex-col bg-[#EFEBE5]">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-16">
        <h1 className="text-5xl font-bold text-black mb-12">
          Política de Privacidad
        </h1>

        <div className="space-y-8 text-lg leading-relaxed text-[#6B6B6B]">
          {/* Responsable del Tratamiento */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Responsable del Tratamiento
            </h2>
            <p>
              Minute Call es responsable del tratamiento de sus datos personales
              de conformidad con el Reglamento General de Protección de Datos
              (RGPD) y la Ley Orgánica de Protección de Datos Personales (LOPDGDD).
            </p>
            <p className="mt-4">
              Para cualquier cuestión relacionada con el tratamiento de sus datos
              personales, puede contactarnos en: privacy@minutecall.com
            </p>
          </section>

          {/* Datos Recopilados */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Datos Recopilados
            </h2>
            <p>
              Recopilamos los siguientes tipos de datos personales a través de
              nuestros servicios:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Datos de identificación (nombre, apellidos)</li>
              <li>Datos de contacto (correo electrónico, teléfono)</li>
              <li>Datos de la empresa (nombre, sector, tamaño)</li>
              <li>Datos de comunicación (grabaciones de llamadas, mensajes)</li>
              <li>Datos de navegación (cookies, direcciones IP)</li>
            </ul>
          </section>

          {/* Finalidad del Tratamiento */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Finalidad del Tratamiento
            </h2>
            <p>Sus datos personales se utilizan para:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Prestar nuestros servicios de secretaría virtual</li>
              <li>Mantener la comunicación con usted</li>
              <li>Procesar solicitudes y consultas</li>
              <li>Enviar información sobre nuestros servicios</li>
              <li>Cumplir con obligaciones legales</li>
              <li>Mejorar nuestros servicios y experiencia del usuario</li>
            </ul>
          </section>

          {/* Base Legal */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Base Legal
            </h2>
            <p>
              El tratamiento de sus datos personales se basa en:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Su consentimiento explícito</li>
              <li>La ejecución de un contrato con usted</li>
              <li>Nuestras obligaciones legales</li>
              <li>Nuestros intereses legítimos</li>
            </ul>
          </section>

          {/* Conservación de Datos */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Conservación de Datos
            </h2>
            <p>
              Conservamos sus datos personales durante el tiempo necesario para
              cumplir con las finalidades especificadas. Una vez finalizada la
              relación contractual, conservaremos sus datos de acuerdo con nuestras
              obligaciones legales y por un período adicional para resolver posibles
              litigios.
            </p>
          </section>

          {/* Derechos del Usuario */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Derechos del Usuario
            </h2>
            <p>
              De conformidad con la normativa de protección de datos, tiene los
              siguientes derechos:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Derecho de acceso a sus datos personales</li>
              <li>Derecho de rectificación de datos inexactos</li>
              <li>Derecho a la supresión ("derecho al olvido")</li>
              <li>Derecho de limitación del tratamiento</li>
              <li>Derecho a la portabilidad de datos</li>
              <li>Derecho a oponerse al tratamiento</li>
              <li>Derechos relativos a decisiones automatizadas</li>
            </ul>
            <p className="mt-4">
              Para ejercer estos derechos, contáctenos en: privacy@minutecall.com
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Cookies
            </h2>
            <p>
              Nuestro sitio web utiliza cookies para mejorar su experiencia de
              usuario. Estas cookies se utilizan para:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Mantener su sesión iniciada</li>
              <li>Recordar sus preferencias</li>
              <li>Analizar el uso del sitio web</li>
              <li>Mostrar contenido personalizado</li>
            </ul>
            <p className="mt-4">
              Puede controlar las cookies a través de la configuración de su
              navegador. Para más información, consulte nuestra Política de Cookies.
            </p>
          </section>

          {/* Transferencias Internacionales */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Transferencias Internacionales
            </h2>
            <p>
              Sus datos personales pueden ser transferidos a terceros ubicados
              fuera del Espacio Económico Europeo solo si existen garantías
              adecuadas de protección, como decisiones de adecuación de la
              Comisión Europea o cláusulas contractuales estándar.
            </p>
          </section>

          {/* Seguridad */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Seguridad de los Datos
            </h2>
            <p>
              Implementamos medidas técnicas y organizativas apropiadas para
              proteger sus datos personales contra acceso no autorizado,
              alteración, divulgación o destrucción. Esto incluye encriptación,
              controles de acceso y evaluaciones de seguridad periódicas.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">
              Contacto y Reclamaciones
            </h2>
            <p>
              Si tiene preguntas sobre esta Política de Privacidad o desea
              ejercer sus derechos, puede contactarnos en:
            </p>
            <div className="mt-4 bg-white rounded-2xl p-6">
              <p className="font-semibold text-black">Minute Call</p>
              <p className="text-[#6B6B6B]">Email: privacy@minutecall.com</p>
            </div>
            <p className="mt-4">
              También tiene derecho a presentar una reclamación ante la autoridad
              de protección de datos competente si considera que el tratamiento de
              sus datos personales infringe la normativa aplicable.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
