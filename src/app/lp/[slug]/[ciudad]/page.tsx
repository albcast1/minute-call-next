import Link from 'next/link';
import { Metadata } from 'next';
import sectors from '@/data/sectors.json';
import cities from '@/data/cities.json';
import { FAQPageSchema, BreadcrumbSchema, ServiceSchema, LocalBusinessSchema, HowToSchema, ReviewSchema } from '@/components/JsonLd';

type SectorType = {
  slug: string;
  sector: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTag: string;
  heroSubtitle: string;
  socialProof: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

type CityType = {
  slug: string;
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  localContext: string;
  keySectors: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  stats: {
    pymes: string;
    callsLost: string;
  };
};

export async function generateStaticParams() {
  const params: Array<{ slug: string; ciudad: string }> = [];

  for (const sector of sectors as SectorType[]) {
    for (const city of cities as CityType[]) {
      params.push({
        slug: sector.slug,
        ciudad: city.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; ciudad: string }>;
}): Promise<Metadata> {
  const { slug, ciudad } = await params;

  const sector = (sectors as SectorType[]).find((s) => s.slug === slug);
  const city = (cities as CityType[]).find((c) => c.slug === ciudad);

  if (!sector || !city) {
    return {
      title: 'PÃ¡gina no encontrada | minute call',
      description: 'La pÃ¡gina que buscas no existe.',
    };
  }

  const title = sector.metaTitle
    ? sector.metaTitle.replace('{ciudad}', city.city)
    : `Recepcionista Virtual para ${sector.sector} en ${city.city} | minute call`;
  const description = sector.metaDescription
    ? sector.metaDescription.replace('{ciudad}', city.city)
    : `AtenciÃ³n telefÃ³nica 24/7 para ${sector.sector} en ${city.city} con agentes nativos o IA â tÃº eliges. Sin permanencia.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/lp/${slug}/${ciudad}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_ES',
      url: `https://www.minute-call.com/lp/${slug}/${ciudad}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SectorCityPage({
  params,
}: {
  params: Promise<{ slug: string; ciudad: string }>;
}) {
  const { slug, ciudad } = await params;

  const sector = (sectors as SectorType[]).find((s) => s.slug === slug);
  const city = (cities as CityType[]).find((c) => c.slug === ciudad);

  if (!sector || !city) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#EFEBE5', minHeight: '60vh' }}>
        <h1 style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: '40px', letterSpacing: '-2.4px' }}>
          PÃ¡gina no encontrada
        </h1>
        <p style={{ color: 'rgba(0,0,0,0.56)', fontFamily: 'Inter, sans-serif' }}>Lo sentimos, la pÃ¡gina que buscas no existe.</p>
        <Link href="/" style={{ color: '#000' }}>Volver al inicio</Link>
      </div>
    );
  }

  const featureCards = sector.features.slice(0, 3);

  const relatedSectors = (sectors as SectorType[])
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  const relatedCities = (cities as CityType[])
    .filter((c) => c.slug !== ciudad)
    .slice(0, 5);

  const howToSteps = [
    { name: 'Elige tu plan', text: `Selecciona el plan que mejor se adapte a tu negocio de ${sector.sector} en ${city.city}.` },
    { name: 'Configura tu flujo', text: 'Define cÃ³mo quieres que atendamos tus llamadas: horarios, mensajes y derivaciones.' },
    { name: 'Activa tu recepcionista', text: 'En menos de 24h tu recepcionista virtual estarÃ¡ operativa atendiendo llamadas.' },
  ];

  const breadcrumbItems = [
    { name: 'Inicio', url: '/' },
    { name: sector.sector, url: `/lp/${sector.slug}` },
    { name: city.city, url: `/lp/${sector.slug}/${city.slug}` },
  ];

  const faqItems = [
    {
      question: `Â¿Minute Call ofrece recepcionista para ${sector.sector} en ${city.city}?`,
      answer: `SÃ­, Minute Call ofrece atenciÃ³n telefÃ³nica especializada para ${sector.sector} en ${city.city} con agentes nativos basados en EspaÃ±a o asistentes de IA â tÃº eliges. Nuestro servicio estÃ¡ diseÃ±ado para las necesidades especÃ­ficas de este sector.`,
    },
    {
      question: `Â¿QuÃ© sectores atiende Minute Call en ${city.city}?`,
      answer: `En ${city.city}, Minute Call atiende a varios sectores clave: ${city.keySectors.join(', ')}. Cada uno cuenta con una soluciÃ³n personalizada de recepcionista virtual con agentes nativos o IA.`,
    },
    {
      question: `Â¿CuÃ¡nto cuesta el servicio de recepcionista para ${sector.sector}?`,
      answer: `Los planes de Minute Call empiezan desde 250â¬/mes. El precio varÃ­a segÃºn el volumen de llamadas, horario y tipo de agente (humano o IA). Sin permanencia ni costes ocultos. Contacta con nosotros para un presupuesto personalizado.`,
    },
    {
      question: `Â¿CÃ³mo funciona el servicio en ${city.city}?`,
      answer: `Nuestro servicio funciona en 3 pasos: primero, personalizamos el guiÃ³n de llamada y acciones del agente; segundo, respondemos en nombre de tu empresa siguiendo tu procedimiento; tercero, agendamos la cita o enviamos el mensaje al instante a tu email.`,
    },
  ];

  /* âââââââââââââââââââââââââââââââââââââââââââââ
     BRAND TOKENS â exact match with minute-call.com homepage
     âââââââââââââââââââââââââââââââââââââââââââââ */
  const brand = {
    beige: '#EFEBE5',
    black: '#000000',
    dark: '#111111',
    green: '#5AFF15',
    white: '#FFFFFF',
    lightGray: '#f5f5f5',
    textMuted: 'rgba(0,0,0,0.56)',
    textBody: 'rgba(0,0,0,0.56)',
    /* Typography â homepage uses Inter for ALL text, Source Serif 4 italic ONLY for accent spans */
    sans: "Inter, sans-serif",
    serif: "'Source Serif 4', serif",
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema
        services={[{
          name: `Recepcionista Virtual para ${sector.sector}`,
          description: `AtenciÃ³n telefÃ³nica 24/7 para ${sector.sector} en ${city.city} con agentes nativos o IA`,
        }]}
      />
      <FAQPageSchema faqs={faqItems} />
      <LocalBusinessSchema />
      <HowToSchema steps={howToSteps} />
      <ReviewSchema
        authorName={sector.testimonial.author}
        authorRole={sector.testimonial.role}
        reviewBody={sector.testimonial.quote}
      />

      {/* ââ HERO ââ */}
      <section style={{
        padding: '80px 64px 60px',
        backgroundColor: brand.beige,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav style={{ fontSize: '14px', color: brand.textMuted, fontFamily: brand.sans, marginBottom: '40px' }}>
            {breadcrumbItems.map((item, idx) => (
              <span key={idx}>
                {idx > 0 && <span style={{ margin: '0 6px' }}>/</span>}
                {idx < breadcrumbItems.length - 1 ? (
                  <Link href={item.url} style={{ color: brand.textMuted, textDecoration: 'none' }}>
                    {item.name}
                  </Link>
                ) : (
                  <span style={{ color: brand.black }}>{item.name}</span>
                )}
              </span>
            ))}
          </nav>

          {/* Tag above title â matches homepage "RecepciÃ³n de llamadas para PYMES" */}
          <p style={{
            fontSize: '14px',
            fontWeight: 500,
            color: brand.textMuted,
            fontFamily: brand.sans,
            marginBottom: '20px',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.5px',
          }}>
            Recepcionista Virtual para {sector.sector}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            {/* Left: copy */}
            <div>
              <h1 style={{
                fontSize: '60px',
                fontWeight: 500,
                fontFamily: brand.sans,
                color: brand.black,
                lineHeight: 1.05,
                letterSpacing: '-3.6px',
                margin: '0 0 24px 0',
              }}>
                AtenciÃ³n telefÃ³nica para {sector.sector} en{' '}
                <span style={{ fontFamily: brand.serif, fontStyle: 'italic' }}>{city.city}.</span>
              </h1>
              <p style={{
                fontSize: '18px',
                fontWeight: 400,
                color: brand.textBody,
                lineHeight: '27px',
                fontFamily: brand.sans,
                marginBottom: '36px',
                maxWidth: '480px',
              }}>
                {sector.heroSubtitle} en {city.city}. Atendemos las llamadas de tu empresa con
                agentes nativos o asistentes de IA â tÃº eliges. Sin permanencia.
              </p>
              <Link href="/reserva-llamada" style={{
                display: 'inline-block',
                padding: '16px 32px',
                backgroundColor: brand.green,
                color: brand.black,
                textDecoration: 'none',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 500,
                fontFamily: brand.sans,
              }}>
                Reserva una llamada
              </Link>
            </div>

            {/* Right: audio card ONLY â homepage hero has NO video */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              {/* Audio player card â matches homepage: 460x~381, border-radius 20px, shadow */}
              <div style={{
                backgroundColor: brand.white,
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 32px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '460px',
              }}>
                {/* Tab bar */}
                <div style={{
                  display: 'flex',
                  backgroundColor: brand.lightGray,
                  borderRadius: '14px 14px 0 0',
                }}>
                  <div style={{
                    flex: 1,
                    padding: '16px',
                    textAlign: 'center',
                    fontSize: '15px',
                    fontWeight: 600,
                    fontFamily: brand.sans,
                    color: brand.dark,
                    backgroundColor: brand.white,
                    borderRadius: '14px 0 0 0',
                  }}>
                    Recepcionista
                  </div>
                  <div style={{
                    flex: 1,
                    padding: '16px',
                    textAlign: 'center',
                    fontSize: '15px',
                    fontWeight: 500,
                    fontFamily: brand.sans,
                    color: 'rgba(0,0,0,0.4)',
                  }}>
                    Recepcionista IA
                  </div>
                </div>
                {/* Audio waveform area */}
                <div style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}>
                  {/* Waveform placeholder */}
                  <div style={{
                    height: '80px',
                    backgroundColor: brand.lightGray,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '3px',
                    padding: '0 20px',
                  }}>
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div key={i} style={{
                        width: '3px',
                        height: `${12 + Math.sin(i * 0.5) * 20 + Math.random() * 15}px`,
                        backgroundColor: brand.dark,
                        borderRadius: '2px',
                        opacity: 0.3,
                      }} />
                    ))}
                  </div>
                  {/* Progress bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Play button */}
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: brand.dark,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div style={{
                        width: 0,
                        height: 0,
                        borderTop: '6px solid transparent',
                        borderBottom: '6px solid transparent',
                        borderLeft: '10px solid white',
                        marginLeft: '2px',
                      }} />
                    </div>
                    <span style={{ fontSize: '13px', fontFamily: brand.sans, color: brand.textMuted }}>0:00</span>
                    <div style={{ flex: 1, height: '4px', backgroundColor: '#e5e5e5', borderRadius: '2px' }}>
                      <div style={{ width: '0%', height: '100%', backgroundColor: brand.dark, borderRadius: '2px' }} />
                    </div>
                    <span style={{ fontSize: '13px', fontFamily: brand.sans, color: brand.textMuted }}>0:44</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ââ VIDEO SECTION â matches homepage "Cada llamada perdida" section ââ */}
      <section style={{
        padding: '80px 64px',
        backgroundColor: brand.beige,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          gap: '64px',
          alignItems: 'center',
        }}>
          {/* Left: text + stats */}
          <div style={{ flex: 1 }}>
            <p style={{
              fontSize: '14px',
              fontWeight: 500,
              color: brand.textMuted,
              fontFamily: brand.sans,
              marginBottom: '20px',
              textTransform: 'uppercase' as const,
              letterSpacing: '0.5px',
            }}>
              Resultados de clientes
            </p>
            <h2 style={{
              fontSize: '44px',
              fontWeight: 500,
              fontFamily: brand.sans,
              color: brand.black,
              letterSpacing: '-2.64px',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}>
              Cada llamada perdida es una oportunidad{' '}
              <span style={{ fontFamily: brand.serif, fontStyle: 'italic' }}>perdida.</span>
            </h2>
            <p style={{
              fontSize: '18px',
              color: brand.textBody,
              lineHeight: '27px',
              fontFamily: brand.sans,
              marginBottom: '40px',
              maxWidth: '500px',
            }}>
              El 78% de los leads contratan al negocio que responde primero. Para las empresas de {sector.sector.toLowerCase()} en {city.city}, el telÃ©fono es el canal mÃ¡s importante.
            </p>
            <div style={{ display: 'flex', gap: '48px' }}>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  fontFamily: brand.sans,
                  color: brand.black,
                  marginBottom: '4px',
                }}>
                  Tiempo de respuesta
                </h3>
                <p style={{
                  fontSize: '36px',
                  fontWeight: 500,
                  fontFamily: brand.sans,
                  color: brand.black,
                  letterSpacing: '-1.5px',
                }}>
                  {'<'} 3 seg
                </p>
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  fontFamily: brand.sans,
                  color: brand.black,
                  marginBottom: '4px',
                }}>
                  Tasa de respuesta
                </h3>
                <p style={{
                  fontSize: '36px',
                  fontWeight: 500,
                  fontFamily: brand.sans,
                  color: brand.black,
                  letterSpacing: '-1.5px',
                }}>
                  99.7%
                </p>
              </div>
            </div>
          </div>
          {/* Right: phone video mockup â homepage: 410x734, bg #f5f5f5, border-radius 16px */}
          <div style={{
            flex: '0 0 auto',
            width: '300px',
            height: '536px',
            backgroundColor: brand.lightGray,
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            >
              <source src="https://framerusercontent.com/assets/FaxcwHWdhZxkAcLltQoQxhlJciw.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ââ SOCIAL PROOF / LOCAL CONTEXT ââ */}
      <section style={{
        padding: '80px 64px',
        backgroundColor: brand.beige,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: 500,
            fontFamily: brand.sans,
            color: brand.black,
            letterSpacing: '-2.64px',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            Por quÃ© necesitas atenciÃ³n telefÃ³nica profesional en{' '}
            <span style={{ fontFamily: brand.serif, fontStyle: 'italic' }}>{city.city}.</span>
          </h2>
          <p style={{
            fontSize: '18px',
            color: brand.textBody,
            lineHeight: '27px',
            fontFamily: brand.sans,
            marginBottom: '40px',
            maxWidth: '700px',
          }}>
            {city.localContext}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {sector.features.slice(0, 2).map((feature, idx) => (
              <div key={idx} style={{
                padding: '32px',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.08)',
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  fontFamily: brand.sans,
                  color: brand.black,
                  letterSpacing: '-1.68px',
                  marginBottom: '12px',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: brand.textBody,
                  lineHeight: '24px',
                  fontFamily: brand.sans,
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ââ FEATURES â dark section like homepage "QuÃ© hacemos por ti" ââ */}
      <section style={{
        padding: '80px 64px',
        backgroundColor: brand.black,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: 500,
            fontFamily: brand.sans,
            color: brand.white,
            letterSpacing: '-2.64px',
            lineHeight: 1.1,
            marginBottom: '40px',
          }}>
            CaracterÃ­sticas principales para{' '}
            <span style={{ fontFamily: brand.serif, fontStyle: 'italic' }}>{sector.sector}.</span>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {featureCards.map((feature, idx) => (
              <div key={idx} style={{
                padding: '32px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  fontFamily: brand.sans,
                  color: brand.white,
                  letterSpacing: '-1.68px',
                  marginBottom: '12px',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.56)',
                  lineHeight: '24px',
                  fontFamily: brand.sans,
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ââ TESTIMONIAL ââ */}
      <section style={{
        padding: '80px 64px',
        backgroundColor: brand.beige,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: 500,
            fontFamily: brand.sans,
            color: brand.black,
            letterSpacing: '-2.64px',
            lineHeight: 1.1,
            marginBottom: '40px',
          }}>
            Lo que dicen nuestros{' '}
            <span style={{ fontFamily: brand.serif, fontStyle: 'italic' }}>clientes.</span>
          </h2>
          <div style={{
            padding: '48px 0',
          }}>
            <p style={{
              fontSize: '28px',
              fontFamily: brand.serif,
              fontStyle: 'italic',
              fontWeight: 400,
              color: brand.black,
              lineHeight: 1.5,
              marginBottom: '24px',
            }}>
              &ldquo;{sector.testimonial.quote}&rdquo;
            </p>
            <p style={{
              fontSize: '16px',
              fontWeight: 500,
              color: brand.black,
              fontFamily: brand.sans,
            }}>
              {sector.testimonial.author}
            </p>
            <p style={{
              fontSize: '14px',
              color: brand.textMuted,
              marginTop: '4px',
              fontFamily: brand.sans,
            }}>
              {sector.testimonial.role}
            </p>
          </div>
        </div>
      </section>

      {/* ââ HOW IT WORKS ââ */}
      <section style={{
        padding: '80px 64px',
        backgroundColor: brand.beige,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: 500,
            fontFamily: brand.sans,
            color: brand.black,
            letterSpacing: '-2.64px',
            lineHeight: 1.1,
            marginBottom: '48px',
          }}>
            CÃ³mo{' '}
            <span style={{ fontFamily: brand.serif, fontStyle: 'italic' }}>funciona.</span>
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}>
            {[
              { num: '1', title: 'ConfiguraciÃ³n', desc: 'Personalizamos el guiÃ³n de llamada y acciones del agente con los detalles de tu negocio y sector.' },
              { num: '2', title: 'IntegraciÃ³n', desc: 'Integramos el sistema con tu telefonÃ­a actual sin necesidad de cambios en tu infraestructura.' },
              { num: '3', title: 'GestiÃ³n', desc: 'Tu recepcionista virtual gestiona las llamadas y consultas de forma inteligente.' },
            ].map((step, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: brand.textMuted,
                  marginBottom: '16px',
                  fontFamily: brand.sans,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  Paso {step.num}
                </p>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 500,
                  fontFamily: brand.sans,
                  color: brand.black,
                  letterSpacing: '-1.68px',
                  marginBottom: '12px',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: brand.textBody,
                  lineHeight: '24px',
                  fontFamily: brand.sans,
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ââ IA vs HUMAN â dark section ââ */}
      <section style={{
        padding: '80px 64px',
        backgroundColor: brand.black,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: 500,
            fontFamily: brand.sans,
            color: brand.white,
            letterSpacing: '-2.64px',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            Â¿IA o agente humano? TÃº{' '}
            <span style={{ fontFamily: brand.serif, fontStyle: 'italic' }}>eliges.</span>
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.56)',
            lineHeight: '27px',
            fontFamily: brand.sans,
            marginBottom: '40px',
            maxWidth: '700px',
          }}>
            En Minute Call puedes elegir entre asistentes de IA y recepcionistas nativos basados en EspaÃ±a, o combinar ambos segÃºn tus necesidades.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            <div style={{
              padding: '32px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: '50px',
                backgroundColor: brand.green,
                color: brand.black,
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '20px',
                fontFamily: brand.sans,
              }}>IA</div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 500,
                fontFamily: brand.sans,
                color: brand.white,
                letterSpacing: '-1.68px',
                marginBottom: '12px',
              }}>
                Agente de IA
              </h3>
              <p style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.56)',
                lineHeight: '24px',
                fontFamily: brand.sans,
              }}>
                Ideal para consultas frecuentes, confirmaciones de cita, horarios y disponibilidad.
                Responde al instante, 24/7, sin esperas. Perfecto para volumen alto y horario nocturno o fines de semana.
              </p>
            </div>
            <div style={{
              padding: '32px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: '50px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: brand.white,
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '20px',
                fontFamily: brand.sans,
              }}>Humano</div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 500,
                fontFamily: brand.sans,
                color: brand.white,
                letterSpacing: '-1.68px',
                marginBottom: '12px',
              }}>
                Agente Humano Nativo
              </h3>
              <p style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.56)',
                lineHeight: '24px',
                fontFamily: brand.sans,
              }}>
                Mejor para primeras consultas de alto valor, quejas, presupuestos personalizados y
                situaciones que requieren empatÃ­a. Recepcionistas nativos basados en EspaÃ±a.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ââ MC vs CALL CENTERS ââ */}
      <section style={{
        padding: '80px 64px',
        backgroundColor: brand.beige,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: 500,
            fontFamily: brand.sans,
            color: brand.black,
            letterSpacing: '-2.64px',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            Minute Call vs Call Centers{' '}
            <span style={{ fontFamily: brand.serif, fontStyle: 'italic' }}>Tradicionales.</span>
          </h2>
          <p style={{
            fontSize: '18px',
            color: brand.textBody,
            lineHeight: '27px',
            fontFamily: brand.sans,
            marginBottom: '40px',
            maxWidth: '700px',
          }}>
            Los grandes call centers estÃ¡n diseÃ±ados para corporaciones. Minute Call estÃ¡ diseÃ±ado para PYMES como tu {sector.sector.toLowerCase()} en {city.city}.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            <div style={{
              padding: '32px',
              borderRadius: '20px',
              border: '1px solid rgba(0,0,0,0.08)',
            }}>
              <div style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: '50px',
                backgroundColor: 'rgba(0,0,0,0.04)',
                color: brand.textMuted,
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '20px',
                fontFamily: brand.sans,
              }}>Tradicional</div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 500,
                fontFamily: brand.sans,
                color: brand.black,
                letterSpacing: '-1.68px',
                marginBottom: '12px',
              }}>
                Call Centers Tradicionales
              </h3>
              <p style={{
                fontSize: '16px',
                color: brand.textBody,
                lineHeight: '24px',
                fontFamily: brand.sans,
              }}>
                Agentes basados en LATAM Â· Contratos rÃ­gidos a largo plazo Â· Bajo nivel tecnolÃ³gico Â· Errores frecuentes Â· Falta de personalizaciÃ³n Â· DiseÃ±ados para grandes corporaciones
              </p>
            </div>
            <div style={{
              padding: '32px',
              borderRadius: '20px',
              border: `2px solid ${brand.green}`,
            }}>
              <div style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: '50px',
                backgroundColor: brand.green,
                color: brand.black,
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '20px',
                fontFamily: brand.sans,
              }}>minute call</div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 500,
                fontFamily: brand.sans,
                color: brand.black,
                letterSpacing: '-1.68px',
                marginBottom: '12px',
              }}>
                Minute Call
              </h3>
              <p style={{
                fontSize: '16px',
                color: brand.textBody,
                lineHeight: '24px',
                fontFamily: brand.sans,
              }}>
                Agentes nativos basados en EspaÃ±a Â· Sin permanencia, mes a mes Â· Agentes humanos o IA, tÃº eliges Â· Control de calidad Â· Partners de Teleperformance (#1 BPO mundial) Â· Desde 250â¬/mes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ââ FAQ ââ */}
      <section style={{
        padding: '80px 64px',
        backgroundColor: brand.beige,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: 500,
            fontFamily: brand.sans,
            color: brand.black,
            letterSpacing: '-2.64px',
            lineHeight: 1.1,
            marginBottom: '40px',
          }}>
            Preguntas{' '}
            <span style={{ fontFamily: brand.serif, fontStyle: 'italic' }}>frecuentes.</span>
          </h2>
          <div style={{ maxWidth: '1200px' }}>
            {faqItems.map((item, idx) => (
              <div key={idx} style={{
                marginBottom: '24px',
                paddingBottom: '24px',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
              }}>
                <p style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  color: brand.black,
                  marginBottom: '12px',
                  fontFamily: brand.sans,
                  letterSpacing: '-0.5px',
                }}>
                  {item.question}
                </p>
                <p style={{
                  fontSize: '16px',
                  color: brand.textBody,
                  lineHeight: '24px',
                  fontFamily: brand.sans,
                }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ââ INTERNAL LINKS ââ */}
      <section style={{
        padding: '80px 64px',
        backgroundColor: brand.beige,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: 500,
            fontFamily: brand.sans,
            color: brand.black,
            letterSpacing: '-2.64px',
            lineHeight: 1.1,
            marginBottom: '24px',
          }}>
            MÃ¡s{' '}
            <span style={{ fontFamily: brand.serif, fontStyle: 'italic' }}>informaciÃ³n.</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link href={`/lp/${sector.slug}`} style={{
              color: brand.black,
              textDecoration: 'none',
              fontWeight: 500,
              fontFamily: brand.sans,
              fontSize: '16px',
              borderBottom: '1px solid rgba(0,0,0,0.2)',
              paddingBottom: '2px',
              display: 'inline-block',
              width: 'fit-content',
            }}>
              Recepcionista Virtual para {sector.sector} â
            </Link>
            <Link href={`/atencion-telefonica/${city.slug}`} style={{
              color: brand.black,
              textDecoration: 'none',
              fontWeight: 500,
              fontFamily: brand.sans,
              fontSize: '16px',
              borderBottom: '1px solid rgba(0,0,0,0.2)',
              paddingBottom: '2px',
              display: 'inline-block',
              width: 'fit-content',
            }}>
              Servicios de atenciÃ³n telefÃ³nica en {city.city} â
            </Link>
          </div>

          <h3 style={{
            fontSize: '24px',
            fontWeight: 500,
            fontFamily: brand.sans,
            color: brand.black,
            letterSpacing: '-1.68px',
            marginTop: '48px',
            marginBottom: '20px',
          }}>
            Sectores relacionados en {city.city}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {relatedSectors.map((relatedSector, idx) => (
              <Link key={idx} href={`/lp/${relatedSector.slug}/${city.slug}`} style={{
                color: brand.black,
                textDecoration: 'none',
                fontWeight: 500,
                fontFamily: brand.sans,
                fontSize: '16px',
                borderBottom: '1px solid rgba(0,0,0,0.2)',
                paddingBottom: '2px',
                display: 'inline-block',
                width: 'fit-content',
              }}>
                Recepcionista Virtual para {relatedSector.sector} â
              </Link>
            ))}
          </div>

          {/* Other cities */}
          <div style={{ marginTop: '48px' }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 500,
              fontFamily: brand.sans,
              color: brand.black,
              letterSpacing: '-1.68px',
              marginBottom: '16px',
            }}>
              {sector.sector} en otras ciudades
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {relatedCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/lp/${sector.slug}/${c.slug}`}
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: brand.white,
                    borderRadius: '50px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: brand.black,
                    textDecoration: 'none',
                    fontFamily: brand.sans,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  {sector.sector} en {c.city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ââ BOTTOM CTA â dark, matches homepage final CTA ââ */}
      <section style={{
        padding: '100px 64px',
        backgroundColor: brand.black,
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '55px',
            fontWeight: 500,
            fontFamily: brand.sans,
            color: brand.white,
            letterSpacing: '-3.3px',
            lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            Habla con nuestro{' '}
            <span style={{ fontFamily: brand.serif, fontStyle: 'italic' }}>equipo.</span>
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.56)',
            lineHeight: '27px',
            fontFamily: brand.sans,
            marginBottom: '36px',
          }}>
            Descubre cÃ³mo Minute Call puede transformar la atenciÃ³n
            telefÃ³nica de tu {sector.sector.toLowerCase()} en {city.city}.
          </p>
          <Link href="/reserva-llamada" style={{
            display: 'inline-block',
            padding: '16px 32px',
            backgroundColor: brand.green,
            color: brand.black,
            textDecoration: 'none',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: 500,
            fontFamily: brand.sans,
          }}>
            Reserva una llamada
          </Link>
        </div>
      </section>
    </>
  );
}
