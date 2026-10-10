"use client";

import { useEffect } from "react";

/* Guarda el origen de la primera visita de la sesión (UTM, oppref de OpenAI
   Ads, gclid de Google Ads, referrer y página de entrada) para enviarlo con el
   formulario de reserva. Solo sessionStorage: no sale del navegador hasta que
   la persona envía el formulario. */
const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "oppref", "gclid"];
export const ATTR_KEY = "mc_attr";

export default function AttributionCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(ATTR_KEY)) return;
      const q = new URLSearchParams(window.location.search);
      const attr: Record<string, string> = {};
      for (const k of KEYS) {
        const v = q.get(k);
        if (v) attr[k] = v.slice(0, 200);
      }
      attr.landing_page = window.location.pathname;
      if (document.referrer && !document.referrer.includes(window.location.host)) {
        attr.referrer = document.referrer.slice(0, 200);
      }
      sessionStorage.setItem(ATTR_KEY, JSON.stringify(attr));
    } catch {
      /* sin sessionStorage: el formulario se envía igual, sin origen */
    }
  }, []);
  return null;
}
