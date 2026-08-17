import React from "react";
import RealProfiles from "../components/RealProfiles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alanya Sosyal Arkadaşlık ve Refakat | Kiralık Sevgili",
  description:
    "Alanya sosyal arkadaşlık ve etkinlik refakatçisi platformu. Alanya eskort sitesi değildir; cinsel hizmet sunmaz. Sosyal aktiviteler için yeni insanlarla tanışın.",
  keywords: [
    "Alanya eskort",
    "Alanya sosyal arkadaşlık",
    "Alanya refakat",
    "Alanya'da yeni insanlarla tanış",
    "Alanya sosyal arkadaşlık platformu",
    "Alanya etkinlik arkadaşı",
  ],
  alternates: {
    canonical: "https://kiralik-sevgili-web.vercel.app/alanya",
  },
};

export default function AlanyaSEOPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-pink-500/30">
      {/* HERO / SEO SECTION */}
      <section className="relative pt-20 pb-12 overflow-hidden border-b border-[#1a1a1a]">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
            ALANYA <span className="text-[#ff2d55]">SOSYAL ARKADAŞLIK</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-400 font-medium leading-relaxed">
            Alanya'da vakit geçirecek, etkinliklere katılacak veya sadece kahve içip sohbet edecek kaliteli bir sosyal çevre mi arıyorsunuz?
            Kiralık Sevgili, Alanya'nın en elit sosyal refakat platformudur.
          </p>

          <div className="mt-10 inline-block rounded-2xl bg-[#0f0f0f] border border-[#ff2d55]/20 p-6 text-left max-w-2xl">
            <h2 className="text-[12px] font-black text-[#ff2d55] uppercase tracking-widest mb-2">
              ⚠️ Önemli Bilgilendirme
            </h2>
            <p className="text-sm text-gray-500 font-medium italic">
              Kullanıcılarımızın dikkatine: Kiralık Sevgili bir <strong>Alanya eskort</strong> sitesi değildir.
              Platformumuzda cinsel hizmet sunulmaz ve talep edilemez. Biz, insanların <strong>Alanya sosyal arkadaşlık</strong> ve
              <strong> refakat</strong> ihtiyaçlarını yasal ve seviyeli bir şekilde karşılamayı amaçlayan sosyal bir topluluğuz.
            </p>
          </div>
        </div>
      </section>

      {/* İLANLAR BÖLÜMÜ - ALANYA FOCUSED */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-black tracking-tighter uppercase">
              Alanya Sosyal İlanlar
            </h2>
            <p className="mt-2 text-gray-500 text-sm font-bold uppercase tracking-widest">
              Alanya ve çevresindeki en yeni sosyal refakatçi ilanlarını keşfedin.
            </p>
          </div>

          <RealProfiles filter="all" city="Alanya" gender="all" />
        </div>
      </section>

      {/* SEO CONTENT SECTION */}
      <section className="py-24 bg-[#050505] border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-4xl px-6 prose prose-invert">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Alanya'da Yeni İnsanlarla Tanış</h2>
          <p className="text-gray-400 leading-relaxed">
            Alanya, hem yerli hem de yabancı turistlerin uğrak noktası olan, sosyal hayatın oldukça canlı olduğu bir şehrimizdir.
            Ancak bazen bu kalabalık içinde yalnız hissedebilir veya belirli bir etkinlik (akşam yemeği, konser, gezi vb.) için size eşlik edecek
            elit bir <strong>Alanya sosyal arkadaşlık platformu</strong> arayışına girebilirsiniz.
          </p>

          <h3 className="text-xl font-bold text-white uppercase mt-12 mb-4">Neden Kiralık Sevgili?</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex gap-3">
              <span className="text-[#ff2d55]">✔</span>
              <span><strong>Güvenilirlik:</strong> Tüm profillerimiz belirli kalite standartlarından geçer.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#ff2d55]">✔</span>
              <span><strong>Sosyal Odaklılık:</strong> Sadece sosyal aktivite ve kaliteli vakit geçirme odaklıdır.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#ff2d55]">✔</span>
              <span><strong>Şeffaflık:</strong> Fiyatlar ve detaylar önceden belirlenmiştir.</span>
            </li>
          </ul>

          <div className="mt-16 p-8 rounded-3xl bg-[#0a0a0a] border border-[#1a1a1a]">
            <h4 className="text-lg font-bold text-white mb-4 italic">"Alanya eskort" araması yapanlar için bir not:</h4>
            <p className="text-sm text-gray-500">
              Eğer cinsel içerikli bir hizmet veya yasa dışı bir faaliyet arayışındaysanız, platformumuz size uygun değildir.
              Kiralık Sevgili, sosyal refakat ve platonik arkadaşlık üzerine kurulmuş, nezih bir platformdur.
              <strong> Alanya sosyal arkadaşlık platformu</strong> olarak vizyonumuz, yalnızlığı gidermek ve sosyal etkinlikleri daha keyifli hale getirmektir.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER - AYNI STANDARTTA */}
      <footer className="border-t border-[#1a1a1a] bg-black py-20 text-center">
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
          © 2025 Kiralık Sevgili - Alanya Özel SEO Sayfası. Tüm hakları saklıdır.
        </p>
      </footer>
    </main>
  );
}
