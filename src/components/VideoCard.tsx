"use client";
import { useRef, useState, useEffect } from "react";
import { Voice, waveBars } from "@/components/brand/Brand";

/* Reproductor de llamada de ejemplo con la marca 2026: tarjeta morada como
   la de "Tu próximo cliente", sin fotos. La onda muestra el progreso. */
const BARS = waveBars(48);

const TRACKS = {
  human: {
    tab: "Persona",
    title: "Recepcionista",
    src: "https://framerusercontent.com/assets/m5w1yjJG2zBpKHzi3rnUYCRXRio.mp3",
  },
  ai: {
    tab: "IA",
    title: "Recepcionista IA",
    src: "/audio/audio-recepcionista-ia.mp3",
  },
} as const;

export default function VideoCard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof typeof TRACKS>("human");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const track = TRACKS[activeTab];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.load();
  }, [activeTab]);

  const selectTab = (tab: keyof typeof TRACKS) => {
    if (tab === activeTab) return;
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setActiveTab(tab);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const restart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    audio.play();
    setPlaying(true);
  };

  const seek = (ratio: number) => {
    const audio = audioRef.current;
    if (audio && audio.duration) audio.currentTime = ratio * audio.duration;
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className={`call-card player${playing ? " is-playing" : ""}`}>
      <div className="pl-head">
        <div className="cc-top">
          <Voice />
          <span>Escucha una llamada</span>
        </div>
        <div className="pl-tabs" role="group" aria-label="Tipo de recepcionista">
          {(Object.keys(TRACKS) as (keyof typeof TRACKS)[]).map((tab) => (
            <button key={tab} type="button" onClick={() => selectTab(tab)} aria-pressed={activeTab === tab}>
              {TRACKS[tab].tab}
            </button>
          ))}
        </div>
      </div>

      <div className="cc-who">{track.title}</div>
      <div className="cc-sub">Llamada real · {fmt(currentTime)} / {fmt(duration)}</div>

      <div
        className="cc-wave pl-wave"
        role="slider"
        tabIndex={0}
        aria-label="Progreso de la llamada"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(currentTime)}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          seek((e.clientX - r.left) / r.width);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") seek(Math.min(1, progress + 0.05));
          if (e.key === "ArrowLeft") seek(Math.max(0, progress - 0.05));
        }}
      >
        {BARS.map((b, i) => (
          <i
            key={i}
            className={i / BARS.length < progress ? "on" : undefined}
            style={{ height: `${b.h}%`, animationDelay: `${b.delay}s` }}
          />
        ))}
      </div>

      <div className="pl-controls">
        <button type="button" className="pl-play" onClick={togglePlay} aria-label={playing ? "Pausar" : "Reproducir"}>
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <rect x="3" y="2" width="4" height="12" rx="1" />
              <rect x="9" y="2" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <polygon points="4,2 14,8 4,14" />
            </svg>
          )}
          <span>{playing ? "Pausar" : "Escuchar"}</span>
        </button>
        <button type="button" className="pl-restart" onClick={restart} aria-label="Volver a empezar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-4.71" />
          </svg>
        </button>
      </div>

      <audio
        preload="none"
        ref={audioRef}
        src={track.src}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
