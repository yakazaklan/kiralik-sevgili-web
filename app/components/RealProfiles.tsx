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
  isApproved: boolean;
  role?: string;
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


function normalizeString(str: string): string {
  if (!str) return "";
  return str
    .trim()
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "c")
    .toLowerCase();
}

function ProfileCard({ profile }: { profile: UserProfile }) {
  return (
    <Link
      href={`/profil/${profile.id}`}
      className={`premium-card group relative flex flex-col h-full overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] transition-all duration-500 hover:border-[#ff2d55]/40 hover:shadow-[0_0_40px_-10px_rgba(255,45,85,0.2)] hover:-translate-y-2 ${
        (!profile.isApproved || !profile.isVerified) ? "grayscale-[0.8] hover:grayscale-0" : ""
      }`}
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
          ) : (profile.isApproved && profile.isVerified) ? (
            <span className="backdrop-blur-md bg-black/40 border border-[#4CAF50]/50 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-[#4CAF50] shadow-2xl">
              ONAYLI
            </span>
          ) : (
            <span className="backdrop-blur-md bg-orange-600/60 border border-orange-400/50 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-white shadow-2xl">
              {!profile.isVerified ? "KİMLİK ONAYI EKSİK" : "ONAYSIZ / YENİ"}
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
  );
}

export default function RealProfiles({ filter, city, gender }: RealProfilesProps) {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfiles() {
      try {
        setLoading(true);
        const usersRef = collection(db, "users");

        // Sorguyu en güvenli hale getiriyoruz: Sadece hasProfile olanları çek.
        const q = query(
          usersRef,
          where("hasProfile", "==", true)
        );

        const snapshot = await getDocs(q);

        const loadedProfiles: UserProfile[] = snapshot.docs.map((doc) => {
          const raw = doc.data();

          // Firestore verilerini en hassas şekilde işliyoruz
          const rawApproved = raw.isApproved ?? raw.approved;
          const status = String(raw.status || "").toLowerCase();

          // Çok katı onay kontrolü: Sadece açıkça true veya approved olanlar
          const isApproved = rawApproved === true || String(rawApproved) === "true" || status === "approved";

          const rawVerified = raw.isIdVerified ?? raw.verified;
          const isVerified = rawVerified === true || String(rawVerified) === "true";

          const isActive = raw.isActive === true || String(raw.isActive) === "true";
          const role = (raw.role || "").toLowerCase();

          const nested = raw.profile && typeof raw.profile === "object" ? raw.profile : {};
          const data = { ...raw, ...nested };

          const meetingCount = Number(data.meetingCount || 0);
          const isElite = isApproved && isVerified && (data.isElite === true || meetingCount > 20);

          const image = getImage(data);

          return {
            id: doc.id,
            name: data.name || data.displayName || "Kullanıcı",
            name2: data.name2 || data.displayName2,
            age: data.age ? String(data.age) : "",
            age2: data.age2 ? String(data.age2) : undefined,
            city: data.city || data.sehir || "Türkiye",
            district: data.district || data.ilce || "",
            bio: data.bio || data.description || "Sosyal refakat ilanı.",
            image: image,
            isVerified,
            isElite,
            isActive: isActive,
            isApproved: isApproved,
            meetingCount,
            price: data.price || data.hourlyPrice || data.saatlikFiyat,
            priceDaily: data.priceDaily || data.dailyPrice || data.gunlukFiyat,
            priceWeekly: data.priceWeekly || data.weeklyPrice || data.haftalikFiyat,
            gender: data.gender || data.cinsiyet || "Belirtilmemiş",
            role: role
          };
        })
        .filter(p => {
          // Eğer hasProfile true ise ve companion rolündeyse (veya rolü henüz belirlenmemişse) göster
          const isCompanion = !p.role || p.role === "companion" || p.role === "refakatci" || p.role === "user";
          return isCompanion;
        });

        let filtered = loadedProfiles;

        // Cinsiyet Filtreleme
        if (gender !== "all") {
          const searchGender = normalizeString(gender);
          filtered = filtered.filter(p => {
            if (!p.gender) return false;
            const userGender = normalizeString(p.gender);
            if (searchGender === "kadin") return userGender === "kadin" || userGender === "bayan" || userGender === "female";
            if (searchGender === "erkek") return userGender === "erkek" || userGender === "bay" || userGender === "male";
            if (searchGender === "cift") return userGender === "cift" || userGender === "couple";
            return userGender === searchGender;
          });
        }

        if (filter === "elite") filtered = filtered.filter(p => p.isElite);
        else if (filter === "verified") filtered = filtered.filter(p => p.isApproved === true && p.isVerified === true);

        // Şehir ve Bölge Filtreleme (Alanya - Antalya Ayrımı & Normalizasyon)
        if (city !== "all") {
          const searchCityNormalized = normalizeString(city);

          filtered = filtered.filter(p => {
            const pCityNorm = normalizeString(p.city || "");
            const pDistrictNorm = normalizeString(p.district || "");

            if (searchCityNormalized === "alanya") {
              // Alanya seçildiyse: Şehir veya ilçe Alanya olmalı
              return pCityNorm === "alanya" || pDistrictNorm === "alanya" || pDistrictNorm.includes("alanya");
            }

            if (searchCityNormalized === "antalya") {
              // Antalya seçildiyse: Şehir Antalya olmalı AMA ilçe Alanya olmamalı
              const isAlanya = pCityNorm === "alanya" || pDistrictNorm === "alanya" || pDistrictNorm.includes("alanya");
              return (pCityNorm === "antalya" || pDistrictNorm === "antalya") && !isAlanya;
            }

            return pCityNorm === searchCityNormalized || pDistrictNorm === searchCityNormalized;
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

  // KESİN AYRIM: Sadece her iki onayı (Yönetici + Kimlik) TAM olanlar "Onaylı" sayılır.
  // Geriye kalan herkes (kimlik göndermeyen 3 kişi dahil) alt kategoriye düşer.
  const approvedProfiles = profiles.filter(p => p.isApproved === true && p.isVerified === true);
  const pendingProfiles = profiles.filter(p => p.isApproved !== true || p.isVerified !== true);

  return (
    <div className="space-y-16">
      {/* List Başı SEO & Info Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-5 rounded-[2rem] bg-gradient-to-r from-[#0a0a0a] to-[#111] border border-[#1a1a1a] shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#ff2d55] animate-pulse"></div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            {city === "all" ? "Türkiye Geneli" : city.toUpperCase()} AKTİF REFAKATÇİLER
          </p>
        </div>
      </div>

      {/* SECTION 1: Tam Onaylı Profiller */}
      {approvedProfiles.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-white tracking-[0.3em] uppercase">ONAYLI PROFİLLER</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#ff2d55]/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {approvedProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: Kimlik Onayı Olmayanlar veya Yeni Kayıtlar */}
      {pendingProfiles.length > 0 && (
        <div className="space-y-8 opacity-90">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-gray-500 tracking-[0.3em] uppercase">ONAY BEKLEYEN / KİMLİK ONAYI EKSİK İLANLAR</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-800 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pendingProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </div>
      )}

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
