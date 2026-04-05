import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Quiénes somos | minute call",
  description:
    "Minute Call es un servicio premium de secretaría virtual y atención telefónica 24/7 con agentes humanos profesionales",
};

export default function SobreNosotros() {
  return (
    <div className="min-h-screen flex flex-col bg-[#EFEBE5]">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-16">
        {/* Badge */}
        <div className="mb-8">
          <span className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
            Sobre nosotros
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-12 leading-tight">
          Quienes somos
        </h1>

        {/* Paragraphs */}
        <div className="space-y-6 text-lg leading-relaxed text-[#6B6B6B]">
          <p className="text-lg">
            Minute Call es un servicio premium de secretaría virtual y atención
            telefónica 24/7, con agentes humanos profesionales en inglés,
            español y francés. Ayudamos a las pequeñas y medianas empresas a
            garantizar que se responda a todas las llamadas, se capture cada
            oportunidad de venta y se gestione cada solicitud urgente.
          </p>

          <p className="text-lg">
            Nuestros agentes de recepción trabajan como una extensión de su
            equipo. Seguimos sus instrucciones, su tono y sus flujos de trabajo:
            calificamos a las personas que llaman, tomamos mensajes, programamos
            citas y escalamos los casos urgentes cuando es necesario.
          </p>

          <p className="text-lg">
            No somos un centro de llamadas ni un chatbot con IA. Nos centramos
            en ofrecer una gestión de llamadas fiable y de alta calidad con
            criterio humano, empatía y coherencia, especialmente para equipos
            que no pueden permitirse perder llamadas fuera del horario laboral o
            durante los periodos de mayor actividad.
          </p>

          <p className="text-lg">
            Minute Call está diseñado para pymes, equipos globales y empresas de
            servicios modernas que valoran la profesionalidad, la comunicación
            clara y una cobertura fiable las 24 horas del día, los 7 días de la
            semana.
          </p>
        </div>

        {/* Team Section */}
        <section className="mt-20">
          <h2 className="text-4xl font-bold text-black mb-12">Nuestro equipo</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Alberto Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-6"></div>
              <h3 className="text-2xl font-bold text-black mb-2">
                Alberto Castiel
              </h3>
              <p className="text-[#6B6B6B] text-lg">
                Ex General Manager en Leocare (130M€ en Series B). Lideró el
                crecimiento de una fintech de 0 a 45M€ with +30 agentes.
              </p>
            </div>

            {/* Beatriz Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-6"></div>
              <h3 className="text-2xl font-bold text-black mb-2">
                Beatriz De Tena
              </h3>
              <p className="text-[#6B6B6B] text-lg">
                Ex CEO en Walmeric by Globant (NYSE:GLOB). También fue
                Directora Global de Ventas en Konecta y Telefónica.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
