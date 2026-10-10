import { LogoMark } from "./Logo";

/* Reserva: banda con la forma de la M. `variant="photo"` usa la foto de la
   agente dentro de la M; con un color, la M va en color sólido. */
export default function BrandBand({
  className = "",
  variant = "photo",
}: {
  className?: string;
  variant?: "photo" | "purple" | "ink" | "lime";
}) {
  if (variant !== "photo") {
    return (
      <div className={`mband mband-solid mband-${variant} ${className}`.trim()} aria-hidden="true">
        <LogoMark height={768} style={{ width: "100%", height: "auto" }} />
      </div>
    );
  }
  return (
    <div className={`mband ${className}`.trim()}>
      <img src="/assets/reserva/banda-m-auriculares.webp" alt="Agente de Minute Call atendiendo una llamada con auriculares" width={1166} height={355} decoding="async" />
    </div>
  );
}
