"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RealProfiles from "./components/RealProfiles";
import CitySelector from "./components/CitySelector";
import AgeRangeSlider from "./components/AgeRangeSlider";
import { CITIES, slugify } from "@/lib/turkey-zones";

import { SITE_URL, absoluteUrl } from "@/lib/site";

// Önemli şehirler (Ana ekranda sabit duracak olanlar)
const PREFERRED_CITIES = ["İstanbul", "Ankara", "İzmir", "Antalya", "Alanya", "Bursa", "Muğla"];

export default function Home() {
  const router = useRouter();
  const [filter, setFilter] = useState("all"); // "all" | "verifiedOnly"
  const [genderFilter, setGenderFilter] = useState<string[]>(["Kadın", "Erkek", "Çift"]);
  const [cityFilter, setCityFilter] = useState("all");
  const [ageRange, setAgeRange] = useState({ min: 18, max: 60 });
  const [isLocating, setIsLocating] = useState(false);

  const toggleGender = (g: string) => {
    setGenderFilter(prev => {
      if (prev.includes(g)) {
        if (prev.length === 1) return prev; // En az biri seçili kalmalı
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

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Kiralık Sevgili",
    "alternateName": ["Kiralik Sevgili", "KiralıkSevgili"],
    "url": absoluteUrl("/"),
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${absoluteUrl("/")}?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kiralık Sevgili",
    "url": absoluteUrl("/"),
    "logo": absoluteUrl("logo.png"),
    "sameAs": [
      "https://x.com/kiraliksevgili",
      "https://instagram.com/kiraliksevgili"
    ]
  };

  // Otomatik Konum Tespiti (Devre dışı bırakıldı - ilanların görünmesini engelleyebilir)
  /*
  useEffect(() => {
    const detectLocation = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
            const data = await res.json();
            const isAlanya = data.address.town?.toLowerCase().includes("alanya") || data.address.district?.toLowerCase().includes("alanya");
            if (isAlanya) setCityFilter("Alanya");
            else {
              const city = data.address.province || data.address.city;
              if (city) {
                const matchedCity = CITIES.find(c => city.toLowerCase().includes(c.toLowerCase()));
                if (matchedCity) setCityFilter(matchedCity);
              }
            }
          } catch (e) {}
        }, () => {});
      }
    };
    detectLocation();
  }, []);
  */

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#d4af37]/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />

      {/* COMPACT HERO SECTION */}
      <section className="relative pt-6 pb-2 overflow-hidden border-b border-white/5 bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_70%)] pointer-events-none"></div>
        <div className="mx-auto max-w-[1600px] px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] backdrop-blur-3xl px-6 py-2 text-[8px] font-black text-[#d4af37] uppercase tracking-[0.4em] border border-[#d4af37]/20 mb-4">
            TÜRKİYE'NİN PRESTİJLİ SOSYAL PLATFORMU
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-white mb-3 uppercase leading-[1.1]">
            ESTETİK, <span className="text-[#d4af37] italic font-light">MÜKEMMELİYET</span> VE EŞLİK
          </h1>
          <p className="max-w-xl mx-auto text-white/40 text-xs md:text-sm font-medium tracking-wide leading-relaxed">
            Seçkin etkinlikleriniz için prestijli sosyal refakatçi topluluğu.
          </p>
        </div>
      </section>

      <section className="pb-20 bg-black">
        <div className="mx-auto max-w-[1600px] px-6 space-y-4">
          {/* Şehir Seçimi Paneli */}
          <div className="relative -mt-4 z-20">
            <div className="p-2 md:p-3 rounded-[2rem] bg-[#080808] border border-white/5 shadow-2xl">
              <CitySelector />
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                <Link href="/" className={`rounded-xl border px-5 py-2.5 text-[8px] font-black transition-all tracking-widest ${cityFilter === "all" ? "border-[#d4af37] text-[#d4af37] bg-[#d4af37]/5" : "border-white/5 text-white/40 hover:text-white"}`}>TÜRKİYE GENELİ</Link>
                {PREFERRED_CITIES.map(city => (
                  <Link key={city} href={city.toLowerCase() === "alanya" ? "/antalya/alanya" : `/${slugify(city)}`} className={`rounded-xl border px-5 py-2.5 text-[8px] font-black transition-all tracking-widest ${cityFilter.toLowerCase() === city.toLowerCase() ? "border-[#d4af37] text-[#d4af37] bg-[#d4af37]/5" : "border-white/5 text-white/40 hover:text-white"}`}>{city.toUpperCase()}</Link>
                ))}
              </div>
            </div>
          </div>

          {/* FİLTRELER */}
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row pt-4 border-t border-white/5">
            <div className="text-center lg:text-left space-y-1">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.3em]">SEÇKİ</span>
              </div>
              <h2 className="text-lg font-black uppercase text-white">{cityFilter === "all" ? "TÜRKİYE" : cityFilter.toUpperCase()} ÖZEL</h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <AgeRangeSlider min={18} max={60} onChange={handleAgeChange} />

              <div className="flex items-center gap-1 rounded-full bg-white/[0.03] p-1 border border-white/10">
                {["Kadın", "Erkek", "Çift"].map((g) => {
                  const isActive = genderFilter.includes(g);
                  let activeClass = "bg-white text-black shadow-lg shadow-white/10";

                  if (isActive) {
                    if (g === "Kadın") activeClass = "bg-pink-500 text-white shadow-lg shadow-pink-500/20";
                    else if (g === "Erkek") activeClass = "bg-blue-500 text-white shadow-lg shadow-blue-500/20";
                    else if (g === "Çift") activeClass = "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20";
                  }

                  return (
                    <button
                      key={g}
                      onClick={() => toggleGender(g)}
                      className={`rounded-full px-5 py-2 text-[8px] font-black tracking-widest transition-all duration-300 ${
                        isActive ? activeClass : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {g.toUpperCase()}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-1 rounded-full bg-white/[0.03] p-1 border border-white/10">
                {[
                  { id: "all", label: "TÜMÜ" },
                  { id: "verifiedOnly", label: "SADECE ONAYLILAR" }
                ].map((f) => {
                  const isActive = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id)}
                      className={`rounded-full px-5 py-2 text-[8px] font-black tracking-widest transition-all duration-300 ${
                        isActive
                          ? "bg-yellow-400/90 text-black shadow-lg shadow-yellow-400/20"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <RealProfiles filter={filter} city={cityFilter} gender={genderFilter} ageRange={ageRange} />
        </div>
      </section>

      <footer className="border-t border-white/5 bg-[#050505] py-12">
        <div className="mx-auto max-w-[1600px] px-6 text-center">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <Link href="/gizlilik" className="text-[8px] font-black text-white/40 hover:text-[#d4af37] uppercase tracking-[0.2em] transition-colors">Gizlilik Politikası</Link>
            <Link href="/cocuk-guvenligi" className="text-[8px] font-black text-red-500/60 hover:text-red-500 uppercase tracking-[0.2em] transition-colors">Çocuk Güvenliği</Link>
            <Link href="/kullanim-sartlari" className="text-[8px] font-black text-white/40 hover:text-[#d4af37] uppercase tracking-[0.2em] transition-colors">Kullanım Şartları</Link>
            <Link href="/hesap-silme" className="text-[8px] font-black text-[#d4af37] hover:text-white uppercase tracking-[0.2em] transition-colors">Hesap Silme</Link>
            <Link href="/iletisim" className="text-[8px] font-black text-white/40 hover:text-[#d4af37] uppercase tracking-[0.2em] transition-colors">İletişim</Link>
          </div>
          <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">© 2025 KİRALIK SEVGİLİ. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </main>
  );
}
