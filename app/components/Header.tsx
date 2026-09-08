"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Login Error Detail:", error);
      if (error.code === 'auth/unauthorized-domain') {
        alert("Hata: Bu alan adı Firebase panelinde yetkilendirilmemiş.");
      } else {
        alert(`Giriş hatası: ${error.message}`);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const navItems = [
    { name: "Keşfet", path: "/", icon: "🔍" },
    { name: "Harita", path: "/harita", icon: "📍" },
    { name: "Topluluk", path: "/topluluk", icon: "🏘️" },
    { name: "Mesajlar", path: "/mesajlar", icon: "💬" },
    { name: "Profil", path: "/profil", icon: "👤" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a1a1a] bg-black/90 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4">
        <div className="flex items-center justify-between relative">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff2d55] to-[#d4af37] shadow-lg shadow-pink-500/20">
              <span className="text-xl">💗</span>
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">
              Kiralık <span className="premium-gradient-text">Sevgili</span>
            </h1>
          </Link>

          {/* WARNING MESSAGE - DESKTOP ONLY */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center">
             <span className="text-[10px] font-black text-[#ff2d55] uppercase tracking-[0.15em] bg-[#ff2d55]/10 px-4 py-2 rounded-full border border-[#ff2d55]/20 whitespace-nowrap">
               ⚠️ SOSYAL REFAKAT PLATFORMUDUR
             </span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* ANDROID DOWNLOAD BUTTON - ALWAYS VISIBLE */}
            <a
              href="https://play.google.com/store/apps/details?id=com.kiraliksevgili.kiralik_sevgili"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#34a853] to-[#4285f4] px-3 py-2 text-[9px] font-black uppercase tracking-tighter text-white transition hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
            >
              <span>🤖</span> <span className="hidden sm:inline">UYGULAMAYI</span> İNDİR
            </a>

            {user ? (
              <div className="flex items-center gap-2">
                <img src={user.photoURL || ""} alt="Profil" className="w-8 h-8 rounded-full border border-[#ff2d55]" />
                <button
                  onClick={handleLogout}
                  className="rounded-full bg-[#1a1a1a] px-3 py-2 text-[9px] font-black uppercase text-white transition hover:bg-red-500"
                >
                  Çıkış
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="rounded-full bg-white px-4 py-2 text-[9px] font-black uppercase text-black transition hover:bg-[#ff2d55] hover:text-white"
              >
                Giriş
              </button>
            )}
          </div>
        </div>

        <nav className="flex items-center justify-around border-t border-[#1a1a1a] pt-4 md:justify-center md:gap-16">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center gap-1 group transition-opacity ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className={`text-[9px] font-black tracking-widest uppercase ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {item.name}
                </span>
                <div className={`h-0.5 w-8 rounded-full mt-1 transition-all ${isActive ? 'bg-[#ff2d55]' : 'bg-transparent'}`}></div>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
