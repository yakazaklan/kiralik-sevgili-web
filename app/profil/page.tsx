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
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="flex justify-center py-40">
        <div className="w-12 h-12 border-4 border-[#ff2d55] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-8">
          <span className="text-4xl opacity-20">👤</span>
        </div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">PROFİL PANELİ</h1>
        <p className="text-gray-500 max-w-sm mx-auto font-medium leading-relaxed mb-10">
          İlanlarınızı yönetmek ve profilinizi düzenlemek için giriş yapmanız gerekmektedir.
        </p>
        <Link href="/" className="px-12 py-4 bg-[#ff2d55] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#ff2d55]/80 transition-all shadow-xl shadow-[#ff2d55]/20">
          ANA SAYFAYA DÖN
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Profile Header */}
      <div className="relative p-10 rounded-[3rem] bg-[#0a0a0a] border border-[#1a1a1a] overflow-hidden mb-10">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black select-none uppercase tracking-tighter">
          PROFILE
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-32 h-32 rounded-[2.5rem] bg-[#111] border-2 border-[#1a1a1a] overflow-hidden flex items-center justify-center text-4xl shadow-2xl">
            {profile?.profileImageUrl || profile?.photoUrl ? (
              <img src={profile.profileImageUrl || profile.photoUrl} alt="Profil" className="w-full h-full object-cover" />
            ) : "👤"}
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                {profile?.name || user.displayName || 'İsimsiz'}
              </h2>
              {profile?.isIdVerified && (
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-500 text-[8px] font-black uppercase tracking-widest rounded-full">
                  KİMLİK ONAYLI
                </span>
              )}
            </div>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">
              {profile?.city || 'Şehir Belirtilmedi'} • {profile?.role === 'companion' ? 'REFAKATÇİ' : 'STANDART ÜYE'}
            </p>
            <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-4">
               <div className="px-4 py-2 bg-[#1a1a1a] rounded-xl border border-white/5">
                  <span className="block text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">Alya Bakiyesi</span>
                  <span className="text-sm font-black text-amber-500 tracking-tight">✨ {profile?.alyaBalance || 0} ALYA</span>
               </div>
               <div className="px-4 py-2 bg-[#1a1a1a] rounded-xl border border-white/5">
                  <span className="block text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1">Randevular</span>
                  <span className="text-sm font-black text-white tracking-tight">{profile?.meetingCount || 0} BULUŞMA</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link href="/topluluk" className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#ff2d55]/30 transition-all group">
          <div className="w-12 h-12 bg-[#ff2d55]/10 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🏘️</div>
          <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-2">TOPLULUK AKIŞI</h3>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">Paylaşımlarınızı ve fısıltıları yönetin.</p>
        </Link>

        <Link href="/mesajlar" className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#ff2d55]/30 transition-all group">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">💬</div>
          <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-2">MESAJLARIM</h3>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">Gelen mesaj isteklerini kontrol edin.</p>
        </Link>

        <div className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] opacity-50 cursor-not-allowed">
          <div className="w-12 h-12 bg-gray-500/10 rounded-2xl flex items-center justify-center text-2xl mb-6">⚙️</div>
          <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-2">AYARLAR</h3>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">Gizlilik ve hesap ayarları (Yakında).</p>
        </div>

        <button onClick={handleLogout} className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] hover:border-red-500/30 transition-all group text-left">
          <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🚪</div>
          <h3 className="text-lg font-black text-white uppercase tracking-tighter mb-2">GÜVENLİ ÇIKIŞ</h3>
          <p className="text-xs text-gray-500 font-medium leading-relaxed">Oturumu sonlandır.</p>
        </button>
      </div>

      <div className="mt-12 text-center">
        <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.3em]">
          Kiralık Sevgili Elit Refakatçi Ağı • 2025
        </p>
      </div>
    </div>
  );
}
