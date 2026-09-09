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
            <div className="max-w-4xl mx-auto space-y-10">
              {/* ALANYA SEO TEXT AT TOP */}
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-gray-200 font-bold leading-relaxed">
                  Alanya seyahatinizde veya şehrin sosyal hayatında size eşlik edecek elit partnerleri keşfedin.
                </p>
                <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
                  Alanya'nın en güzel mekanlarında size partnerlik edecek, vizyon sahibi refakatçilerimizle tanışmak için
                  resmi uygulamamızı indirebilirsiniz. <strong>Alanya eskort</strong> ve sosyal refakat arayışınızda
                  en güvenli, yasal ve elit platform burasıdır.
                </p>
              </div>

              {/* PREMIUM DOWNLOAD BUTTON */}
              <div className="flex flex-col items-center justify-center py-2">
                <a
                  href="https://play.google.com/store/apps/details?id=com.kiraliksevgili.kiralik_sevgili"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-6 rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 p-4 pr-12 transition-all hover:border-[#ff2d55]/50 hover:bg-[#111] hover:scale-[1.02] active:scale-95 shadow-[0_20px_50px_-12px_rgba(255,45,85,0.3)]"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-[1.8rem] bg-gradient-to-br from-[#34a853] to-[#4285f4] text-4xl shadow-lg shadow-blue-500/20 ring-4 ring-black">
                    <span className="group-hover:scale-110 transition-transform">🤖</span>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black tracking-[0.3em] text-[#34a853] uppercase mb-1">Resmi Uygulama</p>
                    <p className="text-2xl font-black text-white uppercase tracking-tighter">Google Play</p>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">HEMEN ÜCRETSİZ İNDİR</p>
                  </div>
                  <div className="absolute right-6 text-gray-700 transition-all group-hover:text-[#ff2d55] group-hover:translate-x-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                  </div>
                </a>
              </div>

              <div className="inline-block px-6 py-3 rounded-2xl bg-[#ff2d55]/10 border border-[#ff2d55]/20">
                <p className="text-xs md:text-sm font-black text-[#ff2d55] uppercase tracking-widest">
                  ⚠️ Kiralık Sevgili yalnızca sosyal refakat hizmetidir. Cinsel hizmet sunulmaz.
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
