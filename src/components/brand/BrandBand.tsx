import { LOGO_PATH, LOGO_TRANSFORM } from "./Logo";
import { waveBars } from "./Brand";

/* Banda con la forma de la M: panel negro recortado con el logo y una onda
   de voz dentro. Sin fotos, solo colores de marca. Decorativa. */
const W = 2970;
const H = 768;
const BARS = waveBars(96);
const STEP = W / BARS.length;

export default function BrandBand() {
  return (
    <div className="mband" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <clipPath id="mband-clip">
            <path d={LOGO_PATH} transform={LOGO_TRANSFORM} />
          </clipPath>
          <radialGradient id="mband-glow" cx="70%" cy="60%" r="60%">
            <stop offset="0" stopColor="var(--purple)" stopOpacity=".55" />
            <stop offset="1" stopColor="var(--purple)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g clipPath="url(#mband-clip)">
          <rect width={W} height={H} fill="var(--ink)" />
          <rect width={W} height={H} fill="url(#mband-glow)" />
          {BARS.map((b, i) => {
            const h = Math.max(36, (b.h / 100) * H * 0.56);
            return (
              <rect
                key={i}
                className="mb-bar"
                x={i * STEP + STEP * 0.35}
                y={(H - h) / 2}
                width={STEP * 0.3}
                height={h}
                rx={STEP * 0.15}
                style={{ animationDelay: `${b.delay}s` }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
