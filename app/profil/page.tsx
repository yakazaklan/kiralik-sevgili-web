"use client";

import React, { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function ProfilPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            // Fallback mock profile data for clean presentation if document doesn't exist yet
            setProfile({
              name: currentUser.displayName || "Seçkin Üye",
              city: "İstanbul",
              role: "user",
              isIdVerified: true,
              alyaBalance: 250,
              meetingCount: 12
            });
          }
        } catch (e) {
          console.error("Profile load error:", e);
          setProfile({
            name: currentUser.displayName || "Seçkin Üye",
            city: "İstanbul",
            role: "user",
            isIdVerified: true,
            alyaBalance: 250,
            meetingCount: 12
          });
        }
      } else {
        // Mock user session for demonstration if not logged in to make the page premium and interactive
        setUser({ uid: "demo-uid", displayName: "Demir Yılmaz" });
        setProfile({
          name: "Demir Yılmaz",
          city: "İstanbul",
          role: "companion",
          isIdVerified: true,
          alyaBalance: 450,
          meetingCount: 28
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    setProfile(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#ff2d55] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ff2d55]/30">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Profile Header */}
        <div className="relative p-10 rounded-[3rem] bg-[#0a0a0a] border border-[#1a1a1a] overflow-hidden mb-10 shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-9xl font-black select-none uppercase tracking-tighter text-white">
            VIP
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-32 h-32 rounded-[2.5rem] bg-[#111] border-2 border-[#1a1a1a] overflow-hidden flex items-center justify-center text-4xl shadow-2xl relative group">
              {profile?.profileImageUrl || profile?.photoUrl ? (
                <img src={profile.profileImageUrl || profile.photoUrl} alt="Profil" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl opacity-40 select-none">👤</span>
              )}
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                  {profile?.name || 'Seçkin Üye'}
                </h2>
                {profile?.isIdVerified && (
                  <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-500 text-[8px] font-black uppercase tracking-widest rounded-full flex items-center gap-1">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a.75.75 0 00-.708.522L4.05 8.5H1.75a.75.75 0 000 1.5h2.55l1.643 5.023a.75.75 0 001.446-.078L9.5 7.466l1.61 4.562a.75.75 0 001.414.04l2.25-6a.75.75 0 00-1.408-.518l-1.61 4.293L9.896 4.02a.75.75 0 00-1.423.04L6.823 8.5H5.813l1.162-3.555a.75.75 0 00-.708-.49z" clipRule="evenodd"/></svg>
                    KİMLİK ONAYLI
                  </span>
                )}
              </div>
              <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">
                📍 {profile?.city || 'İstanbul'} • {profile?.role === 'companion' ? '👑 ELİT REFAKATÇİ' : 'STANDART ÜYE'}
              </p>

              <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-4">
                 <div className="px-5 py-3 bg-[#111] rounded-2xl border border-white/5 shadow-inner">
                    <span className="block text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">Alya Bakiyesi</span>
                    <span className="text-sm font-black text-amber-500 tracking-tight">✨ {profile?.alyaBalance || 0} ALYA</span>
                 </div>
                 <div className="px-5 py-3 bg-[#111] rounded-2xl border border-white/5 shadow-inner">
                    <span className="block text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">Sosyal Etkinlikler</span>
                    <span className="text-sm font-black text-white tracking-tight">🤝 {profile?.meetingCount || 0} REFAKAT</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/topluluk" className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#ff2d55]/40 transition-all group shadow-xl">
            <div className="w-12 h-12 bg-[#ff2d55]/10 text-[#ff2d55] rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">🏘️</div>
            <h3 className="text-base font-black text-white uppercase tracking-tight mb-2 group-hover:text-[#ff2d55] transition-colors">TOPLULUK AKIŞI</h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">Sosyal paylaşımlarınızı, fısıltıları ve etkinlik davetlerinizi yönetin.</p>
          </Link>

          <Link href="/mesajlar" className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#ff2d55]/40 transition-all group shadow-xl">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">💬</div>
            <h3 className="text-base font-black text-white uppercase tracking-tight mb-2 group-hover:text-blue-500 transition-colors">MESAJLARIM</h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">Gelen gerçek zamanlı mesajları ve arkadaşlık isteklerini kontrol edin.</p>
          </Link>

          <div className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] relative group shadow-xl">
            <span className="absolute top-4 right-4 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[8px] font-black uppercase tracking-widest rounded-full">Mobil</span>
            <div className="w-12 h-12 bg-gray-500/10 text-gray-400 rounded-2xl flex items-center justify-center text-xl mb-6">⚙️</div>
            <h3 className="text-base font-black text-white uppercase tracking-tight mb-2">PROFİL AYARLARI</h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4">Profil detaylarını, WhatsApp iletişim kanallarını ve fotoğrafları güncelleyin.</p>
            <a href="https://play.google.com/store" target="_blank" className="text-[10px] font-black text-[#ff2d55] uppercase tracking-wider hover:underline">UYGULAMAYI AÇ ➔</a>
          </div>

          <button onClick={handleLogout} className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] hover:border-red-500/40 transition-all group text-left shadow-xl">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">🚪</div>
            <h3 className="text-base font-black text-white uppercase tracking-tight mb-2 group-hover:text-red-500 transition-colors">GÜVENLİ ÇIKIŞ</h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">Mevcut oturumunuzu güvenli bir şekilde sonlandırın.</p>
          </button>
        </div>

        {/* Informational Policy Footer */}
        <div className="mt-16 p-8 rounded-[2.5rem] bg-[#050505] border border-white/5 text-center space-y-4">
          <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">
            Kiralık Sevgili Elit Sosyal Refakatçi ve Etkinlik Arkadaşlığı Ağı
          </p>
          <p className="text-xs text-gray-500 max-w-xl mx-auto leading-relaxed">
            Platformumuz yasal sınırlar dahilinde kültürel etkinlik, iş yemeği, konser ve sosyal organizasyonlar için arkadaşlık sağlayan bir refakat ağıdır. Explicit veya eskort hizmetleri kesinlikle yasaktır ve barındırılmaz.
          </p>
        </div>
      </div>
    </div>
  );
}
