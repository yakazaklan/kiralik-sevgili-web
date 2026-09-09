"use client";

import React, { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilDuzenlePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappContactEnabled, setWhatsappContactEnabled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile(data);
          setWhatsappNumber(data.whatsappNumber || "");
          setWhatsappContactEnabled(data.whatsappContactEnabled || false);
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
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        whatsappNumber: whatsappNumber,
        whatsappContactEnabled: whatsappContactEnabled,
      });
      alert("Profil güncellendi.");
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
        <div className="w-12 h-12 border-4 border-[#ff2d55] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 bg-black min-h-screen text-white">
      <div className="mb-10 flex items-center gap-4">
        <Link href="/profil" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#222] transition-all">
          ←
        </Link>
        <h1 className="text-3xl font-black uppercase tracking-tighter">PROFİLİ DÜZENLE</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a]">
          <h2 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <span>📱</span> WHATSAPP İLETİŞİM AYARLARI
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                WHATSAPP NUMARASI
              </label>
              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+905XXXXXXXXX"
                className="w-full bg-[#111] border border-[#222] rounded-2xl p-4 text-white text-sm focus:border-[#ff2d55]/50 outline-none transition-all"
              />
              <p className="mt-2 text-[10px] text-gray-600 font-medium">
                Numaranızı uluslararası formatta giriniz (Örn: +905001234567)
              </p>
            </div>

            <div className="flex items-start gap-4 p-4 bg-[#111] rounded-2xl border border-[#222]">
              <div className="pt-1">
                <input
                  type="checkbox"
                  id="whatsappEnabled"
                  checked={whatsappContactEnabled}
                  onChange={(e) => setWhatsappContactEnabled(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-800 text-[#ff2d55] focus:ring-[#ff2d55] bg-black"
                />
              </div>
              <label htmlFor="whatsappEnabled" className="flex-1 cursor-pointer">
                <span className="block text-xs font-black text-white uppercase tracking-tight mb-1">
                  WhatsApp ile iletişime izin veriyorum
                </span>
                <span className="block text-[10px] text-gray-500 font-medium leading-relaxed">
                  Telefon numaramın, diğer kullanıcıların benimle WhatsApp üzerinden iletişim kurabilmesi amacıyla paylaşılmasına izin veriyorum. Bu seçenek kapalıyken numaranız kimseye gösterilmez.
                </span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-5 bg-[#ff2d55] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-[#ff2d55]/80 transition-all shadow-xl shadow-[#ff2d55]/20 disabled:opacity-50"
        >
          {saving ? "GÜNCELLENİYOR..." : "DEĞİŞİKLİKLERİ KAYDET"}
        </button>
      </form>

      <div className="mt-12 text-center">
        <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.3em]">
          KVKK Aydınlatma Metni uyarınca verileriniz korunmaktadır.
        </p>
      </div>
    </div>
  );
}
