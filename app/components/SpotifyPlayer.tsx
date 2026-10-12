"use client";

import React, { useState, useEffect } from "react";

export default function SpotifyPlayer() {
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[100] transition-all duration-500 ease-in-out">
      {isExpanded ? (
        <div className="relative bg-[#0a0a0a]/95 backdrop-blur-3xl border border-[#d4af37]/30 rounded-[2.5rem] p-3 shadow-[0_40px_100px_rgba(0,0,0,0.9)] w-[300px] animate-in fade-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="flex justify-between items-center mb-3 px-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-[3px] h-3 items-end">
                <div className="w-[2px] bg-[#d4af37] animate-[music-bar_0.6s_ease-in-out_infinite] h-full"></div>
                <div className="w-[2px] bg-[#d4af37] animate-[music-bar_0.8s_ease-in-out_infinite] h-2"></div>
                <div className="w-[2px] bg-[#d4af37] animate-[music-bar_0.7s_ease-in-out_infinite] h-3"></div>
              </div>
              <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">SOSYAL MÜZİK</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white/20 hover:text-white transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden bg-black/40 ring-1 ring-white/5">
            <iframe
              src={`https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO0UwH3q?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="eager"
            ></iframe>
          </div>
        </div>
      ) : (
        /* Minimalist Pill */
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-4 bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#d4af37]/20 hover:border-[#d4af37]/50 px-5 py-3 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 group"
        >
          <div className="flex gap-[3px] h-3 items-end">
            <div className="w-[2px] bg-[#d4af37] animate-[music-bar_0.6s_ease-in-out_infinite] h-full"></div>
            <div className="w-[2px] bg-[#d4af37] animate-[music-bar_0.8s_ease-in-out_infinite] h-2"></div>
            <div className="w-[2px] bg-[#d4af37] animate-[music-bar_0.7s_ease-in-out_infinite] h-3"></div>
          </div>
          <span className="text-[10px] font-black text-[#d4af37] tracking-[0.2em] uppercase group-hover:text-white transition-colors">MÜZİK ÇALIYOR</span>
        </button>
      )}

      <style jsx global>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
      `}</style>
    </div>
  );
}
