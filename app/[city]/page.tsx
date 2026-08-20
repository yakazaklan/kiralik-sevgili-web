import React from "react";
import RealProfiles from "../components/RealProfiles";
import { Metadata } from "next";
import { getCityBySlug, cities } from "../utils/cityData";
import { notFound } from "next/navigation";

interface Props {
  params: { city: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const city = resolvedParams.city;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return {
      title: "Sayfa Bulunamadı",
    };
  }

  const cityName = cityData.name;

  const title = cityData?.seoTitle || `${cityName} Kiralık Sevgili | Sosyal Arkadaşlık & Birlikte Zaman Geçirme`;
  const description = cityData?.seoDescription || `${cityName}'da sosyal arkadaşlık, birlikte zaman geçirme ve etkinlik eşliği için elit ilanlar. ${cityName} sosyal refakat ve VIP eşlik platformu.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://kiraliksevgili.net/${city}`,
    },
    openGraph: {
      title,
      description,
      url: `https://kiraliksevgili.net/${city}`,
      type: "website",
    }
  };
}

export const dynamicParams = false;

export default async function CityPage({ params }: Props) {
  const resolvedParams = await params;
  const city = resolvedParams.city;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    notFound();
  }

  const cityName = cityData.name;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-12 overflow-hidden border-b border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
            {cityName} <span className="text-[#ff2d55]">Kiralık Sevgili</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-400 font-medium leading-relaxed">
            {cityData?.description || `${cityName}'da vakit geçirecek, etkinliklere katılacak veya iş yemeklerinizde size eşlik edecek seçkin ve profesyonel bir sosyal çevre mi arıyorsunuz?`}
          </p>

          <div className="mt-10 inline-block rounded-2xl bg-[#0f0f0f] border border-[#ff2d55]/20 p-6 text-left max-w-2xl">
            <h2 className="text-[12px] font-black text-[#ff2d55] uppercase tracking-widest mb-2">
              📍 {cityName} Kullanım Mantığı
            </h2>
            <p className="text-sm text-gray-500 font-medium italic">
              {cityData?.usageLogic || `${cityName}'da sosyal hayatınızı zenginleştirecek profesyonel eşlik çözümleri sunuyoruz. Platformumuz tamamen platonik ve sosyal etkinlik odaklıdır.`}
            </p>
          </div>
        </div>
      </section>

      {/* ÖNEMLİ BİLGİLENDİRME - ESKORT DEĞİLDİR (GOOGLE DOSTU ŞEFFAF YAPI) */}
      <section className="py-16 border-b border-[#1a1a1a] bg-[#050505]">
        <div className="mx-auto max-w-4xl px-6">
          <div className="p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-[#0a0a0a] to-black shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <span className="text-8xl font-black uppercase italic select-none">{cityName}</span>
            </div>

            <h2 className="text-[10px] font-black text-[#ff2d55] uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#ff2d55]"></span>
              {cityName} Hakkında Önemli Bilgi
            </h2>

            <div className="space-y-6 relative z-10">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic leading-none">
                {cityName} eskort ilanı mı arıyorsunuz?
              </h3>

              <p className="text-gray-400 text-lg leading-relaxed font-medium">
                Bu sayfa <strong>{cityName} eskort ilanları</strong> için hazırlanmış bir sayfa değildir.
                KiralıkSevgili.net eskort veya cinsel hizmet sunan bir platform değildir.
                Platformun amacı, yetişkin kullanıcıların sosyal aktiviteler, birlikte zaman geçirme,
                gezi, yemek ve benzeri yasal sosyal etkinlikler için birbirlerini keşfetmelerine yardımcı olmaktır.
              </p>

              <div className="pt-6 border-t border-white/5">
                <p className="text-gray-500 text-sm leading-relaxed italic">
                  <strong>{cityName} eskort</strong> araması yaparak geldiyseniz, aradığınız hizmetin bu
                  platformda bulunmadığını bilmenizi isteriz. Buradaki profiller sadece sosyal arkadaşlık
                  ve kaliteli vakit geçirme amacıyla yer almaktadır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İLANLAR BÖLÜMÜ */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-black tracking-tighter uppercase">
              {cityName} Sosyal İlanlar
            </h2>
            <p className="mt-2 text-gray-500 text-sm font-bold uppercase tracking-widest">
              {cityName} ve çevresindeki en yeni sosyal refakatçi ilanlarını keşfedin.
            </p>
          </div>

          <RealProfiles filter="all" city={cityName} gender="all" />
        </div>
      </section>

      {/* ŞEHRE ÖZEL AKTİVİTELER & MEKANLAR */}
      {cityData && (
        <section className="py-24 bg-[#050505] border-t border-[#1a1a1a]">
          <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-8">
                {cityName}'da Birlikte Yapılabilecek Aktiviteler
              </h2>
              <ul className="space-y-4">
                {cityData.activities.map((act, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d55]"></span>
                    {act}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-8">
                {cityName}'daki Sosyal Buluşma Seçenekleri
              </h2>
              <div className="flex flex-wrap gap-3">
                {cityData.socialSpots.map((spot, index) => (
                  <span key={index} className="px-4 py-2 rounded-full bg-[#111] border border-[#222] text-xs font-bold text-gray-300">
                    {spot}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ SECTION */}
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter text-center mb-16">
            {cityName} Sosyal Refakat Hakkında SSS
          </h2>
          <div className="space-y-8">
            {(cityData?.faqs || [
              { q: `${cityName}'da nasıl refakatçi bulurum?`, a: "Yukarıdaki ilanları inceleyerek size en uygun profille iletişime geçebilirsiniz." },
              { q: "Platform güvenli mi?", a: "Tüm profillerimiz belirli güvenlik aşamalarından geçmektedir. Sosyal refakat odaklı bir hizmet sunulmaktadır." }
            ]).map((faq, index) => (
              <div key={index} className="p-8 rounded-3xl bg-[#0a0a0a] border border-[#1a1a1a]">
                <h3 className="text-lg font-bold text-white mb-4">{faq.q}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1a1a1a] bg-black py-20 text-center">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
          © 2025 Kiralık Sevgili - {cityName} Özel Sayfası. Tüm hakları saklıdır.
        </p>
      </footer>
    </main>
  );
}

// Statik generate (Build süresinde sayfaları oluşturur)
export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }));
}
