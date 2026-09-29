import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug, getDistrictBySlug, slugify, CITIES, TURKEY_DATA } from "@/lib/turkey-zones";
import Link from "next/link";
import DistrictClientContent from "./DistrictClientContent";

interface PageProps {
  params: Promise<{ city: string; district: string }>;
}

export const revalidate = 60; // Her 60 saniyede bir sayfayı arka planda yenile (ISR)

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const actualCityName = getCityBySlug(resolvedParams.city);

  if (!actualCityName) return {};

  const actualDistrictName = getDistrictBySlug(actualCityName, resolvedParams.district);
  if (!actualDistrictName) return {};

  const title = `Kiralık Sevgili ${actualDistrictName} | Sosyal Arkadaşlık ve Refakat`;
  const description = `${actualCityName} ${actualDistrictName} ilçesinde elit sosyal arkadaşlık, platonik refakat ve davet eşlikçisi profilleri. En kaliteli buluşma ve etkinlik deneyimleri için topluluk ilanları.`;
  const canonical = `https://kiraliksevgili.net/${resolvedParams.city}/${resolvedParams.district}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
  };
}

export async function generateStaticParams() {
  const paths: { city: string; district: string }[] = [];

  CITIES.forEach((city) => {
    const citySlug = slugify(city);
    const districts = TURKEY_DATA[city] || [];

    districts.forEach((district) => {
      paths.push({
        city: citySlug,
        district: slugify(district),
      });
    });
  });

  return paths;
}

export default async function DistrictPage({ params }: PageProps) {
  const resolvedParams = await params;
  const cityParam = resolvedParams.city;
  const districtParam = resolvedParams.district;

  const actualCityName = getCityBySlug(cityParam);
  if (!actualCityName) notFound();

  const actualDistrictName = getDistrictBySlug(actualCityName, districtParam);
  if (!actualDistrictName) notFound();

  const currentCityDistricts = TURKEY_DATA[actualCityName] || [];

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
              <Link href={`/${cityParam}`} className="hover:text-white transition-colors">{actualCityName}</Link>
              <span>/</span>
              <span className="text-[#ff2d55]">{actualDistrictName}</span>
            </div>

            <h1 className="text-4xl font-black uppercase tracking-tight text-white mb-2">
              {actualCityName} {actualDistrictName} Sosyal Arkadaşlık ve Refakat
            </h1>
          </div>

          <div className="p-6 rounded-2xl bg-[#080808] border border-[#1a1a1a] text-xs text-gray-400 space-y-4 leading-relaxed">
            <p>
              <strong className="text-white">{actualCityName} - {actualDistrictName}</strong> bölgesindeki en prestijli davetler, sinema günleri, konserler veya özel sohbet etkinlikleri için bir sosyal refakatçi arıyorsanız doğru yerdesiniz. Kiralık Sevgili altyapısı, tamamen gerçek kişilerin platonik sosyal arkadaşlık taleplerini profesyonel bir vizyonla buluşturur.
            </p>
            <p>
              İnternet dünyasındaki <span className="text-gray-300 font-bold">{actualDistrictName} eskort</span> veya yasal olmayan cinsel içerikli aramaların oluşturduğu kirlilikten uzak durmak isteyen medeni kullanıcılar için en güvenli alternatif sosyal refakat modelidir. Platformumuz cinsel birliktelikler, eskort hizmetleri veya illegal buluşmalar organize etmez; kullanıcıların kendi rızasıyla kurduğu saygılı arkadaşlık ilişkilerini esas alır.
            </p>
          </div>
        </div>
      </section>

      {/* REAF PROFILES CLIENT ALANI */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 space-y-8">
          <DistrictClientContent cityParam={cityParam} districtParam={districtParam} cityName={actualCityName} districtName={actualDistrictName} />
        </div>
      </section>

      {/* CRAWLABLE DYNAMIC DISTRICT LINKS AND SEO DISCLAIMER FOOTER */}
      <footer className="mx-auto max-w-5xl px-6 pb-16 space-y-12">
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            📍 Diğer {actualCityName} İlçelerini Keşfet
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentCityDistricts.map((dist) => (
              <Link
                key={dist}
                href={`/${cityParam}/${slugify(dist)}`}
                className={`px-4 py-2 text-[9px] font-black border rounded-xl transition-all uppercase ${
                  dist.toLowerCase() === actualDistrictName.toLowerCase()
                    ? "border-[#ff2d55] bg-[#ff2d55]/10 text-white"
                    : "bg-[#0a0a0a] border-[#1a1a1a] text-gray-400 hover:border-[#ff2d55]/50 hover:text-white"
                }`}
              >
                {dist}
              </Link>
            ))}
          </div>
        </div>

        <div className="p-10 rounded-[2.5rem] bg-[#0a0a0a] border border-[#1a1a1a] text-center shadow-3xl">
          <h4 className="text-[10px] font-black text-[#ff2d55] uppercase tracking-[0.4em] mb-4">
            {actualDistrictName.toUpperCase()} SOSYAL REFAKAT & KÜLTÜREL EŞLİK AĞI
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed max-w-4xl mx-auto">
            <span className="text-gray-300 font-bold">{actualDistrictName} eskort</span> aramalarında karşınıza çıkan yasa dışı, istismara açık ya da denetimsiz platformların yarattığı tüm güvenlik risklerinden uzak durun. Kiralık Sevgili, {actualCityName} {actualDistrictName} genelinde tamamen prestijli, kültürel düzeyde ve seviyeli platonik refakat hizmeti sunan bireysel kullanıcı ilanlarını listeler. Platformumuz kesinlikle explicit, eskort veya cinsel birliktelik vaat eden hiçbir hizmeti barındırmaz, aracılık etmez ve kesin kurallarla yasaklar.
          </p>
        </div>
      </footer>
    </main>
  );
}
