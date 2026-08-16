"use client";

import { useEffect, useState, useRef } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useParams, useRouter } from "next/navigation";
import { db, auth, storage } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

type Profile = {
  id: string;
  name: string;
  name2?: string;
  age: string;
  age2?: string;
  gender: string;
  city: string;
  district: string;
  bio: string;
  description: string;
  photos: string[];
  isVerified: boolean;
  isElite: boolean;
  meetingCount: number;
  prices: {
    hourly?: string;
    daily?: string;
    weekly?: string;
    general?: string;
  };
  details: Record<string, any>;
};

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : "";

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid === id) setIsOwner(true);
      else setIsOwner(false);
    });
    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    async function loadProfile() {
      if (!id) return;
      try {
        const docRef = doc(db, "users", id);
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()) {
          setLoading(false);
          return;
        }

        const raw = snapshot.data();

        // GÜVENLİK: Kimlik doğrulaması sadece ana dökümanda (root) varsa kabul edilir.
        const isVerified = raw.isIdVerified === true;

        const nested = raw.profile && typeof raw.profile === "object" ? raw.profile : {};
        const data = { ...raw, ...nested };

        const meetingCount = Number(data.meetingCount || 0);
        const isElite = isVerified && (data.isElite === true || meetingCount > 0);

        const prices = {
          hourly: data.hourlyPrice || data.saatlikFiyat,
          daily: data.dailyPrice || data.gunlukFiyat,
          general: data.price || data.ucret
        };

        let photos: string[] = [];
        if (Array.isArray(data.photoUrls)) photos = data.photoUrls;
        else if (Array.isArray(data.photos)) photos = data.photos;

        const mainPhoto = data.profileImageUrl || data.photoUrl || data.image;
        if (mainPhoto && !photos.includes(mainPhoto)) photos.unshift(mainPhoto);

        setProfile({
          id,
          name: data.name || data.displayName || "Kullanıcı",
          name2: data.name2 || data.displayName2,
          age: String(data.age || ""),
          age2: data.age2 ? String(data.age2) : undefined,
          gender: data.gender || data.cinsiyet || "Belirtilmemiş",
          city: data.city || data.sehir || "Türkiye",
          district: data.district || data.ilce || "",
          bio: data.bio || "",
          description: data.description || data.hakkinda || "",
          photos: photos.filter(p => typeof p === "string"),
          isVerified,
          isElite,
          meetingCount,
          prices: {
            hourly: data.price || data.hourlyPrice || data.saatlikFiyat,
            daily: data.priceDaily || data.dailyPrice || data.gunlukFiyat,
            weekly: data.priceWeekly || data.weeklyPrice || data.haftalikFiyat,
            general: data.price || data.ucret
          },
          details: data
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [id]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    try {
      setUploading(true);
      const sRef = storageRef(storage, `users/${id}/photos/${Date.now()}_${file.name}`);
      await uploadBytes(sRef, file);
      const url = await getDownloadURL(sRef);

      const newPhotos = [...profile.photos, url];
      await updateDoc(doc(db, "users", id), {
        photoUrls: newPhotos,
        profileImageUrl: newPhotos[0]
      });

      setProfile({ ...profile, photos: newPhotos });
    } catch (err) {
      alert("Yükleme başarısız.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-black text-white">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#ff2d55] border-t-transparent"></div>
  </div>;

  if (!profile) return <div className="flex min-h-screen items-center justify-center bg-black text-white">Profil bulunamadı.</div>;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#ff2d55]/30">
      {/* Header */}
      <header className="border-b border-[#1a1a1a] bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl flex justify-between items-center px-6 py-5">
          <button onClick={() => router.back()} className="text-xs font-black text-[#ff2d55] uppercase tracking-[0.2em] transition hover:opacity-70">
            ← Geri Dön
          </button>
          <span className="font-black text-xl uppercase tracking-tighter">
            Kiralık <span className="premium-gradient-text">Sevgili</span>
          </span>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-20">
        <div className="grid gap-16 lg:grid-cols-12">

          {/* Sol: Medya */}
          <div className="lg:col-span-5 space-y-8">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-[3.5rem] bg-[#0a0a0a] border border-[#1a1a1a] shadow-2xl shadow-pink-500/5">
              {profile.photos.length > 0 ? (
                <img src={profile.photos[0]} className="h-full w-full object-cover transition duration-1000 group-hover:scale-110" alt={profile.name} />
              ) : (
                <div className="flex h-full items-center justify-center text-8xl opacity-10">👤</div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {profile.photos.slice(1).map((url, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl border border-[#1a1a1a] transition hover:border-[#ff2d55]">
                  <img src={url} className="h-full w-full object-cover" alt="" />
                </div>
              ))}
              {isOwner && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-[#1a1a1a] bg-[#0a0a0a] text-[#ff2d55] transition hover:bg-[#111] hover:border-[#ff2d55]"
                >
                  {uploading ? "..." : "+"}
                </button>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
          </div>

          {/* Sağ: Detaylar */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-4">
              {profile.isElite ? (
                <span className="rounded-full bg-[#00B2FF] px-5 py-2 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(0,178,255,0.3)]">
                  ✓ ONAYLI
                </span>
              ) : profile.isVerified ? (
                <span className="rounded-full bg-[#4CAF50] px-5 py-2 text-[10px] font-black uppercase tracking-widest text-white">
                  ✓ ONAYLI
                </span>
              ) : (
                <span className="rounded-full bg-orange-500 px-5 py-2 text-[10px] font-black uppercase tracking-widest text-white">
                  ! ONAYSIZ
                </span>
              )}
              <span className="ml-auto text-[10px] font-bold text-gray-700 uppercase tracking-widest">
                Kayıt: {profile.id.slice(-6).toUpperCase()}
              </span>
            </div>

            <h1 className="mt-8 text-7xl font-black tracking-tighter">
              {profile.gender?.toLowerCase() === "çift" || profile.gender?.toLowerCase() === "couple" ? (
                `${profile.name?.[0] || "?"}. & ${profile.name2?.[0] || "?"}.`
              ) : (
                `${profile.name?.[0] || "?"}...`
              )}
              {profile.age ? `, ${profile.age}` : ""}
              {profile.age2 ? ` & ${profile.age2}` : ""}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-2xl font-bold text-[#ff2d55]">
                <span>📍</span>
                <span className="uppercase tracking-tight">{profile.city} {profile.district && `• ${profile.district}`}</span>
              </div>

              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                profile.gender?.toLowerCase() === 'erkek' || profile.gender?.toLowerCase() === 'male'
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-500'
                  : profile.gender?.toLowerCase() === 'kadın' || profile.gender?.toLowerCase() === 'female'
                  ? 'bg-pink-500/10 border-pink-500/30 text-pink-500'
                  : 'bg-purple-500/10 border-purple-500/30 text-purple-500'
              }`}>
                {profile.gender === "Kadın" ? "Kadın ♀️" : profile.gender === "Erkek" ? "Erkek ♂️" : "Çift 👥"}
              </div>
            </div>

            {/* Fiyat Kartları */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
              {profile.prices.hourly && (
                <div className="rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] p-10 hover:border-[#ff2d55]/30 transition-colors">
                  <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Saatlik</h4>
                  <p className="mt-3 text-4xl font-black text-white">₺{profile.prices.hourly}</p>
                </div>
              )}
              {profile.prices.daily && (
                <div className="rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] p-10 hover:border-[#ff2d55]/30 transition-colors">
                  <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Günlük</h4>
                  <p className="mt-3 text-4xl font-black text-white">₺{profile.prices.daily}</p>
                </div>
              )}
              {profile.prices.weekly && (
                <div className="rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] p-10 hover:border-[#ff2d55]/30 transition-colors">
                  <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Haftalık</h4>
                  <p className="mt-3 text-4xl font-black text-white">₺{profile.prices.weekly}</p>
                </div>
              )}
            </div>

            <div className="mt-12 space-y-12">
              <section>
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#ff2d55]/60">Hakkında</h3>
                <p className="mt-6 text-xl text-gray-400 font-medium leading-relaxed italic">
                  "{profile.bio || "Kendini henüz tanıtmadı."}"
                </p>
              </section>

              {profile.description && (
                <section>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#ff2d55]/60">Detaylar</h3>
                  <div className="mt-6 p-10 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] text-gray-300 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                    {profile.description}
                  </div>
                </section>
              )}
            </div>

            <div className="mt-auto pt-16">
              <button className="w-full rounded-full bg-[#ff2d55] py-8 text-xl font-black uppercase tracking-[0.2em] text-white shadow-[0_20px_50px_rgba(255,45,85,0.2)] transition hover:scale-[1.02] hover:bg-[#ff3d65] active:scale-[0.98]">
                MESAJ GÖNDER & ARA
              </button>
              <p className="mt-6 text-center text-[10px] font-bold text-gray-700 uppercase tracking-[0.3em]">
                GÜVENLİĞİNİZ İÇİN TÜM GÖRÜŞMELERİ KAYDEDİNİZ.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
