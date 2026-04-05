import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Reserva una llamada | minute call",
  description:
    "Reserva una llamada con nuestro equipo para discutir cómo podemos ayudarte",
};

export default function ReservaLlamada() {
  return (
    <div className="min-h-screen flex flex-col bg-[#EFEBE5]">
      <Nav />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left Side */}
          <div>
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
                Hablemos
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Manos a la obra
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-[#6B6B6B] mb-8">
              Nos pondremos en contacto contigo menos de 24h.
            </p>

            {/* Job Link */}
            <p className="text-lg text-[#6B6B6B]">
              Si buscas empleo,{" "}
              <a href="#" className="text-black font-medium underline hover:opacity-80">
                haz click aquí
              </a>
              .
            </p>
          </div>

          {/* Right Side - Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
