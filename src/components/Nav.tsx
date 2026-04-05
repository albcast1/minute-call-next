"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
        scrolled ? "scrolled" : ""
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "#FFFFFF",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled ? "0 2px 8px rgba(0, 0, 0, 0.1)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(224, 220, 214, 0.5)" : "#E0DCD6"}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg md:text-xl hover:opacity-80 transition-opacity"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
              fill="#7BF542"
              stroke="#000000"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-black">minute call</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/sobre-nosotros"
            className="text-black font-medium hover:text-[#7BF542] transition-colors"
          >
            Nosotros
          </Link>
          <Link
            href="/reserva-llamada"
            className="btn btn-secondary px-8"
            style={{
              backgroundColor: "#000000",
              color: "#FFFFFF",
              borderRadius: "50px",
              padding: "8px 32px",
              fontWeight: "600",
            }}
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
          <span
            className="w-6 h-0.5 bg-black transition-all"
            style={{
              transform: mobileMenuOpen ? "rotate(45deg) translateY(8px)" : "",
            }}
          ></span>
          <span
            className="w-6 h-0.5 bg-black transition-all"
            style={{
              opacity: mobileMenuOpen ? "0" : "1",
            }}
          ></span>
          <span
            className="w-6 h-0.5 bg-black transition-all"
            style={{
              transform: mobileMenuOpen ? "rotate(-45deg) translateY(-8px)" : "",
            }}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E0DCD6] px-4 py-4 flex flex-col gap-4">
          <Link
            href="/sobre-nosotros"
            className="text-black font-medium hover:text-[#7BF542] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Nosotros
          </Link>
          <Link
            href="/reserva-llamada"
            className="btn btn-secondary px-8 text-center"
            style={{
              backgroundColor: "#000000",
              color: "#FFFFFF",
              borderRadius: "50px",
              padding: "8px 32px",
              fontWeight: "600",
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contacto
          </Link>
        </div>
      )}
    </nav>
  );
}
