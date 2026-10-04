"use client";

import Link from "next/link";
import { useRef } from "react";

export type Sector = { name: string; href: string };

/* Pasarela de sectores. Con movimiento normal avanza sola en bucle (CSS).
   Con "reducir movimiento" queda quieta y se desliza a mano: para que se
   entienda que hay más, se ve un trozo de la siguiente tarjeta, el borde
   derecho se difumina y aparecen flechas debajo. */
export default function SectorRail({ sectors }: { sectors: Sector[] }) {
  const rail = useRef<HTMLDivElement>(null);

  const move = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".sc2");
    const step = card ? card.offsetWidth + 12 : 240;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <>
      <div className="rail" ref={rail} aria-label="Sectores">
        <div className="rail-track">
          {[...sectors, ...sectors].map((sector, i) => {
            const clone = i >= sectors.length;
            return (
              <Link
                key={`${sector.href}-${i}`}
                className="sc2"
                href={sector.href}
                aria-hidden={clone || undefined}
                tabIndex={clone ? -1 : undefined}
              >
                <span className="sc2-panel">
                  <span className="sc2-n">{sector.name}</span>
                </span>
                <span className="sc2-cap">
                  <span className="sc2-cta">
                    Ver sector <span aria-hidden="true">↗</span>
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="rail-nav">
        <button type="button" onClick={() => move(-1)} aria-label="Sectores anteriores">
          ←
        </button>
        <button type="button" onClick={() => move(1)} aria-label="Más sectores">
          →
        </button>
      </div>
    </>
  );
}
