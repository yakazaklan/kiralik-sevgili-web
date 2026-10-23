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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0a0a0a] p-3 md:p-4 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-xl text-[#d4af37]">
            📍
          </div>
          <div>
            <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em] mb-0.5">Seçili Bölge</div>
            <div className="text-base font-black uppercase text-white tracking-wider">
              {activeCityName ? (
                <>
                  <span className="text-[#d4af37]">{activeCityName}</span>
                  {selectedDistrictSlug && (
                    <span className="text-white/40 font-light"> / {districts.find(d => slugify(d) === selectedDistrictSlug)?.toUpperCase() || selectedDistrictSlug.toUpperCase()}</span>
                  )}
                </>
              ) : (
                "TÜM TÜRKİYE"
              )}
            </div>
          </div>
        </div>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative min-w-[180px] w-full sm:w-auto">
            <select
              value={selectedCitySlug}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full appearance-none px-6 py-4 rounded-xl bg-black/60 border border-white/10 text-[11px] font-black uppercase tracking-widest text-white pr-12 focus:outline-none focus:border-[#d4af37] cursor-pointer transition-colors"
            >
              <option value="all">🌍 TÜM TÜRKİYE</option>
              {CITIES.map((city) => (
                <option key={city} value={slugify(city)}>
                  📍 {city.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/30 text-[10px]">
              ▼
            </div>
          </div>

          {activeCityName && districts.length > 0 && (
            <div className="relative min-w-[180px] w-full sm:w-auto">
              <select
                value={selectedDistrictSlug}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full appearance-none px-6 py-4 rounded-xl bg-black/60 border border-white/10 text-[11px] font-black uppercase tracking-widest text-white pr-12 focus:outline-none focus:border-[#d4af37] cursor-pointer transition-colors"
              >
                <option value="">🔹 TÜM İLÇELER</option>
                {districts.map((district) => (
                  <option key={district} value={slugify(district)}>
                    {district.toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/30 text-[10px]">
                ▼
              </div>
            </div>
          )}

          <button
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-white hover:bg-white/5 hover:border-[#d4af37] transition-all cursor-pointer"
          >
            HIZLI ARAMA 🔍
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-3xl transition-opacity"
            onClick={() => { setIsOpen(false); setSearchQuery(""); }}
          />

          <div className="relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-[3.5rem] bg-[#050505] border border-white/5 shadow-2xl overflow-hidden z-10">
            <div className="p-8 md:p-12 border-b border-white/5 bg-[#0a0a0a] space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🌍</span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-white">
                    PREMIUM LOKASYON MERKEZİ
                  </h3>
                </div>
                <button
                  onClick={() => { setIsOpen(false); setSearchQuery(""); }}
                  className="h-12 w-12 flex items-center justify-center rounded-full bg-white/5 text-white/40 hover:text-black hover:bg-[#d4af37] transition-all font-black text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 text-base">🔍</span>
                <input
                  type="text"
                  placeholder="Şehir adı arayın (Örn: Alanya, İstanbul, İzmir...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-2xl bg-black border border-white/10 text-base text-white placeholder-white/20 focus:outline-none focus:border-[#d4af37] transition-colors font-bold uppercase tracking-wider"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 custom-scrollbar">
              {!searchQuery && (
                <div className="space-y-4">
                  <div className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.4em]">
                    ✨ SEÇKİN POPÜLER BÖLGELER
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    <button
                      onClick={() => handleCityChange("all")}
                      className={`rounded-xl border p-5 text-[11px] font-black tracking-widest text-center transition-all cursor-pointer ${
                        selectedCitySlug === "all"
                          ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37] shadow-xl"
                          : "border-white/5 bg-black text-white/50 hover:border-[#d4af37]/40 hover:text-white"
                      }`}
                    >
                      TÜM TÜRKİYE
                    </button>
                    {POPULAR_CITIES.map(city => {
                      const citySlug = slugify(city);
                      const isSelected = selectedCitySlug === citySlug;
                      return (
                        <button
                          key={city}
                          onClick={() => handleCityChange(citySlug)}
                          className={`rounded-xl border p-5 text-[11px] font-black tracking-widest text-center transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37] shadow-xl"
                              : "border-white/5 bg-black text-white/50 hover:border-[#d4af37]/40 hover:text-white"
                          }`}
                        >
                          {city}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">
                  {searchQuery ? `ARAMA SONUÇLARI (${filteredCities.length})` : "TÜM ŞEHİRLER (A-Z)"}
                </div>
                {filteredCities.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {filteredCities.map(city => {
                      const citySlug = slugify(city);
                      const isSelected = selectedCitySlug === citySlug;
                      return (
                        <button
                          key={city}
                          onClick={() => handleCityChange(citySlug)}
                          className={`rounded-xl border px-5 py-4 text-[11px] font-black uppercase tracking-wider text-left transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37] shadow-md"
                              : "border-white/5 bg-black/40 text-white/40 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          {city}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-sm font-medium text-white/20 uppercase tracking-widest">
                    Aradığınız kriterlere uygun şehir bulunamadı.
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-white/5 bg-black text-center text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
              PREMIUM SOSYAL REFAKAT VE REFAKATÇİ TOPLULUĞU
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
