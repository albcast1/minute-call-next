"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Movimiento de marca en todo el sitio, sin librerías:
   - Botones: el texto rueda hacia arriba al pasar el ratón (solo con ratón).
   Todo se omite con "reducir movimiento". Se reaplica en cada cambio de ruta. */

const reduce = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function rollButtons() {
  if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return;
  document.querySelectorAll<HTMLElement>("a.btn, button.btn").forEach((btn) => {
    if (btn.dataset.roll) {
      // React puede haber cambiado el texto al navegar: se actualiza la copia.
      const [a, b] = Array.from(btn.querySelectorAll<HTMLElement>(".roll > span"));
      if (a && b && b.textContent !== a.textContent) b.textContent = a.textContent;
      return;
    }
    const nodes = Array.from(btn.childNodes);
    // Solo botones de texto plano (sin iconos ni elementos dentro).
    if (!nodes.length || nodes.some((n) => n.nodeType !== Node.TEXT_NODE)) return;
    const text = btn.textContent?.trim();
    if (!text) return;
    btn.dataset.roll = "1";
    const roll = document.createElement("span");
    roll.className = "roll";
    const a = document.createElement("span");
    nodes.forEach((n) => a.appendChild(n)); // se mueven los mismos nodos de texto
    const b = document.createElement("span");
    b.setAttribute("aria-hidden", "true");
    b.textContent = text;
    roll.append(a, b);
    btn.appendChild(roll);
  });
}

export default function BrandMotion() {
  const pathname = usePathname();
  useEffect(() => {
    if (reduce()) return;
    const t = setTimeout(rollButtons, 60);
    return () => clearTimeout(t);
  }, [pathname]);
  return null;
}
