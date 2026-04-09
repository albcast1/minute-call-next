import Link from 'next/link';
import { Metadata } from 'next';
import jobs from '@/data/jobs.json';
import { FAQPageSchema } from '@/components/JsonLd';

type JobType = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTag: string;
  heroSubtitle: string;
  benefits: Array<{ title: string; description: string }>;
  requirements: string[];
  faq: Array<{ question: string; answer: string }>;
};

export async function generateStaticParams() {
  return (jobs as JobType[]).map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = (jobs as JobType[]).find((j) => j.slug === slug);

  if (!job) {
    return { title: 'Empleo | minute call', description: 'Ofertas de empleo en minute call' };
  }

  return {
    title: job.metaTitle,
    description: job.metaDescription,
    openGraph: { title: job.metaTitle, description: job.metaDescription, type: 'website', locale: 'es_ES' },
    robots: { index: true, follow: true },
  };
}

export default async function EmpleoSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = (jobs as JobType[]).find((j) => j.slug === slug);

  if (!job) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1>Oferta no encontrada</h1>
        <p>Lo sentimos, la oferta que buscas no existe.</p>
        <Link href="/empleo" style={{ color: '#667eea' }}>Ver todas las ofertas</Link>
      </div>
    );
  }

  const relatedJobs = (jobs as JobType[]).filter((j) => j.slug !== slug).slice(0, 3);

  const containerStyle: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' };
  const sectionStyle: React.CSSProperties = { padding: '60px 0', borderBottom: '1px solid #f0f0f0' };
  const h2Style: React.CSSProperties = { fontSize: '32px', fontWeight: '700', marginBottom: '20px', color: '#1a1a1a' };
  const h3Style: React.CSSProperties = { fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' };

  return (
    <>
      <FAQPageSchema faqs={job.faq} />

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div style={containerStyle}>
          <div className="pill-label" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {job.heroTag}
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '700', margin: '20px 0', lineHeight: '1.2' }}>{job.title}</h1>
          <p style={{ fontSize: '20px', maxWidth: '700px', margin: '20px auto 30px', lineHeight: '1.6', opacity: 0.95 }}>{job.heroSubtitle}</p>
          <a href="#formulario" style={{ display: 'inline-block', padding: '14px 32px', backgroundColor: '#fff', color: '#667eea', textDecoration: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600' }}>
            Solicitar este puesto
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={h2Style}>Por qué trabajar con nosotros</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {job.benefits.map((benefit, idx) => (
              <div key={idx} className="card" style={{ padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
                <h3 style={h3Style} className="service-card-title">{benefit.title}</h3>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }} className="service-card-body">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={h2Style}>Requisitos</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '40px', maxWidth: '900px' }}>
            {job.requirements.map((req, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: '#f0f2ff', borderRadius: '6px', borderLeft: '4px solid #667eea' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', background: '#667eea', color: 'white', borderRadius: '50%', fontSize: '14px', fontWeight: 'bold', flexShrink: 0 }}>✓</span>
                <p style={{ margin: '0', fontSize: '14px', color: '#333' }}>{req}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form (fake — no action) */}
      <section id="formulario" style={{ ...sectionStyle, background: '#f8f9fa' }}>
        <div style={{ ...containerStyle, maxWidth: '600px' }}>
          <h2 style={{ ...h2Style, textAlign: 'center' }}>Solicita este puesto</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px', fontSize: '14px' }}>Completa el formulario y nos pondremos en contacto contigo pronto.</p>
          <form style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>Nombre completo *</label>
              <input type="text" required placeholder="Juan García López" style={{ width: '100%', padding: '12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>Email *</label>
              <input type="email" required placeholder="juan@example.com" style={{ width: '100%', padding: '12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>Teléfono *</label>
              <input type="tel" required placeholder="+34 123 456 789" style={{ width: '100%', padding: '12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>Experiencia previa *</label>
              <select required style={{ width: '100%', padding: '12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontFamily: 'inherit', background: 'white', cursor: 'pointer' }}>
                <option value="">Selecciona una opción</option>
                <option value="sin-experiencia">Sin experiencia</option>
                <option value="1-2-anos">1-2 años</option>
                <option value="3-5-anos">3-5 años</option>
                <option value="mas-5-anos">Más de 5 años</option>
              </select>
            </div>
            <button type="button" className="btn-cta" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
              Enviar candidatura
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={h2Style}>Preguntas frecuentes</h2>
          <div style={{ marginTop: '40px' }}>
            {job.faq.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #e0e0e0' }}>
                <p style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a', marginBottom: '12px' }}>{item.question}</p>
                <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6' }}>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related jobs */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={h2Style}>Otras ofertas de empleo</h2>
          <div style={{ marginTop: '20px' }}>
            {relatedJobs.map((relJob, idx) => (
              <div key={idx} style={{ display: 'inline-block', marginRight: '20px', marginBottom: '12px' }}>
                <Link href={`/empleo/${relJob.slug}`} style={{ color: '#667eea', textDecoration: 'none' }}>
                  → {relJob.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '80px 20px' }}>
        <div style={containerStyle}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '15px' }}>¿Listo para empezar?</h2>
          <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.95 }}>Únete al equipo de minute call y da el siguiente paso en tu carrera.</p>
          <a href="#formulario" style={{ display: 'inline-block', padding: '14px 32px', backgroundColor: '#fff', color: '#667eea', textDecoration: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600' }}>
            Solicitar ahora
          </a>
        </div>
      </section>
    </>
  );
}
