'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';

// Intersection Observer hook for fade-in animations
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isInView };
}

// Badge component
function Badge({ text }: { text: string }) {
  return (
    <div className="inline-block px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6">
      {text}
    </div>
  );
}

// Star SVG Trustpilot-style
function StarRating() {
  return (
    <div className="flex items-center gap-2 mb-8">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5"
            fill="#7BF542"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-gray-700 text-sm font-medium">4.9/5 en Trustpilot</span>
    </div>
  );
}

// Fade-in section wrapper
function FadeInSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isInView ? 'opacity-100' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EFEBE5' }}>
      <Nav />

      {/* ==================== SECTION 1: HERO ==================== */}
      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column */}
            <div>
              <StarRating />
              <Badge text="Recepción de llamadas para PYMES" />
              <h1 className="text-5xl sm:text-6xl font-bold text-black mb-6 leading-tight">
                Atención telefónica{' '}
                <span className="italic">24/7.</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Atendemos las llamadas de tu empresa con agentes nativos o asistentes de IA - tú eliges. Sin permanencia, diseñado para PYMES.
              </p>
              <Link
                href="/reserva-llamada"
                className="inline-block px-8 py-4 bg-[#7BF542] text-black font-semibold rounded-full hover:bg-[#6ed632] transition-colors"
              >
                Reserva una llamada
              </Link>
            </div>

            {/* Right column - Tabs card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button className="pb-3 px-2 border-b-2 border-[#7BF542] text-black font-semibold">
                  Recepcionista
                </button>
                <button className="pb-3 px-2 text-gray-500 hover:text-black">
                  Recepcionista IA
                </button>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                  <p className="text-gray-600">Video/Audio Player</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ==================== SECTION 2: PARTNERS ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <FadeInSection>
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-xl text-gray-700 mb-12 font-medium">
              Somos partners de empresas líderes
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 bg-gray-300 rounded-lg flex items-center justify-center"
                >
                  <span className="text-gray-600 text-sm font-medium">Logo {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ==================== SECTION 3: SERVICES ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#EFEBE5' }}>
        <FadeInSection>
          <div className="max-w-7xl mx-auto">
            <Badge text="Qué hacemos" />
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-16">
              Qué hacemos por ti.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Toma de mensajes',
                  description: 'Personalizamos el protocolo para que des la mejor atención a tus clientes y no se te escape una oportunidad.',
                },
                {
                  title: 'Cualificación de leads',
                  description: 'Cualificamos y recopilamos datos clave, para que tu equipo solo dedique tiempo a leads relevantes.',
                },
                {
                  title: 'Reserva de citas',
                  description: 'Nos integramos en tu CRM y programamos citas en tu nombre, siguiendo tu disponibilidad.',
                },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-2xl font-bold text-black mb-4">{service.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ==================== SECTION 4: RESULTS/STATS ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <FadeInSection>
          <div className="max-w-7xl mx-auto">
            <Badge text="Resultados de clientes" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-black mb-8">
                  Cada llamada perdida es una oportunidad perdida.
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  El 78% de los leads contratan al negocio que responde primero - sin embargo la mayoría de las PYMES pierde entre el 40-60% de las llamadas entrantes.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Para las empresas de servicios, el teléfono no es solo un canal de comunicación: es su fuente de ingresos. Minute Call es un servicio de atención telefónica 24/7 para empresas y PYMES que no pueden permitirse perder llamadas.
                </p>
              </div>

              <div className="flex flex-col gap-8 justify-center">
                {[
                  { stat: '15 s', label: 'Tiempo de respuesta', desc: 'Somos rápidos.' },
                  { stat: '98%', label: 'Tasa de respuesta', desc: 'No pierdas más llamadas.' },
                ].map((item, idx) => (
                  <div key={idx} className="border-l-4 border-[#7BF542] pl-6">
                    <div className="text-4xl font-bold text-black mb-2">{item.stat}</div>
                    <div className="text-lg font-semibold text-black mb-1">{item.label}</div>
                    <div className="text-gray-600">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ==================== SECTION 5: INDUSTRIES ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#EFEBE5' }}>
        <FadeInSection>
          <div className="max-w-7xl mx-auto">
            <Badge text="Creados por ser flexibles." />
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-12">
              Diseñado para PYMES.
            </h2>

            <div className="flex flex-wrap gap-4">
              {[
                { text: 'Clinicas & Salud', href: '/lp/recepcionista-ia-clinicas' },
                { text: 'Agencias inmobiliarias', href: '/lp/recepcionista-ia-inmobiliarias' },
                { text: 'Hostelería', href: '/lp/recepcionista-ia-restaurantes' },
                { text: 'Turismo', href: '#' },
                { text: 'Despachos de abogados', href: '#' },
                { text: 'Otros servicios', href: '#' },
              ].map((pill, idx) => (
                <Link
                  key={idx}
                  href={pill.href}
                  className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  {pill.text}
                </Link>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ==================== SECTION 6: COMPARISON ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <FadeInSection>
          <div className="max-w-7xl mx-auto">
            <Badge text="La diferencia" />
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-12">
              Por qué nos eligen.
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left card - Others */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-black mb-8">Otros Call Centers</h3>
                <ul className="space-y-4">
                  {[
                    'Agentes basados en LATAM',
                    'Rigidez en la duración',
                    'Bajo nivel tech',
                    'Errores frecuentes',
                    'Falta de profesionalidad',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right card - Minute Call */}
              <div className="bg-black rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-8">minute call</h3>
                <ul className="space-y-4">
                  {[
                    'Agentes nativos basados en España',
                    'Sin contratos a largo plazo. Mes a mes.',
                    'Agentes humanos o IA. Tú eliges.',
                    'Control de calidad de cada conversación.',
                    'Partners de Teleperformance (#1 BPO mundial).',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#7BF542] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ==================== SECTION 7: TEAM ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#EFEBE5' }}>
        <FadeInSection>
          <div className="max-w-7xl mx-auto">
            <Badge text="Nuestro equipo" />
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-12">
              Fundado por quienes <span className="italic">escalaron</span> startups.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  name: 'Alberto Castiel',
                  bio: 'Ex General Manager en Leocare (130M€ en Series B). Lideró el crecimiento de una fintech de 0 a 45M€ with +30 agentes.',
                },
                {
                  name: 'Beatriz De Tena',
                  bio: 'Ex CEO en Walmeric by Globant (NYSE:GLOB). También fue Directora Global de Ventas en Konecta y Telefónica.',
                },
              ].map((member, idx) => (
                <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300" />
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-black mb-3">{member.name}</h3>
                    <p className="text-gray-700 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ==================== SECTION 8: HOW IT WORKS ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <FadeInSection>
          <div className="max-w-7xl mx-auto">
            <Badge text="Como funciona" />
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-16">
              Cómo funciona.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  num: '1',
                  title: 'Definición del flujo',
                  desc: 'Personalizamos contigo el guión de llamada y acciones del agente.',
                },
                {
                  num: '2',
                  title: 'Llamada entrante',
                  desc: 'Respondemos en nombre de tu empresa siguiendo tu procedimiento.',
                },
                {
                  num: '3',
                  title: 'Citas y mensajes',
                  desc: 'Agendamos la cita o enviamos el mensaje al instante a tu email.',
                },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-14 w-14 rounded-full bg-[#7BF542] text-black font-bold text-xl">
                        {step.num}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black mb-2">{step.title}</h3>
                      <p className="text-gray-700">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ==================== SECTION 9: FAQ ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#EFEBE5' }}>
        <FadeInSection>
          <div className="max-w-4xl mx-auto">
            <Badge text="Preguntas" />
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-12">
              FAQ
            </h2>

            <FAQ
              items={[
                {
                  question: '¿Qué es Minute Call?',
                  answer: 'Minute Call es un servicio de atención telefónica para empresas que atiende llamadas en nombre del negocio con recepcionistas nativos o agentes de IA para evitar perder contactos y oportunidades comerciales.',
                },
                {
                  question: '¿En qué se diferencia de un call center tradicional?',
                  answer: 'Un call center tradicional está orientado a grandes volúmenes de llamadas, mientras que Minute Call se centra en la atención telefónica para pymes y empresas de servicios donde cada llamada es relevante.',
                },
                {
                  question: '¿Las llamadas las atienden humanos o IA?',
                  answer: 'Las empresas pueden elegir entre recepcionistas nativos, agentes de IA o una combinación según su volumen de llamadas, horario y tipo de cliente.',
                },
                {
                  question: '¿Para qué tipo de empresas está pensado el servicio?',
                  answer: 'Principalmente para pymes, clínicas, despachos, inmobiliarias y empresas de servicios que reciben llamadas frecuentes y no pueden permitirse perder oportunidades por no atender el teléfono.',
                },
                {
                  question: '¿Qué ocurre cuando no se atiende una llamada?',
                  answer: 'Cuando una empresa no responde una llamada, es habitual que el cliente potencial no vuelva a llamar. Por eso la atención telefónica continua es clave para la captación y conversión de clientes.',
                },
              ]}
            />
          </div>
        </FadeInSection>
      </section>

      {/* ==================== SECTION 10: FINAL CTA ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <FadeInSection>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              No pierdas ninguna llamada más.
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Servicio premium de secretaría virtual y atención telefónica para PYMES.
            </p>
            <Link
              href="/reserva-llamada"
              className="inline-block px-8 py-4 bg-[#7BF542] text-black font-semibold rounded-full hover:bg-[#6ed632] transition-colors"
            >
              Reserva una llamada
            </Link>
          </div>
        </FadeInSection>
      </section>

      <Footer />
    </div>
  );
}
