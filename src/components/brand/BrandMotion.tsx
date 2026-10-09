"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Movimiento de marca en todo el sitio, sin librerías:
   - Botones: el texto rueda hacia arriba al pasar el ratón (solo con ratón).
   - Titulares h2: las palabras suben desde una máscara al entrar en pantalla.
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

function revealHeadings() {
  const heads = Array.from(document.querySelectorAll<HTMLElement>("main h2.h2, main .cta3 h2")).filter(
    (h) => !h.dataset.wr && h.getBoundingClientRect().top > window.innerHeight * 0.9
  );
  if (!heads.length || !("IntersectionObserver" in window)) return () => {};
  heads.forEach((h) => {
    h.dataset.wr = "1";
    let k = 0;
    const walk = (node: Node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const parts = (child.nodeValue || "").split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) return frag.appendChild(document.createTextNode(p));
            const w = document.createElement("span");
            w.className = "wr-w";
            const inner = document.createElement("span");
            inner.textContent = p;
            inner.style.transitionDelay = `${k++ * 45}ms`;
            w.appendChild(inner);
            frag.appendChild(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== "BR") {
          walk(child);
        }
      });
    };
    walk(h);
    h.classList.add("wr");
  });
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      }),
    { rootMargin: "0px 0px -10% 0px" }
  );
  heads.forEach((h) => io.observe(h));
  return () => io.disconnect();
}

export default function BrandMotion() {
  const pathname = usePathname();
  useEffect(() => {
    if (reduce()) return;
    let cleanup = () => {};
    const t = setTimeout(() => {
      rollButtons();
      cleanup = revealHeadings();
    }, 60);
    return () => {
      clearTimeout(t);
      cleanup();
    };
  }, [pathname]);
  return null;
}
