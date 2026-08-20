"use client";

import React, { useState, useEffect } from "react";
import RealProfiles from "./components/RealProfiles";

const ALL_CITIES = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce", "Alanya"
].sort();

// Önemli şehirler (Ana ekranda sabit duracak olanlar)
const PREFERRED_CITIES = ["İstanbul", "Ankara", "İzmir", "Antalya", "Alanya", "Bursa", "Muğla"];

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [showAllCities, setShowAllCities] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Kiralık Sevgili",
    "url": "https://kiraliksevgili.net",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://kiraliksevgili.net/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kiralık Sevgili",
    "url": "https://kiraliksevgili.net",
    "logo": "https://kiraliksevgili.net/logo.png",
    "sameAs": [
      "https://twitter.com/kiraliksevgili",
      "https://instagram.com/kiraliksevgili"
    ]
  };

  // Otomatik Konum Tespiti
  useEffect(() => {
    const detectLocation = async () => {
      if ("geolocation" in navigator) {
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
          try {
            // Ücretsiz bir reverse geocoding API'si kullanarak şehri buluyoruz
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
            const data = await res.json();

            // Alanya Özel Kontrolü: Town veya District alanlarında Alanya var mı bak
            const isAlanya =
              data.address.town?.toLowerCase().includes("alanya") ||
              data.address.district?.toLowerCase().includes("alanya") ||
              data.address.suburb?.toLowerCase().includes("alanya");

            if (isAlanya) {
              setCityFilter("Alanya");
            } else {
              const city = data.address.province || data.address.city || data.address.state;
              if (city) {
                // Bulunan şehri bizim listemizdeki formatla eşleştiriyoruz
                const matchedCity = ALL_CITIES.find(c => city.toLowerCase().includes(c.toLowerCase()));
                if (matchedCity) {
                  setCityFilter(matchedCity);
                }
              }
            }
          } catch (e) {
            console.error("Konum bulunamadı:", e);
          } finally {
            setIsLocating(false);
          }
        }, () => setIsLocating(false));
      }
    };
    detectLocation();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <section className="pb-24 pt-12">
        <div className="mx-auto max-w-5xl px-6">
          {/* SEO H1 BAŞLIĞI */}
          <h1 className="sr-only">Kiralık Sevgili | Türkiye Geneli Sosyal Arkadaşlık ve Refakat Platformu</h1>

          {/* FİLTRELEME PANELİ */}
          <div className="mb-12 space-y-8">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h2 className="text-3xl font-black tracking-tighter uppercase">
                  {isLocating ? "KONUMUNUZ BELİRLENİYOR..." :
                   cityFilter === "all" ? "Türkiye Geneli İLANLARINI KEŞFET" :
                   `${cityFilter.toUpperCase()} İLANLARINI KEŞFET`}
                </h2>
                {cityFilter !== "all" && !isLocating && (
                  <p className="text-[10px] font-bold text-[#ff2d55] tracking-widest mt-1">
                    📍 {cityFilter.toUpperCase()} BÖLGESİNDEKİ AKTİF İLANLAR
                  </p>
                )}
              </div>

              {/* Filtreler */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Cinsiyet Seçimi */}
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

                {/* Onay Filtresi */}
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
                        filter === item.id ? "bg-[#ff2d55] text-white" : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Şehir Seçimi */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-2">Hızlı Seçim:</span>
                <button
                  onClick={() => setCityFilter("all")}
                  className={`rounded-xl border px-4 py-2 text-[10px] font-bold transition-all ${
                    cityFilter === "all" ? "border-[#ff2d55] bg-[#ff2d55]/10 text-white" : "border-[#1a1a1a] bg-[#0a0a0a] text-gray-500 hover:border-gray-700"
                  }`}
                >
                  TÜRKİYE GENELİ
                </button>

                {/* Çift görünme sorunu burada PREFERRED_CITIES ile çözüldü */}
                {PREFERRED_CITIES.map(city => (
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

                <button
                  onClick={() => setShowAllCities(!showAllCities)}
                  className="rounded-xl border border-[#ff2d55]/30 bg-black px-4 py-2 text-[10px] font-black text-[#ff2d55] hover:bg-[#ff2d55] hover:text-white transition-all"
                >
                  {showAllCities ? "KAPAT ▲" : "DİĞER İLLER ▼"}
                </button>
              </div>

              {showAllCities && (
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2 p-6 rounded-[2rem] bg-[#0a0a0a] border border-[#1a1a1a] max-h-60 overflow-y-auto custom-scrollbar shadow-2xl">
                  {ALL_CITIES.map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        setCityFilter(city);
                        setShowAllCities(false);
                      }}
                      className={`text-[9px] font-bold p-2 text-left rounded-lg transition-colors hover:bg-[#1a1a1a] ${cityFilter === city ? "text-[#ff2d55]" : "text-gray-500"}`}
                    >
                      {city.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <RealProfiles filter={filter} city={cityFilter} gender={genderFilter} />
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
                Etkinlikleriniz, iş yemekleriniz ve sosyal davetleriniz için profesyonel eşlik hizmetleri.
              </p>
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
                <li><a href="/yardim-merkezi" className="hover:text-[#ff2d55] transition-colors uppercase tracking-widest">Yardım Merkezi</a></li>
                <li><a href="/iletisim" className="hover:text-[#ff2d55] transition-colors uppercase tracking-widest">Şikayet Bildir</a></li>
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
