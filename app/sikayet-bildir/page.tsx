import { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Şikayet Bildir | Kiralık Sevgili",
  description: "Platform kurallarına uymayan kullanıcıları bildirin. Güvenli sosyal refakat deneyimi için bildirim merkezi.",
  alternates: {
    canonical: absoluteUrl("/sikayet-bildir"),
  },
};

export default function SikayetBildir() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8 p-12 rounded-[3rem] border border-[#d4af37]/20 bg-[#0a0a0a] shadow-[0_0_50px_rgba(212,175,55,0.05)]">
        <div className="w-20 h-20 bg-[#d4af37]/10 rounded-full flex items-center justify-center text-[#d4af37] text-4xl mx-auto animate-pulse">
          !
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Şikayet Sistemi <br/>Güncellendi</h1>
        <p className="text-gray-500 font-medium leading-relaxed">
          Daha hızlı çözüm sunabilmek için şikayet ve destek sistemimizi tek bir merkezde birleştirdik.
        </p>
        <a
          href="/iletisim"
          className="block w-full py-4 bg-[#d4af37] text-black rounded-full font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all"
        >
          İLETİŞİM MERKEZİNE GİT
        </a>
        <p className="text-[10px] text-gray-800 uppercase tracking-widest pt-4 border-t border-[#1a1a1a]">
          Alanya eskort sitesi değildir. Güvenli sosyal refakat.
        </p>
      </div>
    </main>
  );
}
