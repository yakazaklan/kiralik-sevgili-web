import React, { useEffect, useState } from "react";
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
  images: string[];
  isVerified: boolean;
  isElite: boolean;
  isOrange?: boolean;
  isActive?: boolean;
  meetingCount: number;
  price?: string;
  priceDaily?: string;
  priceWeekly?: string;
  gender?: string;
  isApproved: boolean;
  isInvisible?: boolean;
  role?: string;
  level: 'diamond' | 'vip' | 'gold';
};

interface RealProfilesProps {
  filter: string;
  city: string;
  gender: string;
}

function getImages(data: any): string[] {
  const images: string[] = [];
  try {
    const candidates = [
      data.profileImageUrl,
      data.photoUrl,
      data.profilePhoto,
      data.photoURL,
      data.image,
      data.photo,
      data.profileImage,
      data.avatar
    ];

    for (const val of candidates) {
      if (val && typeof val === 'string' && val.trim().startsWith('http')) {
        const url = val.trim();
        if (!images.includes(url)) images.push(url);
      }
    }

    const arrays = [data.photoUrls, data.photos];
    for (const arr of arrays) {
      if (Array.isArray(arr)) {
        for (const item of arr) {
          if (typeof item === 'string' && item.trim().startsWith('http')) {
            const url = item.trim();
            if (!images.includes(url)) images.push(url);
          }
        }
      }
    }
  } catch (e) {
    console.error("getImages error:", e);
  }
  return images.slice(0, 3);
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
  const genderNorm = normalizeString(profile.gender || "");

  const isMale = genderNorm === "erkek" || genderNorm === "bay" || genderNorm === "male" || genderNorm === "e";
  const isCouple = genderNorm === "cift" || genderNorm === "couple" || genderNorm.includes("cift");

  // Tier Mantığı: Diamond (Altın), VIP (Mavi), Gold (Yeşil)
  const tierStyles = profile.level === 'diamond'
    ? {
        border: "border-[#d4af37]/40",
        bg: "from-[#1a1405] via-[#050505] to-[#000000]",
        accent: "text-[#d4af37]",
        glow: "shadow-[0_0_80px_rgba(212,175,55,0.15)]",
        hover: "group-hover:border-[#d4af37] group-hover:shadow-[0_0_120px_rgba(212,175,55,0.3)]",
        badge: "bg-gradient-to-r from-[#d4af37] to-[#f9e5af] text-black font-black",
        tag: "border-[#d4af37]/30 text-[#d4af37] bg-[#d4af37]/5",
        overlay: "from-[#d4af37]/10 via-transparent to-transparent",
        tick: "text-[#d4af37]"
      }
    : profile.level === 'vip'
    ? {
        border: "border-blue-500/30",
        bg: "from-[#050a15] via-[#050505] to-[#000000]",
        accent: "text-blue-400",
        glow: "shadow-[0_0_50px_rgba(59,130,246,0.1)]",
        hover: "group-hover:border-blue-400 group-hover:shadow-[0_0_80px_rgba(59,130,246,0.2)]",
        badge: "bg-blue-500 text-white font-black",
        tag: "border-blue-500/20 text-blue-400 bg-blue-500/5",
        overlay: "from-blue-500/5 via-transparent to-transparent",
        tick: "text-blue-500"
      }
    : {
        border: "border-emerald-500/20",
        bg: "from-[#05150a] via-[#050505] to-[#000000]",
        accent: "text-emerald-400",
        glow: "",
        hover: "group-hover:border-emerald-500/50",
        badge: "bg-emerald-500 text-white font-black",
        tag: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5",
        overlay: "transparent",
        tick: "text-emerald-500"
      };

  const location = [profile.district, profile.city].filter(Boolean).join(", ");
  const roomInfo = (profile as any).details?.roomType || (profile as any).room || (profile as any).details?.odaTipi || "Müsait";

  const levelBadgeLabel = {
    diamond: "DIAMOND",
    vip: "VIP",
    gold: "GOLD"
  };

  // Cinsiyet İkonu ve Rengi
  // Kadın: Pembe, Erkek: Mavi, Çift: Sarı
  const genderIcons = {
    kadin: { icon: "♀", color: "text-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/20" },
    erkek: { icon: "♂", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    cift: { icon: "⚤", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" }
  };

  const currentGender = isCouple ? "cift" : isMale ? "erkek" : "kadin";
  const gStyle = genderIcons[currentGender as keyof typeof genderIcons] || genderIcons.kadin;

  return (
    <Link
      href={`/profil/${profile.id}`}
      className={`group relative flex flex-col md:flex-row w-full overflow-hidden rounded-[2rem] bg-[#050505] border ${tierStyles.border} transition-all duration-700 ${tierStyles.hover} ${tierStyles.glow} hover:-translate-y-1 p-3 gap-4`}
    >
      {/* Premium Ambient Light */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#d4af37]/10 transition-colors duration-1000" />

      {/* Image Area - Horizontal Layout (3 photos) */}
      <div className="relative flex-shrink-0 w-full md:w-[240px] h-[300px] md:h-[180px] flex gap-2">
        {/* Main Photo */}
        <div className="relative flex-[2] overflow-hidden rounded-2xl bg-[#0a0a0a]">
          <img
            src={profile.images[0] || "/placeholder.jpg"}
            alt={profile.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Status Tick */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 z-20">
            <div className={`w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-lg`}>
              <svg className={`w-3.5 h-3.5 ${tierStyles.tick}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Side Photos */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex-1 overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5">
            <img
              src={profile.images[1] || profile.images[0] || "/placeholder.jpg"}
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
              alt=""
            />
          </div>
          <div className="flex-1 overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 relative">
            <img
              src={profile.images[2] || profile.images[0] || "/placeholder.jpg"}
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Information Area */}
      <div className="flex flex-col justify-between flex-1 py-2 pr-2">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[9px] font-black tracking-[0.25em] uppercase ${tierStyles.accent}`}>
                  {levelBadgeLabel[profile.level]}
                </span>
                {profile.isActive && (
                  <span className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[8px] font-black text-emerald-500 tracking-widest uppercase">AKTİF</span>
                  </span>
                )}
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none mb-1">
                {profile.name ? `${profile.name[0]}.***` : 'PRIVATE'}
                <span className="text-white/30 ml-2 font-medium italic text-[13px]">{profile.age}</span>
              </h3>
            </div>
            <div className={`w-8 h-8 rounded-xl ${gStyle.bg} ${gStyle.border} border flex items-center justify-center text-lg transition-transform group-hover:rotate-12`}>
              <span className={gStyle.color}>{gStyle.icon}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-xs">📍</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em]">{location}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-xs">🏠</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em]">{roomInfo}</span>
            </div>
          </div>

          <p className="text-[13px] leading-relaxed text-white/70 font-medium italic line-clamp-2 mt-3 border-t border-white/5 pt-3">
            "{profile.bio || "Seçkin refakat ve sosyal eşlik hizmeti."}"
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
             {profile.meetingCount > 0 && (
               <div className={`bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded-full text-[8px] font-black tracking-widest uppercase`}>
                 {profile.meetingCount}+ ONAYLI RANDEVU
               </div>
             )}
          </div>

          <div className="flex items-center gap-2 text-[9px] font-black text-white/40 tracking-[0.2em] uppercase group-hover:text-white transition-colors">
            DETAYLAR
            <svg className="w-2.5 h-2.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/>
            </svg>
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
        console.log("Firestore baglantisi kuruluyor...");
        const usersRef = collection(db, "users");

        // Çoklu sorgu stratejisi: hasProfile ve isApproved alanlarının eksikliği nedeniyle
        // dışarıda kalan ilanları yakalamak için sorguyu genişletiyoruz.
        // hasProfile filtresini veritabanı seviyesinden kaldırıp istemci tarafına taşıyoruz.
        const qApproved = query(usersRef, where("isApproved", "in", [true, "true"]));
        const qStatusApproved = query(usersRef, where("status", "==", "approved"));

        // Belgeleri getir ve birleştir
        const [snapApproved, snapStatus] = await Promise.all([
          getDocs(qApproved),
          getDocs(qStatusApproved)
        ]);

        const allDocs = [...snapApproved.docs, ...snapStatus.docs];
        const uniqueDocsMap = new Map();
        allDocs.forEach(doc => uniqueDocsMap.set(doc.id, doc));
        const uniqueDocs = Array.from(uniqueDocsMap.values());

        console.log("Firestore'dan gelen toplam ham belge sayısı:", uniqueDocs.length);

        const loadedProfiles: UserProfile[] = uniqueDocs.map((doc) => {
          const raw = doc.data() || {};
          const nested = (raw.profile && typeof raw.profile === "object") ? raw.profile : {};
          const data = { ...raw, ...nested };

          const rStatus = String(raw.status || "").toLowerCase().trim();
          const nStatus = String(nested.status || "").toLowerCase().trim();
          const role = String(data.role || nested.role || "").toLowerCase();

          // Onay durumunu Android ile eşzamanlı kontrol et
          // Not: "active" durumu tek başına onay kanıtı sayılmamalı (kullanıcı isteği)
          const isApproved = raw.isApproved === true || String(raw.isApproved) === "true" ||
                            nested.isApproved === true || String(nested.isApproved) === "true" ||
                            rStatus === "approved" || nStatus === "approved";

          // Sadece açıkça false ise pasif say, undefined ise aktif kabul et (Android uyumu)
          const isExplicitlyPassive = raw.isActive === false || String(raw.isActive) === "false" ||
                                     data.isActive === false || String(data.isActive) === "false" ||
                                     ["rejected", "blocked", "banned"].includes(rStatus) ||
                                     ["rejected", "blocked", "banned"].includes(nStatus);

          // hasProfile alanı eksikse, profil verisi veya ismi varsa var kabul et
          const hasProfile = raw.hasProfile === true || String(raw.hasProfile) === "true" ||
                            data.hasProfile === true || String(data.hasProfile) === "true" ||
                            (data.name && data.bio) || (getImages(data).length > 0);

          const rawVerified = data.isIdVerified ?? data.verified ?? data.isVerified ?? data.idVerified;
          const isVerified = rawVerified === true || String(rawVerified) === "true";

          let level: 'diamond' | 'vip' | 'gold' = 'gold';
          const rawLevel = String(data.level || data.listingTier || "").toLowerCase();
          if (rawLevel === 'diamond') level = 'diamond';
          else if (rawLevel === 'vip') level = 'vip';

          const profileObj = {
            id: doc.id,
            name: data.name || data.displayName || data.username || "Gizli Üye",
            age: data.age ? String(data.age) : "",
            city: data.city || data.sehir || "Türkiye",
            district: data.district || data.ilce || "",
            bio: data.bio || data.description || "Sosyal refakat ilanı.",
            images: getImages(data),
            isVerified,
            isElite: (level === 'diamond' || level === 'vip') && isVerified,
            isOrange: isApproved && !isVerified,
            isActive: !isExplicitlyPassive && (raw.deletedAt == null),
            isApproved: isApproved && hasProfile,
            isInvisible: data.isInvisible === true || String(data.isInvisible) === "true",
            meetingCount: Number(data.meetingCount || 0),
            price: data.price || data.hourlyPrice,
            gender: data.gender || data.cinsiyet || "kadin",
            role: role,
            level
          };

          return profileObj;
        }).filter(p => {
          // GÖRÜNME ŞARTI (Güvenlik ve Gizlilik Odaklı)
          if (p.isInvisible) return false;
          if (!p.isApproved) return false;
          if (!p.isActive) return false;

          // Rol Filtresi: Sadece companion ve türevlerini göster
          const validRoles = ['companion', 'provider', 'model', 'escort', 'refakatçi', 'refakatci', 'refakat', 'agent', 'agency'];
          // Eğer role alanı boşsa, onaylı profil olduğu için varsayılan olarak göster
          const isCompanion = !p.role || p.role === "" || p.role === "user" || validRoles.some(r => p.role?.includes(r));

          if (!isCompanion) return false;

          // Çöp veri temizliği
          if (p.name === "Gizli Üye" && p.images.length === 0) return false;

          return true;
        });


        let filtered = loadedProfiles;
        console.log("Filtreleme sonrasi ilan sayisi:", filtered.length);
        console.log("Loaded profiles (companion/model):", filtered.length);

        if (gender !== "all") {
          const searchGender = normalizeString(gender);
          filtered = filtered.filter(p => {
            const userGender = normalizeString(p.gender || "");
            if (searchGender === "kadin") return userGender === "kadin" || userGender === "bayan" || userGender === "female";
            if (searchGender === "erkek") return userGender === "erkek" || userGender === "bay" || userGender === "male";
            if (searchGender === "cift") return userGender === "cift" || userGender === "couple";
            return userGender === searchGender;
          });
        }

        if (filter === "elite") filtered = filtered.filter(p => p.isElite);
        if (filter === "verified") filtered = filtered.filter(p => p.isVerified || p.isOrange);

        if (city !== "all") {
          const searchCityNormalized = normalizeString(city);
          const cityFiltered = filtered.filter(p => {
            const pCityNorm = normalizeString(p.city || "");
            const pDistrictNorm = normalizeString(p.district || "");
            if (searchCityNormalized === "alanya") return pCityNorm === "alanya" || pDistrictNorm.includes("alanya");
            if (searchCityNormalized === "antalya") return pCityNorm === "antalya" || pCityNorm === "alanya";
            return pCityNorm === searchCityNormalized || pDistrictNorm === searchCityNormalized;
          });

          // Eğer seçilen şehirde hiç ilan yoksa, boş sayfa göstermek yerine
          // tüm ilanları göster (Teşhis amaçlı)
          if (cityFiltered.length > 0) {
            filtered = cityFiltered;
          } else {
            console.log(`${city} için ilan bulunamadı, tüm liste gösteriliyor.`);
          }
        }

        // Tier-based shuffling logic
        const diamond = filtered.filter(p => p.level === 'diamond').sort(() => Math.random() - 0.5);
        const vip = filtered.filter(p => p.level === 'vip').sort(() => Math.random() - 0.5);
        const gold = filtered.filter(p => p.level === 'gold').sort(() => Math.random() - 0.5);

        setProfiles([...diamond, ...vip, ...gold]);
      } catch (err) {
        console.error("Firestore Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfiles();
  }, [filter, city, gender]);

  if (loading) return (
    <div className="py-32 flex flex-col items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-[#d4af37]/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-6 text-[11px] font-black text-white/40 uppercase tracking-[0.3em] animate-pulse">LÜKS DENEYİM YÜKLENİYOR</p>
    </div>
  );

  if (profiles.length === 0) return (
    <div className="py-24 text-center px-6 rounded-[3rem] border border-white/5 bg-[#050505]/50 backdrop-blur-sm">
      <p className="text-white/30 font-black uppercase tracking-[0.4em] text-[10px]">Bu kriterlere uygun seçkin ilan bulunamadı</p>
    </div>
  );

  return (
    <div className="space-y-12 w-full px-4 md:px-10 max-w-[1920px] mx-auto pb-40">
      {/* Ultra Premium Editorial Header */}
      <div className="relative overflow-hidden rounded-[2rem] bg-[#080808] border border-white/5 p-6 md:p-8 group">
        {/* Animated Background Element */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#d4af37]/5 rounded-full blur-[80px] -mr-30 -mt-30 transition-all duration-[2000ms] group-hover:bg-[#d4af37]/10" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="max-w-4xl space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#d4af37]"></span>
              <span className="text-[10px] font-black text-[#d4af37] tracking-[0.4em] uppercase">PLATİN SEÇKİSİ</span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-white tracking-tight leading-tight">
              {city === "all" ? "TÜRKİYE" : city.toUpperCase()}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/30 to-white/5 italic font-light">EDİTÖRYEL</span>
            </h2>
            <p className="text-xs text-white/40 font-medium max-w-xl leading-relaxed">
              Küratörlerimiz tarafından seçilen en prestijli profiller.
            </p>
          </div>

          <div className="flex flex-col">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative overflow-hidden px-6 py-3 rounded-full bg-white text-black text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-700 hover:bg-[#d4af37] active:scale-95 text-center"
            >
              UYGULAMAYI İNDİR
            </a>
          </div>
        </div>
      </div>

      {/* DIAMOND SECTION */}
      {profiles.filter(p => p.level === 'diamond').length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-sm font-black text-[#d4af37] tracking-[0.5em] uppercase whitespace-nowrap">DIAMOND</h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#d4af37]/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {profiles.filter(p => p.level === 'diamond').map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </section>
      )}

      {/* VIP SECTION */}
      {profiles.filter(p => p.level === 'vip').length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-sm font-black text-blue-400 tracking-[0.5em] uppercase whitespace-nowrap">VIP</h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-blue-400/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {profiles.filter(p => p.level === 'vip').map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </section>
      )}

      {/* GOLD SECTION */}
      {profiles.filter(p => p.level === 'gold').length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-sm font-black text-emerald-400 tracking-[0.5em] uppercase whitespace-nowrap">GOLD</h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {profiles.filter(p => p.level === 'gold').map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
