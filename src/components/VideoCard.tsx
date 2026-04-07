"use client";
import { useRef, useState, useEffect } from "react";

export default function VideoCard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"human" | "ai">("human");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioSrc =
    activeTab === "human"
      ? "https://framerusercontent.com/assets/m5w1yjJG2zBpKHzi3rnUYCRXRio.mp3"
      : "/audio/audio-recepcionista-ia.mp3";

  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [activeTab]);

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

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 460,
        borderRadius: 20,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
        fontFamily: "inherit",
      }}
    >
      {/* Tab Toggle */}
      <div
        style={{
          display: "flex",
          background: "#F5F5F5",
          borderRadius: "14px 14px 0 0",
          padding: "6px",
          gap: 4,
        }}
      >
        {(["human", "ai"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
              transition: "all 0.2s",
              background: activeTab === tab ? "#fff" : "transparent",
              color: activeTab === tab ? "#111" : "#888",
              boxShadow:
                activeTab === tab ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {tab === "human" ? "Recepcionista" : "Recepcionista IA"}
          </button>
        ))}
      </div>

      {/* Photo */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
        <img
          src={activeTab === "human" ? "/images/recepcionista.jpg" : "/images/recepcionista-ia.jpg"}
          alt={activeTab === "human" ? "Recepcionista" : "Recepcionista IA"}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
          onEnded={() => setPlaying(false)}
        />
      </div>

      {/* Controls */}
      <div
        style={{
          padding: "14px 16px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#111",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <rect x="3" y="2" width="4" height="12" rx="1" />
              <rect x="9" y="2" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
              <polygon points="4,2 14,8 4,14" />
            </svg>
          )}
        </button>

        <span style={{ fontSize: 12, color: "#888", minWidth: 72, flexShrink: 0 }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <div
          style={{
            flex: 1,
            height: 4,
            background: "#E5E5E5",
            borderRadius: 2,
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={(e) => {
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            if (audioRef.current) {
              audioRef.current.currentTime = ratio * (audioRef.current.duration || 0);
            }
          }}
        >
          <div
            style={{
              height: "100%",
              width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
              background: "#111",
              borderRadius: 2,
              transition: "width 0.1s linear",
            }}
          />
        </div>

        <button
          onClick={restart}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-4.71" />
          </svg>
        </button>
      </div>
    </div>
  );
}
