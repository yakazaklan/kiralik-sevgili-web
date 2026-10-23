"use client";

import React, { useState, useEffect } from "react";
import RealProfiles from "../../components/RealProfiles";
import CitySelector from "../../components/CitySelector";
import AgeRangeSlider from "../../components/AgeRangeSlider";

interface DistrictClientContentProps {
  cityParam: string;
  districtParam: string;
  cityName: string;
  districtName: string;
}

export default function DistrictClientContent({ cityParam, districtParam, cityName, districtName }: DistrictClientContentProps) {
  const [filter, setFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [ageRange, setAgeRange] = useState({ min: 18, max: 60 });

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_district_page', {
        'event_category': 'engagement',
        'event_label': `${cityName} - ${districtName}`,
        'city_slug': cityParam,
        'district_slug': districtParam
      });
    }
  }, [cityName, districtName, cityParam, districtParam]);

  return (
    <>
      <div className="p-6 rounded-[2rem] bg-[#0a0a0a] border border-[#1a1a1a]">
        <CitySelector currentCity={cityParam} currentDistrict={districtParam} />
      </div>

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row pt-4 border-t border-white/5">
        <div>
          <h2 className="text-lg font-black tracking-tighter uppercase">{districtName} BÖLGESİNDEKİ İLANLAR</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <AgeRangeSlider min={18} max={60} onChange={(min, max) => setAgeRange({ min, max })} />

          <div className="flex items-center gap-1.5 rounded-2xl bg-white/[0.02] p-1.5 border border-white/5">
            {[
              { id: "all", label: "TÜMÜ" },
              { id: "Kadın", label: "KADIN" },
              { id: "Erkek", label: "ERKEK" },
              { id: "Çift", label: "ÇİFT" },
            ].map((item) => {
              const isActive = genderFilter === item.id;
              let activeClass = "bg-white text-black shadow-xl";

              if (isActive) {
                if (item.id === "Kadın") activeClass = "bg-pink-500 text-white shadow-lg shadow-pink-500/20";
                else if (item.id === "Erkek") activeClass = "bg-blue-500 text-white shadow-lg shadow-blue-500/20";
                else if (item.id === "Çift") activeClass = "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20";
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setGenderFilter(item.id)}
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
              { id: "all", label: "TÜM ÜYELER" },
              { id: "elite", label: "ELİT" },
              { id: "verified", label: "ONAYLI" },
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

      <RealProfiles filter={filter} city={districtName} gender={genderFilter} ageRange={ageRange} />
    </>
  );
}
