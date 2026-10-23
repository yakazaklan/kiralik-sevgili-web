"use client";

import React, { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CITIES, TURKEY_DATA } from '@/lib/turkey-zones';

export default function ProfilDuzenlePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Bildirim Ayarları
  const [canAcceptVoiceCall, setCanAcceptVoiceCall] = useState(true);
  const [canAcceptVideoCall, setCanAcceptVideoCall] = useState(true);

  // Profil Bilgileri
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("kadin");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const nested = data.profile || {};
          const combined = { ...data, ...nested };

          setCanAcceptVoiceCall(combined.canAcceptVoiceCall !== false);
          setCanAcceptVideoCall(combined.canAcceptVideoCall !== false);
          setName(combined.name || combined.displayName || "");
          setAge(combined.age ? String(combined.age) : "");
          setBio(combined.bio || combined.description || "");
          setGender(combined.gender || combined.cinsiyet || "kadin");
          setCity(combined.city || combined.sehir || "");
          setDistrict(combined.district || combined.ilce || "");

          const busyStatus = combined.isBusy === true || combined.isBusy === "true" ||
                             combined.isAvailableNow === false || combined.isAvailableNow === "false";
          setIsBusy(busyStatus);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const isAvailableNow = !isBusy;
      const docRef = doc(db, 'users', user.uid);

      // Get current profile data to check approval status
      const docSnap = await getDoc(docRef);
      const currentData = docSnap.exists() ? docSnap.data() : {};

      // If not already approved, set status to pending for review
      const isApproved = currentData.isApproved === true || currentData.isApproved === "true" || currentData.status === "approved";

      const updateData: any = {
        name,
        age,
        bio,
        gender,
        city,
        district,
        isBusy,
        isAvailableNow,
        canAcceptVoiceCall,
        canAcceptVideoCall,
        profile: {
          name,
          age,
          bio,
          gender,
          city,
          district,
          isBusy,
          isAvailableNow,
          canAcceptVoiceCall,
          canAcceptVideoCall
        }
      };

      // If not approved, trigger the approval flow like the mobile app
      if (!isApproved) {
        updateData.status = 'pending';
        updateData.isListingPendingApproval = true;
        updateData.profile.status = 'pending';
        updateData.profile.isListingPendingApproval = true;
      }

      await updateDoc(docRef, updateData);
      alert("Profil güncellendi. Onaylanmış profiliniz yoksa incelemeye alınacaktır.");
      router.push('/profil');
    } catch (error) {
      console.error("Update error:", error);
      alert("Güncelleme sırasında bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-40 bg-black min-h-screen">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 bg-black min-h-screen text-white">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/profil" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#222] transition-all text-gray-400">
          ←
        </Link>
        <h1 className="text-2xl font-black uppercase tracking-tighter">PROFİLİ DÜZENLE</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* TEMEL BİLGİLER */}
        <div className="p-6 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] space-y-6">
          <h2 className="text-[11px] font-black text-[#d4af37] uppercase tracking-[0.2em] flex items-center gap-2">
            <span>✨</span> TEMEL BİLGİLER
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">ADINIZ</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#111] border border-[#1a1a1a] rounded-2xl p-4 text-sm focus:border-[#d4af37]/50 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">YAŞ</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-[#111] border border-[#1a1a1a] rounded-2xl p-4 text-sm focus:border-[#d4af37]/50 outline-none transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">ŞEHİR</label>
              <div className="relative">
                <select
                  value={city}
                  onChange={(e) => { setCity(e.target.value); setDistrict(""); }}
                  className="w-full bg-[#111] border border-[#1a1a1a] rounded-2xl p-4 text-sm focus:border-[#d4af37]/50 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Şehir Seçin</option>
                  {CITIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-600">
                  <span className="text-[10px]">▼</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">İLÇE</label>
              <div className="relative">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={!city}
                  className="w-full bg-[#111] border border-[#1a1a1a] rounded-2xl p-4 text-sm focus:border-[#d4af37]/50 outline-none transition-all appearance-none cursor-pointer disabled:opacity-30"
                >
                  <option value="">İlçe Seçin</option>
                  {city && TURKEY_DATA[city]?.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-600">
                  <span className="text-[10px]">▼</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">HAKKINDA (BİO)</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Kendinizden bahsedin..."
              className="w-full bg-[#111] border border-[#1a1a1a] rounded-2xl p-4 text-sm focus:border-[#d4af37]/50 outline-none transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">CİNSİYET</label>
            <div className="flex gap-2">
              {['kadin', 'erkek', 'cift'].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    gender === g
                    ? (g === 'kadin' ? 'bg-pink-500/10 border-pink-500/50 text-pink-500' : g === 'erkek' ? 'bg-blue-500/10 border-blue-500/50 text-blue-500' : 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500')
                    : 'bg-[#111] border-[#1a1a1a] text-gray-600'
                  }`}
                >
                  {g === 'kadin' ? 'KADIN' : g === 'erkek' ? 'ERKEK' : 'ÇİFT'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ARAMA BİLDİRİMLERİ */}
        <div className="p-6 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] space-y-4">
          <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2 opacity-60">
            <span>🔔</span> ARAMA BİLDİRİMLERİ
          </h2>

          <div className="space-y-3">
            {/* Müsaitlik Durumu Switch */}
            <div className="flex items-center justify-between p-4 bg-[#0d0d0d] rounded-[1.8rem] border border-[#1a1a1a] hover:border-[#222] transition-all">
              <div>
                <span className="block text-[11px] font-bold text-white uppercase tracking-wider mb-0.5">Müsaitlik Durumu</span>
                <span className="block text-[9px] text-gray-600 uppercase font-medium">
                  {isBusy ? 'ŞU AN MEŞGULÜM' : 'ŞU AN MÜSAİTİM'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsBusy(!isBusy)}
                className={`w-7 h-3.5 rounded-full relative transition-all duration-500 ease-in-out ${
                  !isBusy
                    ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)]'
                    : 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                }`}
              >
                <div className={`absolute top-[3px] w-2 h-2 bg-white rounded-full transition-all duration-300 shadow-sm ${!isBusy ? 'left-[17px]' : 'left-[3px]'}`}></div>
              </button>
            </div>

            {/* Sesli Arama Switch */}
            <div className="flex items-center justify-between p-4 bg-[#0d0d0d] rounded-[1.8rem] border border-[#1a1a1a] hover:border-[#222] transition-all">
              <div>
                <span className="block text-[11px] font-bold text-white uppercase tracking-wider mb-0.5">Sesli Arama Bildirimleri</span>
                <span className="block text-[9px] text-gray-600 uppercase font-medium">Gelen, giden ve cevapsız aramalar</span>
              </div>
              <button
                type="button"
                onClick={() => setCanAcceptVoiceCall(!canAcceptVoiceCall)}
                className={`w-7 h-3.5 rounded-full relative transition-all duration-500 ease-in-out ${
                  canAcceptVoiceCall
                    ? (gender === 'kadin' ? 'bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.4)]' : gender === 'erkek' ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.4)]' : 'bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.4)]')
                    : 'bg-[#222]'
                }`}
              >
                <div className={`absolute top-[3px] w-2 h-2 bg-white rounded-full transition-all duration-300 shadow-sm ${canAcceptVoiceCall ? 'left-[17px]' : 'left-[3px]'}`}></div>
              </button>
            </div>

            {/* Görüntülü Arama Switch */}
            <div className="flex items-center justify-between p-4 bg-[#0d0d0d] rounded-[1.8rem] border border-[#1a1a1a] hover:border-[#222] transition-all">
              <div>
                <span className="block text-[11px] font-bold text-white uppercase tracking-wider mb-0.5">Görüntülü Arama Bildirimleri</span>
                <span className="block text-[9px] text-gray-600 uppercase font-medium">Gelen, giden ve cevapsız aramalar</span>
              </div>
              <button
                type="button"
                onClick={() => setCanAcceptVideoCall(!canAcceptVideoCall)}
                className={`w-7 h-3.5 rounded-full relative transition-all duration-500 ease-in-out ${
                  canAcceptVideoCall
                    ? (gender === 'kadin' ? 'bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.4)]' : gender === 'erkek' ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.4)]' : 'bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.4)]')
                    : 'bg-[#222]'
                }`}
              >
                <div className={`absolute top-[3px] w-2 h-2 bg-white rounded-full transition-all duration-300 shadow-sm ${canAcceptVideoCall ? 'left-[17px]' : 'left-[3px]'}`}></div>
              </button>
            </div>
          </div>

          {/* HESAP SİLME BÖLÜMÜ */}
          <div className="pt-6 !mt-2 border-t border-white/5">
            <div className="mb-4 bg-red-600/10 p-5 rounded-2xl border border-red-600/20 shadow-[0_0_20px_rgba(220,38,38,0.05)]">
              <span className="block text-[10px] font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                DİKKAT: KRİTİK İŞLEM
              </span>
              <p className="text-[12px] text-white font-bold leading-relaxed">
                Hesabınızı sildiğinizde tüm verileriniz <span className="text-red-500 font-black underline decoration-red-500/50 underline-offset-4">KALICI OLARAK</span> yok edilecektir.
              </p>
              <p className="text-[9px] text-white/40 mt-2 uppercase font-bold tracking-tight">
                Geri dönüşü olmayan bir işlemdir. Bakiyeniz ve mesajlarınız kalıcı olarak silinir.
              </p>
            </div>
            <Link
              href="/hesap-silme"
              className="flex items-center justify-between p-4 bg-red-600/10 border-2 border-red-600/20 rounded-[1.8rem] hover:bg-red-600/20 hover:border-red-600/50 transition-all group shadow-lg shadow-red-900/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  🗑️
                </div>
                <div>
                  <h3 className="text-[12px] font-black text-white uppercase tracking-tight group-hover:text-red-400 transition-colors">HESABI KALICI OLARAK SİL</h3>
                  <p className="text-[9px] text-red-500 font-black uppercase tracking-widest">VERİLERİ TAMAMEN YOK ET</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-red-500/30 flex items-center justify-center group-hover:bg-red-600 transition-all">
                <span className="text-white text-xs">➔</span>
              </div>
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-5 bg-[#d4af37] text-black rounded-[2rem] font-black text-[11px] uppercase tracking-[0.25em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#d4af37]/10 disabled:opacity-50"
        >
          {saving ? "İŞLENİYOR..." : "AYARLARI KAYDET"}
        </button>
      </form>
    </div>
  );
}
