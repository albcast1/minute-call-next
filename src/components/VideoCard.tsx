"use client";

import { useRef, useState } from "react";

export default function VideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"human" | "ai">("human");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoSrc =
    activeTab === "human"
      ? "https://framerusercontent.com/assets/FaxcwHWdhZxkAcLltQoQxhlJciw.mp4"
      : "https://framerusercontent.com/assets/FaxcwHWdhZxkAcLltQoQxhlJciw.mp4";

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const restart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setPlaying(true);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleTabSwitch = (tab: "human" | "ai") => {
    setActiveTab(tab);
    setPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      style={{
        flex: "1 1 400px",
        maxWidth: 500,
        background: "#F5F5F5",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <button
          onClick={() => handleTabSwitch("human")}
          style={{
            flex: 1,
            padding: "16px 24px",
            background: activeTab === "human" ? "white" : "transparent",
            textAlign: "center",
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: activeTab === "human" ? "black" : "rgba(0,0,0,0.4)",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Recepcionista
        </button>
        <button
          onClick={() => handleTabSwitch("ai")}
          style={{
            flex: 1,
            padding: "16px 24px",
            background: activeTab === "ai" ? "white" : "transparent",
            textAlign: "center",
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: activeTab === "ai" ? "black" : "rgba(0,0,0,0.4)",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Recepcionista IA
        </button>
      </div>

      {/* Video */}
      <div
        style={{ position: "relative", aspectRatio: "9/16", overflow: "hidden", cursor: "pointer" }}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          playsInline
          muted
          preload="auto"
          onTimeUpdate={() => {
            if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) setDuration(videoRef.current.duration);
          }}
          onEnded={() => setPlaying(false)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Play overlay when paused */}
        {!playing && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 14 14" fill="white">
                <path d="M3 1.5v11l9-5.5z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Video controls bar */}
      <div
        style={{
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "white",
        }}
      >
        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: "none",
            cursor: "pointer",
          }}
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
              <rect x="1" y="1" width="3.5" height="10" rx="1" />
              <rect x="7.5" y="1" width="3.5" height="10" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 14 14" fill="white">
              <path d="M3 1.5v11l9-5.5z" />
            </svg>
          )}
        </button>

        {/* Progress dot */}
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "black",
            flexShrink: 0,
          }}
        />

        {/* Progress bar */}
        <div
          style={{
            flex: 1,
            height: 3,
            background: "rgba(0,0,0,0.1)",
            borderRadius: 2,
            position: "relative",
            cursor: "pointer",
          }}
          onClick={(e) => {
            const bar = e.currentTarget;
            const rect = bar.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            if (videoRef.current) {
              videoRef.current.currentTime = pct * duration;
            }
          }}
        >
          <div
            style={{
              width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
              height: "100%",
              background: "black",
              borderRadius: 2,
              transition: "width 0.1s linear",
            }}
          />
        </div>

        {/* Time */}
        <span style={{ fontSize: 12, color: "rgba(0,0,0,0.5)", whiteSpace: "nowrap" }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        {/* Restart button */}
        <button
          onClick={restart}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            display: "flex",
            alignItems: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>
      </div>
    </div>
  );
}
