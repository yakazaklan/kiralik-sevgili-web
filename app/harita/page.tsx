"use client";

import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
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
  const [selectedRegion, setSelectedRegion] = useState("Tümü");

  useEffect(() => {
    async function loadUsers() {
      try {
        const q = query(
          collection(db, 'users'),
          where('hasProfile', '==', true),
          where('isApproved', '==', true),
          limit(20)
        );
        const snapshot = await getDocs(q);
        const loaded = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Kullanıcı',
            city: data.city || 'İstanbul',
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
        // Fallback dummy data for interactive preview if firestore is empty or fails
        setUsers([
          { id: "1", name: "Melis", city: "İstanbul", district: "Bebek", isVerified: true, isElite: true, isApproved: true },
          { id: "2", name: "Can", city: "İstanbul", district: "Şişli", isVerified: true, isElite: false, isApproved: true },
          { id: "3", name: "Derin", city: "İzmir", district: "Alsancak", isVerified: true, isElite: true, isApproved: true },
          { id: "4", name: "Berk", city: "Ankara", district: "Çankaya", isVerified: false, isElite: false, isApproved: true },
          { id: "5", name: "Aslı", city: "Antalya", district: "Alanya", isVerified: true, isElite: true, isApproved: true }
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const filteredUsers = selectedRegion === "Tümü"
    ? users
    : users.filter(u => u.city.toLowerCase().includes(selectedRegion.toLowerCase()));

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ff2d55]/30">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block px-6 py-2 bg-[#ff2d55]/10 border border-[#ff2d55]/30 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-[#ff2d55]">
            BÖLGESEL KEŞİF VE ETKİNLİK PLANI
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
            YAKINDAKİ <span className="text-[#ff2d55]">REFKATÇİLER</span>
          </h1>
          <p className="text-gray-400 font-medium max-w-xl mx-auto text-sm leading-relaxed">
            Canlı konum takibi ve tam interaktif Google Maps entegrasyonu yüksek güvenlik standartları gereği mobil uygulamamızda aktiftir. Web sürümünde şehir ve bölge bazlı seçkin üyeleri listeleyebilirsiniz.
          </p>
        </div>

        {/* Region Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["Tümü", "İstanbul", "Ankara", "İzmir", "Antalya"].map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                selectedRegion === region
                  ? 'bg-[#ff2d55] text-white border-[#ff2d55] shadow-lg shadow-[#ff2d55]/20'
                  : 'bg-[#0a0a0a] text-gray-400 border-[#1a1a1a] hover:border-gray-700'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#ff2d55] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredUsers.map((user) => (
              <Link
                key={user.id}
                href={`/profil/${user.id}`}
                className="group relative flex flex-col items-center p-5 rounded-3xl bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#ff2d55]/40 transition-all hover:scale-[1.02] shadow-xl"
              >
                {user.isElite && (
                  <div className="absolute top-3 right-3 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[8px] font-black px-2 py-0.5 rounded-full tracking-widest uppercase">
                    ELİT
                  </div>
                )}
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-[#1a1a1a] group-hover:border-[#ff2d55]/50 transition-colors shadow-inner bg-[#111] flex items-center justify-center">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl opacity-30 select-none">👤</span>
                  )}
                  {user.isVerified && (
                    <div className="absolute bottom-0 right-1 bg-blue-500 rounded-full p-1 border-2 border-[#0a0a0a]" title="Kimlik Doğrulanmış Üye">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-xs font-black text-white uppercase tracking-tight truncate w-full text-center group-hover:text-[#ff2d55] transition-colors">
                  {user.name.includes('***') ? user.name : `${user.name[0]}.***`}
                </h3>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1">
                  <span>📍</span> {user.district ? `${user.district}, ` : ''}{user.city}
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile CTA - PREMIUM DOWNLOAD SECTION */}
        <div className="mt-20 p-8 md:p-12 rounded-[3rem] bg-[#0a0a0a] border border-[#1a1a1a] text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff2d55]/5 to-transparent opacity-50"></div>

          <div className="relative z-10 space-y-6">
            <div className="mx-auto w-16 h-16 bg-[#ff2d55]/10 rounded-full flex items-center justify-center text-2xl text-[#ff2d55]">
              🗺️
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">İnteraktif Canlı Harita Deneyimi</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
              Anlık mesafe ölçümü, canlı konum filtreleri ve harita üzerinden güvenli arkadaşlık istekleri göndermek için Kiralık Sevgili mobil uygulamasını indirin.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative flex items-center gap-4 rounded-2xl bg-black border border-white/10 p-3 pr-8 transition-all hover:border-[#ff2d55]/50 hover:bg-[#050505] hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#34a853] to-[#4285f4] text-xl shadow-lg">
                  🤖
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-black tracking-widest text-[#34a853] uppercase">ANDROID</p>
                  <p className="text-sm font-black text-white uppercase tracking-tight">Google Play</p>
                </div>
              </a>

              <a
                href="https://www.apple.com/app-store"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative flex items-center gap-4 rounded-2xl bg-black border border-white/10 p-3 pr-8 transition-all hover:border-[#ff2d55]/50 hover:bg-[#050505] hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#555] to-[#222] text-xl shadow-lg">
                  🍎
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-black tracking-widest text-gray-400 uppercase">IOS</p>
                  <p className="text-sm font-black text-white uppercase tracking-tight">App Store</p>
                </div>
              </a>
            </div>

            <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] pt-4">
              Güvenli • Yasal • Seçkin Sosyal Refakat ve Etkinlik Ağı
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
