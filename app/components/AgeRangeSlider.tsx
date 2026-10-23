"use client";

import React, { useState, useEffect } from "react";

interface AgeRangeSliderProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

export default function AgeRangeSlider({ min, max, onChange }: AgeRangeSliderProps) {
  const [minAge, setMinAge] = useState(min);
  const [maxAge, setMaxAge] = useState(max);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxAge - 1);
    setMinAge(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minAge + 1);
    setMaxAge(value);
  };

  useEffect(() => {
    onChange(minAge, maxAge);
  }, [minAge, maxAge, onChange]);

  return (
    <div className="flex flex-col gap-4 w-full sm:max-w-[280px] px-2 py-2">
      <div className="flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-black text-white/60 tracking-[0.2em] uppercase">YAŞ ARALIĞI</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <span className="text-[10px] font-black text-[#d4af37] tracking-wider">
            {minAge} - {maxAge}
          </span>
        </div>
      </div>

      <div className="relative h-6 flex items-center group">
        {/* Track Background */}
        <div className="absolute w-full h-1.5 bg-white/5 rounded-full border border-white/5"></div>

        {/* Active Track */}
        <div
          className="absolute h-1.5 bg-gradient-to-r from-[#d4af37] to-[#f9e5af] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          style={{
            left: `${((minAge - 18) / (60 - 18)) * 100}%`,
            width: `${((maxAge - minAge) / (60 - 18)) * 100}%`
          }}
        ></div>

        {/* Range Inputs */}
        <input
          type="range"
          min="18"
          max="60"
          value={minAge}
          onChange={handleMinChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none z-30 h-6
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:w-8
            [&::-webkit-slider-thumb]:h-8
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-[4px]
            [&::-webkit-slider-thumb]:border-[#d4af37]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(0,0,0,0.5)]
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:active:scale-110"
        />

        <input
          type="range"
          min="18"
          max="60"
          value={maxAge}
          onChange={handleMaxChange}
          className="absolute w-full appearance-none bg-transparent pointer-events-none z-40 h-6
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:w-8
            [&::-webkit-slider-thumb]:h-8
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-[4px]
            [&::-webkit-slider-thumb]:border-[#d4af37]
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(0,0,0,0.5)]
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:active:scale-110"
        />
      </div>
    </div>
  );
}
