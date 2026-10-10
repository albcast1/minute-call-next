import type { CSSProperties } from "react";

/* Piezas pequeñas de la marca reutilizables en cualquier página. */

/** Asterisco morado que gira (marca 2026). Decorativo. */
export function Star({ className = "star" }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <g stroke="#6840FF" strokeWidth="19" strokeLinecap="round">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line key={a} x1="50" y1="31" x2="50" y2="10" transform={`rotate(${a} 50 50)`} />
          ))}
        </g>
      </svg>
    </span>
  );
}

/** Barras de voz animadas (naranja por defecto). Decorativo. */
export function Voice() {
  return (
    <span className="voice" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

/** Logo de Trustpilot + captura de la nota real. */
export function TrustpilotBadge() {
  return (
    <a
      className="tpb"
      href="https://es.trustpilot.com/review/minute-call.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Opiniones de Minute Call en Trustpilot: 4,4 sobre 5"
    >
      <img className="tp-logo" src="/assets/trustpilot/logo.png" alt="Trustpilot" width={165} height={40} />
      <img className="tp-rating" src="/assets/trustpilot/rating.png" alt="4,4 sobre 5" width={297} height={44} />
    </a>
  );
}

export function waveBars(count: number) {
  let seed = 11;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: count }, (_, q) => {
    const t = q / (count - 1);
    const h = Math.round((25 + 70 * rnd()) * (0.5 + 0.5 * Math.sin(Math.PI * t)));
    const delay = (-rnd() * 1.4).toFixed(2);
    return { h, delay };
  });
}

/** Onda de audio animada. Alturas deterministas (mismo resultado en servidor y cliente). */
export function WaveBars({ count = 56, id }: { count?: number; id?: string }) {
  const bars = waveBars(count);
  return (
    <div className="cc-wave" id={id} aria-hidden="true">
      {bars.map((b, i) => (
        <i key={i} style={{ height: `${b.h}%`, animationDelay: `${b.delay}s` } as CSSProperties} />
      ))}
    </div>
  );
}
