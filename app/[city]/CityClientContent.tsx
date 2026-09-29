"use client";

import React, { useState, useEffect } from "react";
import RealProfiles from "../components/RealProfiles";
import CitySelector from "../components/CitySelector";
import Link from "next/link";
import { slugify } from "@/lib/turkey-zones";

interface CityClientContentProps {
  cityParam: string;
  cityName: string;
  districts: string[];
}

export default function CityClientContent({ cityParam, cityName, districts }: CityClientContentProps) {
  const [filter, setFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");

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
      <div className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a]">
        <CitySelector currentCity={cityParam} />
      </div>

      {/* İLÇE HIZLI ERİŞİM LİSTESİ */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
          📍 {cityName} İlçeleri Keşfet
        </h3>
        <div className="flex flex-wrap gap-2">
          {districts.map((dist) => (
            <Link
              key={dist}
              href={`/${cityParam}/${slugify(dist)}`}
              className="px-4 py-2 text-[9px] font-black bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl text-gray-400 hover:border-[#ff2d55]/50 hover:text-white transition-all uppercase"
            >
              {dist}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 md:flex-row pt-6">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase">{cityName} AKTİF İLANLARI</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-[#0a0a0a] p-1.5 border border-[#1a1a1a]">
            {[
              { id: "all", label: "TÜMÜ" },
              { id: "Kadın", label: "KADIN" },
              { id: "Erkek", label: "ERKEK" },
              { id: "Çift", label: "ÇİFT" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setGenderFilter(item.id)}
                className={`rounded-full px-4 py-2 text-[8px] font-black tracking-widest transition-all ${
                  genderFilter === item.id ? "bg-white text-black" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#0a0a0a] p-1.5 border border-[#1a1a1a]">
            {[
              { id: "all", label: "TÜMÜ" },
              { id: "elite", label: "ELITE" },
              { id: "verified", label: "ONAYLI" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setFilter(item.id)}
                className={`rounded-full px-6 py-2 text-[9px] font-black tracking-widest transition-all ${
                  filter === item.id
                    ? "bg-[#ff2d55] text-white shadow-lg shadow-pink-500/20"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <RealProfiles filter={filter} city={cityName} gender={genderFilter} />
    </>
  );
}
