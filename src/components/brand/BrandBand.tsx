/* Reserva: banda con la forma de la M y la foto de fondo (referencia de diseño). */
export default function BrandBand({ className = "" }: { className?: string }) {
  return (
    <div className={`mband ${className}`.trim()}>
      <img src="/assets/reserva/banda-m-auriculares.webp" alt="Agente de Minute Call atendiendo una llamada con auriculares" width={1166} height={355} decoding="async" />
    </div>
  );
}
