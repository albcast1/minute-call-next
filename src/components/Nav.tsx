"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <nav
      className="sticky top-0 w-full z-50"
      style={{ backgroundColor: "#EFEBE5", position: "sticky" as const, top: 0, zIndex: 50, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}
    >
      <div
        style={{ maxWidth: 1200, height: 85, padding: "0 clamp(16px, 5vw, 64px)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {/* Logo: icon + text */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/assets/logo.png" alt="" style={{ width: 25, height: 25 }} />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 26,
              fontWeight: 500,
              letterSpacing: "-1.56px",
              color: "black",
            }}
          >
            minute call
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/articulos"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: "-0.56px", color: "black" }}
            className="hover:opacity-80 transition-opacity"
          >
            Blog
          </Link>
          <Link
            href="/sobre-nosotros"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: "-0.56px", color: "black" }}
            className="hover:opacity-80 transition-opacity"
          >
            Sobre nosotros
          </Link>
          <Link
            href="/reserva-llamada"
            style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: "-0.56px", color: "white", backgroundColor: "black", padding: "10px 20px", borderRadius: 50 }}
            className="hover:opacity-80 transition-opacity"
          >
            Contacto
          </Link>
        </div>

        {/* Mobile CTA - replaces burger menu */}
        <Link
          href="/reserva-llamada"
          className="md:hidden hover:opacity-80 transition-opacity"
          style={{ fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500, color: "white", backgroundColor: "black", padding: "8px 16px", borderRadius: 50 }}
        >
          Contacto
        </Link>
      </div>
    </nav>
  );
}
