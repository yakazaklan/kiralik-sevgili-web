"use client";

import React, { useState } from "react";
import RealProfiles from "./components/RealProfiles";

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");

  const cities = ["Alanya", "İstanbul", "Ankara", "İzmir", "Antalya", "Bursa"];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      {/* SEO & DISCLAIMER SECTION (HIDDEN BUT FOR GOOGLE) */}
      <div className="sr-only">
        <h2>Alanya Eskort Sayfası Değildir</h2>
        <p>
          Kiralık Sevgili platformu kesinlikle Alanya eskort hizmeti sunmaz. Alanya eskort arayışı için uygun bir yer değildir.
          Biz Alanya ve Türkiye genelinde sosyal arkadaşlık, etkinlik refakatçisi ve VİP sosyal eşlik hizmetleri sunan bir platformuz.
          Alanya sosyal arkadaşlık ilanları için en güvenilir adres.
        </p>
      </div>

      {/* HERO / SEO SECTION - MINIMAL */}
      <section className="relative pt-12 pb-6 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-block rounded-full bg-[#1a1a1a] px-6 py-2 text-[10px] font-black text-[#ff2d55] uppercase tracking-[0.2em] border border-[#ff2d55]/20">
            ⚠️ Bu bir eskort sayfası değildir. Sadece sosyal refakat hizmeti verilir.
          </div>
        </div>
      </section>

      {/* İLANLAR BÖLÜMÜ */}
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* FİLTRELEME PANELİ */}
          <div className="mb-12 space-y-8">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h2 className="text-3xl font-black tracking-tighter uppercase">İlanları Keşfet</h2>
              </div>

              {/* Hızlı Kategori */}
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
                        ? "bg-[#ff2d55] text-white"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Şehir Seçimi */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-2">Şehir:</span>
              <button
                onClick={() => setCityFilter("all")}
                className={`rounded-xl border px-4 py-2 text-[10px] font-bold transition-all ${
                  cityFilter === "all" ? "border-[#ff2d55] bg-[#ff2d55]/10 text-white" : "border-[#1a1a1a] bg-[#0a0a0a] text-gray-500 hover:border-gray-700"
                }`}
              >
                HEPSİ
              </button>
              <button
                onClick={() => setCityFilter("Alanya")}
                className={`rounded-xl border px-4 py-2 text-[10px] font-bold transition-all ${
                  cityFilter === "Alanya" ? "border-[#d4af37] bg-[#d4af37]/10 text-white" : "border-[#1a1a1a] bg-[#0a0a0a] text-gray-500 hover:border-gray-700"
                }`}
              >
                ALANYA
              </button>
              {cities.filter(c => c !== "Alanya").map(city => (
                <button
                  key={city}
                  onClick={() => setCityFilter(city)}
                  className={`rounded-xl border px-4 py-2 text-[10px] font-bold transition-all ${
                    cityFilter === city ? "border-[#ff2d55] bg-[#ff2d55]/10 text-white" : "border-[#1a1a1a] bg-[#0a0a0a] text-gray-500 hover:border-gray-700"
                  }`}
                >
                  {city.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <RealProfiles filter={filter} city={cityFilter} />
        </div>
      </section>

      {/* APP DOWNLOAD PREVIEW */}
      <section className="py-24 bg-gradient-to-b from-black to-[#050505] border-y border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[3rem] bg-gradient-to-br from-[#0a0a0a] to-[#111] p-12 md:p-20 border border-[#1a1a1a] flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                YAKINDA <br />
                <span className="text-[#ff2d55]">MOBİL UYGULAMADA</span>
              </h3>
              <p className="text-gray-400 text-lg font-medium max-w-md">
                Kiralık Sevgili deneyimini cebinize taşıyoruz. Daha hızlı iletişim ve özel bildirimler için uygulamamız yakında App Store ve Google Play'de!
              </p>
              <div className="flex flex-wrap gap-4 opacity-50 cursor-not-allowed">
                <div className="h-14 w-40 rounded-xl bg-black border border-[#222] flex items-center justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 italic">Coming Soon</span>
                </div>
                <div className="h-14 w-40 rounded-xl bg-black border border-[#222] flex items-center justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 italic">Coming Soon</span>
                </div>
              </div>
            </div>
            <div className="relative w-full max-w-xs aspect-[9/19] bg-[#1a1a1a] rounded-[3rem] border-[8px] border-[#0a0a0a] shadow-2xl overflow-hidden hidden md:block">
               <div className="absolute inset-0 bg-gradient-to-tr from-[#ff2d55]/20 to-transparent"></div>
               <div className="flex h-full items-center justify-center text-[#ff2d55] text-4xl animate-pulse">💗</div>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM FOOTER */}
      <footer className="border-t border-[#1a1a1a] bg-[#050505] py-24">
        <div className="mx-auto max-w-7xl px-6 text-center md:text-left">
          <div className="mb-20 grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
                <span className="text-3xl">💗</span>
                <span className="text-2xl font-black uppercase tracking-tighter">KİRALIK SEVGİLİ</span>
              </div>
              <p className="max-w-md text-sm font-medium text-gray-500 leading-relaxed mx-auto md:mx-0">
                Türkiye'nin en seçkin ve güvenilir sosyal refakat platformu.
                Gizlilik, güvenlik ve kalite standartlarımızla her zaman yanınızdayız.
              </p>
              <div className="mt-8 p-4 rounded-2xl bg-[#0f0f0f] border border-[#1a1a1a] inline-block">
                <p className="text-[10px] font-bold text-[#ff2d55] uppercase tracking-widest">
                  Önemli Duyuru: Platformumuz kesinlikle eskort sitesi değildir.
                </p>
                <p className="text-[9px] text-gray-600 mt-1 uppercase font-medium">
                  Alanya eskort veya benzeri talepler için lütfen başka platformları kullanınız.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-8">Kurumsal</h4>
              <ul className="space-y-5 text-xs font-bold text-gray-500">
                <li><a href="/gizlilik" className="hover:text-[#ff2d55] transition-colors uppercase tracking-widest">Gizlilik Politikası</a></li>
                <li><a href="/kullanim-sartlari" className="hover:text-[#ff2d55] transition-colors uppercase tracking-widest">Kullanım Şartları</a></li>
                <li><a href="/topluluk-kurallari" className="hover:text-[#ff2d55] transition-colors uppercase tracking-widest">Topluluk Kuralları</a></li>
                <li><a href="/kvkk" className="hover:text-[#ff2d55] transition-colors uppercase tracking-widest">KVKK Aydınlatma</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-8">Destek</h4>
              <ul className="space-y-5 text-xs font-bold text-gray-500">
                <li><a href="/iletisim" className="hover:text-[#ff2d55] transition-colors uppercase tracking-widest">Bize Ulaşın</a></li>
                <li><a href="/yardim" className="hover:text-[#ff2d55] transition-colors uppercase tracking-widest">Yardım Merkezi</a></li>
                <li><a href="/sikayet-bildir" className="hover:text-[#ff2d55] transition-colors uppercase tracking-widest">Şikayet Bildir</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1a1a1a] pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
              © 2025 Kiralık Sevgili. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-10 text-[10px] font-black text-gray-700 uppercase tracking-widest">
              <span>Adults Only 18+</span>
              <span className="text-[#d4af37]">Verified Platform</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
