"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

type UserProfile = {
  id: string;
  name: string;
  age?: string;
  city?: string;
  district?: string;
  bio?: string;
  image?: string;
  isVerified: boolean;
  isElite: boolean;
  meetingCount: number;
  hourlyPrice?: string;
  dailyPrice?: string;
};

interface RealProfilesProps {
  filter: string;
  city: string;
}

function getImage(data: any): string | undefined {
  // Tüm olası ana resim alanlarını kontrol et (URL olabilecek tüm isimler)
  const mainImage = data.profileImageUrl || data.photoUrl || data.photoURL || data.profileImage || data.image || data.photo;
  if (mainImage && typeof mainImage === 'string' && mainImage.startsWith('http')) return mainImage;

  // Eğer ana resim yoksa listelerden al (photoUrls veya photos dizisi)
  const list = data.photoUrls || data.photos;
  if (Array.isArray(list) && list.length > 0) {
    const first = list.find(item => typeof item === 'string' && item.startsWith('http'));
    if (first) return first;
  }

  return undefined;
}


export default function RealProfiles({ filter, city }: RealProfilesProps) {
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
          const image = getImage(data);

          return {
            id: doc.id,
            name: data.name || data.displayName || "Kullanıcı",
            age: data.age ? String(data.age) : "",
            city: data.city || data.sehir || "Türkiye",
            district: data.district || data.ilce || "",
            bio: data.bio || data.description || "Sosyal arkadaşlık ilanı.",
            image: image,
            isVerified,
            isElite,
            meetingCount,
            hourlyPrice: data.hourlyPrice || data.saatlikFiyat,
            dailyPrice: data.dailyPrice || data.gunlukFiyat
          };
        });

        let filtered = loadedProfiles;
        if (filter === "elite") filtered = filtered.filter(p => p.isElite);
        else if (filter === "verified") filtered = filtered.filter(p => p.isVerified);

        if (city !== "all") {
          const searchCity = city.toLowerCase();
          filtered = filtered.filter(p =>
            p.city?.toLowerCase().includes(searchCity) ||
            p.district?.toLowerCase().includes(searchCity)
          );
        }

        setProfiles(filtered);
      } catch (err) {
        console.error("Firestore Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProfiles();
  }, [filter, city]);

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
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* List Başı SEO Notu */}
      <div className="px-6 py-4 rounded-3xl bg-[#0a0a0a] border border-[#1a1a1a] text-center">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          {city === "Alanya" ? "Alanya Sosyal Refakatçi ve Etkinlik Arkadaşı İlanları" : "Türkiye Geneli VİP Sosyal Refakat İlanları"}
          <span className="mx-3 opacity-20">|</span>
          <span className="text-[#ff2d55]/80 underline decoration-dotted">Kesinlikle Eskort Sitesi Değildir</span>
        </p>
      </div>

      {profiles.map((profile) => (
        <Link
          href={`/profil/${profile.id}`}
          key={profile.id}
          className="premium-card group flex flex-col md:flex-row overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] transition-all hover:border-[#ff2d55]/50 hover:shadow-2xl hover:shadow-pink-500/5"
        >
          {/* Sol: Resim */}
          <div className="relative h-72 w-full md:h-auto md:w-72 shrink-0 overflow-hidden bg-[#050505]">
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl opacity-10">👤</div>
            )}

            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {profile.isElite ? (
                <span className="rounded-full bg-[#00B2FF] px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                  ONAYLI
                </span>
              ) : profile.isVerified ? (
                <span className="rounded-full bg-[#4CAF50] px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                  ONAYLI
                </span>
              ) : (
                <span className="rounded-full bg-orange-500 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                  ONAYSIZ
                </span>
              )}
            </div>
          </div>

          {/* Sağ: Detaylar */}
          <div className="flex flex-1 flex-col p-8 md:p-10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-3xl font-black text-white group-hover:text-[#ff2d55] transition-colors leading-none tracking-tighter">
                  {profile.name}{profile.age ? `, ${profile.age}` : ""}
                </h3>
                <div className="mt-3 flex items-center text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                  <span className="mr-2 text-base">📍</span> {profile.city} {profile.district && `• ${profile.district}`}
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                {profile.hourlyPrice && (
                  <div className="text-right">
                    <span className="text-2xl font-black text-white tracking-tighter">{profile.hourlyPrice}</span>
                    <span className="ml-1 text-[9px] font-black text-gray-600 uppercase tracking-tighter">/ Saat</span>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-6 line-clamp-2 text-base leading-relaxed text-gray-400 font-medium italic">
              "{profile.bio}"
            </p>

            <div className="mt-auto pt-10 flex items-center justify-between border-t border-[#1a1a1a]/50">
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.3em]">Referans</span>
                  <span className="text-sm font-black text-white">{profile.meetingCount} Randevu</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-gray-600 uppercase tracking-[0.3em]">Güvenlik</span>
                  <span className={`text-sm font-black flex items-center gap-1 ${
                    profile.isElite ? 'text-[#00B2FF]' :
                    profile.isVerified ? 'text-[#4CAF50]' : 'text-orange-500'
                  }`}>
                    <span className="text-xs">verified</span>
                    {profile.isVerified ? 'ONAYLI' : 'ONAYSIZ'}
                  </span>
                </div>
              </div>

              <div className="rounded-full bg-[#1a1a1a] px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all group-hover:bg-[#ff2d55] group-hover:scale-105 active:scale-95">
                DETAYLAR
              </div>
            </div>
          </div>
        </Link>
      ))}

      {/* Alt SEO Metni */}
      <div className="mt-12 p-10 rounded-[2.5rem] bg-[#050505] border border-[#1a1a1a] text-center">
        <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] mb-4">Türkiye ve Alanya Sosyal Arkadaşlık Platformu</h4>
        <p className="text-xs text-gray-600 leading-loose font-medium">
          Platformumuz, Alanya dahil Türkiye genelinde sosyal etkinliklerinize prestij katacak gerçek kişilerle tanışmanızı hedefler.
          Tekrar önemle belirtmek isteriz ki; burası bir <strong>Alanya eskort</strong> sayfası değildir.
          Eskort, cinsel içerikli hizmet veya benzeri yasa dışı talepler platform kurallarımız gereği kesinlikle yasaktır ve hesap kapatma sebebidir.
          Güvenli, seviyeli ve elit bir sosyal refakat deneyimi için Kiralık Sevgili her zaman yanınızda.
        </p>
      </div>
    </div>
  );
}
