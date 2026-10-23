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
  isListingPendingApproval?: boolean;
  isInvisible?: boolean;
  isBusy?: boolean;
  role?: string;
  level: 'diamond' | 'vip' | 'gold';
};

interface RealProfilesProps {
  filter: string; // "all" | "verifiedOnly"
  city: string;
  gender: string | string[]; // Array of selected genders
  ageRange?: { min: number; max: number };
}

function getImages(data: any): string[] {
  const images: string[] = [];
  try {
    // 1. Birincil kaynak: Android uygulamasının yazdığı 'photos' dizisi
    if (Array.isArray(data.photos)) {
      for (const item of data.photos) {
        if (typeof item === 'string' && item.trim().startsWith('http')) {
          const url = item.trim();
          if (!images.includes(url)) images.push(url);
        }
      }
    }

    // 2. İkinci birincil kaynak: 'profilePhoto' alanı (Genelde photos[0] ile aynıdır)
    if (data.profilePhoto && typeof data.profilePhoto === 'string' && data.profilePhoto.trim().startsWith('http')) {
      const url = data.profilePhoto.trim();
      if (!images.includes(url)) {
        images.unshift(url);
      } else {
        // Varsa en başa taşı
        const idx = images.indexOf(url);
        if (idx > 0) {
          images.splice(idx, 1);
          images.unshift(url);
        }
      }
    }

    // 3. Yedek adaylar ve fallbacks
    const candidates = [
      data.profileImageUrl,
      data.photoUrl,
      data.photoURL,
      data.image,
      data.photo,
      data.profileImage,
      data.avatar,
      data.profile_image
    ];

    for (const val of candidates) {
      if (val && typeof val === 'string' && val.trim().startsWith('http')) {
        const url = val.trim();
        if (!images.includes(url)) images.push(url);
      }
    }

    const arrays = [data.photoUrls];
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

  // Tier Mantığı: Diamond (Altın), VIP (Mavi), Standart (Yeşil)
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
    diamond: "D",
    vip: "VİP",
    gold: "STANDART"
  };

  // Cinsiyet İkonu ve Rengi
  // Kadın: Pembe, Erkek: Mavi, Çift: Sarı
  const genderIcons = {
    kadin: {
      icon: "♀",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20",
      glow: "group-hover:shadow-[0_0_50px_rgba(236,72,153,0.15)]",
      ambient: "bg-pink-500/5 group-hover:bg-pink-500/10"
    },
    erkek: {
      icon: "♂",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      glow: "group-hover:shadow-[0_0_50px_rgba(59,130,246,0.15)]",
      ambient: "bg-blue-500/5 group-hover:bg-blue-500/10"
    },
    cift: {
      icon: "⚤",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      glow: "group-hover:shadow-[0_0_50px_rgba(234,179,8,0.15)]",
      ambient: "bg-yellow-500/5 group-hover:bg-yellow-500/10"
    }
  };

  const currentGender = isCouple ? "cift" : isMale ? "erkek" : "kadin";
  const gStyle = genderIcons[currentGender as keyof typeof genderIcons] || genderIcons.kadin;

  return (
    <Link
      href={`/profil/${profile.id}`}
      className={`group relative flex flex-col md:flex-row w-full overflow-hidden rounded-[2.5rem] bg-[#050505] border ${tierStyles.border} transition-all duration-700 ${tierStyles.hover} ${tierStyles.glow} ${gStyle.glow} hover:-translate-y-2 p-3.5 gap-5`}
    >
      {/* Premium Ambient Light - Gender Based */}
      <div className={`absolute -right-20 -top-20 w-80 h-80 ${gStyle.ambient} rounded-full blur-[120px] pointer-events-none transition-colors duration-1000`} />
      <div className={`absolute -left-20 -bottom-20 w-64 h-64 ${tierStyles.overlay} rounded-full blur-[100px] pointer-events-none transition-colors duration-1000 opacity-20`} />

      {/* Image Area - Horizontal Layout (3 photos) */}
      <div className="relative flex-shrink-0 w-full md:w-[260px] h-[320px] md:h-[200px] flex gap-2.5">
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
              referrerPolicy="no-referrer"
              alt=""
            />
          </div>
          <div className="flex-1 overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 relative">
            <img
              src={profile.images[2] || profile.images[0] || "/placeholder.jpg"}
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
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
                <span className={`text-[7px] font-medium tracking-[0.5em] uppercase leading-loose py-1 ${tierStyles.accent}`}>
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
            {profile.level === 'diamond' && (
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] font-black text-sm">
                D
              </div>
            )}
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

export default function RealProfiles({ filter, city, gender, ageRange }: RealProfilesProps) {
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
        const qVerified = query(usersRef, where("verificationStatus", "==", "approved"));
        const qIdVerified = query(usersRef, where("isIdVerified", "==", true));
        const qPending = query(usersRef, where("isListingPendingApproval", "==", true));

        // Belgeleri getir ve birleştir
        const [snapApproved, snapStatus, snapVerified, snapIdVerified, snapPending] = await Promise.all([
          getDocs(qApproved),
          getDocs(qStatusApproved),
          getDocs(qVerified),
          getDocs(qIdVerified),
          getDocs(qPending)
        ]).catch(err => {
          console.error("Firestore getDocs error:", err);
          return [ { docs: [] }, { docs: [] }, { docs: [] }, { docs: [] }, { docs: [] } ];
        });

        const allDocs = [
          ...snapApproved.docs,
          ...snapStatus.docs,
          ...snapVerified.docs,
          ...snapIdVerified.docs,
          ...snapPending.docs
        ];
        const uniqueDocsMap = new Map();
        allDocs.forEach(doc => uniqueDocsMap.set(doc.id, doc));
        const uniqueDocs = Array.from(uniqueDocsMap.values());

        console.log("Firestore'dan gelen toplam ham belge sayısı:", uniqueDocs.length);

        const loadedProfiles: UserProfile[] = uniqueDocs.map((doc) => {
          const raw = doc.data() || {};
          const nested = (raw.profile && typeof raw.profile === "object") ? raw.profile : {};

          // Android Parity: Root fields (raw) should have priority over nested 'profile' object
          const data = { ...nested, ...raw };

          const rStatus = String(raw.status || "").toLowerCase().trim();
          const nStatus = String(nested.status || "").toLowerCase().trim();
          const role = String(data.role || nested.role || "").toLowerCase();

          const rawVerified = data.isIdVerified ?? data.verified ?? data.isVerified ?? data.idVerified;
          const isVerified = rawVerified === true ||
                             String(rawVerified) === "true" ||
                             String(data.verificationStatus || "").toLowerCase() === "verified" ||
                             String(data.verificationStatus || "").toLowerCase() === "approved";

          // Android Parity: Listing approval and Identity verification are separate.
          // A user can be identity-verified but their listing might still be pending.
          // Listing must be explicitly approved (isApproved: true).
          const isApproved = raw.isApproved === true || String(raw.isApproved) === "true" ||
                            nested.isApproved === true || String(nested.isApproved) === "true";

          // Sadece açıkça false ise pasif say, undefined ise aktif kabul et (Android uyumu)
          // Müsaitlik durumu (isBusy) artık listelenmeyi engellemez.
          const isExplicitlyPassive = (raw.isActive === false || String(raw.isActive) === "false" ||
                                     data.isActive === false || String(data.isActive) === "false") &&
                                     !isVerified && !raw.isPendingApproval && !raw.isListingPendingApproval;

          // hasProfile alanı eksikse, profil verisi veya ismi varsa var kabul et
          const hasProfile = raw.hasProfile === true || String(raw.hasProfile) === "true" ||
                            data.hasProfile === true || String(data.hasProfile) === "true" ||
                            (data.name && data.bio) || (getImages(data).length > 0);

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
            isBusy: data.isBusy === true || String(data.isBusy) === "true" ||
                    data.isAvailableNow === false || String(data.isAvailableNow) === "false",
            isListingPendingApproval: raw.isListingPendingApproval === true || nested.isListingPendingApproval === true || data.isListingPendingApproval === true,
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
          // KESİN GÖRÜNME ŞARTLARI (CANLI VERİ MODELİNE GÖRE)
          if (p.isInvisible) return false;

          // Meşgul ilanları gösterme - Uygulama ile uyum için (Meşgul ise gizle)
          if (p.isBusy) return false;

          // KRİTİK: Onay bekleyen ilanları webde gizle
          if (p.isListingPendingApproval) return false;

          // 1. Şart: Yönetici (İlan) Onayı
          // Sadece kimlik onayı olması (isVerified) listelenmek için yeterli değildir.
          // İlanın ayrıca onaylanmış (isApproved) olması gerekir.
          if (!p.isApproved) return false;

          // 2. Şart: Kimlik Doğrulaması (Android tarafında tamamlanmış olmalı)
          // Web parity: Sadece kimliği doğrulanmış olanlar listelenir.
          if (!p.isVerified) return false;

          // 3. Şart: Uygulama Profili Tamlığı (Resim ve İsim)
          if (!p.name || p.name === "Gizli Üye" || p.images.length === 0) return false;

          // 4. Şart: Aktiflik ve Silinmemiş Olma
          if (!p.isActive) return false;

          // 5. Şart: Rol Kontrolü (Sadece companion ve türevleri)
          const validRoles = ['companion', 'provider', 'model', 'escort', 'refakatçi', 'refakatci', 'agent', 'agency'];
          // 'user' rolündekiler kesinlikle gösterilmez
          if (p.role === 'user') return false;
          // Rol boşsa veya geçerli rollerden biriyse göster
          const isCompanion = !p.role || p.role === "" || validRoles.some(r => p.role?.includes(r));
          if (!isCompanion) return false;

          return true;
        });


        let filtered = loadedProfiles;
        console.log("Filtreleme sonrasi ilan sayisi:", filtered.length);
        console.log("Loaded profiles (companion/model):", filtered.length);

        if (gender && gender !== "all") {
          const selectedGenders = Array.isArray(gender) ? gender : [gender];
          const searchGenders = selectedGenders.map(g => normalizeString(g));

          filtered = filtered.filter(p => {
            const userGender = normalizeString(p.gender || "");
            return searchGenders.some(searchGender => {
              if (searchGender === "kadin") return userGender === "kadin" || userGender === "bayan" || userGender === "female";
              if (searchGender === "erkek") return userGender === "erkek" || userGender === "bay" || userGender === "male";
              if (searchGender === "cift") return userGender === "cift" || userGender === "couple";
              return userGender === searchGender;
            });
          });
        }

        if (filter === "verifiedOnly") {
          filtered = filtered.filter(p => p.isVerified && p.isApproved);
        } else {
          // Android Parity: Hem onaylı hem de doğrulanmış olması gerekir.
          // Not: isOrange (onaylı ama doğrulanmamış) ilanlar Android parity gereği listelenmez.
          filtered = filtered.filter(p => p.isVerified && p.isApproved);
        }

        if (ageRange) {
          filtered = filtered.filter(p => {
            const age = parseInt(p.age || "0");
            if (!age) return true; // Yaş belirtilmemişse filtreye takılmasın (isteğe bağlı)
            return age >= ageRange.min && age <= ageRange.max;
          });
        }

        if (city !== "all") {
          const searchCityNormalized = normalizeString(city);
          filtered = filtered.filter(p => {
            const pCityNorm = normalizeString(p.city || "");
            const pDistrictNorm = normalizeString(p.district || "");

            // Tam eşleşme veya ilçe eşleşmesi
            const isCityMatch = pCityNorm === searchCityNormalized;
            const isDistrictMatch = pDistrictNorm === searchCityNormalized;

            // Özel durum: Alanya/Antalya ayrımı
            // Eğer aranan şehir antalya ise, sadece antalya olanları getir (alanya hariç)
            // Eğer aranan şehir alanya ise, sadece alanya olanları getir
            if (searchCityNormalized === "alanya") {
              return pCityNorm === "alanya" || pDistrictNorm.includes("alanya");
            }
            if (searchCityNormalized === "antalya") {
              // @ts-ignore - TS thinks searchCityNormalized is a constant string but it comes from props
              return pCityNorm === "antalya" && !pDistrictNorm.includes("alanya") && pCityNorm !== "alanya";
            }

            return isCityMatch || isDistrictMatch;
          });
        }

        // Tier-based shuffling logic
        const diamond = filtered.filter(p => p.level === 'diamond');
        const vip = filtered.filter(p => p.level === 'vip');
        const gold = filtered.filter(p => p.level === 'gold');

        setProfiles([...diamond, ...vip, ...gold]);
      } catch (err) {
        console.error("Firestore Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfiles();
  }, [filter, city, gender, ageRange]);

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
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="max-w-4xl space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-white/40 tracking-[0.4em] uppercase">PLATİN SEÇKİSİ</span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-white tracking-tight leading-tight">
              {city === "all" ? "TÜRKİYE" : city.toUpperCase()}{" "}
              <span className="text-white/20 italic font-light">EDİTÖRYEL</span>
            </h2>
            <p className="text-xs text-white/40 font-medium max-w-xl leading-relaxed">
              Küratörlerimiz tarafından seçilen en prestijli profiller.
            </p>
          </div>

          <div className="flex flex-col">
            <a
              href="https://play.google.com/store/apps/details?id=com.kiraliksevgili.kiralik_sevgili"
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
            <h2 className="flex items-center gap-2 text-[10px] font-medium text-[#d4af37] tracking-[0.5em] uppercase whitespace-nowrap leading-loose py-1">
              <span className="flex items-center justify-center w-5 h-5 rounded-md bg-[#d4af37]/20 text-[10px] font-black tracking-normal">D</span>
              DİAMOND İLAN
            </h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#d4af37]/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            <h2 className="text-[10px] font-medium text-blue-400 tracking-[0.5em] uppercase whitespace-nowrap leading-loose py-1">VİP İLAN</h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-blue-400/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {profiles.filter(p => p.level === 'vip').map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </section>
      )}

      {/* STANDART SECTION */}
      {profiles.filter(p => p.level === 'gold').length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-[10px] font-medium text-emerald-400 tracking-[0.5em] uppercase whitespace-nowrap leading-loose py-1">STANDART İLAN</h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-emerald-400/50 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {profiles.filter(p => p.level === 'gold').map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
