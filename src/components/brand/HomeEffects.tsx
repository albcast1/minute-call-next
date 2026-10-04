"use client";

import { useEffect } from "react";

/* Animaciones de la home: aparición al hacer scroll (solo elementos por
   debajo del primer pantallazo, así el primer frame está completo),
   contador en las cifras y biografía abierta en escritorio. */
const REVEAL =
  ".h2, .bento .bx, .rail, .rows .row, .vs, .founder2, .steps2 > div, .faq2, .cta3-copy, .call-card, .partners .logos";

export default function HomeEffects() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    const bio = document.getElementById("bio-more") as HTMLDetailsElement | null;
    if (bio && window.matchMedia) {
      const mq = window.matchMedia("(min-width:601px)");
      const sync = () => {
        if (mq.matches) bio.open = true;
      };
      sync();
      mq.addEventListener?.("change", sync);
      cleanups.push(() => mq.removeEventListener?.("change", sync));
    }

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return () => cleanups.forEach((c) => c());

    const els = Array.from(document.querySelectorAll<HTMLElement>(REVEAL)).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight
    );
    const groups = new Map<Node, number>();
    els.forEach((el) => {
      const parent = el.parentNode as Node;
      const i = groups.get(parent) ?? 0;
      groups.set(parent, i + 1);
      el.style.transitionDelay = `${i * 90}ms`;
      el.classList.add("reveal");
    });

    const count = (el: HTMLElement | null) => {
      if (!el) return;
      const final = el.getAttribute("data-final") || el.textContent || "";
      el.setAttribute("data-final", final);
      const nums = final.match(/\d+/g);
      if (!nums) return;
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const k = Math.min(1, (ts - start) / 1100);
        const e = 1 - Math.pow(1 - k, 3);
        let i = 0;
        el.textContent = final.replace(/\d+/g, () => String(Math.round(parseInt(nums[i++], 10) * e)));
        if (k < 1) requestAnimationFrame(step);
        else el.textContent = final;
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const t = e.target as HTMLElement;
          t.classList.add("in");
          if (t.classList.contains("scard")) count(t.querySelector("strong"));
          io.unobserve(t);
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
