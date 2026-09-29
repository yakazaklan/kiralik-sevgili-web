import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug, slugify, TURKEY_DATA, CITIES } from "@/lib/turkey-zones";
import Link from "next/link";
import CityClientContent from "./CityClientContent";

interface PageProps {
  params: Promise<{ city: string }>;
}

export const revalidate = 60; // Her 60 saniyede bir sayfayı arka planda yenile (ISR)

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const actualCityName = getCityBySlug(resolvedParams.city);

  if (!actualCityName) {
    return {};
  }

  const title = `Kiralık Sevgili ${actualCityName} | Sosyal Arkadaşlık ve Refakat`;
  const description = `${actualCityName} genelinde sosyal refakat ve platonik etkinlik arkadaşı arayanlar için topluluk platformu. Kültürel aktiviteler ve sosyal organizasyonlar için en doğru profil keşfi.`;
  const canonical = `https://kiraliksevgili.net/${resolvedParams.city}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
  };
}

export async function generateStaticParams() {
  return CITIES.map((city) => ({
    city: slugify(city),
  }));
}

export default async function CityPage({ params }: PageProps) {
  const resolvedParams = await params;
  const cityParam = resolvedParams.city;
  const actualCityName = getCityBySlug(cityParam);

  if (!actualCityName) {
    notFound();
  }

  const districts = TURKEY_DATA[actualCityName] || [];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      {/* GÖRÜNÜR LOCAL SEO VE DETAY BLOKLARI */}
      <section className="relative pt-12 pb-6 bg-gradient-to-b from-[#0a0a0a] to-black border-b border-[#111]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col gap-2 mb-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 tracking-wider">
              <Link href="/" className="hover:text-white transition-colors">ANA SAYFA</Link>
              <span>/</span>
              <span className="text-[#ff2d55]">{actualCityName}</span>
            </div>

            <h1 className="text-4xl font-black uppercase tracking-tight text-white mb-2">
              {actualCityName} Sosyal Arkadaşlık ve Refakat
            </h1>
          </div>

          <div className="p-6 rounded-2xl bg-[#080808] border border-[#1a1a1a] text-xs text-gray-400 space-y-4 leading-relaxed">
            <p>
              <strong className="text-white">{actualCityName}</strong> genelinde etkinliklere, sinema, tiyatro, iş yemekleri veya akşam organizasyonlarına eşlik edecek elit sosyal refakat profillerini keşfedin. Platformumuz, bireylerin sosyal ortamlarda kendilerini yalnız hissetmemeleri adına platonik düzeyde arkadaşlıklar kurmalarını amaçlar.
            </p>
            <p>
              <span className="text-gray-300 font-bold">{actualCityName} eskort</span> aramalarında internet kullanıcılarının karşısına çıkan cinsel nitelikli platformların aksine, Kiralık Sevgili tamamen elit refakat standartlarına odaklanır. Bu sayfada adı geçen hiçbir profil cinsel içerikli veya illegal bir vaatte bulunmaz. Platformumuz yalnızca sosyal arkadaş buluşmalarını ve medeni sohbet etkinliklerini destekleyen şeffaf bir ilan listeleme altyapısına sahiptir.
            </p>
          </div>
        </div>
      </section>

      {/* DİSTRİCTS LİSTESİ VE REAF PROFILES CLIENT ALANI */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 space-y-8">
          <CityClientContent cityParam={cityParam} cityName={actualCityName} districts={districts} />
        </div>
      </section>

      {/* SERVER-SIDE SEO DISCLAIMER FOOTER FOR CITY */}
      <footer className="mx-auto max-w-5xl px-6 pb-16">
        <div className="p-10 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] text-center shadow-3xl">
          <h4 className="text-[10px] font-black text-[#ff2d55] uppercase tracking-[0.4em] mb-4">
            {actualCityName.toUpperCase()} SOSYAL REFAKAT & KÜLTÜREL EŞLİK AĞI
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed max-w-4xl mx-auto">
            <span className="text-gray-300 font-bold">{actualCityName} eskort</span> aramalarında internet kullanıcılarının karşısına çıkan yasa dışı ya da istismara açık cinsel içerikli ilan sitelerinin aksine, Kiralık Sevgili platformu tamamen elit refakat ve medeni arkadaşlık modeline odaklanır. {actualCityName} genelinde iş yemekleri, sinema, tiyatro, kültürel etkinlikler veya özel davetlerinize seviyeli ve yasal kurallar çerçevesinde eşlik edecek sosyal yol arkadaşlarını güvenle listeleyin. Platformumuzda cinsel birliktelik vaadi, eskort hizmetleri veya illegal herhangi bir buluşma organizasyonu kesinlikle yasaktır.
          </p>
        </div>
      </footer>
    </main>
  );
}
