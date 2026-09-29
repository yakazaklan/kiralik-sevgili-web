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
  role?: string;
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
  const isElite = profile.isElite;
  const genderNorm = normalizeString(profile.gender || "");

  const isMale = genderNorm === "erkek" || genderNorm === "bay" || genderNorm === "male";
  const isCouple = genderNorm === "cift" || genderNorm === "couple" || genderNorm.includes("cift");

  let themeClass = "bg-pink-500/20 border-pink-500/40 text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]";
  let genderIcon = "♀";

  if (isMale) {
    themeClass = "bg-blue-500/20 border-blue-500/40 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]";
    genderIcon = "♂";
  } else if (isCouple) {
    themeClass = "bg-yellow-500/20 border-yellow-500/40 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]";
    genderIcon = "⚤";
  }

  const borderColor = isElite
    ? (isCouple ? 'border-yellow-500/40' : 'border-[#d4af37]/40')
    : 'border-white/5';

  return (
    <Link
      href={`/profil/${profile.id}`}
      className={`group relative flex flex-row h-[180px] md:h-[220px] w-full overflow-hidden rounded-2xl bg-[#0d0d0d] border ${borderColor} transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-[#d4af37]/60 hover:-translate-y-1`}
    >
      {/* Cinsiyet Badge - Sağ Üst */}
      <div className={`absolute top-3 right-3 z-30 w-8 h-8 rounded-xl flex items-center justify-center border backdrop-blur-md transition-all duration-300 group-hover:scale-110 ${themeClass}`}>
        <span className="text-lg leading-none font-bold">{genderIcon}</span>
      </div>

      {/* Resim Alanı - Premium Çoklu Fotoğraf Düzeni */}
      <div className="relative w-[150px] md:w-[200px] shrink-0 overflow-hidden bg-black flex gap-0.5">
        {profile.images.length > 0 ? (
          <>
            <div className={`relative h-full ${profile.images.length > 1 ? 'w-2/3' : 'w-full'} overflow-hidden`}>
              <img
                src={profile.images[0]}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              {/* Premium Efekti */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
            </div>
            {profile.images.length > 1 && (
              <div className="flex flex-col gap-0.5 w-1/3 h-full">
                {profile.images.slice(1, 3).map((img, idx) => (
                  <div key={idx} className="relative flex-1 overflow-hidden">
                    <img
                      src={img}
                      alt={`${profile.name}-${idx}`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                ))}
                {profile.images.length === 2 && (
                  <div className="flex-1 bg-[#111] flex items-center justify-center border-t border-white/5">
                    <span className="text-[10px] font-black text-gray-700 tracking-tighter">GALLERY</span>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl opacity-20 bg-[#111]">👤</div>
        )}

        {/* Rozetler */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isElite ? (
            <div className={`backdrop-blur-md bg-black/60 border ${isCouple ? 'border-yellow-500/50' : 'border-[#d4af37]/50'} px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-lg`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isCouple ? 'bg-yellow-500' : 'bg-[#d4af37]'} animate-pulse`}></span>
              <span className={`text-[8px] font-black uppercase tracking-widest ${isCouple ? 'text-yellow-500' : 'text-[#d4af37]'}`}>PREMIUM ELITE</span>
            </div>
          ) : profile.isVerified ? (
            <div className="backdrop-blur-md bg-black/60 border border-green-500/50 px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[8px] font-black uppercase tracking-widest text-green-500">ONAYLI</span>
            </div>
          ) : profile.isOrange ? (
            <div className="backdrop-blur-md bg-black/60 border border-orange-500/50 px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[8px] font-black uppercase tracking-widest text-orange-500">ONAYLI</span>
            </div>
          ) : null}
        </div>

        {/* Fiyat Bilgisi */}
        <div className="absolute bottom-3 left-3 z-10">
          {profile.price && (
            <div className={`backdrop-blur-md bg-black/80 border border-white/10 px-2.5 py-1 rounded-lg shadow-xl`}>
              <span className="text-xs font-black tracking-tight text-white">₺{profile.price}</span>
            </div>
          )}
        </div>

        {/* Fotoğraf Gradyanı */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0d0d0d]/40 pointer-events-none"></div>
      </div>

      {/* Bilgi Alanı */}
      <div className="flex flex-col flex-1 p-4 md:p-6 justify-between relative min-w-0">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#d4af37] transition-colors duration-300 uppercase truncate leading-tight">
                  {profile.name ? `${profile.name[0]}.***` : 'Kullanıcı'}
                  {isCouple && profile.name2 && (
                    <span className="text-white/40 ml-2 text-sm font-medium">& {profile.name2[0]}.***</span>
                  )}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {profile.age} Yaş {isCouple && profile.age2 && `& ${profile.age2} Yaş`}
                  </span>
                  {profile.isActive && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                      <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-[7px] font-black text-green-500 uppercase">AKTİF</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.1em] mt-2">
                <span className="mr-1.5">📍</span>
                <span className="truncate">
                  {profile.district ? `${profile.district.toUpperCase()} • ` : ""}
                  {profile.city?.toUpperCase() || "TÜRKİYE"}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-gray-400 font-medium italic line-clamp-2 mt-2 border-l-2 border-[#d4af37]/20 pl-3">
            "{profile.bio}"
          </p>
        </div>

        {/* Alt Kısım */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-4">
            <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">{profile.meetingCount > 0 ? `${profile.meetingCount}+ BULUŞMA` : 'YENİ İLAN'}</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-black text-white group-hover:text-[#d4af37] transition-all duration-300 uppercase tracking-[0.2em]">
            <span>PROFİLİ GÖR</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>

        {/* Premium Parlama Efekti */}
        {isElite && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
        )}
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
        console.log("RealProfiles: Loading profiles for city:", city);
        const usersRef = collection(db, "users");

        // Daha esnek sorgu: Onaylı tüm ilanları getir
        const q = query(
          usersRef
        );

        const snapshot = await getDocs(q);
        console.log(`RealProfiles: Firestore returned ${snapshot.size} docs`);

        const loadedProfiles: UserProfile[] = snapshot.docs.map((doc) => {
          const raw = doc.data() || {};
          const nested = (raw.profile && typeof raw.profile === "object") ? raw.profile : {};
          const data = { ...raw, ...nested };

          const rStatus = String(raw.status || "").toLowerCase().trim();
          const nStatus = String(nested.status || "").toLowerCase().trim();
          const vStatus = String(raw.verificationStatus || "").toLowerCase().trim();

          const hasApprovedStatus = (rStatus === "approved" || nStatus === "approved" || vStatus === "approved" || rStatus === "active" || nStatus === "active");
          const hasApprovedFlag = (raw.isApproved === true || String(raw.isApproved) === "true" || nested.isApproved === true || String(nested.isApproved) === "true" || hasApprovedStatus);
          const isBlacklisted =
            ["rejected", "blocked", "banned"].includes(rStatus) ||
            ["rejected", "blocked", "banned"].includes(nStatus);

          const finalApproved = (hasApprovedFlag || data.hasProfile === true) && !isBlacklisted;

          const rawVerified = data.isIdVerified ?? data.verified ?? data.isVerified ?? data.idVerified;
          const isVerified = rawVerified === true || String(rawVerified) === "true" || String(data.verificationStatus).toLowerCase() === "verified";
          const meetingCount = Number(data.meetingCount || 0);

          const isElite = finalApproved && isVerified && meetingCount >= 5;
          const isOrange = finalApproved && !isVerified;

          const isActive = data.isActive === true || String(data.isActive) === "true" || data.status === "active";
          const role = String(data.role || "").toLowerCase();
          const images = getImages(data);

          return {
            id: doc.id,
            name: data.name || data.displayName || "Kullanıcı",
            name2: data.name2 || data.displayName2,
            age: data.age ? String(data.age) : "",
            age2: data.age2 ? String(data.age2) : undefined,
            city: data.city || data.sehir || "Türkiye",
            district: data.district || data.ilce || "",
            bio: data.bio || data.description || "Sosyal refakat ilanı.",
            images: images,
            isVerified,
            isElite,
            isOrange,
            isActive: isActive,
            isApproved: finalApproved,
            meetingCount,
            price: data.price || data.hourlyPrice || data.saatlikFiyat,
            priceDaily: data.priceDaily || data.dailyPrice || data.gunlukFiyat,
            priceWeekly: data.priceWeekly || data.weeklyPrice || data.haftalikFiyat,
            gender: data.gender || data.cinsiyet || "Belirtilmemiş",
            role: role
          };
        }).filter(p => {
          if (!p.isApproved && !p.isElite && !p.isVerified && !p.isOrange) return false;
          const role = p.role || "";
          return role === "" || role === "companion" || role === "refakatci" || role === "user" || role === "member";
        });

        console.log(`RealProfiles: ${loadedProfiles.length} profiles passed basic filters`);

        let filtered = loadedProfiles;

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
        if (filter === "verified") filtered = filtered.filter(p => p.isVerified || p.isOrange);

        if (city !== "all") {
          const searchCityNormalized = normalizeString(city);
          filtered = filtered.filter(p => {
            const pCityNorm = normalizeString(p.city || "");
            const pDistrictNorm = normalizeString(p.district || "");

            // Alanya-Antalya geçişkenliğini artır
            if (searchCityNormalized === "alanya") {
              return pCityNorm === "alanya" || pDistrictNorm === "alanya" || pDistrictNorm.includes("alanya");
            }
            if (searchCityNormalized === "antalya") {
              return pCityNorm === "antalya" || pDistrictNorm === "antalya" || pCityNorm === "alanya" || pDistrictNorm === "alanya";
            }
            return pCityNorm === searchCityNormalized || pDistrictNorm === searchCityNormalized;
          });
        }

        filtered.sort((a, b) => {
          // Sıralama: Mavi (Elite) > Yeşil (Verified) > Turuncu (Orange)
          const getWeight = (p: UserProfile) => {
            if (p.isElite) return 3;
            if (p.isVerified) return 2;
            if (p.isOrange) return 1;
            return 0;
          };
          return getWeight(b) - getWeight(a);
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
      <p className="mt-4 text-[10px] font-black text-gray-500 uppercase tracking-widest animate-pulse">Profil Bilgileri Yükleniyor...</p>
    </div>
  );

  if (profiles.length === 0) return (
    <div className="py-20 text-center space-y-6 px-6 bg-[#0a0a0a] rounded-[2.5rem] border border-[#1a1a1a]">
      <div className="text-gray-500 font-bold uppercase tracking-widest text-xs">
        {city !== "all" ? `${city.toUpperCase()} bölgesinde` : "Bu kategoride"} henüz aktif ilan bulunmuyor.
      </div>
    </div>
  );

  return (
    <div className="space-y-12 w-full px-4">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-5 rounded-[2rem] bg-[#0a0a0a] border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.4)]"></div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            {city === "all" ? "TÜRKİYE GENELİ" : city.toUpperCase()} ÖZEL SEÇİLMİŞ PROFİLLER
          </p>
        </div>
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 text-[9px] font-black text-black bg-[#d4af37] px-6 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest shadow-lg shadow-[#d4af37]/20"
        >
          APP STORE & GOOGLE PLAY
        </a>
      </div>

      {/* İLAN LİSTELEME ALANI - 2 SÜTUN YATAY PREMİUM DÜZEN */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-[10px] font-black text-[#d4af37] tracking-[0.4em] uppercase whitespace-nowrap">SEÇKİN İLANLAR</h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-[#d4af37]/30 via-[#d4af37]/10 to-transparent"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
}

