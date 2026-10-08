"use client";

import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/* Nav flotante de tinta. El CTA es blanco mientras se ve el CTA del
   hero y pasa a lima en cuanto el hero sale de pantalla. En páginas
   sin CTA en el hero, pasa a lima tras un poco de scroll. */
export default function Nav() {
  const pathname = usePathname();
  const [lime, setLime] = useState(false);

  useEffect(() => {
    const target = document.querySelector("main [data-hero-cta], main .btn-cta");
    if (target && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        ([entry]) => setLime(!entry.isIntersecting),
        { rootMargin: "-96px 0px 0px 0px" }
      );
      io.observe(target);
      return () => io.disconnect();
    }
    const onScroll = () => setLime(window.scrollY > 240);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (
    <div className="navshell mc-reset">
      <div className="navcol">
        <nav className="nav" aria-label="Principal">
          <Link className="brand" href="/" aria-label="minute call, inicio">
            <LogoMark height={15} />
            minute call
          </Link>
          <div className="links">
            <Link href="/articulos">Blog</Link>
            <Link href="/lp">Sectores</Link>
            <Link href="/atencion-telefonica">Ciudades</Link>
            <Link href="/sobre-nosotros">Sobre nosotros</Link>
          </div>
          <Link className={`btn btn-nav${lime ? " is-lime" : ""}`} href="/reserva-llamada">
            Hablemos
          </Link>
        </nav>
      </div>
    </div>
  );
}
