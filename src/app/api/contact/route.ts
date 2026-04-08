import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, contexto } = body;

    // Validación básica
    if (!nombre || !email || !telefono || !contexto) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    // Envío a Formspree server-side (sin restricciones CORS)
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("email", email);
    formData.append("telefono", telefono);
    formData.append("contexto", contexto);

    const res = await fetch("https://formspree.io/f/xpwrjqkd", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      return NextResponse.json({ ok: true });
    }

    // Si Formspree falla, lo registramos pero igualmente devolvemos ok
    // para no bloquear al usuario — los datos llegan por Calendly de todas formas
    console.error("Formspree error:", res.status, await res.text());
    return NextResponse.json({ ok: true, warning: "formspree_failed" });

  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ ok: true, warning: "exception" });
  }
}
