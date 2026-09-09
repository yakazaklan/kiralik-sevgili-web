"use client";

import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

type UserLocation = {
  id: string;
  name: string;
  city: string;
  district: string;
  image?: string;
  isVerified: boolean;
  isElite: boolean;
  isApproved: boolean;
};

export default function HaritaPage() {
  const [users, setUsers] = useState<UserLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const q = query(
          collection(db, 'users'),
          where('hasProfile', '==', true),
          where('isApproved', '==', true)
        );
        const snapshot = await getDocs(q);
        const loaded = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Kullanıcı',
            city: data.city || '',
            district: data.district || '',
            image: data.profileImageUrl || data.photoUrl || data.image,
            isVerified: data.isVerified || data.isIdVerified || false,
            isElite: data.isElite || false,
            isApproved: data.isApproved || false,
          };
        });
        setUsers(loaded);
      } catch (err) {
        console.error("Map Load Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-block px-6 py-2 bg-[#ff2d55]/10 border border-[#ff2d55]/30 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-[#ff2d55] mb-4">
          BÖLGESEL KEŞİF
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
          YAKINDAKİ <span className="text-[#ff2d55]">PROFİLLER</span>
        </h1>
        <p className="text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
          Google Maps entegrasyonu mobil uygulamamızda aktiftir. Web sürümünde bölge bazlı listeleme ile keşfe başlayın.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-[#ff2d55] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {users.map((user) => (
            <Link
              key={user.id}
              href={`/profil/${user.id}`}
              className="group relative flex flex-col items-center p-4 rounded-3xl bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#ff2d55]/30 transition-all"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-[#1a1a1a] group-hover:border-[#ff2d55]/50 transition-colors">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-2xl opacity-20 bg-[#111]">👤</div>
                )}
                {user.isVerified && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-[#0a0a0a]">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  </div>
                )}
              </div>
              <h3 className="text-[11px] font-black text-white uppercase tracking-tighter truncate w-full text-center">
                {user.name[0]}.***
              </h3>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                {user.district || user.city}
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* Mobile CTA - PREMIUM DOWNLOAD SECTION */}
      <div className="mt-20 p-8 md:p-12 rounded-[3rem] bg-[#0a0a0a] border border-white/5 text-center shadow-2xl relative overflow-hidden group">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff2d55]/5 to-transparent opacity-50"></div>

        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4">Interaktif Harita Deneyimi</h3>
          <p className="text-sm md:text-base text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
            Anlık konum takibi ve tam interaktif harita deneyimi için Kiralık Sevgili mobil uygulamasını kullanın.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Google Play Button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.kiraliksevgili.kiralik_sevgili"
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative flex items-center gap-4 rounded-2xl bg-black border border-white/10 p-3 pr-8 transition-all hover:border-[#ff2d55]/50 hover:bg-[#050505] hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#34a853] to-[#4285f4] text-2xl shadow-lg ring-2 ring-black">
                🤖
              </div>
              <div className="text-left">
                <p className="text-[8px] font-black tracking-widest text-[#34a853] uppercase">ANDROID</p>
                <p className="text-base font-black text-white uppercase tracking-tighter">Google Play</p>
              </div>
            </a>

            {/* App Store Button (Coming Soon) */}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group/btn relative flex items-center gap-4 rounded-2xl bg-black border border-white/10 p-3 pr-8 opacity-40 cursor-not-allowed transition-all w-full sm:w-auto"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#555] to-[#222] text-2xl shadow-lg ring-2 ring-black">
                🍎
              </div>
              <div className="text-left">
                <p className="text-[8px] font-black tracking-widest text-gray-500 uppercase">YAKINDA</p>
                <p className="text-base font-black text-white uppercase tracking-tighter">App Store</p>
              </div>
            </a>
          </div>

          <p className="mt-8 text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">
            Güvenli • Yasal • Seçkin Sosyal Refakat
          </p>
        </div>
      </div>
    </div>
  );
}
