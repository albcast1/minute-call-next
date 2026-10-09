/* Reserva: banda con la forma de la M y la foto de fondo (referencia de diseño). */
export default function BrandBand({ className = "" }: { className?: string }) {
  return (
    <div className={`mband ${className}`.trim()}>
      <img src="/assets/reserva/banda-m.webp" alt="" width={1166} height={355} decoding="async" />
    </div>
  );
}
