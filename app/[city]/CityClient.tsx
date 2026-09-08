"use client";

import React from "react";
import RealProfiles from "../components/RealProfiles";
import { getCityBySlug } from "../utils/cityData";
import { notFound } from "next/navigation";

interface CityClientProps {
  citySlug: string;
}

export default function CityClient({ citySlug }: CityClientProps) {
  const cityData = getCityBySlug(citySlug);

  if (!cityData) {
    notFound();
  }

  const cityName = cityData.name;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-12 overflow-hidden border-b border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-tight">
            {cityData.slug === 'alanya' ? (
              <>
                ALANYA <span className="text-[#ff2d55]">ESKORT</span> <br className="hidden md:block"/>
                <span className="text-2xl md:text-4xl text-gray-400">& SOSYAL REFAKAT</span>
              </>
            ) : (
              <>{cityName} <span className="text-[#ff2d55]">Kiralık Sevgili</span></>
            )}
          </h1>

          {cityData.slug === 'alanya' ? (
            <div className="max-w-3xl mx-auto space-y-8">
              <p className="text-xl text-gray-300 font-bold leading-relaxed">
                Alanya'da dışarıda görüşebileceğiniz, birlikte vakit geçirebileceğiniz elit kadın ve erkek sosyal partnerleri keşfedin.
              </p>

              {/* DOWNLOAD BUTTONS FOR ALANYA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.kiraliksevgili.kiralik_sevgili"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#ff2d55] text-white font-black uppercase tracking-widest hover:scale-105 transition shadow-[0_0_30px_-5px_rgba(255,45,85,0.6)] flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">🤖</span> Google Play'den İndir
                </a>
                <a
                  href="https://play.google.com/apps/testing/com.kiraliksevgili.kiralik_sevgili"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-black uppercase tracking-widest hover:bg-white/5 transition flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">🧪</span> Test Grubuna Katıl
                </a>
              </div>

              <div className="inline-block px-6 py-3 rounded-2xl bg-[#ff2d55]/10 border border-[#ff2d55]/20">
                <p className="text-xs md:text-sm font-black text-[#ff2d55] uppercase tracking-widest">
                  ⚠️ Kiralık Sevgili yalnızca sosyal refakat ve partnerlik hizmetidir. Cinsel hizmet sunulmaz.
                </p>
              </div>
            </div>
          ) : (
            <p className="max-w-3xl mx-auto text-xl text-gray-400 font-medium leading-relaxed">
              {cityData?.description || `${cityName}'da vakit geçirecek, etkinliklere katılacak veya iş yemeklerinizde size eşlik edecek seçkin bir sosyal çevre mi arıyorsunuz?`}
            </p>
          )}
        </div>
      </section>

      {/* ÖNEMLİ BİLGİLENDİRME - Alanya için gizlendi, diğer şehirlerde görünüyor */}
      {cityData.slug !== 'alanya' && (
        <section className="py-16 border-b border-[#1a1a1a] bg-[#050505]">
          <div className="mx-auto max-w-4xl px-6">
            <div className="p-8 rounded-[2.5rem] border border-white/5 bg-black">
              <h2 className="text-[10px] font-black text-[#ff2d55] uppercase tracking-[0.4em] mb-6">
                ⚠️ Önemli Bilgi
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Bu platform sadece sosyal refakat ve arkadaşlık üzerinedir.
                <strong> {cityName} eskort</strong> hizmeti burada bulunmamaktadır.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* İLANLAR BÖLÜMÜ */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tighter uppercase">
              {cityData.slug === 'alanya' ? '🔥 Alanya\'da Aktif Profiller' : `${cityName} Aktif İlanlar`}
            </h2>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-[10px] font-black text-gray-400">
              <span className="w-2 h-2 rounded-full bg-[#ff2d55] animate-pulse"></span>
              GÜNCEL LİSTE
            </div>
          </div>
          <RealProfiles filter="all" city={cityName} gender="all" />
        </div>
      </section>

      {/* SEO Section for Alanya Escort Keywords */}
      {cityData.slug === 'alanya' && (
        <section className="py-24 border-t border-[#1a1a1a] bg-[#050505]">
          <div className="mx-auto max-w-4xl px-6 text-center space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Alanya Eskort Arıyorsanız Önce Profilleri İnceleyin</h2>
            <p className="text-gray-400 leading-relaxed">
              Alanya seyahatinizde veya şehrin sosyal hayatında size eşlik edecek birini aradığınızda, "eskort" kelimesi genellikle refakat etme ve eşlik etme anlamında kullanılır.
              Kiralık Sevgili platformu olarak biz, bu ihtiyacı tamamen <strong>yasal, güvenli ve elit</strong> bir seviyeye taşıyoruz.
              Alanya'nın en güzel mekanlarında size partnerlik edecek, vizyon sahibi refakatçilerimizle tanışmak için uygulamamızı indirebilir veya web üzerinden profillere göz atabilirsiniz.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
