"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CITIES, TURKEY_DATA, slugify, getCityBySlug } from "@/lib/turkey-zones";

const POPULAR_CITIES = ["ALANYA", "İSTANBUL", "ANTALYA", "ANKARA", "İZMİR", "BURSA", "ADANA", "MERSİN", "MUĞLA"];

export default function CitySelector({ currentCity, currentDistrict }: { currentCity?: string, currentDistrict?: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // URL senkronizasyonu için state
  const [selectedCitySlug, setSelectedCitySlug] = useState(currentCity || "all");
  const [selectedDistrictSlug, setSelectedDistrictSlug] = useState(currentDistrict || "");

  useEffect(() => {
    setSelectedCitySlug(currentCity || "all");
    setSelectedDistrictSlug(currentDistrict || "");
  }, [currentCity, currentDistrict]);

  const handleCityChange = (citySlug: string) => {
    setIsOpen(false);
    setSearchQuery("");
    if (citySlug === "all") {
      router.push("/");
    } else if (citySlug === "alanya") {
      router.push("/antalya/alanya");
    } else {
      router.push(`/${citySlug}`);
    }
  };

  const handleDistrictChange = (districtSlug: string) => {
    if (selectedCitySlug && selectedCitySlug !== "all") {
      if (districtSlug === "") {
        router.push(`/${selectedCitySlug}`);
      } else {
        router.push(`/${selectedCitySlug}/${districtSlug}`);
      }
    }
  };

  const activeCityName = selectedCitySlug !== "all" ? getCityBySlug(selectedCitySlug) : null;
  const districts = activeCityName ? TURKEY_DATA[activeCityName] || [] : [];

  const filteredCities = CITIES.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    slugify(city).includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#0d0d0d] to-[#121212] p-4 rounded-2xl border border-[#222]">
        <div className="flex items-center gap-3">
          <span className="text-xl">📍</span>
          <div>
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mevcut Konum</div>
            <div className="text-sm font-black uppercase text-white tracking-wider">
              {activeCityName ? (
                <>
                  <span className="text-[#ff2d55]">{activeCityName}</span>
                  {selectedDistrictSlug && (
                    <span className="text-gray-400 font-medium"> / {districts.find(d => slugify(d) === selectedDistrictSlug)?.toUpperCase() || selectedDistrictSlug.toUpperCase()}</span>
                  )}
                </>
              ) : (
                "TÜM TÜRKİYE"
              )}
            </div>
          </div>
        </div>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
          <div className="relative min-w-[160px] w-full sm:w-auto">
            <select
              value={selectedCitySlug}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full appearance-none px-4 py-3 rounded-xl bg-black border border-[#222] text-[11px] font-black uppercase tracking-wider text-white pr-10 focus:outline-none focus:border-[#ff2d55] cursor-pointer transition-colors"
            >
              <option value="all">🌍 TÜM TÜRKİYE</option>
              {CITIES.map((city) => (
                <option key={city} value={slugify(city)}>
                  📍 {city.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-xs">
              ▼
            </div>
          </div>

          {activeCityName && districts.length > 0 && (
            <div className="relative min-w-[160px] w-full sm:w-auto">
              <select
                value={selectedDistrictSlug}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full appearance-none px-4 py-3 rounded-xl bg-black border border-[#222] text-[11px] font-black uppercase tracking-wider text-white pr-10 focus:outline-none focus:border-[#ff2d55] cursor-pointer transition-colors"
              >
                <option value="">🔹 TÜM İLÇELER</option>
                {districts.map((district) => (
                  <option key={district} value={slugify(district)}>
                    {district.toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-xs">
                ▼
              </div>
            </div>
          )}

          <button
            onClick={() => setIsOpen(true)}
            className="px-5 py-3 rounded-xl bg-[#141414] border border-[#222] text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-white hover:border-[#ff2d55] transition-all"
          >
            Arama Yap 🔍
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-2xl transition-opacity animate-fadeIn"
            onClick={() => { setIsOpen(false); setSearchQuery(""); }}
          />

          <div className="relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-[2.5rem] bg-[#0a0a0a] border border-[#222] shadow-2xl shadow-black/80 overflow-hidden z-10 animate-scaleUp">
            <div className="p-6 md:p-8 border-b border-[#1a1a1a] bg-gradient-to-b from-[#111] to-[#0a0a0a] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌍</span>
                  <h3 className="text-xl font-black uppercase tracking-tighter text-white">
                    Premium Konum Seçimi
                  </h3>
                </div>
                <button
                  onClick={() => { setIsOpen(false); setSearchQuery(""); }}
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#ff2d55] transition-all font-black text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
                <input
                  type="text"
                  placeholder="Şehir adı arayın (Örn: Alanya, İstanbul, İzmir...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-black border border-[#222] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#ff2d55] transition-colors font-bold uppercase tracking-wider"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
              {!searchQuery && (
                <div className="space-y-3">
                  <div className="text-[10px] font-black text-[#ff2d55] uppercase tracking-[0.3em]">
                    🔥 POPÜLER SOSYAL REFAKAT BÖLGELERİ
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    <button
                      onClick={() => handleCityChange("all")}
                      className={`rounded-xl border p-4 text-[10px] font-black tracking-widest text-center transition-all ${
                        selectedCitySlug === "all"
                          ? "border-[#ff2d55] bg-[#ff2d55]/10 text-white shadow-lg"
                          : "border-[#1a1a1a] bg-black text-gray-400 hover:border-[#ff2d55]/40 hover:text-white"
                      }`}
                    >
                      🌟 TÜM TÜRKİYE
                    </button>
                    {POPULAR_CITIES.map(city => {
                      const citySlug = slugify(city);
                      const isSelected = selectedCitySlug === citySlug;
                      return (
                        <button
                          key={city}
                          onClick={() => handleCityChange(citySlug)}
                          className={`rounded-xl border p-4 text-[10px] font-black tracking-widest text-center transition-all ${
                            isSelected
                              ? "border-[#ff2d55] bg-[#ff2d55]/10 text-white shadow-lg"
                              : "border-[#1a1a1a] bg-black text-gray-400 hover:border-[#ff2d55]/40 hover:text-white"
                          }`}
                        >
                          📍 {city}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
                  {searchQuery ? `🔍 ARAMA SONUÇLARI (${filteredCities.length})` : "🗺️ TÜM ŞEHİRLER (A-Z)"}
                </div>
                {filteredCities.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {filteredCities.map(city => {
                      const citySlug = slugify(city);
                      const isSelected = selectedCitySlug === citySlug;
                      return (
                        <button
                          key={city}
                          onClick={() => handleCityChange(citySlug)}
                          className={`rounded-xl border px-4 py-3 text-[10px] font-black uppercase tracking-wider text-left transition-all ${
                            isSelected
                              ? "border-[#ff2d55] bg-[#ff2d55]/10 text-white shadow-md"
                              : "border-[#141414] bg-black/40 text-gray-500 hover:border-gray-700 hover:text-gray-200"
                          }`}
                        >
                          {city}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-10 text-xs font-bold text-gray-600 uppercase tracking-widest">
                    Aradığınız kriterlere uygun şehir bulunamadı.
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-[#1a1a1a] bg-black text-center text-[9px] font-bold text-gray-600 uppercase tracking-widest">
              Platformumuz kesinlikle eskort sitesi değildir. Sadece elit sosyal refakat ilanları barındırır.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
