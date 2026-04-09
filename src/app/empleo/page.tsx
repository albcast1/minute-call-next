import Link from 'next/link';
import { Metadata } from 'next';
import jobs from '@/data/jobs.json';

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

export const metadata: Metadata = {
  title: 'Empleo en Call Center | Trabaja con minute call',
  description: 'Ofertas de empleo en call center, teleoperador, atención al cliente y más. Trabaja desde casa con horarios flexibles. Únete a minute call.',
  openGraph: {
    title: 'Empleo en Call Center | Trabaja con minute call',
    description: 'Ofertas de empleo en call center, teleoperador, atención al cliente y más. Trabaja desde casa con horarios flexibles.',
    type: 'website',
    locale: 'es_ES',
  },
  robots: { index: true, follow: true },
};

export default function EmpleoPage() {
  const allJobs = jobs as JobType[];

  const containerStyle: React.CSSProperties = { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' };
  const sectionStyle: React.CSSProperties = { padding: '60px 0', borderBottom: '1px solid #f0f0f0' };
  const h2Style: React.CSSProperties = { fontSize: '32px', fontWeight: '700', marginBottom: '20px', color: '#1a1a1a' };

  return (
    <>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div style={containerStyle}>
          <div className="pill-label" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Empleo
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '700', margin: '20px 0', lineHeight: '1.2' }}>
            Trabaja con minute call
          </h1>
          <p style={{ fontSize: '20px', maxWidth: '700px', margin: '20px auto 30px', lineHeight: '1.6', opacity: 0.95 }}>
            Únete a nuestro equipo de profesionales en atención al cliente. Ofrecemos empleo flexible, remoto y con excelentes beneficios.
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={h2Style}>Ofertas de empleo disponibles</h2>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '40px' }}>
            Explora nuestras ofertas de empleo y encuentra la que mejor se ajuste a tu perfil y disponibilidad.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {allJobs.map((job, idx) => (
              <Link key={idx} href={`/empleo/${job.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{ padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff', height: '100%', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}>
                  <span style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: '#f0f2ff', borderRadius: '20px', fontSize: '12px', fontWeight: '600', color: '#667eea', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {job.heroTag}
                  </span>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }} className="service-card-title">
                    {job.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }} className="service-card-body">
                    {job.heroSubtitle}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                    {job.benefits.slice(0, 2).map((benefit, bidx) => (
                      <span key={bidx} style={{ fontSize: '12px', padding: '4px 10px', background: '#f8f9fa', borderRadius: '4px', color: '#555' }}>
                        {benefit.title}
                      </span>
                    ))}
                  </div>
                  <span style={{ color: '#667eea', fontSize: '14px', fontWeight: '600' }}>
                    Ver oferta →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section style={sectionStyle}>
        <div style={containerStyle}>
          <h2 style={h2Style}>¿Por qué trabajar en minute call?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '40px' }}>
            <div className="card" style={{ padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#667eea' }}>Trabajo 100% Remoto</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>Trabaja desde cualquier lugar de España. Solo necesitas conexión a internet y un espacio tranquilo.</p>
            </div>
            <div className="card" style={{ padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#667eea' }}>Horarios Flexibles</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>Elige entre jornada completa, media jornada o fines de semana. Adaptamos los turnos a tu vida.</p>
            </div>
            <div className="card" style={{ padding: '30px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fff' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#667eea' }}>Formación Incluida</h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>No necesitas experiencia previa. Te proporcionamos toda la capacitación necesaria para empezar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form (fake — frontend only) */}
      <section id="formulario" style={{ ...sectionStyle, background: '#f8f9fa' }}>
        <div style={{ ...containerStyle, maxWidth: '600px' }}>
          <h2 style={{ ...h2Style, textAlign: 'center' }}>Envía tu candidatura</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px', fontSize: '14px' }}>
            ¿No encuentras la oferta que buscas? Envía tu candidatura general y te contactaremos cuando surja una oportunidad.
          </p>
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
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>Puesto de interés</label>
              <select style={{ width: '100%', padding: '12px', fontSize: '14px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box', fontFamily: 'inherit', background: 'white', cursor: 'pointer' }}>
                <option value="">Cualquier puesto</option>
                <option value="call-center">Agente de Call Center</option>
                <option value="teleoperador">Teleoperador</option>
                <option value="atencion-cliente">Atención al Cliente</option>
                <option value="telefonista">Telefonista</option>
                <option value="operador">Operador Telefónico</option>
              </select>
            </div>
            <button type="button" className="btn-cta" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
              Enviar candidatura
            </button>
          </form>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ textAlign: 'center', background: '#f5f7fa', padding: '80px 20px' }}>
        <div style={containerStyle}>
          <h2 style={h2Style}>¿Eres empresa y necesitas atención telefónica?</h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
            Descubre cómo minute call puede transformar la atención telefónica de tu empresa con agentes humanos e IA.
          </p>
          <Link href="/reserva-llamada" style={{ display: 'inline-block', padding: '14px 32px', backgroundColor: '#0066cc', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600' }} className="btn-cta">
            Reserva una llamada
          </Link>
        </div>
      </section>
    </>
  );
}
