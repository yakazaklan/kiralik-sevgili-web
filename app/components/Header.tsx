"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { collection, query, where, onSnapshot, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Kullanıcı silinmiş mi kontrol et
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            const isDeleted = !!userData.deletedAt;
            const isPassive = userData.isActive === false;

            if (isDeleted || isPassive) {
              // Yeni giriş yapılmışsa restorasyon için süre tanı
              const lastSignInTime = new Date(currentUser.metadata.lastSignInTime || 0).getTime();
              const now = new Date().getTime();
              if (isDeleted && (now - lastSignInTime < 8000)) {
                console.log("Restorasyon süreci bekleniyor...");
                return;
              }

              console.warn("Oturum kapatılıyor: Hesap silinmiş veya pasif.");
              await signOut(auth);
              window.location.href = "/";
            }
          }
        } catch (error: any) {
          console.error("User check error:", error);
          // Eğer yetki hatası alıyorsak (Firebase kuralları silinmiş kullanıcıyı engelliyorsa)
          // veya kullanıcı bulunamadıysa oturumu kapat
          if (error.code === 'permission-denied' || error.code === 'not-found') {
            console.warn("Oturum kapatılıyor: Yetki reddedildi veya hesap bulunamadı.");
            await signOut(auth);
            window.location.href = "/";
          }
        }
      }
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      setHasUnread(false);
      return;
    }

    // Okunmamış mesajları dinle
    const q = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const unread = snapshot.docs.some(doc => {
        const data = doc.data();
        return (data.unreadCount?.[user.uid] || 0) > 0;
      });
      setHasUnread(unread);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Kullanıcı bilgilerini Firestore'a kaydet/güncelle
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          console.log(`[Auth Diagnostic] Match found! UID: ${user.uid}`);
          // SADECE MEVCUT KULLANICIYI GÜNCELLE
          // Kritik alanlara (role, isActive, isApproved, hasProfile) ASLA dokunma.
          await setDoc(userRef, {
            lastLogin: serverTimestamp(),
            email: user.email || userSnap.data().email
          }, { merge: true });
        } else {
          // EĞER KULLANICI YOKSA: Teşhis için UID logla
          console.error(`[Auth Diagnostic] UID Mismatch! Google UID: ${user.uid} does not exist in Firestore /users collection.`);
          console.log("Firestore profile not found. Skipping auto-creation to prevent data loss.");
          alert(`Hesap Eşleşme Hatası: Giriş yaptığınız Google hesabı (${user.email}) Android profilinizle eşleşmedi. Lütfen desteğe başvurun. (UID: ${user.uid.substring(0, 5)}...)`);
        }
      }
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
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-6 py-4">
        <div className="flex items-center justify-between relative">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4af37] to-[#000] border border-[#d4af37]/30 shadow-lg shadow-amber-500/20">
              <span className="text-xl">✨</span>
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">
              Kiralık <span className="premium-gradient-text">Sevgili</span>
            </h1>
          </Link>

          {/* WARNING MESSAGE - DESKTOP ONLY */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center">
             <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.15em] bg-[#d4af37]/10 px-4 py-2 rounded-full border border-[#d4af37]/20 whitespace-nowrap">
               ⚠️ SOSYAL REFAKAT PLATFORMUDUR
             </span>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* ANDROID DOWNLOAD BUTTON - ALWAYS VISIBLE */}
            <a
              href="https://play.google.com/store/apps/details?id=com.kiraliksevgili.kiralik_sevgili"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'click_app_download', {
                    'event_category': 'engagement',
                    'event_label': 'Android Play Store'
                  });
                }
              }}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#34a853] to-[#4285f4] px-3 py-2 text-[9px] font-black uppercase tracking-tighter text-white transition hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
            >
              <span>🤖</span> <span className="hidden sm:inline">UYGULAMAYI</span> İNDİR
            </a>

            {user ? (
              <div className="flex items-center gap-2">
                <img src={user.photoURL || ""} alt="Profil" className="w-8 h-8 rounded-full border border-[#d4af37]" />
                <button
                  onClick={handleLogout}
                  className="rounded-full bg-[#1a1a1a] px-3 py-2 text-[9px] font-black uppercase text-white transition hover:bg-red-500"
                >
                  Çıkış
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'click_login', {
                      'event_category': 'auth',
                      'event_label': 'Google Login Header'
                    });
                  }
                  handleLogin();
                }}
                className="rounded-full bg-white px-4 py-2 text-[9px] font-black uppercase text-black transition hover:bg-[#d4af37]"
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
                className={`flex flex-col items-center gap-1 group transition-opacity relative ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                {item.name === "Mesajlar" && hasUnread && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full border-2 border-black animate-pulse shadow-lg shadow-red-500/50"></span>
                )}
                <span className={`text-[9px] font-black tracking-widest uppercase ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {item.name}
                </span>
                <div className={`h-0.5 w-8 rounded-full mt-1 transition-all ${isActive ? 'bg-[#d4af37]' : 'bg-transparent'}`}></div>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
