"use client";

import React, { useState, useEffect } from "react";

const TRACK_IDS = [
  "2FSTW82UeSsveM3KCCMWlO", // Madrigal - Kural Yok
  "0oxg2M0Z3t1sM6TzC54v3Q", // Madrigal - Seni Dert Etmeler
  "4N7r0R1J4V9yqX6a4P8G1y", // Madrigal - Dip
  "6zD8P5eQ2jM9u5L7r3F1V2", // Madrigal - Tutsak
  "3iUaGfH3pM8J3T6G2f3d1M", // Madrigal - Seni Dert Etmeler (Radio Edit/Other)
  "4c2Wdc1ySqSmyyJA2oaJy3"  // Madrigal - Ne Zamandır?
];

export default function SpotifyPlayer() {
  const [mounted, setMounted] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setMounted(true);

    try {
      const lastTrackId = sessionStorage.getItem("lastSpotifyTrackId");
      const validTracks = TRACK_IDS.filter(id => id && id.length > 10);
      const availableTracks = validTracks.filter(id => id !== lastTrackId);
      const sourceList = availableTracks.length > 0 ? availableTracks : validTracks;

      const randomIndex = Math.floor(Math.random() * sourceList.length);
      const selectedTrackId = sourceList[randomIndex];

      if (selectedTrackId) {
        setCurrentTrackId(selectedTrackId);
        sessionStorage.setItem("lastSpotifyTrackId", selectedTrackId);
      }
    } catch (e) {
      // Fallback if sessionStorage is disabled
      setCurrentTrackId(TRACK_IDS[0]);
    }
  }, []);

  if (!mounted || !currentTrackId || !isOpen) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] transition-all duration-700 animate-in fade-in slide-in-from-bottom-10 max-w-[calc(100vw-4rem)]">
      <div className="relative bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-3 shadow-[0_40px_100px_rgba(0,0,0,0.9),0_0_40px_rgba(29,185,84,0.1)] w-[340px] max-w-full overflow-hidden group hover:border-[#1DB954]/40 transition-all duration-500">

        {/* Glow Effect */}
        <div className="absolute -inset-24 bg-[#1DB954]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-3 px-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex gap-[3px] h-3 items-end">
              <div className="w-[2px] bg-[#1DB954] animate-[music-bar_0.6s_ease-in-out_infinite] h-full"></div>
              <div className="w-[2px] bg-[#1DB954] animate-[music-bar_0.8s_ease-in-out_infinite] h-2"></div>
              <div className="w-[2px] bg-[#1DB954] animate-[music-bar_0.7s_ease-in-out_infinite] h-3"></div>
            </div>
            <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">PREMIUM PLAYER</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/20 hover:text-white transition-colors p-1.5 rounded-xl hover:bg-white/5 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Player Container */}
        <div className="rounded-2xl overflow-hidden bg-black/40 relative z-10 ring-1 ring-white/5">
          <iframe
            key={currentTrackId}
            src={`https://open.spotify.com/embed/track/${currentTrackId}?utm_source=generator&theme=0`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="eager"
            className="rounded-2xl opacity-90 hover:opacity-100 transition-opacity"
          ></iframe>
        </div>
      </div>

      <style jsx global>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
      `}</style>
    </div>
  );
}

