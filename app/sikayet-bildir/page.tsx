import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Şikayet Bildir | Kiralık Sevgili",
  description: "Platform kurallarına uymayan kullanıcıları bildirin. Güvenli sosyal refakat deneyimi için bildirim merkezi.",
  alternates: {
    canonical: "https://kiraliksevgili.net/sikayet-bildir",
  },
};

export default function SikayetBildir() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8 p-12 rounded-[3rem] border border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="w-20 h-20 bg-[#ff2d55]/10 rounded-full flex items-center justify-center text-[#ff2d55] text-4xl mx-auto animate-pulse">
          !
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Şikayet Sistemi <br/>Güncellendi</h1>
        <p className="text-gray-500 font-medium leading-relaxed">
          Daha hızlı çözüm sunabilmek için şikayet ve destek sistemimizi tek bir merkezde birleştirdik.
        </p>
        <a
          href="/iletisim"
          className="block w-full py-4 bg-white text-black rounded-full font-black uppercase tracking-widest hover:bg-[#ff2d55] hover:text-white transition-all"
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
