"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

type UserProfile = {
  id: string;
  name: string;
  name2?: string;
  age?: string;
  age2?: string;
  city?: string;
  district?: string;
  bio?: string;
  image?: string;
  isVerified: boolean;
  isElite: boolean;
  isActive?: boolean;
  meetingCount: number;
  price?: string;
  priceDaily?: string;
  priceWeekly?: string;
  gender?: string;
};

interface RealProfilesProps {
  filter: string;
  city: string;
  gender: string;
}

function getImage(data: any): string | undefined {
  try {
    // 1. Doğrudan URL olabilecek alanlar
    const candidates = [
      data.profileImageUrl,
      data.photoUrl,
      data.photoURL,
      data.image,
      data.photo,
      data.profileImage,
      data.avatar,
      data.photoUrls?.[0],
      data.photos?.[0]
    ];

    for (const val of candidates) {
      if (val && typeof val === 'string' && val.trim().startsWith('http')) {
        return val.trim();
      }
    }

    // 2. Dizi içindeki geçerli URL'leri ara
    const arrays = [data.photoUrls, data.photos];
    for (const arr of arrays) {
      if (Array.isArray(arr) && arr.length > 0) {
        const found = arr.find(item => typeof item === 'string' && item.trim().startsWith('http'));
        if (found) return (found as string).trim();
      }
    }
  } catch (e) {
    console.error("getImage error:", e);
  }
  return undefined;
}


export default function RealProfiles({ filter, city, gender }: RealProfilesProps) {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfiles() {
      try {
        setLoading(true);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("hasProfile", "==", true));
        const snapshot = await getDocs(q);

        const loadedProfiles: UserProfile[] = snapshot.docs.map((doc) => {
          const raw = doc.data();

          // GÜVENLİK: Kimlik doğrulaması sadece ana dökümanda (root) varsa kabul edilir.
          const isVerified = raw.isIdVerified === true;

          const nested = raw.profile && typeof raw.profile === "object" ? raw.profile : {};

          // Daha güvenli birleştirme: Boş olan alanların veriyi ezmesini önle
          const data = { ...raw };
          Object.keys(nested).forEach(key => {
            if (nested[key] !== undefined && nested[key] !== null && nested[key] !== "") {
              data[key] = nested[key];
            }
          });

          const meetingCount = Number(data.meetingCount || 0);
          const isElite = isVerified && (data.isElite === true || meetingCount > 0);
          const isActive = raw.isActive === true;
          const image = getImage(data);

          return {
            id: doc.id,
            name: data.name || data.displayName || "Kullanıcı",
            name2: data.name2 || data.displayName2,
            age: data.age ? String(data.age) : "",
            age2: data.age2 ? String(data.age2) : undefined,
            city: data.city || data.sehir || "Türkiye",
            district: data.district || data.ilce || "",
            bio: data.bio || data.description || "Sosyal arkadaşlık ilanı.",
            image: image,
            isVerified,
            isElite,
            isActive,
            meetingCount,
            price: data.price || data.hourlyPrice || data.saatlikFiyat,
            priceDaily: data.priceDaily || data.dailyPrice || data.gunlukFiyat,
            priceWeekly: data.priceWeekly || data.weeklyPrice || data.haftalikFiyat,
            gender: data.gender || data.cinsiyet || "Belirtilmemiş"
          };
        });

        let filtered = loadedProfiles;

        // Cinsiyet Filtreleme - Daha esnek eşleştirme
        if (gender !== "all") {
          const searchGender = gender.toLowerCase();
          filtered = filtered.filter(p => {
            if (!p.gender) return false;
            const userGender = p.gender.toLowerCase();

            // Kadın/Kadin eşleşmesi
            if (searchGender === "kadın" || searchGender === "kadin") {
              return userGender === "kadın" || userGender === "kadin" || userGender === "bayan" || userGender === "female";
            }

            // Erkek eşleşmesi
            if (searchGender === "erkek") {
              return userGender === "erkek" || userGender === "bay" || userGender === "male";
            }

            // Çift eşleşmesi
            if (searchGender === "çift" || searchGender === "cift") {
              return userGender === "çift" || userGender === "cift" || userGender === "couple";
            }

            return userGender === searchGender;
          });
        }

        if (filter === "elite") filtered = filtered.filter(p => p.isElite);
        else if (filter === "verified") filtered = filtered.filter(p => p.isVerified);

        if (city !== "all") {
          const searchCity = city.toLowerCase();
          filtered = filtered.filter(p => {
            const pCity = p.city?.toLowerCase() || "";
            const pDistrict = p.district?.toLowerCase() || "";

            // Alanya-Antalya Ayrımı: Antalya seçildiğinde 200km uzaklıktaki Alanya ilanlarını gösterme
            if (searchCity === "antalya" && (pCity.includes("alanya") || pDistrict.includes("alanya"))) {
              return false;
            }

            // Alanya seçildiğinde sadece Alanya sonuçlarını getir
            if (searchCity === "alanya") {
              return pCity.includes("alanya") || pDistrict.includes("alanya");
            }

            return pCity.includes(searchCity) || pDistrict.includes(searchCity);
          });
        }

        // Sıralama Mantığı: Elite > Onaylı > Onaysız
        filtered.sort((a, b) => {
          if (a.isElite && !b.isElite) return -1;
          if (!a.isElite && b.isElite) return 1;
          if (a.isVerified && !b.isVerified) return -1;
          if (!a.isVerified && b.isVerified) return 1;
          return 0;
        });

        setProfiles(filtered);
      } catch (err) {
        console.error("Firestore Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfiles();
  }, [filter, city, gender]);

  if (loading) return (
    <div className="py-32 text-center">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-[#ff2d55] border-t-transparent"></div>
    </div>
  );

  if (profiles.length === 0) return (
    <div className="py-20 text-center space-y-6 px-6">
      <div className="text-gray-500 font-bold uppercase tracking-widest text-sm">
        {city !== "all" ? `${city} bölgesinde` : "Bu kategoride"} henüz aktif ilan bulunmuyor.
      </div>
      <div className="text-[10px] text-gray-700 uppercase tracking-widest max-w-xs mx-auto">
        Kiralık Sevgili platformu kesinlikle Alanya eskort sayfası değildir. Sadece sosyal refakat ilanları yayınlanır.
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* List Başı SEO & Info Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-5 rounded-[2rem] bg-gradient-to-r from-[#0a0a0a] to-[#111] border border-[#1a1a1a] shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#ff2d55] animate-pulse"></div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            {city === "all" ? "Türkiye Geneli" : city.toUpperCase()} AKTİF REFAKATÇİLER
          </p>
        </div>
      </div>

      {/* Grid Layout - Premium Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {profiles.map((profile) => (
          <Link
            href={`/profil/${profile.id}`}
            key={profile.id}
            className="premium-card group relative flex flex-col h-full overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] transition-all duration-500 hover:border-[#ff2d55]/40 hover:shadow-[0_0_40px_-10px_rgba(255,45,85,0.2)] hover:-translate-y-2"
          >
            {/* Image Container with Fixed Aspect Ratio */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505]">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-7xl opacity-5 bg-gradient-to-b from-[#111] to-black">👤</div>
              )}

              {/* Badges Overlay */}
              <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
                {profile.isElite ? (
                  <span className="backdrop-blur-md bg-black/40 border border-[#00B2FF]/50 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-[#00B2FF] shadow-2xl">
                    ELITE
                  </span>
                ) : profile.isVerified ? (
                  <span className="backdrop-blur-md bg-black/40 border border-[#4CAF50]/50 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-[#4CAF50] shadow-2xl">
                    ONAYLI
                  </span>
                ) : (
                  <span className="backdrop-blur-md bg-black/40 border border-orange-500/50 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-orange-500 shadow-2xl">
                    ONAYSIZ
                  </span>
                )}
                {profile.isActive && (
                  <span className="backdrop-blur-md bg-green-500/20 border border-green-500/50 px-3 py-1.5 rounded-full text-[7px] font-black uppercase tracking-[0.2em] text-green-400 animate-pulse shadow-2xl">
                    ● ŞU AN MÜSAİT
                  </span>
                )}
              </div>

              {/* Price Tag Overlay */}
              <div className="absolute bottom-5 right-5 z-10 flex flex-col gap-2">
                {profile.price && (
                  <div className="backdrop-blur-xl bg-black/60 border border-white/10 px-4 py-1.5 rounded-xl shadow-2xl flex flex-col items-end">
                    <span className="text-base font-black text-white tracking-tighter">₺{profile.price}</span>
                    <span className="text-[7px] font-black text-gray-400 uppercase tracking-tighter">saatlik</span>
                  </div>
                )}
                {profile.priceDaily && (
                  <div className="backdrop-blur-xl bg-black/60 border border-white/10 px-4 py-1.5 rounded-xl shadow-2xl flex flex-col items-end">
                    <span className="text-base font-black text-[#ff2d55] tracking-tighter">₺{profile.priceDaily}</span>
                    <span className="text-[7px] font-black text-gray-400 uppercase tracking-tighter">günlük</span>
                  </div>
                )}
              </div>

              {/* Bottom Gradient for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Content Area - Fixed Height for Uniformity */}
            <div className="flex flex-col flex-1 p-8 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-white group-hover:text-[#ff2d55] transition-colors leading-none tracking-tighter truncate max-w-[80%]">
                    {profile.gender?.toLowerCase() === "çift" || profile.gender?.toLowerCase() === "couple" ? (
                      `${profile.name?.[0] || "?"}. & ${profile.name2?.[0] || "?"}.`
                    ) : (
                      `${profile.name?.[0] || "?"}...`
                    )}
                    {profile.age ? `, ${profile.age}` : ""}
                    {profile.age2 ? ` & ${profile.age2}` : ""}
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                    profile.gender?.toLowerCase() === 'erkek' || profile.gender?.toLowerCase() === 'male'
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-500'
                      : profile.gender?.toLowerCase() === 'kadın' || profile.gender?.toLowerCase() === 'female'
                      ? 'bg-pink-500/10 border-pink-500/30 text-pink-500'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                  }`}>
                    {profile.gender?.toLowerCase() === "kadın" || profile.gender?.toLowerCase() === "female" ? "Kadın ♀️" :
                     profile.gender?.toLowerCase() === "erkek" || profile.gender?.toLowerCase() === "male" ? "Erkek ♂️" : "Çift 👥"}
                  </div>
                </div>
                <div className="flex items-center text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">
                  <span className="text-[#ff2d55] mr-1.5">📍</span> {profile.city?.toUpperCase() || "TÜRKİYE"}
                </div>
              </div>

              <p className="text-sm leading-relaxed text-gray-400 font-medium italic line-clamp-2 h-[2.5rem]">
                "{profile.bio}"
              </p>

              <div className="pt-6 mt-auto border-t border-[#1a1a1a] flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[7px] font-black text-gray-600 uppercase tracking-[0.3em] mb-1">Popülarite</span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className={`w-1 h-1 rounded-full ${s <= 4 ? 'bg-[#ff2d55]' : 'bg-gray-800'}`}></div>
                      ))}
                    </div>
                    <span className="text-[9px] font-black text-white uppercase">{profile.meetingCount} Randevu</span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-gray-500 group-hover:bg-[#ff2d55] group-hover:text-white group-hover:border-[#ff2d55] transition-all duration-300">
                  <span className="text-xs">→</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Alt SEO Metni - Refined with Strategic SEO */}
      <div className="mt-20 p-12 rounded-[3rem] bg-gradient-to-b from-[#0a0a0a] to-black border border-[#1a1a1a] text-center shadow-3xl">
        <h4 className="text-[10px] font-black text-[#ff2d55] uppercase tracking-[0.5em] mb-6">Alanya Sosyal Refakat & VIP Eşlik Rehberi</h4>
        <p className="text-xs text-gray-500 leading-loose font-medium max-w-3xl mx-auto">
          Kiralık Sevgili, modern dünyanın sosyal ihtiyaçlarına elit ve güvenilir çözümler sunar.
          Platformumuz, Alanya ve çevresinde özel davetlerinize, iş yemeklerinize veya sosyal aktivitelerinize eşlik edecek
          profesyonel refakatçilerle bağlantı kurmanızı sağlar. Önemle belirtmek isteriz ki; Kiralık Sevgili platformu
          bir <strong>Alanya eskort</strong> sayfası değildir ve <strong>eskort Alanya</strong> hizmeti sunmamaktadır.
          Vizyonumuz, sadece yasal ve seviyeli sosyal birliktelikleri desteklemektir. <strong>Alanya eskort sitesi</strong>
          arayan kullanıcılar için platformumuz uygun bir adres değildir; biz sadece elit sosyal arkadaşlık ve
          VİP refakat hizmetleri odaklı bir topluluğuz. Gizlilik ve kalite standartlarımız gereği, tüm kullanıcılarımızın
          güvenliği en üst düzeyde korunmaktadır.
        </p>
      </div>
    </div>
  );
}
