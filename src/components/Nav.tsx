"use client";

import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 w-full z-50"
      style={{ backgroundColor: "#EFEBE5" }}
    >
      <div
        className="mx-auto px-6 py-0 flex items-center justify-between"
        style={{ maxWidth: "1200px", height: "70px" }}
      >
        {/* Logo: icon + text */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img
            src="https://framerusercontent.com/images/ovXvDkQi2KTHjwV1Nl9n9WlloRI.png"
            alt=""
            style={{ width: 25, height: 25 }}
          />
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
            href="/sobre-nosotros"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "-0.56px",
              color: "black",
            }}
            className="hover:opacity-80 transition-opacity"
          >
            Nosotros
          </Link>
          <Link
            href="/reserva-llamada"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "-0.56px",
              color: "white",
              backgroundColor: "black",
              padding: "10px 20px",
              borderRadius: 50,
            }}
            className="hover:opacity-80 transition-opacity"
          >
            Contacto
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-black transition-all" style={{ transform: mobileMenuOpen ? "rotate(45deg) translateY(8px)" : "" }} />
          <span className="w-6 h-0.5 bg-black transition-all" style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
          <span className="w-6 h-0.5 bg-black transition-all" style={{ transform: mobileMenuOpen ? "rotate(-45deg) translateY(-8px)" : "" }} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ backgroundColor: "#EFEBE5" }}>
          <Link href="/sobre-nosotros" style={{ fontSize: 14, fontWeight: 500, color: "black" }} onClick={() => setMobileMenuOpen(false)}>
            Nosotros
          </Link>
          <Link
            href="/reserva-llamada"
            style={{ fontSize: 14, fontWeight: 500, color: "white", backgroundColor: "black", padding: "10px 20px", borderRadius: 50, textAlign: "center" }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contacto
          </Link>
        </div>
      )}
    </nav>
  );
}
