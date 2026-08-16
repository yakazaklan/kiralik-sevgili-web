"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Keşfet", path: "/", icon: "🔍" },
    { name: "Harita", path: "/harita", icon: "📍" },
    { name: "Mesajlar", path: "/mesajlar", icon: "💬" },
    { name: "Profil", path: "/profil", icon: "👤" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a1a1a] bg-black/90 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff2d55] to-[#d4af37] shadow-lg shadow-pink-500/20">
              <span className="text-xl">💗</span>
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">
              Kiralık <span className="premium-gradient-text">Sevgili</span>
            </h1>
          </Link>
          <button className="rounded-full bg-white px-6 py-2 text-[10px] font-black uppercase tracking-widest text-black transition hover:bg-[#ff2d55] hover:text-white active:scale-95">
            Giriş Yap
          </button>
        </div>

        {/* APP-LIKE NAVIGATION */}
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
