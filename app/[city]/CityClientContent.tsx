"use client";

import React, { useState, useEffect } from "react";
import RealProfiles from "../components/RealProfiles";
import CitySelector from "../components/CitySelector";
import AgeRangeSlider from "../components/AgeRangeSlider";
import Link from "next/link";
import { slugify } from "@/lib/turkey-zones";

interface CityClientContentProps {
  cityParam: string;
  cityName: string;
  districts: string[];
}

export default function CityClientContent({ cityParam, cityName, districts }: CityClientContentProps) {
  const [filter, setFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState<string[]>(["Kadın", "Erkek", "Çift"]);
  const [ageRange, setAgeRange] = useState({ min: 18, max: 60 });

  const toggleGender = (g: string) => {
    setGenderFilter(prev => {
      if (prev.includes(g)) {
        if (prev.length === 1) return prev;
        return prev.filter(item => item !== g);
      } else {
        return [...prev, g];
      }
    });
  };

  const handleAgeChange = React.useCallback((min: number, max: number) => {
    setAgeRange(prev => {
      if (prev.min === min && prev.max === max) return prev;
      return { min, max };
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_city_page', {
        'event_category': 'engagement',
        'event_label': cityName,
        'city_slug': cityParam
      });
    }
  }, [cityName, cityParam]);

  return (
    <>
      <div className="p-6 rounded-[2rem] bg-[#0a0a0a] border border-[#1a1a1a]">
        <CitySelector currentCity={cityParam} />
      </div>

      {/* İLÇE HIZLI ERİŞİM LİSTESİ */}
      <div className="space-y-3">
        <h3 className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
          📍 {cityName} İlçeleri Keşfet
        </h3>
        <div className="flex flex-wrap gap-2">
          {districts.map((dist) => (
            <Link
              key={dist}
              href={`/${cityParam}/${slugify(dist)}`}
              className="px-3 py-2 text-[8px] font-black bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl text-gray-400 hover:border-[#d4af37]/50 hover:text-[#d4af37] transition-all uppercase"
            >
              {dist}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row pt-4 border-t border-white/5">
        <div>
          <h2 className="text-lg font-black tracking-tighter uppercase">{cityName} AKTİF İLANLARI</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <AgeRangeSlider min={18} max={60} onChange={handleAgeChange} />

          <div className="flex items-center gap-1.5 rounded-2xl bg-white/[0.02] p-1.5 border border-white/5">
            {[
              { id: "Kadın", label: "KADIN" },
              { id: "Erkek", label: "ERKEK" },
              { id: "Çift", label: "ÇİFT" },
            ].map((item) => {
              const isActive = genderFilter.includes(item.id);
              let activeClass = "bg-white text-black shadow-xl";

              if (isActive) {
                if (item.id === "Kadın") activeClass = "bg-pink-500 text-white shadow-lg shadow-pink-500/20";
                else if (item.id === "Erkek") activeClass = "bg-blue-500 text-white shadow-lg shadow-blue-500/20";
                else if (item.id === "Çift") activeClass = "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20";
              }

              return (
                <button
                  key={item.id}
                  onClick={() => toggleGender(item.id)}
                  className={`rounded-xl px-4 py-2 text-[8px] font-black tracking-widest transition-all duration-300 ${
                    isActive ? activeClass : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 rounded-2xl bg-white/[0.02] p-1.5 border border-white/5">
            {[
              { id: "all", label: "TÜMÜ" },
              { id: "verifiedOnly", label: "SADECE ONAYLILAR" },
            ].map((item) => {
              const isActive = filter === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setFilter(item.id)}
                  className={`rounded-xl px-5 py-2 text-[8px] font-black tracking-widest transition-all duration-300 ${
                    isActive
                      ? "bg-yellow-400/90 text-black shadow-lg shadow-yellow-400/20"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <RealProfiles filter={filter} city={cityName} gender={genderFilter} ageRange={ageRange} />
    </>
  );
}
