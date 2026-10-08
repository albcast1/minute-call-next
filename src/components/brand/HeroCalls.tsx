"use client";

import { useEffect, useState } from "react";
import { Voice } from "./Brand";

/* Ilustración del servicio en el hero: llamadas de ejemplo que entran y se
   atienden, una cada pocos segundos. Sin cifras inventadas: solo el tipo de
   negocio y quién atiende (persona o IA). Con "reducir movimiento" queda fija. */
const CALLS = [
  { who: "Clínica dental", city: "Madrid", by: "Persona" },
  { who: "Despacho de abogados", city: "Valencia", by: "Persona" },
  { who: "Inmobiliaria", city: "Málaga", by: "IA" },
  { who: "Asesoría", city: "Barcelona", by: "Persona" },
  { who: "Clínica veterinaria", city: "Sevilla", by: "IA" },
  { who: "Fisioterapia", city: "Bilbao", by: "Persona" },
];
const STEP = 3800; // ms por llamada
const RING = 1500; // ms sonando antes de "atendida"

export default function HeroCalls() {
  const [i, setI] = useState(0);
  const [answered, setAnswered] = useState(true);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let ring: ReturnType<typeof setTimeout>;
    const tick = () => {
      setI((n) => (n + 1) % CALLS.length);
      setAnswered(false);
      ring = setTimeout(() => setAnswered(true), RING);
    };
    const id = setInterval(tick, STEP);
    return () => {
      clearInterval(id);
      clearTimeout(ring);
    };
  }, []);

  const c = CALLS[i];
  return (
    <div className="hcalls" aria-hidden="true">
      <div className={`hc-row${answered ? " is-on" : ""}`} key={i}>
        <span className="hc-ico">
          <Voice />
        </span>
        <span className="hc-who">
          {c.who}
          <span className="hc-city">, {c.city}</span>
        </span>
        <span className="hc-st">
          <span className="hc-ring">Sonando</span>
          <span className="hc-done">Atendida · {c.by}</span>
        </span>
      </div>
    </div>
  );
}
