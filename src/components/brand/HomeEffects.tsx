"use client";

import { useEffect } from "react";

/* Home: biografía abierta en escritorio y pasos del panel oscuro activos.
   Sin apariciones al hacer scroll ni contadores (oct 2026): el texto se lee
   completo desde el primer momento. */
export default function HomeEffects() {
  useEffect(() => {
    document.querySelectorAll(".steps-dark").forEach((el) => el.classList.add("go"));

    const bio = document.getElementById("bio-more") as HTMLDetailsElement | null;
    if (!bio || !window.matchMedia) return;
    const mq = window.matchMedia("(min-width:601px)");
    const sync = () => {
      if (mq.matches) bio.open = true;
    };
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  return null;
}
