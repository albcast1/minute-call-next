import Link from "next/link";
import type { ReactNode } from "react";
import { Star, Voice, TrustpilotBadge, WaveBars } from "./Brand";

/* Bloques de la marca 2026, los mismos de la home, para todas las páginas.
   Todos van dentro de <BrandPage>, que aplica .mc-reset. */

export function BrandPage({ children }: { children: ReactNode }) {
  return <div className="home mc-reset">{children}</div>;
}

type Cta = { href?: string; label?: string };

/** Hero centrado de la home: etiqueta mono con barras de voz, titular grande,
 *  subtítulo, CTA lima y Trustpilot. `star` añade el asterisco morado. */
export function Hero({
  tag,
  title,
  sub,
  extra,
  cta = {},
  trust = true,
  star = false,
  crumbs,
  secondary,
  children,
}: {
  tag: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  extra?: ReactNode;
  cta?: Cta | false;
  trust?: boolean;
  star?: boolean;
  crumbs?: { name: string; url: string }[];
  secondary?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <section className="hero hero-page">
      <div className="wrap">
        {crumbs && (
          <nav className="crumbs" aria-label="Migas de pan">
            {crumbs.map((c, i) => (
              <span key={c.url}>
                {i > 0 && <span aria-hidden="true">/ </span>}
                <Link href={c.url}>{c.name}</Link>
              </span>
            ))}
          </nav>
        )}
        <span className="tag">
          <Voice />
          {tag}
        </span>
        <h1 style={{ marginTop: 28 }}>
          {title}
          {star && (
            <>
              {" "}
              <Star />
            </>
          )}
        </h1>
        {sub && <p className="sub">{sub}</p>}
        {extra && <p className="sub sub-2">{extra}</p>}
        {cta !== false && (
          <div className="hero-actions">
            <Link href={cta.href ?? "/reserva-llamada"} className="btn btn-lime" data-hero-cta>
              {cta.label ?? "Reserva una llamada"}
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn btn-ghost">
                {secondary.label}
              </Link>
            )}
          </div>
        )}
        {trust && (
          <div className="tp-row">
            <TrustpilotBadge />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/** Sección editorial: etiqueta a la izquierda, titular y contenido a la derecha. */
export function Ed({
  tag,
  title,
  id,
  flush = true,
  children,
}: {
  tag: ReactNode;
  title?: ReactNode;
  id?: string;
  flush?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="section" id={id} style={flush ? { paddingTop: 0 } : undefined}>
      <div className="wrap ed">
        <div className="ed-side">
          <span className="tag">{tag}</span>
        </div>
        <div className="ed-main">
          {title && <h2 className="h2 left">{title}</h2>}
          {children}
        </div>
      </div>
    </section>
  );
}

/** Filas con regla superior (Qué hacemos). */
export function Rows({
  items,
  cols = 3,
}: {
  items: { title: ReactNode; desc: ReactNode }[];
  cols?: 2 | 3 | 4;
}) {
  return (
    <div className={`rows rows-${cols}`}>
      {items.map((it, i) => (
        <div className="row" key={i}>
          <h3>{it.title}</h3>
          <p>{it.desc}</p>
        </div>
      ))}
    </div>
  );
}

/** Pasos numerados (Cómo funciona). */
export function Steps({ items }: { items: { title: ReactNode; desc: ReactNode }[] }) {
  return (
    <div className="steps2">
      {items.map((it, i) => (
        <div key={i}>
          <span className="n">{String(i + 1).padStart(2, "0")}</span>
          <h3>{it.title}</h3>
          <p>{it.desc}</p>
        </div>
      ))}
    </div>
  );
}

/** Cifras con regla superior. */
export function Stats({ items }: { items: { value: ReactNode; label: ReactNode }[] }) {
  return (
    <div className="stats2">
      {items.map((s, i) => (
        <div key={i}>
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/** FAQ cerrada por defecto. */
export function Faq({ items }: { items: { q: ReactNode; a: ReactNode }[] }) {
  return (
    <div className="faq2">
      {items.map((f, i) => (
        <details key={i}>
          <summary>
            {f.q}
            <span className="pl" aria-hidden="true">
              +
            </span>
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Testimonio editorial. */
export function Quote({ quote, author, role }: { quote: ReactNode; author: ReactNode; role?: ReactNode }) {
  return (
    <figure className="quote2">
      <blockquote>
        <span className="qm">&ldquo;</span>
        {quote}
        <span className="qm">&rdquo;</span>
      </blockquote>
      <figcaption>
        <b>{author}</b>
        {role && <span>{role}</span>}
      </figcaption>
    </figure>
  );
}

/** Comparativa ellos/nosotros, como en la home. */
export function Versus({
  themLabel,
  them,
  ours,
}: {
  themLabel: ReactNode;
  them: ReactNode[];
  ours: ReactNode[];
}) {
  const n = Math.max(them.length, ours.length);
  return (
    <div className="vs">
      <div className="vs-head">
        <span>{themLabel}</span>
        <span className="us">
          <img src="/assets/logo.png" alt="" width={24} height={24} style={{ width: 24, height: 24, borderRadius: 5 }} />
          minute call
        </span>
      </div>
      {Array.from({ length: n }, (_, i) => (
        <div className="vs-row" key={i}>
          <span className="them">
            {them[i] ? (
              <>
                <i aria-hidden="true">✕</i>
                <span>{them[i]}</span>
              </>
            ) : null}
          </span>
          <span className="ours">
            {ours[i] ? (
              <>
                <i aria-hidden="true">✓</i>
                {ours[i]}
              </>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Enlaces en chips (ciudades, sectores, servicios relacionados). Sin href = chip sin enlace. */
export function Chips({ links }: { links: { href?: string | null; label: ReactNode; title?: string }[] }) {
  return (
    <div className="lk">
      {links.map((l, i) =>
        l.href ? (
          <Link key={l.href} href={l.href} title={l.title}>
            {l.label}
          </Link>
        ) : (
          <span key={`s-${i}`}>{l.label}</span>
        )
      )}
    </div>
  );
}

/** Cifra destacada: separa "25% de llamadas..." en número + texto. */
export function splitFigure(text: string): { value: string; label: string } | null {
  const m = text.match(/^([\d.,]+\s?%?\+?)\s+(.+)$/);
  return m ? { value: m[1], label: m[2] } : null;
}

/** Cierre de página: panel suave + tarjeta morada de llamada entrante. */
export function CtaFinal({
  tag = "Activación en menos de 48 h",
  title = "No pierdas ninguna llamada más.",
  text = "Servicio premium de secretaría virtual y atención telefónica para PYMES.",
  cta = {},
  id = "contacto",
}: {
  tag?: ReactNode;
  title?: ReactNode;
  text?: ReactNode;
  cta?: Cta;
  id?: string;
}) {
  return (
    <section id={id} className="cta3">
      <div className="wrap cta3-grid">
        <div className="cta3-copy">
          <span className="tag">{tag}</span>
          <div>
            <h2>{title}</h2>
            {text && <p>{text}</p>}
          </div>
        </div>
        <div className="call-card">
          <div className="cc-top">
            <Voice />
            <span>Llamada entrante</span>
          </div>
          <div className="cc-who">Tu próximo cliente</div>
          <div className="cc-sub">Respondida en 15 s · 24/7</div>
          <WaveBars />
          <Link className="btn btn-white cc-btn" href={cta.href ?? "/reserva-llamada"}>
            {cta.label ?? "Reserva una llamada"}
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Texto largo (contenido SEO, legales, artículos). */
export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose">{children}</div>;
}
