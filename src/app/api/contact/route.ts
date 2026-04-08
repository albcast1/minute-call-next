import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, contexto } = body;

    if (!nombre || !email || !telefono || !contexto) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <h2 style="margin-bottom: 24px;">Nueva solicitud de llamada</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; font-weight: 600; width: 140px;">Nombre</td>
            <td style="padding: 12px 0;">${nombre}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; font-weight: 600;">Email</td>
            <td style="padding: 12px 0;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; font-weight: 600;">Teléfono</td>
            <td style="padding: 12px 0;">${telefono}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; font-weight: 600; vertical-align: top;">Contexto</td>
            <td style="padding: 12px 0;">${contexto}</td>
          </tr>
        </table>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Minute Call <contacto@minute-call.com>",
        to: ["alberto@minute-call.com"],
        reply_to: email,
        subject: `Nueva solicitud de llamada — ${nombre}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", res.status, err);
      return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
  }
}
